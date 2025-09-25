const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Example route
app.post('/user/signup', (req, res) => {
    // Dummy response for signup
    res.json({ message: 'Signup successful', data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});