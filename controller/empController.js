const Employees = require('../models/employee')
const Pagination = require('../pagination/pagination')
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
    },
    getEmployList: async (req, res) => {
        const { page, paginate } = req.query;
        try {
            const EmpList = await Employees.find()
            const pageInfo = Pagination(EmpList?.length, page, paginate);
            res.status(200).json({
                success: true, data: EmpList.slice(pageInfo.from - 1, pageInfo?.to)?.map((emp) => {
                    return emp
                }), pagination: pageInfo
            })
        } catch (error) {
            res.status(200).json({ success: true, message: error.message })
        }
    },
    getEmployDetails: async (req, res) => {
        const { emp_id } = req.params
        try {
            const employ = await Employees.findOne({ emp_id })
            if (employ)
                res.status(200).json({ success: true, message: 'Employee details', data: employ })
            else 
                res.status(200).json({ success: false, message: 'Employee not found!' })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}