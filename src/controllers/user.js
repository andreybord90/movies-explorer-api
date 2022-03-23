import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import {
  ConflictError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} from '../errors/index.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users) {
      res.status(200).send(users);
    } else {
      throw new NotFoundError('Пользователей не найдено');
    }
    return;
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (user) {
      res.status(200).send(user);
    } else {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    }
    return;
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании пользователя'
        )
      );
    } else if (error.name === 'CastError') {
      next(new NotFoundError('Пользователь с указанным _id не найден'));
    } else {
      next(error);
    }
  }
};
const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    await User.findOne({ email })
      .then((user) => {
        if (user) {
          throw new ConflictError('Пользователь с данным email существует');
        } else {
          return bcrypt.hash(password, 10);
        }
      })
      .then((hash) => {        
        return User.create({ name, password: hash, email });
      })
      .then(() => {

        res.status(201).send({ data: { name, email } });
      });
    return;
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании пользователя'
        )
      );
    } else {
      next(error);
    }
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const token = generateToken({ _id: user._id });

    res.send({ token });
    return;
  } catch (error) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
  }
};
export { getUsers, updateProfile, createUser, login };
