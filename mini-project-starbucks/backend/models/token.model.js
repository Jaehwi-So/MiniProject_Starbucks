import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
});

export const Token = mongoose.model('Token', TokenSchema); //Collection
