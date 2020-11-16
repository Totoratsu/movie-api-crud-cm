import { Schema, model, Document } from 'mongoose';

const validGenres = {
    values: [
        'ACTION', 'ANIMATION', 'COMEDY', 'CRIME', 'DRAMA',
        'EXPERIMENTAL', 'FANTASY', 'HISTORICAL', 'HORROR', 'ROMANCE',
        'SCIFI', 'THRILLER', 'WESTERN', 'OTHER'
    ],
    message: '{VALUE} it\'s not a valid genre'
};

const MovieSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    director: { type: String, required: true },
    date : { type: Date, required:true },
    rating: { type: Number, required: false, default:0 },
    genre: { type: [{ type: String, default: 'OTHER', enum: validGenres }] }, 
},{
    timestamps: true
});

MovieSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject
}

export interface IMovie extends Document {
    title: string;
    author: string;
    director: string;
    date: Date;
    rating: Number;
    genre: string[];
}

export default model<IMovie>('Movie', MovieSchema);