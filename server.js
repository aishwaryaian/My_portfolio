const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when accessing "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve images dynamically
app.get('/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'public', 'images');

    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            res.status(500).json({ error: 'Unable to load images' });
        } else {
            res.json(files.filter(file => /\.(jpg|jpeg|png|gif|mp4|webm)$/i.test(file)));
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});