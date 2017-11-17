const db = require('../db/config');

const User = {};

User.create = (user) => {
  return db.one(`
    INSERT INTO users
      (username, first_name, last_name, password_digest, email, description)
    VALUES
      ($/username/, $/first_name/, $/last_name/, $/password_digest/, $/email/, $/description/)
    RETURNING *
  `, user)
}

module.exports = User;