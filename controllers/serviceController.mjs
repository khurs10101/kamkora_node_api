import fs from 'fs'
import SubService from '../models/subServiceModel.mjs'
import Service from '../models/serviceModel.mjs'
import { checkAndBundleNonEmptyFields } from '../utils/customValidator.mjs'
import isEmpty from 'lodash/isEmpty.js'

export const addSubService = (req, res, next) => {
    const { serviceId, subServiceId, name, rate } = checkAndBundleNonEmptyFields(req.body)
    const url = req.file.destination + "/" + req.file.filename
    Service.findOne({
        serviceId
    }).then(service => {
        if (service) {
            SubService.findOne({
                subServiceId
            }).then(subService => {
                if (!subService) {
                    let temp = new SubService({
                        serviceId,
                        subServiceId,
                        name,
                        rate,
                        url
                    })

                    temp.save().then(subService => {
                        res.status(201).json({
                            message: "SubService added successfully",
                            subService
                        })
                    })
                } else {
                    res.status(409).json({
                        message: "SubService already exist",
                        errors: {
                            message: "SubService already exist",
                        }

                    })
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            res.status(404).json({
                message: "Service dont exist to add subservice",
                errors: {
                    message: "Service dont exist to add subservice",
                }
            })
        }
        fs.unlinkSync(url)
    }).catch(err => {
        fs.unlinkSync(url)
        console.log(err)
    })
}

export const deleteService = (req, res, next) => {
    const serviceId = req.params.id
    let fileLink;
    Service.findOne({
        serviceId
    }).then(doc => {
        if (doc) {
            fileLink = doc['url']
            console.log(fileLink)
            Service.deleteOne({
                serviceId
            }).then(doc => {
                console.log(doc)
                fs.unlinkSync(fileLink)
                res.status(200).json({
                    message: "Service delete successfull",
                    serviceId
                })
            }).catch(err => {
                console.error(err)
                res.status(500).json({
                    message: "Internal Server error",
                    errors: {
                        message: "Internal Server error",
                    }
                })
            })
        } else {
            res.status(404).json({
                message: "No document found for given serviceId",
                serviceId
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internal Server error",
            errors: {
                message: "Internal Server error",
            }
        })
    })

}


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

    const serviceId = req.params.id
    let finalService = checkAndBundleNonEmptyFields(req.body)
    const url = req.file.destination + "/" + req.file.filename

    Service.findOne({
        serviceId
    }).then(service => {
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
        fs.unlinkSync(url)
    }).catch(err => {
        fs.unlinkSync(url)
        console.log(err)
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internal server error",
            }
        })
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