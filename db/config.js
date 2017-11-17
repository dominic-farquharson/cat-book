const options = {
  query: e => {
    console.log(e.query)
  }
}

const pgp = require('pg-promise')(options);

const setDB = () => {
  if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    return pgp({
      database: 'catBook_dev',
      port: 5432,
      host: 'localhost'
    })
  } else if (process.env.NODE_ENV === 'production') {
    return pgp(process.env.DATABASE_URL)
  }
}

module.exports = setDB();