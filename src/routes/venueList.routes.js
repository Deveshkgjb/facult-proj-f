import express from 'express';
import { createVenueList, getVenueLists, getVenueByIdList, updateVenueList, deleteVenueList, getAllVenues } from '../controllers/all.controller.js';
import { authenticateToken } from '../middlewares/req.js';

const router = express.Router();

// Define routes for venue list CRUD
router.post('/', createVenueList);
router.get('/', getVenueLists);
router.get('/venues', authenticateToken, getAllVenues);
router.get('/:id', getVenueByIdList);
router.put('/:id', authenticateToken, updateVenueList);
router.delete('/:id', deleteVenueList);

export default router;
