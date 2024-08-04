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
    home_country: {
        type: String,
    },
    dob: {
        type: String,
        required: true
    },
    mobile_num: { // working country mobile num
        type: Number,
        required: true
    },
    home_mobileno: { // home country mobile
        type: Number,
    },
    designation: {
        type: String,
        required: true
    },
    date_of_join: {
        type: String,
        required: true
    },
    cur_basic_sal: {
        type: Number, // current basic salary
        required: true
    },
    cur_status: {
        type: String,
    },
    allowance: {
        type: String,
    },
    date_of_resign: {
        type: String,
    },
    bank_name: {
        type: String
    },
    account_no: {
        type: String,
    },
    eid_no: {
        type: Number,
    },
    eid_expiry: {
        type: String,
    },
    iban: {
        type: String,  // IBAN dont know what this is ?
    },
    labour_card_no: {
        type: Number
    },
    labour_card_expiry: {
        type: String,
    },
    visa_type: {
        type: String
    },
    visa_designation: {
        type: String,
    },
    visa_expiry: {
        type: String
    },
    passport_no: String,
    passport_expiry: String,
    total_salary: String,
    unemployment_insurance: String,
    unemployment_insurance_expiry: String,
    health_insurance: String,
    health_insurance_expiry: String,
    b_s_cur_year: String, // Basic salary current year
    workman_insurance: String,
    workman_insurance_expiry: String,
    c_y_leave_sal: Number, // Current year leave salary
    paid: Number,
    deduction: Number,
    balance_to_paid: Number,
    reason: String,
    total: Number
}, { timestamps: true })

module.exports = mongoose.model("Employees", Employees);