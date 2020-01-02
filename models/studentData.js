const mongoose = require("mongoose");

const studentDataSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    g10Rollno : {
        type : String,
        required : true
    },
    g10Year : {
        type : String,
        required : true
    },
    major : {
        type : String,
        required : true
    },
    year : {
        type : Array,
        required : true
    },
    rollno : {
        type : Array,
        required : true
    },
    data : [{
        imageUrl : {
            type : String,
            required : true
        },
        studentNameMyan : {
            type : String,
            required : true
        },
        studentNameEng : {
            type : String,
            required : true
        },
        studentNRC : {
            type : String,
            required : true
        },
        birthDate : {
            type : String,
            required : true
        },
        bloodType : {
            type : String,
            required : true
        },
        height : {
            type : String,
            required : true
        },
        obviousSign : {
            type : String,
            required : true
        },
        fatherNameMyan : {
            type : String,
            required : true
        },
        fatherNameEng : {
            type : String,
            required : true
        },
        fatherNRC : {
            type : String,
            required : true
        },
        fatherWork : {
            type : String,
            required : true
        },
        motherNameMyan : {
            type : String,
            required : true
        },
        motherNameEng : {
            type : String,
            required : true
        },
        motherNRC : {
            type : String,
            required : true
        },
        motherWork : {
            type : String,
            required : true
        },
        acadamicYear : {
            type : String,
            required : true
        },
        attendenceYear : {
            type : String,
            required : true
        },
        major : {
            type : String,
            required : true
        },
        rollno : {
            type : String,
            required : true
        },
        lastRollno : {
            type : String
        },
        g10Rollno : {
            type : String
        },
        g10Year : {
            type : String,
            required : true
        },
        alwaysLive : {
            type : String,
            required : true
        },
        mawlamyineLive : {
            type : String,
            required : true
        },
        phno : {
            type : String,
            required : true
        }
    }]
})

const studentData = mongoose.model("studentData", studentDataSchema);

module.exports = studentData;