const express = require('express');
const cors = require('cors');
const multer = require('multer');

require('dotenv').config()

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileData = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }

  res.json(fileData)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
