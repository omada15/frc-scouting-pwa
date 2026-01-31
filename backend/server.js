import express from 'express';

const app = express();
const PORT = 3000;

const router = express.Router();

router.post('/write', (req, res) => {
  res.send('Hello, World!');
  console.log(req.body);
});