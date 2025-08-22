
const { Router } = require('express');
const { check } = require("express-validator");
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require("../middlewares/validateFields");
const { getInvitado, createInvitado, updateInvitado, createAcompanante } = require('../controllers/guestController');

const router = Router();

//router.use(validateJWT);

router.get('/:codigoAcceso', getInvitado);

router.post(
    '/',
    [
        check('nombre').notEmpty().withMessage('Nombre es requerido'),
        check('apellido').notEmpty().withMessage('Apellido es requerido'),
        check('codigoAcceso').notEmpty().withMessage('Código de acceso es requerido'),
        check('tipoInvitado').notEmpty().withMessage('Tipo de invitado es requerido')
            .isIn(['Individual', 'conAcompanante', 'familia']).withMessage('Tipo de invitado inválido'),
        validateFields
    ],
    createInvitado
);

router.post(
    '/companion',
    [
        check('nombre').notEmpty().withMessage('Nombre es requerido'),
        check('apellido').notEmpty().withMessage('Apellido es requerido'),
        check('invitado').notEmpty().withMessage('ID del invitado principal es requerido'),
        validateFields
    ],
    createAcompanante
);

router.put(
    '/:codigoAcceso',
    validateJWT,
    [
        check('confirmado').optional().isBoolean().withMessage('Confirmado debe ser booleano'),
        check('tipoMenu').optional().isIn(['Adulto', 'Ninos']).withMessage('Tipo de menú inválido'),
        check('condicionAlimenticia').optional()
            .isIn(['Ninguna', 'Vegetariano', 'Vegano', 'Sin gluten', 'Alergia frutos secos'])
            .withMessage('Condición alimenticia inválida'),
        validateFields
    ],
    updateInvitado
);

module.exports = router;