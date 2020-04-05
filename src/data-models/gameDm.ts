import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Counter = require('../models/counter');

const gameSchema = new Schema(
  {
    sequence: {
      type: Number
    },
    timestamp: {
      type: String,
      required: true
    },
    spadesRow: {
      type: Array,
      required: true
    },
    diamondsRow: {
      type: Array,
      required: true
    },
    heartsRow: {
      type: Array,
      required: true
    },
    clubsRow: {
      type: Array,
      required: true
    },
    inOrder: {
      type: Number,
      required: true
    },
    historicalInOrder: {
      type: Number,
    }
  }
);

gameSchema.pre('save', function (next) {
  var game = this;
  Counter.findByIdAndUpdate({ _id: 'sequenceCounter' }, { $inc: { seq: 1 } }, { new: true, upsert: true }).then(function (count) {
    const historicalInOrderAverage = count.historicalInOrder;
    const newHistoricalAverage = ((historicalInOrderAverage * (count.seq - 1)) + game.inOrder)/count.seq;

    game.sequence = count.seq;
    game.historicalInOrder = newHistoricalAverage;
    count.historicalInOrder = newHistoricalAverage;

    count.save();
    next();
  }).catch(function (error) {
      console.error("counter error-> : " + error);
      throw error;
    });
});

module.exports = mongoose.model('GameDm', gameSchema);
