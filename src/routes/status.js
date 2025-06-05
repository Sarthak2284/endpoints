const express = require('express');
const { getStatus } = require('../storage');
const router = express.Router();

router.get('/:id', (req, res) => {
  const status = getStatus(req.params.id);
  if (!status) return res.status(404).json({ error: 'Not found' });
  res.json(status);
});

module.exports = router;
