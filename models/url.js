const mongoose = require('mongoose')


const UrlSchema = new mongoose.Schema({
    url: {
        type: "String",
        required: true,
        unique: true
    },
    codigo: {
        type: "Number",
        required: true,
        unique: true
    }

})



module.exports = mongoose.model('Url', UrlSchema );