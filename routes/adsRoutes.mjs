import express from 'express'
const router= express.Router()

router.get('/', adsList)
router.get('/service/:id', serviceBasedAdsList)
router.post('/upload', adsUpload)
router.get('/:id', adsSingle)
router.edit('/edit/:id', adEdit)


export default router

