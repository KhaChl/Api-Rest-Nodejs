const mongoose = require("mongoose");
const { Schema } = mongoose;

const serieSchema = new Schema({
    titulo: { type: String },
    año: { type: Number },
    temporadas: { type: Number },
    poster: { type: String },
    resumen: { type: String },
    genero: { type: String, enum: ['Fantasia', 'Accion', 'Drama', 'Sci-Fi', 'Comedia'] }
});

module.exports = mongoose.model('Serie', serieSchema);