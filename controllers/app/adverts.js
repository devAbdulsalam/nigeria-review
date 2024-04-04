import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import transporter from '../../utils/transporter.js';
import { generateToken } from '../../utils/createTokens.js';
import User from '../../models/User.js';
import Site from '../../models/Site.js';
import Advert from '../../models/Advert.js';
const { compare, hash } = bcryptjs;

export const getAdverts = async (req, res, next) => {
	let message = req.flash('error');
	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}
	const site = await Site.findOne();
	res.render('advert', {
		path: '/advert',
		pageTitle: 'Advert',
		errorMessage: message,
		site,
		successMessage: req.flash('success'),
		validationErrors: [],
	});
};
