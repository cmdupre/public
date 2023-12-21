var express = require('express');
var router = express.Router();

const title = 'Mini Message Board';

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: title, messages: messages });
});

router.get('/new', (req, res) => {
  res.render('form', { title: title });
});

router.post('/new', (req, res) => {
  messages.push({ text: req.body.message, user: req.body.name, added: new Date() });
  res.redirect('/');
});

module.exports = router;
