import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { User } from '../models/User';
import Logger from '../libs/logger';

const router = Router();

// User registration route
router.post('/register', async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, role } = req.body;

  // Validate input
  if (!first_name || !last_name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if email is already taken
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: 'User registered successfully' });

    Logger.info(`User successfully registered: ${JSON.stringify(newUser, null, 2)}`);
  } catch (error) {
    Logger.error(`Error registering user: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      Logger.error(`400: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      Logger.error(`400: Invalid credentials`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });
    res.json({ token });
  } catch (error) {
    Logger.error(`Error logging in user: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
