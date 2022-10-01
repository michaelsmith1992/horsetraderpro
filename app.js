const express = require("express");
const { convertCsvToHtml } = require("./csvtohtml");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const app = express();

app.use(express.json());

app.use(express.static('public'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'HorseTraderPro - blog post csv to html'})
});

app.post('/csvtohtml', upload.single('file'), (req, res) => {
    const result = convertCsvToHtml(req.file.buffer, req.query.eventType);
    res.send(result);
});

app.listen(process.env.PORT);