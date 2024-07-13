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
    const token = jwt.sign({ id: data.id }, process.env.SECRET, { expiresIn: '1h' });
    const name = data.username;
    return { success: true, token, name };
  } catch (error) {
    console.error("Error in Servicelogin:", error);
    throw new Error("Server error");
  }
}

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

module.exports = { Servicelogin, Serviceregister };
