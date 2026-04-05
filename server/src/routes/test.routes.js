import express from 'express';

const router = express.Router();

// TEST ROUTE
router.put('/data', (req, res) => {
  console.log('Request query:', req.query);
  res.status(200).json({ message: 'success', query: req.query });
});

router.get('/error_test', (req, res) => {
  console.log('req hit ...');
  
  res.status(409).json({ error: 'Server error' });
});

export default router;