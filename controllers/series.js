const Serie = require("../models/serie");

/* metodo get retorna todas las series */
exports.findAllSeries = async (req, res) => {
    await Serie.find((err, series) => {
        if (err) res.send(500, err.message);
        res.jsonp(series);
    });
};

/* metodo post crea una serie */
exports.addSerie = async (req, res) => {
    let serie = new Serie({
        titulo: req.body.titulo,
        año: req.body.año,
        temporadas: req.body.temporadas,
        poster: req.body.poster,
        resumen: req.body.resumen,
        genero: req.body.genero
    });
    await serie.save(err => {
        if (err) res.send(500, err.message);
        res.send('Guardado');
    });

};

/* metodo get retorna serie por id */
exports.findSerie = async (req, res) => {
    await Serie.findById(req.params.id, (err, serie) => {
        if (err) res.send(500, err.message);
        res.jsonp(serie);
    })
};

/* metodo put actualiza una serie por id */
exports.updateSerie = async (req, res) => {
    await Serie.findById(req.params.id, async (err, serie) => {
        serie.titulo = req.body.titulo ? req.body.titulo : serie.titulo;
        serie.año = req.body.año ? req.body.año : serie.año;
        serie.temporadas = req.body.temporadas ? req.body.temporadas : serie.temporadas;
        serie.poster = req.body.poster ? req.body.poster : serie.poster;
        serie.resumen = req.body.resumen ? req.body.resumen : serie.resumen;
        serie.genero = req.body.genero ? req.body.genero : serie.genero;
        await serie.save((err, serie) => {
            if (err) res.send(500, err.message);
            res.jsonp(serie);
        });
    });
};

/* metodo delete elimina una serie por id */
exports.deleteSerie = async (req, res) => {
    await Serie.findByIdAndDelete(req.params.id, (err, serie) => {
        if (err) res.send(500, err.message);
        res.send('Eliminado');
    })
};