const express = require('express');
const cors = require('cors');
const { exec } = require('yt-dlp-exec');

const app = express();
app.use(cors());

app.get('/download', (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).send('Falta la URL');

  res.header('Content-Disposition', 'attachment; filename="zvx_musica.mp3"');
  res.header('Content-Type', 'audio/mpeg');

  exec(videoUrl, {
    extractAudio: true,
    audioFormat: 'mp3',
    output: '-'
  }, { stdio: ['ignore', 'pipe', 'ignore'] }).pipe(res);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor ZVX listo en puerto ${PORT}`));