import fs from 'fs'
import { checkAndBundleNonEmptyFields } from '../utils/customValidator.mjs'
import AdsModel from '../models/adsModel.mjs'


export const getAdsForClientHomePage = (req, res, next) => {

}

export const getAdsForClientServicePage = (req, res, next) => {

}


export const getAdsForClientSubServicePage = (req, res, next) => {

}


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
        fs.unlinkSync(url)
        res.status(500).json({
            message: "Ads creation failed",
            errors: {
                message: "Ads creation failed"
            }
        })
    })
}

export const deleteAds = (req, res, next) => {
    const _id = req.params.id

    AdsModel.findOne({
        _id
    }).then(doc => {
        if (doc) {
            let fileLink = doc['url']
            AdsModel.deleteOne({
                _id
            }).then(result => {
                fs.unlinkSync(fileLink)
                res.status(200).json({
                    message: "service deleted successfully",
                    adsId: _id
                })
            }).catch(err => {
                res.status(500).json({
                    message: "Ads delete failed",
                    errors: {
                        message: "Ads delete failed",
                    }
                })
            })
        } else {
            res.status(404).json({
                message: "Ads not found",
                adsId: _id
            })
        }


    }).catch(err => {
        res.status(500).json({
            message: "Ads find for delete failed",
            errors: {
                message: "Ads find for delete failed",
            }
        })
    })
}