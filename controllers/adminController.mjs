import Admin from '../models/adminModel.mjs'

const adminSignUp = (req, res, next) => {
    const { email, password } = req.body
    console.log(email + " " + password)
    Admin.findOne({
        email: email
    }).then(admin => {
        console.log(admin)
        if (!admin) {
            let admin = new Admin({
                email,
                password
            })

            admin.save().then(admin => {
                console.log(admin)
                res.status(200).json({
                    message: "Admin signed up successfully",
                    admin
                })

            }).catch(error => {
                console.log(error)
                res.status(500).json({
                    message: "Internal Server error",
                    errors: {
                        message: "Internal Server error"
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

const adminSignIn = (req, res, next) => {

    const { email, password } = req.body
    Admin.findOne({
        email
    }).then(admin => {
        if (admin) {
            if (admin['password'] === password)
                res.status(200).json({
                    message: "Admin signed in successfully",
                    admin
                })
        } else
            res.status(404).json({
                message: "Admin dont exist",
                errors: {
                    message: "Admin dont exist",
                }
            })
    }).catch(error => {
        console.log(error)
        res.status(500).json({
            message: "Internal Server error",
            errors: {
                message: "Internal Server error"
            }
        })
    })
}

export { adminSignIn, adminSignUp }