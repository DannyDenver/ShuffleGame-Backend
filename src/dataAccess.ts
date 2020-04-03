import mongoose from 'mongoose';


export function connectToDb(uri: string) {
    mongoose.connect(uri);
    const database = mongoose.connection;
    database.on('error', console.error.bind(console, 'connection error:'));
    database.once('open', function(callback) {
        console.log("connection to db open")
    });
}