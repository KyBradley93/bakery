const pool = require('../db');

const markCheckoutPaid = async (checkout_id) => {
  return pool.query(
    'UPDATE checkout SET payment_status = $1 WHERE id = $2',
    ['paid', checkout_id]
  );
};

const getCartIdByCheckoutId = async (checkout_id) => {
  const result = await pool.query(
    'SELECT cart_id FROM checkout WHERE id = $1',
    [checkout_id]
  );
  return result.rows[0]?.cart_id;
};

const deleteCartItemsByCartId = async (cart_id) => {
  return pool.query(
    'DELETE FROM cart_items WHERE cart_id = $1',
    [cart_id]
  );
};

module.exports = {
  markCheckoutPaid,
  getCartIdByCheckoutId,
  deleteCartItemsByCartId,
};
