import Address from '../models/addressModel.mjs'
import {checkAndBundleNonEmptyFields} from '../utils/customValidator.mjs'


export const addAddressOfUser = (req, res, next) => {
    const userId = req.params.id
    const finalAddress = checkAndBundleNonEmptyFields(req.body)

    let address = new Address({
        userId,
        ...finalAddress
    }).save().then(address => {
        // console.log(address)
        res.status(201).json({
            message: "Address added successfully",
            address
        })
    }).catch(error => {
        // console.error(error)
        res.status(500).json({
            message: "Error adding address",
            errors: {
                message: "Error adding address"
            }
        })
    })

}

export const getAddressOfUser = (req, res, next) => {
    const userId = req.params.id

    Address.find({
        userId: userId
    }).then(addresses => {
        console.log(addresses)
        res.status(200).json({
            message: "List of all addresses",
            addresses
        })
    }).catch(error => {
        console.error(error)
        res.status(500).json({
            message: "Get address failed",
            errors: {
                message: "Get address failed"
            }
        })
    })

}

export const editAddressOfUser = (req, res, next) => {
    const userId = req.params.id

}

export const deleteAddressOfUser = (req, res, next) => {
    const userId = req.params.id

}