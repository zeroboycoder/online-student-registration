const studentData = require("../models/studentData");
const { validationResult } = require("express-validator");

const stripe = require("stripe")("sk_test_ptnus4CjnVUHfT7mcEYeEIQT00rRn1P1Hz");

exports.getIndex = (req, res, next) => {
    res.render("register/index", {
        title: "Online Registration"
    })
}

exports.getStudentRegistration = (req, res, next) => {
    const year = req.query.year;
    let firstYear;
    if (year === "first") {
        firstYear = true;
    } else {
        firstYear = null;
    }
    res.render("register/studentRegistrationForm", {
        title: "Student Registration",
        firstYear: firstYear,
        errorMessage : null,
        validationError : [],
        errorCondition : false,
        disabled : false,
        studentNameMyan : null,
        studentNameEng : null,
        studentNRC : null,
        birthDate : null,
        bloodType : null,
        height : null,
        obviousSign : null,
        fatherNameMyan : null,
        fatherNameEng : null,
        fatherNRC : null,
        fatherWork : null,
        motherNameMyan : null,
        motherNameEng : null,
        motherNRC : null,
        motherWork : null,
        attendenceYear : null,
        rollno : null,
        lastRollno : null,
        g10Rollno : null,
        g10Year : null,
        phno : null
    })
}

exports.postStudentRegistration = (req, res, next) => {
    const image = req.file;
    let imageUrl;
    if (image) {
        imageUrl = image.path;
    }
    const studentNameMyan = req.body.studentNameMyan;
    const studentNameEng = req.body.studentNameEng;
    const studentNRC = req.body.studentNRC;
    const birthDate = req.body.birthDate;
    const bloodType = req.body.bloodType;
    const height = req.body.height;
    const obviousSign = req.body.obviousSign;
    const fatherNameMyan = req.body.fatherNameMyan;
    const fatherNameEng = req.body.fatherNameEng;
    const fatherNRC = req.body.fatherNRC;
    const fatherWork = req.body.fatherWork;
    const motherNameMyan = req.body.motherNameMyan;
    const motherNameEng = req.body.motherNameEng;
    const motherNRC = req.body.motherNRC;
    const motherWork = req.body.motherWork;
    const acadamicYear = req.body.acadamicYear;
    const attendenceYear = req.body.attendenceYear;
    const major = req.body.major;
    const rollno = req.body.rollno;
    const lastRollno = req.body.lastRollno;
    const g10Rollno = req.body.g10Rollno;
    const g10Year = req.body.g10Year;
    const alwaysLive = req.body.alwaysLive;
    const mawlamyineLive = req.body.mawlamyineLive;
    const phno = req.body.phno;

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.status(422).render("register/studentRegistrationForm", {
            title: "Student Registration",
            firstYear: false,
            errorMessage : error.array()[0].msg,
            validationError : error.array(),
            errorCondition : true,
            disabled : false,
            studentNameMyan : studentNameMyan,
            studentNameEng : studentNameEng,
            studentNRC : studentNRC,
            birthDate : birthDate,
            bloodType : bloodType,
            height : height,
            obviousSign : obviousSign,
            fatherNameMyan : fatherNameMyan,
            fatherNameEng : fatherNameEng,
            fatherNRC : fatherNRC,
            fatherWork : fatherWork,
            motherNameMyan : motherNameMyan,
            motherNameEng : motherNameEng,
            motherNRC : motherNRC,
            motherWork : motherWork,
            acadamicYear : acadamicYear,
            attendenceYear : attendenceYear,
            rollno : rollno,
            lastRollno : lastRollno,
            g10Rollno : g10Rollno,
            g10Year : g10Year,
            alwaysLive: alwaysLive,
            mawlamyineLive: mawlamyineLive,
            phno : phno
        })
    }

    const token = req.body.stripeToken;
    const charge = stripe.charges.create({
        amount : 34500*100,
        currency : 'mmk',
        description : "Demo Payment",
        source : token,
        metadata : { studentName : studentNameEng}
    })

    studentData.findOne({g10Rollno: g10Rollno, g10Year: g10Year, major: major})
    .then(student => {
        // If student is already exist
        if(student){
            return studentData.updateOne({
                _id: student.id
            }, {
                $push: {
                    "year": attendenceYear,
                    "rollno" : {
                        [attendenceYear] : rollno
                    },
                    "data": {
                        imageUrl: imageUrl,
                        studentNameMyan: studentNameMyan,
                        studentNameEng: studentNameEng,
                        studentNRC: studentNRC,
                        birthDate: birthDate,
                        bloodType: bloodType,
                        height: height,
                        obviousSign: obviousSign,
                        fatherNameMyan: fatherNameMyan,
                        fatherNameEng: fatherNameEng,
                        fatherNRC: fatherNRC,
                        fatherWork: fatherWork,
                        motherNameMyan: motherNameMyan,
                        motherNameEng: motherNameEng,
                        motherNRC: motherNRC,
                        motherWork: motherWork,
                        acadamicYear : acadamicYear,
                        attendenceYear: attendenceYear,
                        major: major,
                        rollno: rollno,
                        lastRollno: lastRollno,
                        g10Rollno: g10Rollno,
                        g10Year: g10Year,
                        alwaysLive: alwaysLive,
                        mawlamyineLive: mawlamyineLive,
                        phno: phno
                    }
                }
            })
            .then(result => {
                console.log("Update the data of " + studentNameEng);
                return res.redirect("/");
            })
            .catch(err => {
                console.log(err);
                throw new Error("Error in updating process")
            })            
        } else {
            // If student isn't exist
            return new studentData({
                name: studentNameEng,
                g10Rollno: g10Rollno,
                g10Year: g10Year,
                major: major,
                year: [attendenceYear],
                rollno : [{
                    [attendenceYear] : rollno
                }],
                data: [{
                    imageUrl: imageUrl,
                    studentNameMyan: studentNameMyan,
                    studentNameEng: studentNameEng,
                    studentNRC: studentNRC,
                    birthDate: birthDate,
                    bloodType: bloodType,
                    height: height,
                    obviousSign: obviousSign,
                    fatherNameMyan: fatherNameMyan,
                    fatherNameEng: fatherNameEng,
                    fatherNRC: fatherNRC,
                    fatherWork: fatherWork,
                    motherNameMyan: motherNameMyan,
                    motherNameEng: motherNameEng,
                    motherNRC: motherNRC,
                    motherWork: motherWork,
                    acadamicYear : acadamicYear,
                    attendenceYear: attendenceYear,
                    major: major,
                    rollno: rollno,
                    lastRollno: lastRollno,
                    g10Rollno: g10Rollno,
                    g10Year: g10Year,
                    alwaysLive: alwaysLive,
                    mawlamyineLive: mawlamyineLive,
                    phno: phno
                }]
            }).save()
            .then(result => {
                console.log("Insert Data Successfully");
                res.redirect('/');
            })
            .catch(err => {
                console.log("Insert data is not successfully");
            });
        }
    })
    .catch(err => {
        throw new Error("Error in postStudentRegistration")
    })
}


