const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const PORT = 3000;

function toMB(bytes) {
  return bytes / 1024 / 1024;
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/ram', (req, res) => {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  res.json({
    total: toMB(total).toFixed(2),
    free: toMB(free).toFixed(2),
    used: toMB(used).toFixed(2)
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});