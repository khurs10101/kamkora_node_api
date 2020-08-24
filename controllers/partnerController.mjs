import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { secret } from '../configs/secret.mjs'
import Partner from '../models/partnerModel.mjs'
import Avatar from '../models/avatarModel.mjs'
import PersonalDoc from '../models/personalDocModel.mjs'
import { checkAndBundleNonEmptyFields, userSignupInputValidator } from '../utils/customValidator.mjs'


export const getPartnerAvatar = (req, res, next) => {
    const userId = req.params.id

    Avatar.findOne({
        userId
    }).sort({ updatedAt: "desc" }).then(doc => {
        res.status(201).json({
            message: "Avatar uploaded",
            result: doc
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })

}

export const uploadPartnerAvatar = (req, res, next) => {
    const userId = req.params.id
    const url = req.filename.destination + "/" + req.file.filename
    new Avatar({
        userId,
        url
    }).save().then(result => {
        res.status(201).json({
            message: "Avatar uploaded",
            result
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })


}

export const getPartnerDocumentIdProof = (req, res, next) => {

    const userId = req.params.id
    const { doc_type } = req.body

    PersonalDoc.find({
        userId: userId,
        doc_type: doc_type
    }).sort({ updatedAt: "desc" }).then(doc => {
        console.log(doc)
        res.status(200).json({
            message: "Current avatar",
            result: doc
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })

}


export const getPartnerDocumentAddressProof = (req, res, next) => {

    const userId = req.params.id
    const { doc_type } = req.body

    PersonalDoc.find({
        userId: userId,
        doc_type
    }).sort({ updatedAt: "desc" }).then(doc => {
        console.log(doc)
        res.status(200).json({
            message: "Current avatar",
            result: doc
        })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })

}

export const uploadPartnerDocumentIdProof = (req, res, next) => {

    const userId = req.params.id
    const { doc_type } = req.body
    const url = req.file.destination + "/" + req.file.filename
    let partnerDoc = new partnerDoc.save({
        userId,
        doc_type,
        url
    }).save().then(doc => {
        res.status(201).json({
            message: "Id proof uploaded",
            result: doc
        })
    }).catch(error => {
        console.error(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })
}

export const uploadPartnerDocumentAddressProof = (req, res, next) => {
    const userId = req.params.id
    const { doc_type } = req.body
    const url = req.file.destination + "/" + req.file.filename
    let partnerDoc = new partnerDoc.save({
        userId,
        doc_type,
        url
    }).save().then(doc => {
        res.status(201).json({
            message: "Address proof uploaded",
            result: doc
        })
    }).catch(error => {
        console.error(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })
}

export const partnerList = (req, res, next) => {
    Partner.find({}).sort({ updatedAt: 'desc' }).then(partners => {
        console.log(partners)
        res.status(200).json({
            message: "List of all professionals",
            partners
        })
    }).catch(errors => {
        console.log(errors)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel Server error"
            }
        })
    })
}

export const partnerSignUp = (req, res, next) => {

    let finalUser = checkAndBundleNonEmptyFields(req.body)

    console.log(finalUser['email'])
    Partner.findOne({
        email: finalUser['email']
    }).then(partner => {
        console.log(partner)
        if (!partner) {
            let password_digest = bcrypt.hashSync(finalUser['password'], bcrypt.genSaltSync(8))
            let newPartner = new Partner({
                ...finalUser,
                password_digest
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
                    partner: result
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


export const partnerSignIn = (req, res, next) => {

    const { email, password } = req.body

    Partner.findOne({
        email: email
    }).then(partner => {
        if (partner) {
            let isPasswordValid = bcrypt.compareSync(password, partner.password_digest)
            if (isPasswordValid) {
                let token = jwt.sign({
                    ...partner
                }, secret, {
                    expiresIn: 86400
                })

                res.status(200).json({
                    message: "partner signed in successfully",
                    token: token,
                    partner
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
                message: "Partner not found",
                errors: {
                    message: "Partner not found"
                }
            })
        }
    }).catch(errors => {
        console.log(errors)
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internal server error"
            }
        })
    })



}

export const partnerUpdate = (req, res, next) => {

}


// export { partnerList, partnerSignIn, partnerSignUp, partnerUpdate, uploadPartnerDocumentIdProof, uploadPartnerDocumentAddressProof }