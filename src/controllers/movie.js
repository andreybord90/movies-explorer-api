import Movie from '../models/movie.js';
import {
  NotFoundError,
  BadRequestError,ForbiddenError,
} from '../errors/index.js';

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    if (movies.length) {
      res.status(200).send(movies);
    } else {
      throw new NotFoundError('Фильмов не найдено');
    }
    return;
  } catch (error) {
    next(error);
  }
};
const createMovie = async (req, res, next) => {
  try {
    const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId } = req.body;
    const userId = req.user._id;

    const movie = await Movie.create({ country, director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId, owner: userId });
    res.send(movie);
    return;
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании фильма'
        )
      );
    } else {
      next(error);
    }
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const userId = req.user._id;

    await Movie.findById(_id)
      .orFail(() => new NotFoundError('Фильм с указанным id не найдена'))
      .then((movie) => {
        if (!movie.owner.equals(userId)) {
          return next(new ForbiddenError('Нельзя удалить чужой фильм'));
        }
        return movie.remove().then(() => {
          res.send({ message: 'Фильм удален' });
        });
      });
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(error);
    }
  }
};
export { getMovies, createMovie, deleteMovie };
