const { updateBatchStatus } = require('./storage');

const queue = [];

function enqueueBatches(batches, ingestionId) {
  for (const batch of batches) {
    queue.push({ ingestionId, batch });
  }
}

function processQueue() {
  if (queue.length === 0) return;
  const { ingestionId, batch } = queue.shift();

  updateBatchStatus(ingestionId, batch.batch_id, 'triggered');

  setTimeout(() => {
    updateBatchStatus(ingestionId, batch.batch_id, 'completed');
    processQueue(); // trigger next batch after 5s
  }, 5000);
}

// Start interval loop
setInterval(() => {
  if (queue.length > 0) processQueue();
}, 1000);

module.exports = { enqueueBatches };
