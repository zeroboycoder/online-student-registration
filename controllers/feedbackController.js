const Feedback = require("../models/feedbackData");

const {validationResult} = require("express-validator");

exports.postFeedback = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const content = req.body.content;

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.render("register/about", {
            title : "About",
            successMessage : null,
            errorMessage : "Invalid value",
            validationError : error.array(),
            name : name,
            email : email,
            content : content
        })
    }

    return new Feedback({
        name : name,
        email : email,
        content : content
    }).save()
    .then(() => [
        res.render("register/about", {
            title : "About",
            successMessage : "Thanks for your suggestion!",
            errorMessage : null,
            validationError : error.array(),
            name : null,
            email : null,
            content : null
        })
    ])
    .catch(err => {
        throw new Error("Error in feedback data saving!!!");
    })

}


exports.getFeedback = (req, res, next) => {
    res.render("register/feedback", {
        title : "Feedback"
    })
}