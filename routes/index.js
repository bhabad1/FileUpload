var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage: storage }).single('userPhoto');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("coming here")

    res.render('index', { title: 'Express' });
});

// router.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.ejs");
// });

router.post('/api/photo', function(req, res) {
    console.log("coming here")
    console.log(req)
    upload(req, res, function(err) {
        if (err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

module.exports = router;