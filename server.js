
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const blobFolder = path.join(__dirname, 'Blob');

if (!fs.existsSync(blobFolder)) {
    fs.mkdirSync(blobFolder);
}

app.post('/api/jsonBlob', (req, res) => {
    const id = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)).join('');
    const filePath = path.join(blobFolder, id + '.json');
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ error: 'Failed to write file' });
        res.status(201).json({ message: 'Blob saved', id });
    });
});

app.get('/api/jsonBlob/:filename', (req, res) => {
    const filePath = path.join(blobFolder, req.params.filename + '.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Blob not found' });
        res.status(200).json(JSON.parse(data));
    });
});

app.put('/api/jsonBlob/:filename', (req, res) => {
    const filePath = path.join(blobFolder, req.params.filename + '.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(404).json({ error: 'Blob not found' });
        const updated = { ...JSON.parse(data), ...req.body };
        fs.writeFile(filePath, JSON.stringify(updated, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Update failed' });
            res.status(200).json({ message: 'Blob updated', updated });
        });
    });
});

app.delete('/api/jsonBlob/:filename', (req, res) => {
    const filePath = path.join(blobFolder, req.params.filename + '.json');
    fs.unlink(filePath, err => {
        if (err) return res.status(404).json({ error: 'Delete failed' });
        res.status(200).json({ message: 'Blob deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
