const express = require('express')
const app = express();

var fs = require('fs');
const fileUpload = require('express-fileupload');
var busboy = require('connect-busboy'); //middleware for form/file upload
app.use(busboy());

var path = require('path');
app.use(express.static('public'))

var __dirname = 'public';
app.get('/', function (req, res) {
  res.sendFile('public/index.html');
})

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dd.natu@gmail.com',
    pass: 'dd1209425877151'
  }
});

var mailOptions = {
  from: 'dd.natu@gmail.com',
  to: 'natudevdutta@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});




/*  Creating a Database and Inserting into it trying 
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('mydb.db');
    var check;
    db.serialize(function() {
    db.run("CREATE TABLE if not exists user_info (info TEXT)");
    var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
    for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
        console.log(row.id + ": " + row.info);
    });
  });

  db.close();
*/

/*Perform SELECT Operation
db.serialize(function () {
  db.each("SELECT * FROM user_info", function (err, row) {
    console.log(row);
  });
});*/



/* Trying file upload mechanism */
app.post('/upload', function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/files/' + filename);
              file.pipe(fstream);
              fstream.on('close', function () {    
                  console.log("Upload Finished of " + filename);              
                  // res.redirect('back');           //where to go next
              res.send({});
            });
        });
});

  

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
