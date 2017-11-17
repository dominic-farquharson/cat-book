const db = require('../db/config');

const User = {};

User.create = (user) => {
  console.log('password ', user.password_digest)
  return db.one(`
    INSERT INTO users
      (username, first_name, last_name, password_digest, email, description)
    VALUES
      ($/username/, $/first_name/, $/last_name/, $/password_digest/, $/email/, $/description/)
    RETURNING *
  `, user)
}

User.findByUsername = username => {
  return db.oneOrNone(`
    SELECT 
      * 
    FROM 
      users
    WHERE
      username = $1  
  `, [username])
}

module.exports = User;