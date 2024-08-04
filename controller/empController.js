const Employees = require('../models/employee')
const pagination = require('../pagination/pagination')
const isEmpty = require('../validation/empty')

const regex = /`([^`]+)` is required/g; // is required finder

const requiredMessage = (error) => {
    const errorMessages = []
    while ((match = regex.exec(error)) !== null) {
        errorMessages.push(`${match[1]} field is required!`)
    }
    return errorMessages[0]
}

module.exports = {
    AddEmploy: async (req, res) => {
        const data = req.body;
        try {
            const { emp_id, name, age, dob, } = data;
            await Employees.findOne({ emp_id: emp_id }).then(async (exist) => {
                if (exist) {
                    res.status(200).json({ success: false, message: 'Employee has already been added.' })
                } else {
                    const password = `${name.split(' ')[0]}@${new Date(dob).getFullYear()}`;
                    const result = await Employees.create({
                        ...data,
                        password,
                        role: 'employ'
                    })
                    res.status(200).json({ success: true, message: `Employee temp password is ${password}` })
                }
            })
        } catch (error) {
            if (requiredMessage(error.message)) {
                res.status(200).json({ success: false, message: requiredMessage(error.message) })
            } else {
                res.status(200).json({ success: false, message: error.message })
            }
        }
    }
}