const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AuthCtrl {
  // [POST] api/auth/register
  async register(req, res) {
    const {
      username,
      password,
      name: { first, last },
    } = req.body;

    // Simple validate
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: 'Missing username or password !',
      });
    if (!first || !last)
      return res.status(400).json({
        success: false,
        message: 'Missing information !',
      });

    try {
      const user = await User.findOne({ username });

      // Check for existing user
      if (user)
        return res.status(400).json({
          success: false,
          message: 'Username already in use',
        });

      // Hash password and add user in the database
      const hashPassword = await argon2.hash(password);
      const newUser = new User({ ...req.body, password: hashPassword });
      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: 'User created successfully',
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  // [POST] api/auth/login
  async login(req, res) {
    const { username, password } = req.body;

    // Simple validate
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Missing username or password !',
      });
    }

    try {
      const user = await User.findOne({ username });

      // Check for existing user
      if (!user)
        return res.status(400).json({
          success: false,
          message: 'Incorrect username or password',
        });

      // Username found
      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword)
        return res.status(400).json({
          success: false,
          message: 'Incorrect username or password',
        });

      // Return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: 'User logged successfully',
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
}

module.exports = new AuthCtrl();
