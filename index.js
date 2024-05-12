import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
// import MongoDBStore from 'connect-mongodb-session';

// routes
import appRoutes from './routes/app/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import generalRoutes from './routes/general.js';
import advertRoutes from './routes/advert.js';
import adminRoutes from './routes/admin.js';
import listingRoutes from './routes/listing.js';
import businessRoutes from './routes/business.js';
import priceRoutes from './routes/price.js';
import amenityRoutes from './routes/amenity.js';
import faqRoutes from './routes/faq.js';
import errorHandler from './middlewares/errorHandler.js';
import checkSessionUser from './middlewares/checkSession.js';
import { get404 } from './controllers/app/index.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 9000;
// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10000, // Limit each IP to 10,000 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	validate: { xForwardedForHeader: false },
	handler: (_, __, ___, options) => {
		throw new Error(
			options.statusCode || 500,
			`There are too many requests. You are only allowed ${
				options.max
			} requests per ${options.windowMs / 60000} minutes`
		);
	},
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.json());
// app.use(
// 	helmet({
// 		contentSecurityPolicy: false, // Disable contentSecurityPolicy if it's causing conflicts
// 		xssFilter: false, // Disable xssFilter if it's causing conflicts
// 		frameguard: false, // Disable frameguard if it's causing conflicts
// 		noSniff: true, // Ensure noSniff (x-content-type-options) is enabled
// 	})
// );
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // configure static file to save images locally
app.use(cors());
app.set('view engine', 'ejs');
// setups
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf8');
const swaggerDocument = YAML.parse(file);
// Set Cookie Parser, sessions and flash
app.use(flash());
app.use(cookieParser('NotSoSecret'));
// const MongoDBStoreSession = MongoDBStore(session);
// const store = new MongoDBStoreSession({
// 	uri: process.env.MONGO_URL,
// 	collection: 'sessions',
// });
app.use(
	session({
		secret: process.env.EXPRESS_SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	next();
});
app.use(checkSessionUser);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/* ROUTES */
app.use('/', appRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/general', generalRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/business', businessRoutes);
app.use('/api/v1/prices', priceRoutes);
app.use('/api/v1/amenities', amenityRoutes);
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1/listings', listingRoutes);
app.use('/api/v1/adverts', advertRoutes);
/* CONFIGURATION */

// * API DOCS
// ? Keeping swagger code at the end so that we can load swagger on "/" route
app.use(
	'/api/v1/docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument, {
		swaggerOptions: {
			docExpansion: 'none', // keep all the sections collapsed by default
		},
		customSiteTitle: 'Api docs',
	})
);
// error
// common error handling middleware
app.use('/api/v1/', errorHandler);
// 404 page
app.use(get404);

/* MONGOOSE SETUP */
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server is listening in port: ${PORT}`));
	})
	.catch((error) => console.log(`${error} did not connect`));
