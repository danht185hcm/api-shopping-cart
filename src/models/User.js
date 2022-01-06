const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      first: {
        type: String,
        require: true,
      },
      last: {
        type: String,
        require: true,
      },
    },
    information: {
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
      },
      address: {
        type: String,
        default: '',
        maxLength: 255,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', UserSchema);
