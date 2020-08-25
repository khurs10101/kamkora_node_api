import { checkAndBundleNonEmptyFields } from '../utils/customValidator.mjs'
import AdsModel from '../models/adsModel.mjs'


export const getAllAds = (req, res, next) => {

    AdsModel.find({

    }).then(ads => {
        res.status(200).json({
            message: "List of ads",
            ads
        })
    }).catch(error => {
        res.status(500).json({
            message: "List of ads retrieve failed",
            errors: {
                message: "List of ads retrieve failed"
            }
        })
    })

}

export const addAds = (req, res, next) => {
    const finalData = checkAndBundleNonEmptyFields(req.body)
    const url = req.file.destination + "/" + req.file.filename

    new AdsModel({
        ...finalData,
        url
    }).save().then(doc => {
        res.status(201).json({
            message: "Ads created Successfully",
            payload: doc
        })
    }).catch(error => {
        res.status(500).json({
            message: "Ads creation failed",
            errors: {
                message: "Ads creation failed"
            }
        })
    })
}