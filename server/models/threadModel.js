const pool = require('../db');

const getThreads = async () => {
    try {
        const res = await pool.query('SELECT * FROM threads');
        return res.rows;
    } catch (error) {
        console.log(`Error in threadModel: ${error}`);
    }
};

const getThreadComments = async (thread_id) => {
    try {
        const res = await pool.query('SELECT * FROM thread_comments WHERE thread_id = $1', [thread_id]);
        return res.rows;
    } catch (error) {
        console.log(`Error in threadModel: ${error}`);
    }
};

const postThreadComment = async (thread_id, customer_id, date, content) => {
  try {
    const insertQuery = `
      INSERT INTO thread_comments (thread_id, customer_id, date, content)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const res = await pool.query(insertQuery, [thread_id, customer_id, date, content]);

    // Optionally return the inserted comment
    return res.rows[0];
  } catch (error) {
    console.error(`Error in postThreadComments: ${error.message}`);
    throw error; // So the controller can handle it
  }
};

const addThread = async (customer_id, title, content, date) => {
  try {
    const insertQuery = `
      INSERT INTO threads (customer_id, title, content, date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const res = await pool.query(insertQuery, [
      customer_id,
      title,
      content,
      date
    ]);

    return res.rows[0]; // Return the newly inserted thread
  } catch (error) {
    console.error(`Error in addThread: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getThreads,
  getThreadComments,
  postThreadComment,
  addThread
};
