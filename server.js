const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 4000;

// Allow CORS for specific origin (IIS server)
app.use(cors({
    origin: 'http://192.168.124.1:443',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

app.options('*', cors());

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'credentials',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to handle saving username and password
app.post('/save-credentials', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error saving to database:', err);
            return res.status(500).json({ message: 'Database error.' });
        }

        res.status(200).json({ message: 'Credentials saved successfully.' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
