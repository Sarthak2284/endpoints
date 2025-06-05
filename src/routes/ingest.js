const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { saveIngestion } = require('../storage');
const { enqueueBatches } = require('../ingestQueue');

const router = express.Router();

router.post('/', (req, res) => {
  const { ids, priority } = req.body;
  if (!Array.isArray(ids) || !['HIGH', 'MEDIUM', 'LOW'].includes(priority)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const ingestion_id = uuidv4();
  const batches = [];

  for (let i = 0; i < ids.length; i += 3) {
    batches.push({
      batch_id: uuidv4(),
      ids: ids.slice(i, i + 3),
      status: 'yet_to_start'
    });
  }

  const ingestionRecord = {
    ingestion_id,
    priority,
    timestamp: Date.now(),
    batches
  };

  saveIngestion(ingestion_id, ingestionRecord);
  enqueueBatches(batches, ingestion_id);

  res.json({ ingestion_id });
});

module.exports = router;
