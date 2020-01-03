const express = require("express");
const route = express.Router();
const studentController = require("../controllers/studentController");
const feedbackController = require("../controllers/feedbackController");
const authController = require("../middleware/isAuth");

const { body } = require("express-validator");

route.get("/", studentController.getIndex);

route.get("/student_registration", studentController.getStudentRegistration);

route.post("/student-registration", 
[
    body('studentNameMyan')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('studentNameEng')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('studentNRC')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('bloodType')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('height')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('obviousSign')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('fatherNameMyan')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('fatherNameEng')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('fatherNRC')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('fatherWork')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('motherNameMyan')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('motherNameEng')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('motherNRC')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('motherWork')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('acadamicYear')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('attendenceYear')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('major')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('rollno')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('g10Rollno')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('g10Year')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('alwaysLive')
    .isLength({min : 1})
    .isLength({min : 1})
    .isString()
    .trim(),
    body('mawlamyineLive')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('phno')
    .isNumeric()
    .trim()
]
, studentController.postStudentRegistration);

route.get("/check-in/second-to-final", studentController.getSecondToFinalCheck);

route.post("/student-registration/second-to-final",
[
    body('g10Rollno')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('g10Year')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('major')
    .isLength({min : 1})
    .isString()
    .trim()
]
,studentController.postSecondToFinalRegistration);

route.get("/verification", studentController.getVerification);

route.post("/verification", studentController.postVerification);

route.get("/searchStudent", authController.isAuth, studentController.getSearchStudent);

route.post("/searchStudent",
[
    body('acadamicYear')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('major')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('attendenceYear')
    .isLength({min : 1})
    .isString()
    .trim()
]
,studentController.postSearchStudent);

route.get("/about", studentController.getAbout);

route.post("/about",
[
    body('name')
    .isLength({min : 1})
    .isString()
    .trim(),
    body('content')
    .isLength({min : 1})
    .isString()
    .trim()
]
,feedbackController.postFeedback)

route.get("/feedback", authController.isAuth, feedbackController.getFeedback);

module.exports = route;