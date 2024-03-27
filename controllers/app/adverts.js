import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import transporter from '../../utils/transporter.js';
import { generateToken } from '../../utils/createTokens.js';
import User from '../../models/User.js';
import Advert from '../../models/Advert.js';
const { compare, hash } = bcryptjs;

export function getAdverts(req, res, next) {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	res.render('advert', {
		path: '/advert',
		pageTitle: 'Advert',
		errorMessage: message,
		successMessage: req.flash('success'),
		validationErrors: [],
	});
}
