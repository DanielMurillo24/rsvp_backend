const {response} = require('express');
const Invitado = require('../models/guest');
const { generateJWT } = require('../helpers/jwt')

const guestLogin = async (req, res = response) => {

    const { codigoAcceso} = req.body;

    try {
        const guest = await Invitado.findOne({ codigoAcceso })
            .populate('acompanantes');

        if ( !guest ) {
            return res.status(400).json({
                ok: false,
                msg: 'Código de Acceso Incorrecto'
            });
        }

        const token = await generateJWT(guest._id, guest.codigoAcceso);

        res.status(200).json({
            ok: true,
            token,
            uid: guest._id,
            name: `${guest.nombre} ${guest.apellido}`,
            codigoAcceso: guest.codigoAcceso,
            invitado: guest  
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta al Ingeniero'
        });   
    }
}

module.exports = {
    guestLogin,
}