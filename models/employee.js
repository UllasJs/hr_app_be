const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Employees = new Schema({
    emp_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    password: String,
    role: String,
    age: {
        type: Number,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    mobile_num: { // working country mobile num
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Employees", Employees);