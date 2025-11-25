const { Schema, model } = require("mongoose");

const InvitadoSchema = new Schema(
  {
    codigoAcceso: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    tipoMenu: {
      type: String,
      enum: ["Adulto", "Ninos"],
      default: "Adulto",
    },
    condicionAlimenticia: {
      type: String,
      enum: [
        "Ninguna",
        "Vegetariano",
      ],
      default: "Ninguna",
    },
    tipoInvitado: {
      type: String,
      enum: ["Individual", "conAcompanante", "familia"],
      default: "individual",
    },
    ultimaActualizacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual para traer acompañantes
InvitadoSchema.virtual("acompanantes", {
  ref: "Acompanante",
  localField: "_id",
  foreignField: "invitado",
});

module.exports = model("Invitado", InvitadoSchema);
