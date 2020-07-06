const jwt = require('jsonwebtoken');

const constants = require('../../config/constants');

const generateJWTToken = (result) => {
    return new Promise((resolve, reject) => {
        try{
            var token = jwt.sign(
                {
                    id: {
                        id :  result[0].id,
                        email : result[0].email,
                        firstName : result[0].firstName,
                        lastName : result[0].lastName
                    }
                },
                constants.JWT.SECRET_KEY, 
                {
                expiresIn: constants.JWT.EXPIRES_IN
            });
            resolve(token);
        }catch(error){
            reject();
        }
    })
}

const verifyToken = (token) => {
    return new Promise((resolve) =>{
        try{
            if (!token) 
                resolve({ auth: false, message: 'No token provided.' });

            jwt.verify(
                token, 
                constants.JWT.SECRET_KEY, 
                (err, decoded) => {
                    if (err) 
                        resolve({ auth: false, message: 'Failed to authenticate token.' });
                    resolve({ auth : true, decoded : decoded });
                }
            );
        }catch(error){
            resolve({ auth: false, message: 'Something went wrong!.' });
        }
    })
}

module.exports = {
    generateJWTToken,
    verifyToken
}