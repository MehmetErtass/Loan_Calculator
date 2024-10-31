const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index')); // Adjust if your file is named differently
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
