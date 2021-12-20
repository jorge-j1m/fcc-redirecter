const { Router } = require('express');

const {
    shorturlGet, 
    shorturlPost
} = require("../controllers/shorturl.controller")

const router = Router()


router.get('/:codigo', shorturlGet);


router.post('/',[
    
] ,shorturlPost);


module.exports = router;