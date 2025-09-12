const pool = require('../db');

const getLatestCartId = async (customer_id) => {
  const result = await pool.query(
    'SELECT id FROM cart WHERE customer_id = $1 ORDER BY id DESC LIMIT 1',
    [customer_id]
  );
  return result.rows[0]?.id;
};

const createCheckout = async (customer_id, cart_id, total_price) => {
  const result = await pool.query(
    `INSERT INTO checkout (customer_id, cart_id, total_price)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [customer_id, cart_id, total_price]
  );
  return result.rows[0].id;
};

const addCheckoutItem = async (checkout_id, item) => {
  await pool.query(
    `INSERT INTO checkout_items (checkout_id, furniture_item_id, quantity, unit_price)
     VALUES ($1, $2, $3, $4)`,
    [checkout_id, item.id, item.quantity, item.price]
  );
};

module.exports = {
  getLatestCartId,
  createCheckout,
  addCheckoutItem
};