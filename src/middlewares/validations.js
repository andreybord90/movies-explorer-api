import { celebrate, Joi } from 'celebrate';
import Shema from 'mongoose';

export const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().min(2).max(30),
  }),
});

export const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    ),
    trailerLink: Joi.string().required().pattern(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    ),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    ),
    movieId: Joi.number().required()
  }),
});

export const validateMovieId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (Shema.Types.ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      }),
  }),
});

export const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string()
      .required()
      .pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+[A-Z]{2,4}$/i),
    password: Joi.string().required(),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+[A-Z]{2,4}$/i),
    password: Joi.string().required(),
  }),
});