import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDb } from './dataAccess';
const Counter = require('./models/counter')
const gameRoutes = require('./routes/gameRoute');
require('dotenv').config();

const uri = `mongodb+srv://danny:${process.env.MONGO_PASSWORD}@cardgamedb-31nej.mongodb.net/cardGame?retryWrites=true&w=majority`;
connectToDb(uri)

var app = express();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));
const portNumber = 8080;

app.listen(portNumber, (port, err) => {
    if (err) {
        return console.error(err);
      }

      let counter = Counter.find({ _id: 'sequenceCounter' });
      if (!counter) {
        const counter = new Counter({ _id: 'sequenceCounter' });
        counter.save();
      };

      return console.log(`server is listening on ${portNumber}`);
});  

app.use('/', gameRoutes)

