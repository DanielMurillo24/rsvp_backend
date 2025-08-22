const { response } = require('express');
const Invitado = require('../models/guest');
const Acompanante = require('../models/companion');

const getInvitado = async (req, res = response) => {
    const { codigoAcceso } = req.params;

    try {
        const invitado = await Invitado.findOne({ codigoAcceso })
            .populate('acompanantes'); // Trae los acompañantes si existen

        if (!invitado) {
            return res.status(404).json({
                ok: false,
                msg: 'Invitado no encontrado'
            });
        }

        res.json({
            ok: true,
            invitado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
};

const createInvitado = async (req, res = response) => {
    
    const { nombre, apellido, codigoAcceso, tipoInvitado } = req.body;

    try {
        const invitado = new Invitado({
            nombre,
            apellido,
            codigoAcceso,
            tipoInvitado
        });

        await invitado.save();

        res.json({
            ok: true,
            invitado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear invitado'
        });
    }
};

const createAcompanante = async (req, res = response) => {

    const { nombre, apellido, invitado } = req.body;

    try {

        const invitadoPrincipal = await Invitado.findById(invitado);
        if (!invitadoPrincipal) {
            return res.status(404).json({
                ok: false,
                msg: 'Invitado principal no encontrado'
            });
        }

        const acompanante = new Acompanante({
            nombre,
            apellido,
            invitado
        });

        await acompanante.save();

        res.status(201).json({
            ok: true,
            acompanante
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear acompañante'
        });
    }
};

const updateInvitado = async (req, res = response) => {
    const { codigoAcceso } = req.params;
    const { confirmado, tipoMenu, condicionAlimenticia, acompanantes } = req.body;

    try {
        const invitado = await Invitado.findOne({ codigoAcceso });
        if (!invitado) return res.status(404).json({ ok: false, msg: 'Invitado no encontrado' });

        invitado.confirmado = confirmado;
        invitado.tipoMenu = tipoMenu;
        invitado.condicionAlimenticia = condicionAlimenticia;
        await invitado.save();

        const acompanantesActualizados = await Acompanante.find({ invitado: invitado._id });

        res.json({
            ok: true,
            msg: 'Invitado actualizado',
            invitado,
            acompanantes: acompanantesActualizados
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Error del servidor' });
    }
};

module.exports = {
    getInvitado,
    createInvitado,
    createAcompanante,
    updateInvitado
};