const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pagination = require("../pagination/pagination");

const SignInValidation = require("../validation/signin");
const SignUpValidation = require("../validation/signup");

module.exports = {
    add_admin: async (req, res) => {
        const {username, password, email} = req.body;
        const {errors, isValid} = SignUpValidation(req.body);
        const users = await Admin.find();
        let userID = 1;
        let isUnique = false;
        while (!isUnique) {
            isUnique = true;
            users.forEach((user) => {
                if (user?.id === userID) {
                    userID += 1;
                    isUnique = false;
                }
            });
        }

        try {
            if (!isValid) {
                const firstError = Object.values(errors);
                res.status(200).json({success: false, message: firstError[0]});
            } else {
                await Admin.findOne({username}).then(async (exist) => {
                    if (exist) {
                        errors.username = "Username already in Use";
                        res.status(400).json({success: false, message: errors.username});
                    } else {
                        const hashedpassword = bcrypt.hashSync(password, 8);
                        const result = await Admin.create({
                            id: userID,
                            username,
                            email: email || "",
                            role: "super-admin",
                            password: hashedpassword,
                        });
                        res
                            .status(200)
                            .json({success: true, message: "admin sucessfully added"});
                    }
                });
            }
        } catch (error) {
            res.status(400).json({status: false, message: error.message});
        }
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const {errors, isValid} = SignInValidation(req.body);
        try {
            if (!isValid) {
                const firstError = Object.values(errors);
                res.status(200).json({success: false, message: firstError[0]});
            } else {
                await Admin.findOne({username}).then(async (exist) => {
                    if (!exist) {
                        return res
                            .status(200)
                            .json({success: false, message: "user not found"});
                    } else {
                        const match = await bcrypt.compare(password, exist.password);
                        if (!match) {
                            return res
                                .status(200)
                                .json({success: false, message: "Wrong Password"});
                        }
                        const payload = {id: exist.id, username: exist.username};
                        jwt.sign(
                            payload,
                            process.env.SECRET_KEY,
                            {expiresIn: "8h"},
                            (err, token) => {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    data: {
                                        id: exist.id,
                                        token: token,
                                        user: exist.username,
                                    },
                                    message: "Login successful!",
                                });
                            }
                        );
                    }
                });
            }
        } catch (error) {
            res.status(400).json({success: false, message: error.message});
        }
    },
    checkLogin: async (req, res) => {
        try {
            const {token} = req.body;
            if (!token) {
                return res.status(200).json({
                    success: false,
                    message: "Token is required",
                });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            if (!decoded) {
                return res.status(200).json({
                    success: false,
                    message: "Token is invalid",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User still logged in",
                data: decoded,
            });
        } catch (error) {
            return res
                .status(500)
                .json({success: false, message: "Session Expired"});
        }
    },
    get_users: async (req, res) => {
        const {page, paginate} = req.query;
        try {
            const users = await Admin.find();
            const pageInfo = Pagination(users?.length, page, paginate);
            return res.status(200).json({
                success: true,
                data: users.slice(pageInfo.from - 1, pageInfo?.to)?.map((user) => {
                    return {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                    };
                }),
                pagination: pageInfo
            });
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }
    },
};
