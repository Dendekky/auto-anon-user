// import { Router } from 'express';
import AnonUser from './anonuser';

module.exports = (app) => {
    app.get('/', AnonUser)
}