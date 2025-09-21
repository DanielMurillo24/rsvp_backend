const jwt = require('jsonwebtoken');

const generateJWT = ( uid, codigoAcceso ) => {

    return new Promise( (resolve, reject ) => {

        const payload = { uid, codigoAcceso };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '1h'
        }, ( error, token ) => {

            if ( error ){
                console.log(error);
                reject('Could not generate token');
            }

            resolve( token );
        })
    }) 
}

module.exports = {
    generateJWT
}