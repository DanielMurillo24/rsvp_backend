const {Schema, model} = require('mongoose');

const AcompananteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    tipoMenu: {
        type: String,
        enum: ["Adulto", "Ninos"],
        default: "Adulto"
    },
    condicionAlimenticia: {
        type: String,
        enum: ["Ninguna", "Vegetariano", "Vegano", "Sin gluten", "Alergia frutos secos"],
        default: "Ninguna"
    },
    invitado: { type: Schema.Types.ObjectId, ref: 'Invitado', required: true }
});

module.exports = model('Acompanante', AcompananteSchema);