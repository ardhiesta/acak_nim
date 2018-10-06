const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database('./db/dummy.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the sqlite database.');
});

// create table mahasiswa
// db.run('CREATE TABLE mahasiswa(nim TEXT PRIMARY KEY, nama TEXT, terpilih INTEGER)');

// insert one row into the langs table
// db.run(`INSERT INTO mahasiswa(nim, nama, terpilih) VALUES(?, ?, ?)`, ['M0515016', 'GHAZY AYYASY', 0], function(err) {
//     if (err) {
//       return console.log(err.message);
//     }
//     // get the last insert id
//     console.log(`A row has been inserted with rowid ${this.lastID}`);
// });

// query
let sql = `SELECT * FROM mahasiswa WHERE terpilih = 0 ORDER BY nim`;

let sql_update = `UPDATE mahasiswa SET terpilih = ? WHERE nim = ?`;

function updateMahasiswa(data){
  db.run(sql_update, data, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) updated: ${this.changes}`);
   
  });
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // console.log(rows.length);
    
    rows = shuffle(rows);

    // rows.forEach((row) => {
    //   console.log(row.nim);
    // });

    console.log('------');
    let nimMhs = rows[0].nim;
    let namaMhs = rows[0].nama;
    console.log(nimMhs+" "+namaMhs);
    let data = [1, nimMhs];
    updateMahasiswa(data);
  });
 
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});