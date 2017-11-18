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
    SELECT username, post, to_char(post_added, 'MM/DD HH12:MI AM') AS post_added FROM feed
  `)
}

module.exports = Feed;