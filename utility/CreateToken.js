const jwt = require('jsonwebtoken');

const CreateToken=async(data)=>{
    let Payload = {exp: Math.floor(Date.now()/7000) + (24*60*60),data:data};
    return await jwt.sign(Payload, process.env.SECRET_KEY) ;
}

module.exports =  CreateToken ;