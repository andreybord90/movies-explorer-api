import express from 'express';

import { getMovies, createMovie, deleteMovie } from '../controllers/movie.js';
import {
    validateCreateMovie, validateMovieId
  } from '../middlewares/validations.js';
const router = express.Router();

router.get('/movies', getMovies);
router.post('/movies',validateCreateMovie, createMovie);
router.delete('/movies/:_id',validateMovieId, deleteMovie);

export default router;
