const db = require('../db/config');

const User = {};

User.create = (user) => {
  return db.one(`
    INSERT INTO users
    (username, password)
    VALUES
    ($1, $2)
    RETURNING *
  `, [username, password])
}

module.exports = User;