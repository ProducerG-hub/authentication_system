require('dotenv').config();
const pool = require('../database/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email`;
    const values = [name, email, hashedPassword];
    const result = await client.query(query, values);
    const user = result.rows[0];
    
    await client.query('COMMIT');
    
    res.status(201).json({ 
        success: true,
        message: 'User registered successfully', user 
    });

  } catch (error) {
    await client.query('ROLLBACK');
    
       if (error.code === '23505') {
  return res.status(409).json({
    success: false,
    message: 'Email already exists'
  });
}
    console.error('Error registering user:', error);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
    });

  } finally {
    client.release();
  }
}

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = `SELECT id, email, password, role_id, is_active FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ 
          success: false,
          message: 'Authentication failed: Bad Credentials' 
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ 
          success: false,
          message: 'Authentication failed: Bad Credentials' 
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id},
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ 
        success: true,
        message: 'Authentication successful', 
        token 
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
        success: false,
        message: 'Internal server error' 
    });
  }
}