const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      maxLength: 255,
      unique: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    updated_by: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('categories', CategorySchema);
// 1:26:45
