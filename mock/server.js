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

app.get('/storedata', (req, res) => {  // temp url
  res.send({
    categories: [
      'ALL',
      'TOP 3',
      '2019/2',
      '2019/1',
      '2018/2',
      '2018/1',
    ],
    apps: [
      { link: '/snake', caption: 'Snake' },
      { link: '/chess', caption: 'Chess' },
      { link: '/test', caption: 'Test' },
      { link: '/snake', caption: 'Snake' },
      { link: '/chess', caption: 'Chess' },
      { link: '/test', caption: 'Test' },
      { link: '/snake', caption: 'Snake' },
      { link: '/chess', caption: 'Chess' },
      { link: '/test', caption: 'Test' },
      { link: '/snake', caption: 'Snake' },
      { link: '/chess', caption: 'Chess' },
      { link: '/test', caption: 'Test' },
      { link: '/snake', caption: 'Snake' },
      { link: '/chess', caption: 'Chess' },
      { link: '/test', caption: 'Test' },
    ],
  });
});

app.get('/apps/me', (req, res) => {
  res.send({
    apps: [
      { link: '/snake', caption: 'Snake' },
      { link: '/terminal', caption: 'Terminal' },
      { link: '/test', caption: 'Test' },
    ],
  });
});

app.use(fallback('index.html', { root: 'dist' }));
