const { response, request } = require('express');
const url = require('../models/url');
const Url = require("../models/url")


const shorturlGet = async (req = request, res = response) =>{

    const {codigo} = req.params;

    const urlRedirect = await Url.findOne({codigo})


    res.redirect(urlRedirect.url)

}
const shorturlPost = async (req = request, res = response) =>{

    const {url} = req.body;

    const codigo = await Url.count() + 1

    const isValidHttpUrl = (url)=> {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(url);
      }

    if (isValidHttpUrl){
        
        const uerrele = new Url({ url, codigo });
    
        await uerrele.save()
    
        res.json({
            original_url: url,
            short_url: codigo
        });

    }else{
        res.json({
            error: "invalid url"
        })
    }    



}


module.exports = {
    shorturlGet,
    shorturlPost
}