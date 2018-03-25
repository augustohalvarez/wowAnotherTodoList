const env = require('dotenv').config();
const bluebirdPromise = require('bluebird');
const initOptions = { promiseLib: bluebirdPromise };
const pgp = require('pg-promise')(initOptions);
const url = process.env.LOCALHOST_URL;

//

const db = pgp(url);

module.exports = db;

// CREATE TABLE task (
//  task_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
//  content VARCHAR (255) NOT NULL,
//  created_at DATE NOT NULL,
//  usr_id INTEGER REFERENCES usr (usr_id)
// );
//
// CREATE TABLE usr (
//  usr_id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY,
//  email VARCHAR (255) UNIQUE NOT NULL,
//  password VARCHAR (60) NOT NULL,
//  created_at DATE NOT NULL
// );

// I also altered both created_at columns to automatically set the current time:
// alter table usr alter created_at set default now();
// alter table task alter created_at set default now();
