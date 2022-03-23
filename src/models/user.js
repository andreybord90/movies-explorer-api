import mongoose from 'mongoose';
import validator from 'validator';


const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('user', userSchema);
