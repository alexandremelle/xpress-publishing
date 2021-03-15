const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Artist');
  db.run(`CREATE TABLE Artist 
    (
      id INTEGER NOT NULL,
      name TEXT NOT NULL,
      date_of_birth TEXT NOT NULL,
      biography  TEXT NOT NULL,
      is_currently_employed INTEGER DEFAULT 1,
      PRIMARY KEY(id)
    )
  `, err => {
    if (err) {
      console.log("Error while creating the Artist table!");
      console.log(err);
      return;
    }
  });

  db.run('DROP TABLE IF EXISTS Series');
  db.run(`CREATE TABLE Series 
    (
      id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      PRIMARY KEY(id)
    )
  `, err => {
    if (err) {
      console.log("Error while creating the Series table!");
      console.log(err);
      return;
    }
  });

  db.run('DROP TABLE IF EXISTS Issue');
  db.run(`CREATE TABLE Issue 
    (
      id INTEGER NOT NULL,
      name TEXT NOT NULL,
      issue_number INTEGER NOT NULL,
      publication_date TEXT NOT NULL,
      artist_id INTEGER NOT NULL,
      series_id INTEGER NOT NULL,
      FOREIGN KEY(artist_id) REFERENCES Artist(id),
      FOREIGN KEY(series_id) REFERENCES Series(id),
      PRIMARY KEY(id)
    )
  `, err => {
    if (err) {
      console.log("Error while creating the Issue table!");
      console.log(err);
      return;
    }
  });

});