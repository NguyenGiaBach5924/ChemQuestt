const mysql = require('mysql2/promise');

(async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ngb050904!',
    database: 'quiz_app',
    port: 3306,
  });

  try {
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Tables in quiz_app:\n' + JSON.stringify(tables, null, 2));

    const [descUser] = await connection.query('DESCRIBE user_db');
    console.log('\nDESCRIBE user_db:\n' + JSON.stringify(descUser, null, 2));

    const [columns] = await connection.query(
      "SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='quiz_app' AND TABLE_NAME='user_db' ORDER BY ORDINAL_POSITION"
    );
    console.log('\nINFORMATION_SCHEMA for user_db:\n' + JSON.stringify(columns, null, 2));

    const [topScores] = await connection.query(
      'SELECT user_id, school_email, score FROM user_db ORDER BY score DESC LIMIT 10'
    );
    console.log('\nTop 10 users by score:\n' + JSON.stringify(topScores, null, 2));
  } finally {
    await connection.end();
  }
})().catch((err) => {
  console.error('DB inspection error:', err.message);
  process.exit(1);
});
