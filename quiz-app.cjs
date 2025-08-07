  const express = require('express');
  const mysql = require('mysql2');
  const app = express();
  const port = 3000;

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
