const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check email
  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Check password
  const isMatch = password === process.env.ADMIN_PASSWORD;
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Create token
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, message: 'Login successful' });
});

module.exports = router;