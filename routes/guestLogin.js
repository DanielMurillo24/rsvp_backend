const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { guestLogin } = require("../controllers/authController");

const router = Router();

// Login solo con código de acceso
router.post(
    "/",
    [
        check("codigoAcceso", "El código de acceso es obligatorio").not().isEmpty(),
        validateFields
    ],
    guestLogin
);

module.exports = router;