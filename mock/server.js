const fallback = require('express-history-api-fallback');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('./dist'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});

app.get('/users/me', (req, res) => {
  res.send({
    username: 'mr. Mock',
    avatarSrc: '/static/img/user.png',
  });
});

app.use(fallback('index.html', { root: 'dist' }));
