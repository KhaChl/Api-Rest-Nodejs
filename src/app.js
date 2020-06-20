/* importamos dependencias */
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Router = express.Router();
const serieCtrl = require('../controllers/series.js');

/* inicialización */
const app = express();
app.set('port', process.env.PORT || 8080)

/* middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

/* base de datos */
mongoose.connect('mongodb://localhost/series', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log("Conectado"))
    .catch(error => console.log(error));

/* rutas */
app.use(Router);
Router.get('/', (req, res) => {
    res.send("Api funcionando");
});
Router.route('/series')
    .get(serieCtrl.findAllSeries)
    .post(serieCtrl.addSerie);
Router.route('/series/:id')
    .get(serieCtrl.findSerie)
    .put(serieCtrl.updateSerie)
    .delete(serieCtrl.deleteSerie);

/* error 400 */
app.use((req, res) => {
    res.status(400);
    res.send('404: File Not Found');
})

/* servidor */
app.listen(app.get('port'), () => {
    console.log('Server en puerto:', app.get(('port')))
})