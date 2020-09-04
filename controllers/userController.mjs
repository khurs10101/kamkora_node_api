import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fetch from 'node-fetch'
import fs from 'fs'
import User from '../models/userModel.mjs'
import Avatar from '../models/avatarModel.mjs'
import { secret } from '../configs/secret.mjs'
import { checkAndBundleNonEmptyFields, generate } from '../utils/customValidator.mjs'


export const sendAndVerifyUserOtp = (req, res, next) => {

    let { mobile, userId, type } = req.body
    const otp = generate(6)
    mobile = "+91" + mobile
    console.log("mobile number is " + mobile)
    let message = ""
    if (type === 1) {
        //registration
        message = `Otp for homeserv registration is ${otp}`
    }

    if (type === 2) {
        //login
        message = `Otp for homeserv login is ${otp}`
    }

    if (type === 3) {
        //change number
        message = `Otp for homeserv for number change is ${otp}`
    }

    if (type === 4) {
        //forget password
        message = `Otp for homeserv password recovery is ${otp}`
    }


    let body = {
        "listsms":
            [
                {
                    "sms": message,
                    "mobiles": mobile,
                    "senderid": "HOMESERV-OTP",
                    "clientSMSID": "1947692308",
                    "accountusagetypeid": "6"
                },
            ],
        "password": "f4c5eb7711XX", "user": "otdemo"
    }


    fetch('http://login.otechnix.in/REST/sendsms/ ', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }).then(response => {
        response.json().then(response => {
            console.log(response)
            res.status(200).json({
                message: "otp sent successfully",
                otp
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "otp sent failed",
                errors: {
                    message: "otp sent failed",
                }
            })
        })
    })
        .catch(err => {
            res.status(500).json({
                message: "otp sent failed",
                errors: {
                    message: "otp sent failed",
                }
            })
        })



}


export const userGetAvatar = (req, res, next) => {
    const userId = req.params.id
    Avatar.findOne({
        userId
    }).sort({
        updatedAt: "desc"
    }).then(avatar => {
        if (avatar) {
            res.status(200).json({
                message: "Avatar found",
                avatar
            })
        } else {
            res.status(404).json({
                message: "User not found",
                errors: {
                    message: "User not found",
                }
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internal server error",
            }
        })
    })

}

const userUploadAvatar = (req, res, next) => {
    const userId = req.params.id
    const url = req.file.destination + "/" + req.file.filename
    Avatar.findOne({
        userId
    }).then(user => {

        let avatar = new Avatar({
            userId,
            url
        })

        avatar.save().then(doc => {
            if (doc) {
                // if (user != null) {
                //     fs.unlinkSync(user['url'])
                //     console.log("unlinked: " + user['url'])
                // }

                res.status(201).json({
                    message: "Image uploaded successfully",
                    avatar: doc
                })
            }

        }).catch(err => {
            console.log(err)
            res.status(500).json({
                message: "avatar saved failed",
                errors: {
                    message: "avatar saved failed",
                }
            })
        })
    }).catch(err => {
        res.status(404).json({
            message: "User not found",
            errors: {
                message: "User not found",
            }
        })
    })

}

const userUpdate = (req, res, next) => {

    const id = req.params.id
    const { name, email, age, gender, phone, isPhoneVerified, latitude, longitude, city, state } = req.body
    let finalUser = checkAndBundleNonEmptyFields(req.body)
    console.log(finalUser)

    User.findById(id)
        .then(user => {
            if (user) {

                let updatedUser = {
                    ...user._doc,
                    ...finalUser
                }
                User.update(updatedUser)
                    .then(result => {
                        console.log(result)
                        let token = jwt.sign({
                            ...updatedUser
                        },
                            secret,
                            {
                                expiresIn: 86400
                            }

                        )

                        User.findById(user['_id'])
                            .then(user => {
                                res.status(201).json({
                                    message: "record updated successfully",
                                    token: token,
                                    user
                                })
                            }).catch(err => {
                                res.status(500).json({
                                    message: "Server error",
                                    errors: {
                                        message: "Server error"
                                    }
                                })
                            })


                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            message: "Server error",
                            errors: {
                                message: "Server error"
                            }
                        })
                    })
            } else {

                res.status(404).json({
                    message: "user not found",
                    errors: {
                        message: "User not found"
                    }
                })

            }
        })

}

const usersList = (req, res, next) => {

    User.find({}).sort({ updatedAt: "desc" })
        .then(users => {
            res.status(200).json({
                message: "Success",
                users
            })
        }).catch(err => {
            res.status(500).json({
                message: "Internal server error",
                errors: {
                    message: "Internal server error"
                }
            })
        })
}

const userSignup = (req, res, next) => {

    const { name, gender, email, password, phone, city, states } = req.body

    // const { isValid, errors } = userSignupInputValidator(req.body)
    let isValid = true

    if (isValid) {

        User.findOne({
            email: email
        })
            .then(user => {
                if (!user) {
                    let password_digest = bcrypt.hashSync(password, bcrypt.genSaltSync(8))
                    const user = new User({
                        name,
                        gender,
                        email,
                        password_digest,
                        phone,
                        city,
                        states,
                    })

                    user.save().then(result => {
                        console.log(result)
                        let token = jwt.sign({
                            ...result
                        },
                            secret,
                            {
                                expiresIn: 86400
                            })
                        res.status(201).json({
                            message: "Sign up successfully. Please login",
                            token: token,
                            user: result
                        })
                    }).catch(err => {
                        console.log(err)
                        res.status(500).json({
                            message: "Internal error",
                            errors: {
                                message: "Internal error"
                            }
                        })
                    })

                } else {
                    res.status(409).json({
                        message: "User already exists, Please sign in",
                        errors: {
                            message: "User already exists",
                        }
                    })
                }
            })

    } else {
        res.status(400).json({
            message: "Server side validation failed",
            errors: {
                message: "Server side validation failed",
                ...errors
            }
        })
    }
}

const userSignin = (req, res, next) => {

    const { email, password } = req.body

    User.findOne({
        email: email
    }).then(user => {
        if (user) {

            let isPasswordValid = bcrypt.compareSync(password, user.password_digest)

            if (isPasswordValid) {
                let token = jwt.sign({
                    ...user
                }, secret, {
                    expiresIn: 86400
                })

                res.status(200).json({
                    message: "user signed in successfully",
                    token: token,
                    user: user
                })
            } else {
                res.status(403).json({
                    message: "Invalid password",
                    errors: {
                        message: "Invalid password"
                    }
                })
            }



        } else {
            res.status(404).json({
                message: "User not found",
                errors: {
                    message: "User not found"
                }
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internal server error"
            }
        })
    })

}

export { userSignin, userSignup, usersList, userUpdate, userUploadAvatar }