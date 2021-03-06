import express, { Application } from 'express';
import mongoose from 'mongoose';
/* import passport from 'passport'; */
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';

import MovieRoutes from './routes/movie.routes';
import UserRoutes from './routes/user.routes';
/*import { jwtUser, seed } from './middlewares/user.middlewares';*/

/* Initializations */
const app: Application = express();
if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === undefined)
    config();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(passport.initialize());
app.use(passport.session()); */
/* passport.use('userJwt', jwtUser); */
app.use(morgan('dev'));
app.use(cors());

/* passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: any, done) => {
    const user = await userModel.findById(id);
    if (!user)
        return done(new Error('UserNotFound'), false);

    return done(null, user);
}); */

// Routes
app.use('/movie', MovieRoutes);
app.use('/user', UserRoutes);

/* DB and server setup */
mongoose.connect(
    process.env.MONGO_URI || 'mongodb://localhost:27017/api-crud-cm',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, (err) => {
        if (err) throw err;
        console.log('DB connected');
    }
);
app.listen(process.env.PORT || 65000, () => {
    console.log(`Server running in port ${process.env.PORT || 65000}`);
});
console.log(`Server running in mode ${process.env.NODE_ENV || 'dev'}`);