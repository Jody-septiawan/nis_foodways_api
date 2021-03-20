const { user } = require("../../models/");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi = require('joi');

const secretKey = "243hj2hk35ghfg";

exports.register = async (req, res) => {
    try {
        const { email, password, fullname, gender, phone, role } = req.body;
        const data = req.body;

        const schema = joi.object({
            email: joi.string().email().min(6).max(50).required(),
            password: joi.string().min(4).required(),
            fullname: joi.string().required(),
            gender: joi.string().required(),
            phone: joi.string().min(10).max(13).required(),
            role: joi.string().required()
        })

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                status: "Validation Failed",
                message: error.details[0].message,
            })
        }

        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        if (checkEmail) {
            return res.status(400).send({
                status: "Register Failed",
                message: "Email Already Registered"
            })
        }
        const hashStrength = 10;
        const hashedPassword = await bcrypt.hash(password, hashStrength)

        const userInput = await user.create({
            ...data,
            password: hashedPassword
        });

        const secretKey = "243hj2hk35ghfg";

        const token = jwt.sign({
            id: userInput.id
        }, secretKey);

        const idUser = userInput.id;

        res.send({
            message: "success",
            data: {
                user: {
                    name: data.fullname,
                    email: data.email,
                    token,
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
        });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = req.body;

        const schema = joi.object({
            email: joi.string().email().min(6).max(50).required(),
            password: joi.string().min(4).required(),
        })

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                status: "Validation Failed",
                message: error.details[0].message,
            })
        }

        const checkEmail = await user.findOne({
            where: {
                email
            }
        })

        if (!checkEmail) {
            return res.status(400).send({
                status: "Login Failed",
                message: "Email and password don't match"
            })
        }

        const isValidPass = await bcrypt.compare(password, checkEmail.password);

        if (!isValidPass) {
            return res.status(400).send({
                status: "Login Failed",
                message: "Email and password don't match"
            })
        }

        const token = jwt.sign({
            id: checkEmail.id
        }, secretKey);

        const idUser = checkEmail.id;

        res.send({
            message: "Login Success",
            data: {
                user: {
                    id: checkEmail.id,
                    name: checkEmail.fullname,
                    email: checkEmail.email,
                    token,
                }
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: "Server Error",
            token
        });
    }
}