const express = require("express");
const bodyParser = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const connectMongodb = require('connect-mongodb-session')(session);
const csrf = require("csurf");
const multer = require("multer");
const flash = require('connect-flash');

const app = express();
const csrfProtection = csrf();

const errorController = require("./controllers/404");

const authData = require("./models/authData");
// const MONGODB_URI = "mongodb://localhost:27017/onlineRegistration";
const MONGODB_URI = "mongodb+srv://pyaesonekhant:Py@esonekh@nt27@studentregistration-vhwr3.mongodb.net/studentregistration?retryWrites=true&w=majority"

const store = new connectMongodb({
    uri : MONGODB_URI,
    collection : 'session'
})

app.use(session({
    secret : "Node.js Student Online Registration",
    resave : false,
    saveUninitialized : false,
    store : store
}))

const fileStorage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "images");
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === 
    "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
app.set("view engine", "ejs");
app.use(multer({storage : fileStorage, fileFilter : fileFilter}).single("image"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use("/images",express.static(("images")));

app.use(flash());
app.use(csrfProtection);
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLogin;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use((req, res, next) => {
    if(req.session.user){
        authData.findById(req.session.user._id)
        .then(user => {
            if(user){
                const uname = user.email.split("@")[0].toUpperCase();
                res.locals.user = user;
                res.locals.uname = uname;
                next();
            } else{
                next();
            }
        })
        .catch(err => {
            throw new Error("User not find");
        })
    } else {
        next();
    }
})

const registerRoute = require("./routes/routes");
const authRouter = require("./routes/authRoute");
app.use("/", registerRoute); 
app.use("/", authRouter);
app.use(errorController.get404);

const port = process.env.PORT || 3000;
// app.listen(port, () => console.log("Server is running"))
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    if(!result){
        console.log("It's not result")
    } else {
        app.listen(port, () => console.log("Server is running"))
    }
})
.catch(err => {
    throw new Error("Can't connect to DB");
})
