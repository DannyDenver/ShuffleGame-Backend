import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { connectToDb } from './dataAccess';
const Counter = require('./models/counter')
const gameRoutes = require('./routes/gameRoute');
const env = require('dotenv').config();

var app = express();

const uri = `mongodb+srv://danny:${process.env.MONGO_PASSWORD}@cardgamedb-31nej.mongodb.net/cardGame?retryWrites=true&w=majority`;
connectToDb(uri)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200'}));

app.listen(8080, (port, err) => {
    if (err) {
        return console.error(err);
      }

      let counter = Counter.find({ _id: 'sequenceCounter' });
      if (!counter) {
        const counter = new Counter({ _id: 'sequenceCounter' });
        counter.save();
      };

      return console.log(`server is listening on ${port}`);
});  

app.use('/', gameRoutes)

