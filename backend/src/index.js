const express = require('express');
const { request } = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors({
    //origin: 'http://meuapp.com'
    origin: '*'
}));

app.use(express.json());

app.use(routes);

//rota
// http://localhost:3333

//recurso
// rota+/users


//metodos HTTP
// GET
// POST
// DELETE
// PUT
// PATCH

//parametros
// Query : parametros nomeados enviado na rota ?ref=10&idade=25
// Route : parametros utilizados para identificar recursos  /users/1
// Body  : corpo da requisicao, para post ou update



app.listen(3333);


//npm install nodemon -D (-D somente no dev)

