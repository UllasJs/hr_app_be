const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Designation = new Schema({
    des_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
})