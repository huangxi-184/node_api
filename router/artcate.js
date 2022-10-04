const express = require('express')

const router = express.Router()

const artcate_handler = require('../router_handler/artcate')

router.get('/cates', artcate_handler.getArticleCates)

router.post('/addcates', artcate_handler.addArticleCates)

router.get('/deletecate/:id',artcate_handler.deleteCateById)

router.get('/cates/:id',artcate_handler.getArtCateById)

router.post('/updatecate',artcate_handler.updateCateById)

module.exports = router