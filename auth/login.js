const constants = require('../config/constants');

const { generateJWTToken, verifyToken } = require('./routes/jwt')

const UserModel = require('../db/controller/connect').db.users;

const login = (req, res) => {
    try{
        const eventData = { ...req.body };
        UserModel.upsert(eventData)
        .then(async (result) => {
            try{
                console.log(result);
               const token = await generateJWTToken(result);
               console.log(token);
               return res.status(constants.HTTP_STATUS.OK).send({
                    user: {
                        auth : true,
                        token : token,
                        id: result[0].id,
                        email: result[0].email,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName
                    }
                });
            }catch(err){
                console.log('err ==> ', err);
                return res.status(constants.HTTP_STATUS.ERROR).send({
                    auth : false,
                    message : constants.MESSAGE.TOKEN_FAILED_TO_CREATE
                 });
            }
            
        }).catch(() =>{
            return res.status(constants.HTTP_STATUS.BAD_REQUEST).send({
               auth : false,
               message : constants.MESSAGE.USER_BAD_REQUEST
            });
        })
    }catch(error){
       return res.status(constants.HTTP_STATUS.ERROR).send({
            auth : false,
            message : constants.MESSAGE.INTERNAL_SERVER_ERROR
        });

    }
}

const verifyAccessToken  = async (req, res) => {
    try{
        const token = req.headers['x-access-token'];
        const TokenVerified = await verifyToken(token);
        console.log('TokenVerified ==> ', TokenVerified);
        TokenVerified.auth
        ? res.status(constants.HTTP_STATUS.OK).send(TokenVerified)
        : res.status(constants.HTTP_STATUS.UN_AUTHORIZED).send(TokenVerified)
    }catch(err){
        console.log('err ==> ', err)
        res.status(constants.HTTP_STATUS.ERROR).send(constants.MESSAGE.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    login,
    verifyAccessToken
} 