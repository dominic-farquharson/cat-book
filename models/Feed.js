const db = require('../db/config');
const Feed = {};

Feed.create = (data) => {
  // eventually add user id instead (if username changes, this wouldn't change)
  return db.one(`
    INSERT INTO feed 
      (username, post)
    VAlUES
      ($/username/, $/post/) 
    RETURNING *  
  `, data)
}

Feed.findAll = () => {
  return db.manyOrNone(`
    SELECT * FROM feed
  `)
}

module.exports = Feed;