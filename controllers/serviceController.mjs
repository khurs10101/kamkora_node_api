import fs from 'fs'
import SubService from '../models/subServiceModel.mjs'
import Service from '../models/serviceModel.mjs'
import {checkAndBundleNonEmptyFields} from '../utils/customValidator.mjs'
import isEmpty from 'lodash/isEmpty.js'
import SubSubService from "../models/SubSubService.mjs";


export const searchServiceAndSubservice = async (req, res, next) => {
    let query = req.query.q;
    console.log(query)

    // let result = await SubService
    //     .find({
    //         $text: { $search: query }
    //     },
    //         {
    //             score: {
    //                 $meta: 'textScore'
    //             }
    //         }
    //     )

    let result = await SubService
        .find({
            name: {$regex: query, $options: "i"}
        }).catch(err => {
            res.status(500).json({
                message: "Server error",
                errors: {
                    message: "Server error",
                }
            })
        })

    result = result.map(r => r.toObject())

    res.status(200).json({
        result
    })

    console.log(result)

}

export const listSubserviceByService = (req, res, next) => {
    const serviceId = req.params.id
    SubService.find({
        serviceId
    }).then(subServices => {
        res.status(200).json({
            message: "All subservice based on service",
            serviceId,
            subServices
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internal server error",
            }
        })
    })
}

export const getSubSubServiceBySubServiceId = async (req, res, next) => {
    try {
        const subServiceId = req.params.id
        const result = await SubSubService.find({subServiceId})
        if (result) {
            res.status(200).json({
                message: `List of all Sub Sub Service by subServiceId: ${subServiceId}`,
                subsubservice: result
            })
        } else {
            res.status(404).json({
                message: `Sub Sub Service not found by subServiceId: ${subServiceId}`,
                errors: {
                    message: `Sub Sub Service not found by subServiceId: ${subServiceId}`
                }
            })
        }
    } catch (e) {
        res.status(500).json({
            message: `Error retrieving Sub Sub Service by subServiceId: ${subServiceId}`,
            errors: {
                message: `Error retrieving Sub Sub Service by subServiceId: ${subServiceId}`
            }
        })
    }
}

export const getAllSubSubService = async (req, res, next) => {
    try {
        const subsubservice = await SubSubService.find({})
        res.status(200).json({
            message: "List of all sub sub services",
            subsubservice
        })
    } catch (e) {
        res.status(500).json({
            message: "error retrieving sub sub service",
            errors: {
                message: "error retrieving sub sub service"
            }
        })
    }
}

export const addSubSubService = async (req, res, next) => {
    const {
        serviceId, subServiceId,
        subSubServiceId, title, description,
        rate
    } = req.body
    const url = req.file.destination + "/" + req.file.filename
    try {
        const subsubservice = await SubSubService.findOne({subSubServiceId})
        if (!subsubservice) {
            let sss = new SubSubService({
                serviceId, subServiceId, subSubServiceId,
                title, description, rate, url
            })
            sss = await sss.save()
            if (sss) {
                res.status(201).json({
                    message: "Sub Sub service created",
                    subsubservice: sss
                })
            }
        } else {
            fs.unlinkSync(url)
            res.status(201).json({
                message: "Sub Sub service already exists",
                errors: {
                    message: "Sub Sub service already exists"
                }
            })
        }
    } catch (e) {
        fs.unlinkSync(url)
        res.status(500).json({
            message: "Sub Sub Service saving failed",
            errors: {
                message: "Sub Sub Service saving failed"
            }
        })
    }


}

export const addSubService = (req, res, next) => {
    const {serviceId, subServiceId, name, rate} = checkAndBundleNonEmptyFields(req.body)
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
                    fs.unlinkSync(url)
                    res.status(409).json({
                        message: "SubService already exist",
                        errors: {
                            message: "SubService already exist",
                        }

                    })
                }
            }).catch(err => {
                fs.unlinkSync(url)
                console.log(err)
            })
        } else {
            fs.unlinkSync(url)
            res.status(404).json({
                message: "Service dont exist to add subservice",
                errors: {
                    message: "Service dont exist to add subservice",
                }
            })
        }

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


export const listAllServices = (req, res, next) => {

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

export const addAService = (req, res, next) => {

    const serviceId = req.params.id
    let finalService = checkAndBundleNonEmptyFields(req.body)
    const url = req.file.destination + "/" + req.file.filename

    Service.findOne({
        serviceId
    }).then(service => {
        if (!service) {
            let newService = new Service({
                ...finalService,
                url,
                serviceId
            })

            newService.save().then(result => {
                res.status(201).json({
                    message: "A new service created",
                    payload: result
                })
            }).catch(error => {
                fs.unlinkSync(url)
                req.status(500).json({
                    message: "Server error",
                    errors: {
                        message: "Server error"
                    }
                })
            })
        } else {
            fs.unlinkSync(url)
            req.status(404).json({
                message: "Service already exists",
                errors: {
                    message: "Service already exists"
                }
            })
        }
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


export const updateService = (req, res, next) => {


}

export const updateSubService = (req, res, next) => {

    let id = req.params.id
    let finalSubService = checkAndBundleNonEmptyFields(req.body)

    Service.findById(id).then(service => {

        if (service) {


            if (!isEmpty(finalSubService)) {
                let newSubCategory = [
                    ...service._doc.subcategory,
                    {...finalSubService}

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

// export { listAllServices, addAService, updateService, updateSubService }