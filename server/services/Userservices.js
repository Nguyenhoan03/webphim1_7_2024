const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const Servicelogin = async (email, password) => {
  try {
    const data = await User.findOne({ where: { email } });
    if (!data) {
      return { success: false, message: "User not found" };
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Thông tin đăng nhập không chính xác' };
    }
    const token = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
    const name = data.username;
    return { success: true,refreshToken, token, name };
  } catch (error) {
    console.error("Error in Servicelogin:", error);
    throw new Error("Server error");
  }
}

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(403).json({ error: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '15m' });
    res.json({ token });
  } catch (error) {
    console.error('Error in refreshToken:', error);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

const Serviceregister = async (email, name, password) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword
      });
      return { success: true, user: newUser };
    } else {
      return { success: false, message: 'Email already exists' };
    }
  } catch (error) {
    console.error("Error in Serviceregister:", error);
    throw new Error("Server error");
  }
}

module.exports = { Servicelogin, Serviceregister,refreshToken };
