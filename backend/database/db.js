import mongoose from 'mongoose';
import dotenv from 'dotenv';

const Connection=() => {
    dotenv.config();
    const URL = process.env.MONGODB_URL;

    mongoose.connect(URL).then(() => {
        console.log("Seccesfully Connected to MongoDB");
    }).catch((err => {
        console.log("Error connecting to MongoDB ", err);
    }));
}

export default Connection;