// ===========================
// Second To Final
// ===========================

// Check in page
exports.getSecondToFinalCheck = (req, res, next) => {
    res.render("register/checkin", {
        title: "Student Check-in",
        firstYear: false,
        validationError : [],
        errorMessage : null,
        errorCondition : false,
        g10Rollno : null,
        g10Year : null
    })
}

// student-registration/second-to-final page
// Get registration with data
exports.postSecondToFinalRegistration = (req, res, next) => {
    const g10Rollno = req.body.g10Rollno;
    const g10Year = req.body.g10Year;
    const major = req.body.major;

    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.status(422).render("register/checkin", {
            title: "Student Check-in",
            firstYear: false,
            validationError : error.array(),
            errorMessage : error.array()[0].msg,
            errorCondition : true,
            g10Rollno : g10Rollno,
            g10Year : g10Year
        })
    }

    studentData.findOne({g10Rollno : g10Rollno, g10Year : g10Year, major : major})
    .then(student => {
        const data = student.data[0];
        const studentNameMyan = data.studentNameMyan;
        const studentNameEng = data.studentNameEng;
        const studentNRC = data.studentNRC;
        const birthDate = data.birthDate;
        const bloodType = data.bloodType;
        const height = data.height;
        const obviousSign = data.obviousSign;
        const fatherNameMyan = data.fatherNameMyan;
        const fatherNameEng = data.fatherNameEng;
        const fatherNRC = data.fatherNRC;
        const fatherWork = data.fatherWork;
        const motherNameMyan = data.motherNameMyan;
        const motherNameEng = data.motherNameEng;
        const motherNRC = data.motherNRC;
        const motherWork = data.motherWork;
        const acadamicYear = null;
        const attendenceYear = null;
        const major = null;
        const rollno = null;
        const lastRollno = null;
        const g10Rollno = data.g10Rollno;
        const g10Year = data.g10Year;
        const alwaysLive = data.alwaysLive;
        const mawlamyineLive = data.mawlamyineLive;
        const phno = data.phno;
        res.render("register/studentRegistrationForm", {
            title: "Student Registration",
            firstYear: false,
            errorMessage : null,
            validationError : [],
            errorCondition : false,
            disabled : true,
            studentNameMyan : studentNameMyan,
            studentNameEng : studentNameEng,
            studentNRC : studentNRC,
            birthDate : birthDate,
            bloodType : bloodType,
            height : height,
            obviousSign : obviousSign,
            fatherNameMyan : fatherNameMyan,
            fatherNameEng : fatherNameEng,
            fatherNRC : fatherNRC,
            fatherWork : fatherWork,
            motherNameMyan : motherNameMyan,
            motherNameEng : motherNameEng,
            motherNRC : motherNRC,
            motherWork : motherWork,
            acadamicYear : acadamicYear,
            attendenceYear : attendenceYear,
            rollno : rollno,
            lastRollno : lastRollno,
            g10Rollno : g10Rollno,
            g10Year : g10Year,
            phno : phno
        })
    })
    .catch(err => {
        return res.status(422).render("register/checkin", {
            title: "Student Check-in",
            firstYear: false,
            validationError : [],
            errorMessage : 'Invalid input! Please check and try again',
            errorCondition : true,
            g10Rollno : g10Rollno,
            g10Year : g10Year
        })
    })
}

