const jwt = require('jsonwebtoken');

const CreateToken=async(data)=>{
    let Payload = { expiresIn: '30d',data:data};
    return await jwt.sign(Payload, process.env.SECRET_KEY) ;
}

module.exports =  CreateToken ;