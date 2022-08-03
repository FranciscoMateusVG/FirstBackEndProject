const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const acoesRoutes = require('./api/routes/acoesRoutes');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

// Using mongodb
const mongodbURL =
  '';
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Conectado!!!! CARAI!');
});

//LOG
app.use(morgan('dev'));
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS Handler
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Acesse-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.header('Acesse-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }

  next();
});

//Routes
app.use('/acoes', acoesRoutes);

//Render Index
app.use(express.static(__dirname + '/'));
/*app.get('/', function(req, res) {
  res.sendFile('C:/Users/Usuario/Desktop/app/index.html');
});*/

//Handlle Error
app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//Mount Server

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
