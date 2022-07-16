// Get required modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Express
const app = express();

app.use(bodyParser.json());

// CREATE: 테이블 생성
db.pool.query(
  `CREATE TABLE lists(
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
)`,
  (err, result, fileds) => {
    console.log(`result =>`, result);
  },
);

// SELECT : DB에서 모든 정보 가져오기
app.get('/api/values', function (req, res) {
  db.pool.query(`SELECT * FROM lists;`, (err, result, fileds) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return rest.json(result);
    }
  });
});

// INSERT: 입력 값 DB에 등록
app.post('/api/value', function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, result, fileds) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    },
  );
});

app.listen(5000, () => {
  console.log(`애플리케이션이 5000번 포트에서 시작되었습니다.`);
});
