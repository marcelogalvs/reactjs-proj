const express = require("express");
const ongController = require('./controllers/ongController');
const incidentController = require("./controllers/incidentController");
const profileController = require("./controllers/profileController");
const sessionController = require("./controllers/sessionController");
const routes = express.Router();


routes.post('/sessions', sessionController.create);

//ONGS
//busca no banco
routes.get('/ongs', ongController.index);
//cadastra no banco
routes.post('/ongs', ongController.create);


//INCIDENTS
//busca no banco
routes.get('/incidents', incidentController.index);
//cadastra no banco
routes.post('/incidents', incidentController.create);
//delete no banco
routes.delete('/incidents/:id', incidentController.delete);

//BUSCA PROFILE DA ONG
routes.get('/profile', profileController.index);




module.exports = routes;
