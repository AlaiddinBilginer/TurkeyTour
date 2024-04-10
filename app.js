if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');

// Routes
const placeRoutes = require('./routes/places');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

mongoose
    .connect('mongodb://127.0.0.1:27017/TurkeyTour')
    .then(() => console.log('MongoDB connection successful'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    mongoSanitize({
        replaceWith: '_',
    })
);

const sessionConfig = {
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/places', placeRoutes);
app.use('/places/:id/reviews', reviewRoutes);
app.use('/', userRoutes);

app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Sayfa Bulunamadı!'));
});

app.use((err, req, res, next) => {
    const { status = 500, message = 'Bir şeyler yanlış gitti!' } = err;
    res.status(status).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});
