const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '../')));

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password', // Enter your MySQL password here
    database: 'iem_help_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        console.log('Ensure MySQL is running and database "iem_help_db" is created.');
    } else {
        console.log('Connected to MySQL database.');
    }
});

// --- API Routes ---

// Signup
app.post('/api/signup', async (req, res) => {
    const { name, email, department, year, password } = req.body;

    if (!email.endsWith('@college.edu')) {
        return res.status(400).json({ error: 'Email must end with @college.edu' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (name, email, department, year, password_hash) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [name, email, department, year, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'User not found' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (isMatch) {
            res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// Get Events
app.get('/api/events', (req, res) => {
    const sql = 'SELECT events.*, users.name as organizer_name FROM events JOIN users ON events.organizer_id = users.id';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create Event
app.post('/api/create-event', (req, res) => {
    const { title, description, organizer_id, date, location, team_size, type } = req.body;
    const sql = 'INSERT INTO events (title, description, organizer_id, event_date, location, team_size, event_type) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, organizer_id, date, location, team_size, type], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Event created successfully' });
    });
});

// Get Teams
app.get('/api/teams', (req, res) => {
    const sql = 'SELECT * FROM teams';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Create Team
app.post('/api/create-team', (req, res) => {
    const { name, event_id, leader_id, skills, size } = req.body;
    const sql = 'INSERT INTO teams (name, event_id, leader_id, skills_required, team_size) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, event_id, leader_id, skills, size], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Team created successfully' });
    });
});

// Get Resources
app.get('/api/resources', (req, res) => {
    const sql = 'SELECT * FROM resources';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Upload Resource
app.post('/api/upload-resource', (req, res) => {
    const { title, type, user_id, url } = req.body;
    const sql = 'INSERT INTO resources (title, type, user_id, file_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, type, user_id, url], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Resource uploaded' });
    });
});

// Get Marketplace
app.get('/api/marketplace', (req, res) => {
    const sql = 'SELECT * FROM marketplace';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Post Product
app.post('/api/post-product', (req, res) => {
    const { name, price, description, category, seller_id, image } = req.body;
    const sql = 'INSERT INTO marketplace (product_name, price, description, category, seller_id, image_url) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, price, description, category, seller_id, image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product posted' });
    });
});

// Start Server
const startServer = (p) => { const s = app.listen(p, () => { console.log('Server running at http://localhost:' + p); }).on('error', (err) => { if (err.code === 'EADDRINUSE') { console.log('Port ' + p + ' busy, trying ' + (p + 1)); startServer(p + 1); } }); }; startServer(port);

