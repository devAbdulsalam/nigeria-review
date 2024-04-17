import express from 'express';
import {
	getAmenities,
	getAmenity,
	createAmenity,
	updateAmenity,
	deleteAmenity,
} from '../controllers/amenity.js';
const router = express.Router();

router.get('/', getAmenities);
router.get('/:id', getAmenity);
router.post('/', createAmenity);
router.patch('/', updateAmenity);
router.delete('/:id', deleteAmenity);

export default router;