exports.getVerification = (req, res, next) => {
    res.render("register/verification", {
        title : "Student Verification",
        errorMessage : null,
        validationError : [],
        errorCondition : false
    })
}

exports.postVerification = (req, res, next) => {
    const year = req.body.attendenceYear;
    const major = req.body.major;
    const g10Rollno = req.body.g10Rollno;
    const g10Year = req.body.g10Year;

    studentData.findOne({major : major, g10Rollno : g10Rollno, g10Year : g10Year })
    .then(student => {
        if(student){
            const arrLength = student.year.length;
            const attendenceYear = student.year[arrLength-1]
            const rollno = student.data[arrLength-1].rollno;
            let majorLongForm;
            let yearLongForm;
            if(major === "civil"){
                majorLongForm = "Civil"
            } else if(major === "ec"){
                majorLongForm = "Electronic and Communication"
            } else if(major === "ep"){
                majorLongForm = "Electrical Power"
            } else if(major === "mech"){
                majorLongForm = "Mechnical"
            } else if(major === "it"){
                majorLongForm = "Information Technology"
            }

            if(year === "firstYear"){
                yearLongForm = "First Year";
            } else if(year === "secondYear") {
                yearLongForm = "Second Year";
            } else if(year === "thirdYear") {
                yearLongForm = "Third Year";
            } else if(year === "fourthYear") {
                yearLongForm = "Fourth Year";
            } else if(year === "fifthYear") {
                yearLongForm = "Fifth Year";
            } else if(year === "sixthYear") {
                yearLongForm = "Sixth Year";
            }

            if(attendenceYear === year){
               return res.render('register/voucher', {
                   title : "Student Verification",
                   errorMessage : null,
                   name : student.name,
                   major : majorLongForm,
                   year : yearLongForm,
                   rollno : rollno
               })
            } else {
                return res.status(422).render("register/verification", {
                    title : "Student Verification",
                    errorMessage : "This student isn't verification",
                    year : year,
                    major : major,
                    g10Rollno : g10Rollno,
                    g10Year : g10Year
                })
            }
        } else {
            return res.status(422).render("register/verification", {
                title : "Student Verification",
                errorMessage : "This student isn't verification",
                year : year,
                major : major,
                g10Rollno : g10Rollno,
                g10Year : g10Year
            })
        }
    })
    .catch(err => {
        console.log(err);
        throw new Error("Dummy Error");
    })
}


// Search Student
exports.getSearchStudent = (req, res, next) => {
    res.render("register/searchStudent", {
        title : "Search Students",
        errorMessage : null,
        validationError : [],
        errorCondition : false
    })
}

exports.postSearchStudent = (req, res, next) => {
    const acadamicYear = req.body.acadamicYear;
    const major = req.body.major;
    const attendenceYear = req.body.attendenceYear;

    let majorLongForm;
    let yearLongForm;
    if(major === "civil"){
        majorLongForm = "Civil"
    } else if(major === "ec"){
        majorLongForm = "Electronic and Communication"
    } else if(major === "ep"){
        majorLongForm = "Electrical Power"
    } else if(major === "mech"){
        majorLongForm = "Mechnical"
    } else if(major === "it"){
        majorLongForm = "Information Technology"
    }

    if(attendenceYear === "firstYear"){
        yearLongForm = "First Year";
    } else if(attendenceYear === "secondYear") {
        yearLongForm = "Second Year";
    } else if(attendenceYear === "thirdYear") {
        yearLongForm = "Third Year";
    } else if(attendenceYear === "fourthYear") {
        yearLongForm = "Fourth Year";
    } else if(attendenceYear === "fifthYear") {
        yearLongForm = "Fifth Year";
    } else if(attendenceYear === "sixthYear") {
        yearLongForm = "Sixth Year";
    }
    
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array())
        return res.render("register/searchStudent", {
            title : "Search Students",
            errorMessage : error.array()[0].msg,
            validationError : error.array(),
            errorCondition : true
        })
    }

    studentData.find({data : {
        $elemMatch : {
            acadamicYear : acadamicYear,
            major : major,
            attendenceYear : attendenceYear
        }
    }})
    .then(students => {
        let studentName = [];
        let studentRollno = [];

        students.forEach(student => {
            // for student name
            studentName.push(student.name);

            // Looping for get rollno
            student.rollno.forEach(rollno => {
                const year = Object.keys(rollno);
                const roll = Object.values(rollno);
                if(year == attendenceYear){
                    studentRollno.push(roll);
                }
            })
        })
        res.render("register/studentList", {
            title : "Students' List",
            studentName : studentName,
            studentRollno : studentRollno,
            major : majorLongForm,
            attendenceYear : yearLongForm,
            acadamicYear : acadamicYear
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getAbout = (req, res, next) => {
    res.render("register/about", {
        title : "About"
    })
}