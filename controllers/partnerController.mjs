import express from 'express'
import Partner from '../models/partnerModel.mjs'
import { checkAndBundleNonEmptyFields, userSignupInputValidator } from '../utils/customValidator.mjs'



const partnerList = (req, res, next) => {

}

const partnerSignUp = (req, res, next) => {

    let finalUser = checkAndBundleNonEmptyFields(req.body)

    Partner.findOne({
        phone: finalUser['phone']
    }).then(partner => {
        if (!partner) {

            let newPartner = new Partner({
                ...finalUser
            })

            newPartner.save().then(result => {
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
                })

            }).catch(error => {
                console.log(error)
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


}


const partnerSignIn = (req, res, next) => {

}

const partnerUpdate = (req, res, next) => {

}


export { partnerList, partnerSignIn, partnerSignUp, partnerUpdate }