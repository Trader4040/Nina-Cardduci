const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Sample data
let items = [
    { id: 1, name: "Item One" },
    { id: 2, name: "Item Two" }
];

// Routes

// GET all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
});

// POST a new item
app.post('/items/id', (req, res) => {
    const newitem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newitem);
    res.status(201).json(newitem);
});

// PUT update an item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ message: "Item not found" });
    item.name = req.body.name;
    res.json(item);
});

// DELETE an item
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.json({ message: "Item deleted" });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Star server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});