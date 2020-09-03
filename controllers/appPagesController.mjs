import Service from '../models/serviceModel.mjs'
import SubService from '../models/subServiceModel.mjs'
import AdsModel from '../models/adsModel.mjs'

export const getClientHomeDetails = async (req, res, next) => {

    try {
        const services = await Service.find({})
        const ads = await AdsModel.find({
            ad_location: 'home'
        })
        res.status(200).json({
            message: "home page items loaded successfully",
            services,
            ads
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            message: "home page item loading failed",
            errors: {
                message: "home page item loading failed"
            }
        })

    }

}

export const getClientServiceDetails = async (req, res, next) => {

    const serviceId = req.params.id
    try {
        const subServices = await SubService.find({
            serviceId
        })
        const ads = await AdsModel.find({ 
            serviceId,
            ad_location: "service"
         })

        res.status(200).json({
            message: "subservice items loaded",
            subServices,
            ads
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "sub service item loading failed",
            errors: {
                message: "subservice item loading failed"
            }
        })
    }

}

export const getClientSubServiceDetails = (req, res, next) => {

}

export const getClientOrderPageDetails = (req, res, next) => {

}