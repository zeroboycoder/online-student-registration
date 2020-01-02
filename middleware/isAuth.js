exports.isAuth = (req, res, next) => {
    if(!req.session.user){
        return res.render("auth/login", {
            title : "Login",
            errorMessage : "Please Login first!",
            validationError : [],
            email : null,
            password : null
        })
    }
    next();
}