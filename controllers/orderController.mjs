import express from 'express'
import Order from '../models/orderModel.mjs'
import Cart from '../models/cartModel.mjs'
import { checkAndBundleNonEmptyFields, generate } from '../utils/customValidator.mjs'


export const assignOrderAuto = (req, res, next) => {

}

export const completedCurrentOrder = (req, res, next) => {
    console.log(req.body)
    const { orderId, partnerId } = req.body
    const id = orderId
    console.log(id)
    Order.findOne({
        _id: id
    }).then(order => {
        if (order) {
            if (order['status'] === 'pending') {
                Order.updateOne({
                    _id: id
                }, {
                    $set: {
                        status: 'completed',
                        partnerId: partnerId
                    }
                }).then(order => {
                    res.status(200).json({
                        message: "Order Completed",
                        status: "completed"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Internel server error",
                        errors: {
                            message: "Internel Server error"
                        }
                    })
                })
            }

            if (order['status'] === 'cancelled') {
                res.status(200).json({
                    message: "Order Was cancelled",
                    status: "cancelled"
                })
            }

            if (order['status'] === 'accepted') {

                Order.updateOne({
                    _id: id
                }, {
                    $set: { status: 'completed' }
                }).then(order => {
                    res.status(200).json({
                        message: "Order Completed",
                        status: "completed"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Internel server error",
                        errors: {
                            message: "Internel Server error"
                        }
                    })
                })
                // res.status(200).json({
                //     message: "Order was accepted",
                //     status: "accepted"
                // })
            }

            if (order['status'] == 'completed') {
                res.status(200).json({
                    message: "Order was completed",
                    status: "completed"
                })
            }
        } else {
            res.status(404).json({
                message: "Order not found",
                errors: {
                    message: "Order not found",
                }
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel Server error"
            }
        })
    })
}

export const acceptCurrentOrder = (req, res, next) => {
    console.log(req.body)
    const { orderId, partnerId } = req.body
    const id = orderId
    console.log(id)
    Order.findOne({
        _id: id
    }).then(order => {
        if (order) {
            if (order['status'] === 'pending') {
                Order.updateOne({
                    _id: id
                }, {
                    $set: {
                        status: 'accepted',
                        partnerId: partnerId
                    }
                }).then(order => {
                    res.status(200).json({
                        message: "Order Accepted",
                        status: "accepted"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Internel server error",
                        errors: {
                            message: "Internel Server error"
                        }
                    })
                })
            }

            if (order['status'] === 'cancelled') {
                res.status(200).json({
                    message: "Order Was cancelled",
                    status: "cancelled"
                })
            }

            if (order['status'] === 'accepted') {
                res.status(200).json({
                    message: "Order was accepted",
                    status: "accepted"
                })
            }

            if (order['status'] == 'completed') {
                res.status(200).json({
                    message: "Order was completed",
                    status: "completed"
                })
            }
        } else {
            res.status(404).json({
                message: "Order not found",
                errors: {
                    message: "Order not found",
                }
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel Server error"
            }
        })
    })
}

export const rejectCurrentOrder = (req, res, next) => {
    console.log(req.body)
    const { orderId, partnerId } = req.body
    const id = orderId
    console.log(id)
    Order.findOne({
        _id: id
    }).then(order => {
        if (order) {
            if (order['status'] === 'pending') {
                Order.updateOne({
                    _id: id
                }, {
                    $set: {
                        status: 'cancelled',
                        partnerId: partnerId
                    }
                }).then(order => {
                    res.status(200).json({
                        message: "Order cancelled",
                        status: "cancelled"
                    })
                }).catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Internel server error",
                        errors: {
                            message: "Internel Server error"
                        }
                    })
                })
            }

            if (order['status'] === 'cancelled') {
                res.status(200).json({
                    message: "Order Was cancelled",
                    status: "cancelled"
                })
            }

            if (order['status'] === 'accepted') {
                res.status(200).json({
                    message: "Order was accepted",
                    status: "accepted"
                })
            }
        } else {
            res.status(404).json({
                message: "Order not found",
                errors: {
                    message: "Order not found",
                }
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel Server error"
            }
        })
    })
}


export const getOrdersOfPartners = (req, res, next) => {
    const { userId, serviceId } = req.body

    Order.find({
    }).sort({ updatedAt: "desc" }).then(doc => {
        res.status(200).json({
            message: "List of orders",
            orders: doc
        })
    }).catch(error => {
        console.error(error)
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel Server error"
            }
        })
    })
}

const getCartOfUsers = (req, res, next) => {
    const userId = req.params.id
    Cart.find({
        userId: userId
    }).sort({ updatedAt: "desc" }).then(carts => {
        res.status(200).json({
            message: "List of orders by cart",
            carts
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internel server error",
            errors: {
                message: "Internel server error"
            }
        })
    })
}

const addToCart = (req, res, next) => {

    const { orders } = req.body
    const userId = req.params.id
    const docketId = generate(6)
    console.log(orders)
    let orderList = []
    let cart = new Cart({
        userId: userId,
        docketId: docketId
    })
    for (let order in orders) {
        // orderList.push(new Order({
        //     ...order
        // }))
        console.log(order)
        let orderObject = new Order({
            docketId: docketId,
            userId: userId,
            ...orders[order]
        });

        cart.orders.push(orderObject)

        orderObject.save().then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })

    }


    // const cart= new Cart({
    //     userId: userId,
    //     orders: orderList
    // })

    cart.save().then(result => {
        console.log(result)
        res.status(200).json({
            message: "orders added successfully",
            results: result
        })
    }).catch(error => {
        console.log(error)
    })
}

const getAllOrders = (req, res, next) => {

    Order.find({}).sort({ updatedAt: 'desc' }).then(orders => {
        res.status(200).json({
            message: "List of all orders",
            cart: orders
        })
    }).catch(error => {
        res.status(500).json({
            message: "Internel Server Error",
            errors: {
                message: "Internel Server Error",
            }
        })
    })

}

const getAllOrdersOfSingleUser = (req, res, next) => {

    const userId = req.params.id

    Order.find({
        userId: userId
    }).sort({ updatedAt: "desc" }).then(orders => {
        res.status(200).json({
            message: "Current user order history",
            orders
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internel Server error",
            errors: {
                message: "Internel Server error",
            }
        })
    })

}

const addOrder = (req, res, next) => {
    const userId = req.params.id
    const finalOrder = checkAndBundleNonEmptyFields(req.body)

    const order = new Order({
        ...finalOrder,
        userId
    }).save().then(order => {

        res.status(201).json({
            message: "Oder placed successfull",
            order: order
        })

    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            errors: {
                message: "Internel server error"
            }
        })
    })


}

const updateOrder = (req, res, next) => {

}


export { addOrder, updateOrder, getAllOrders, getAllOrdersOfSingleUser, addToCart, getCartOfUsers }