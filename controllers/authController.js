const authData = require("../models/authData");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");

exports.getSignup = (req, res, next) => {
    res.render("auth/signup", {
        title : "Signup"
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashPassword => {
        if(!hashPassword){
            return res.redirect("/signup");
        }
        return new authData({
            email : email,
            password : hashPassword
        }).save()
    })
    .then(result => {
        return res.redirect("/login");
    })
    .catch(err => {
        throw new Error("Fail in post Signup");
    })
}


exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        title : "Login",
        errorMessage : null,
        validationError : [],
        email : null,
        password : null
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.render("auth/login", {
            title : "Login",
            errorMessage : error.array()[0].msg,
            validationError : error.array(),
            email : email,
            password : password
        })
    }

    authData.findOne({email : email})
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(match => {
            if(!match){
                return res.render("auth/login", {
                    title : "Login",
                    errorMessage : "Incorrect Password",
                    validationError : error.array(),
                    email : email,
                    password : password
                })
            }
            req.session.isLogin = true;
            req.session.user = user;
            return res.redirect("/");
        })
    })
    .catch(err => {
        return res.render("auth/login", {
            title : "Login",
            errorMessage : "Invalid Email, try again!",
            validationError : error.array(),
            email : email,
            password : password
        })
    })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            throw new Error("Fail Logout");
        } else {
            res.redirect("/");
        }
    })
}