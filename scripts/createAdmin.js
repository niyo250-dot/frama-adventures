const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error('Usage: node scripts/createAdmin.js email password');
    process.exit(1);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });
  await user.save();
  console.log('Admin user created');
  process.exit(0);
}
run();
