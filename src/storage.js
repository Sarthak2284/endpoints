const storage = new Map();

function saveIngestion(id, data) {
  storage.set(id, data);
}

function getIngestion(id) {
  return storage.get(id);
}

function updateBatchStatus(ingestionId, batchId, status) {
  const record = storage.get(ingestionId);
  if (!record) return;
  const batch = record.batches.find(b => b.batch_id === batchId);
  if (batch) batch.status = status;
}

function getStatus(id) {
  const record = storage.get(id);
  if (!record) return null;

  const statuses = record.batches.map(b => b.status);
  let overall = 'yet_to_start';
  if (statuses.every(s => s === 'completed')) overall = 'completed';
  else if (statuses.some(s => s === 'triggered')) overall = 'triggered';

  return {
    ingestion_id: id,
    status: overall,
    batches: record.batches
  };
}

module.exports = {
  saveIngestion,
  getIngestion,
  updateBatchStatus,
  getStatus
};
