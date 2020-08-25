import express from 'express'
import Service from '../models/serviceModel.mjs'
import { checkAndBundleNonEmptyFields } from '../utils/customValidator.mjs'
import isEmpty from 'lodash/isEmpty.js'


const listAllServices = (req, res, next) => {

    Service.find({}).then(results => {
        res.status(200).json({
            message: "List of all services",
            services: results
        })
    }).catch(error => {
        res.status(500).json({
            message: "Server error",
            errors: {
                message: "Server error"
            }
        })
    })

}

const addAService = (req, res, next) => {

    let finalService = checkAndBundleNonEmptyFields(req.body)

    const url = req.file.destination + "/" + req.file.filename

    Service.findOne(
        { name: finalService['name'] }
    ).then(service => {
        if (!service) {
            let newService = new Service({
                ...finalService,
                url
            })

            newService.save().then(result => {
                res.status(201).json({
                    message: "A new service created",
                    payload: result
                })
            }).catch(error => {
                req.status(500).json({
                    message: "Server error",
                    errors: {
                        message: "Server error"
                    }
                })
            })
        } else {
            req.status(404).json({
                message: "Service already exists",
                errors: {
                    message: "Service already exists"
                }
            })
        }
    })

}


const updateService = (req, res, next) => {


}

const updateSubService = (req, res, next) => {

    let id = req.params.id
    let finalSubService = checkAndBundleNonEmptyFields(req.body)

    Service.findById(id).then(service => {

        if (service) {



            if (!isEmpty(finalSubService)) {
                let newSubCategory = [
                    ...service._doc.subcategory,
                    { ...finalSubService }

                ]

                console.log(newSubCategory)

                let newService = {
                    ...service._doc,
                    subcategory: newSubCategory
                }

                console.log(newService)

                Service.update({
                    ...newService
                }).then(result => {
                    res.status(200).json({
                        message: "Sub category updated"
                    })
                }).catch(error => {
                    res.status(500).json({
                        message: "Server error",
                        errors: {
                            message: "Server error",
                        }
                    })
                })

            } else {
                console.log("input empty")
                res.status(200).json({
                    message: "Input is empty"
                })
            }


            // console.log("FinalService: "+newService)

        } else {
            res.status(404).json({
                message: "Service not found",
                errors: {
                    message: "Service not found",
                }
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "Server error",
            errors: {
                message: "Server error"
            }
        })
    })



}

export { listAllServices, addAService, updateService, updateSubService }