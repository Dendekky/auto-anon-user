import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import Routes from './route';

// mongoDB conection string should be in .env but leaving it in the code to allow people cloning access to the DB
mongoose.connect("mongodb+srv://anonuser:anonuserpassword@cluster0.ea7cy.mongodb.net/anon?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .catch(err => console.log(err));


const app = express();

const { PORT = 3000 } = process.env;


app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(express.json());

app.use(cors());
app.use(session({
  key: 'session',
  secret: 'dfdakdsbfudshfsuiofh89wefheyh9dhafecdusohcaidcehuh8cdoahcods', //secret should be in .env but leaving it here for easy access when cloning
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use('/api', Routes);
require('./route')(app);

// catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, () => console.log(`App Listening on port ${PORT}`));

export default app;