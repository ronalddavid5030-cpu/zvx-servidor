const express = require('express');
const cors = require('cors');
const { exec } = require('yt-dlp-exec');

const app = express();
app.use(cors());

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('Falta la URL');

  // Descarga directa del mejor audio disponible en YouTube sin requerir FFmpeg
  res.header('Content-Disposition', 'attachment; filename="zvx_audio.m4a"');
  res.header('Content-Type', 'audio/mp4');

  exec(videoUrl, {
    format: 'bestaudio',
    output: '-'
  }, { stdio: ['ignore', 'pipe', 'ignore'] }).pipe(res);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor ZVX listo en puerto ${PORT}`));
