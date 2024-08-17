const express = require('express');
const app = express();
const port = 3000;
const items = require('./data/project.json');
// Middleware to parse JSON bodies
app.use((req, res, next) => {
    console.log(`Requested endpoint: ${req.method} ${req.originalUrl}`);
    next();
});



// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
