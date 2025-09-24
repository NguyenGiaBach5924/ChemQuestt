  const express = require('express');
  const mysql = require('mysql2');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const cors = require('cors');


  const app = express();
  const port = 3000;


// CORS configuration to allow local Vite dev server(s)
const corsOptions = {
  origin: [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
  app.use(express.json());


  // MySQL connection configuration
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Use 'root' or the user you created (e.g., 'quiz_user')
    password: 'Ngb050904!', // Replace with your actual root password
    database: 'quiz_app',
    port: 3306 // Default MySQL port
  });

  // Connect to MySQL
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      process.exit(1);
    }
    console.log('Connected to MySQL database.');
  });

  // Serve static files (HTML, CSS, JS)
  app.use(express.static('public'));
//======================================auth middleware======================================
// Verify JWT from Authorization: Bearer <token>
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  jwt.verify(token, "your_secret_key", (err, payload) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = payload; // { userId }
    next();
  });
}
//======================================quiz api======================================
  // API endpoint to get 5 random quiz questions
  app.get('/api/quiz', (req, res) => {
    db.query('SELECT * FROM quizzes ORDER BY RAND() LIMIT 5', (err, results) => {
      if (err) {
        console.error('Error fetching quiz:', err.message);
        res.status(500).json({ error: 'Failed to fetch quiz' });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: 'No quizzes found' });
        return;
      }
      // Transform results to match frontend expectations
      const formatted = results.map(row => ({
        question: row.question,
        options: [row.option1, row.option2, row.option3, row.option4],
        correct: Number(row.correct)
      }));
      res.json(formatted);
    });
  });
//======================================auth api======================================
// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO user_db (`school_email`, `password_hash`) VALUES (?, ?)',
      [email, hash],
      (err, result) => {
        if (err) {
          console.error('Error registering user:', err.message);
          return res.status(400).json({ error: "User already exists or invalid input" });
        }
        res.json({ message: "User registered successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM user_db WHERE `school_email` = ?', [email], async (err, rows) => {
    if (err) {
        console.error('Error fetching user:', err.message);
      return res.status(500).json({ error: "Server error" });
    }
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid School email or password" });
    }

    const user = rows[0];
    // Compare against hashed password in `password_hash`
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: "Invalid School email or password" });
    }

    const token = jwt.sign({ userId: user.user_id }, "your_secret_key", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// Logout (optional - mainly for server-side session management)
app.post('/logout', (req, res) => {
  // For JWT-based auth, logout is mainly handled client-side by removing the token
  // This endpoint can be used for additional server-side cleanup if needed
  res.json({ message: "Logout successful" });
});

//======================================protected api======================================
// Example protected route to save quiz score
app.post('/api/score', authenticateToken, (req, res) => {
  const { score } = req.body;
  if (typeof score !== 'number') {
    return res.status(400).json({ error: 'Score must be a number' });
  }

  const userId = req.user.userId;

  // Attempt to persist; adjust table/columns to your schema
  // Example schema: user_scores(id PK, user_id INT, score INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
  const insertSql = 'INSERT INTO user_scores (`user_id`, `score`) VALUES (?, ?)';
  db.query(insertSql, [userId, score], (err, result) => {
    if (err) {
      console.error('Error saving score:', err.message);
      return res.status(500).json({ error: 'Failed to save score' });
    }
    return res.json({ message: 'Score saved', scoreId: result.insertId });
  });
});

// Public leaderboard: top recent scores with user email (masked)
app.get('/api/leaderboard', (req, res) => {
  const sql = `
    SELECT s.id, s.score, s.created_at, u.school_email
    FROM user_scores s
    JOIN user_db u ON u.user_id = s.user_id
    ORDER BY s.created_at DESC
    LIMIT 20
  `;
  db.query(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching leaderboard:', err.message);
      return res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
    const maskEmail = (email) => {
      if (!email || typeof email !== 'string') return '';
      const [user, domain] = email.split('@');
      if (!user || !domain) return email;
      const visible = user.slice(0, 2);
      return `${visible}***@${domain}`;
    };
    const data = rows.map(r => ({
      id: r.id,
      name: maskEmail(r.school_email),
      score: Number(r.score),
      created_at: r.created_at
    }));
    return res.json(data);
  });
});

  // Error handling for database connection
  db.on('error', (err) => {
    console.error('MySQL connection error:', err.message);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      db.connect();
    }
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
