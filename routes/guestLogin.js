const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validateFields");
const { guestLogin, renewToken } = require("../controllers/authController");

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

router.get("/renew", validateJWT, renewToken);

module.exports = router;