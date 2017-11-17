CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(20) UNIQUE NOT NULL,
  first_name VARCHAR,
  last_name VARCHAR,
  password_digest TEXT NOT NULL,
  email TEXT NOT NULL,
  description TEXT
);