/**
 * This project is licensed under the MIT license.
 * Project is created by: hampuiz
 * Project is maintained by: GitHub Contributors
 * 
 * Project is created for:
 * - FiveM Server Owners
 * - FiveM Developers
 * 
 * If you want to contribute to this project, feel free to do so.
 * 
 * @see
 * {@link https://github.com/JavaHampus/FiveX-Application}
 * 
 * If you need help with this project, feel free to contact me on Discord.
 */

import express, { Express } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

import { HomeRoute } from './routes/Home.route';
import { DepartmentsRoute } from './routes/Departments.route';
import { ApplicationRoute } from './routes/Application.route';
import { AuthenticationRoute } from './routes/Authentication.route';
import { AuthMiddle } from './middlewares/Authentication.middleware';
import { ReviewRoute } from './routes/Review.route';
import { MyApplications } from './routes/MyApplications.route';

export const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(AuthMiddle);

app.use('/', HomeRoute);
app.use('/departments', DepartmentsRoute);
app.use('/application', ApplicationRoute);
app.use('/auth', AuthenticationRoute);
app.use('/review', ReviewRoute);
app.use('/@me', MyApplications);

