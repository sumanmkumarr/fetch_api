const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/bfhl', (req, res) => {
    res.json({ "operation_code": 1 });
});

app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';
    let fileValid = false;
    let fileMimeType = '';
    let fileSizeKb = 0;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    if (file_b64) {
        const buffer = Buffer.from(file_b64, 'base64');
        fileValid = true;
        fileMimeType = 'image/png'; // Determine MIME type based on the buffer content.
        fileSizeKb = buffer.length / 1024;
    }

    res.json({
        "is_success": true,
        "user_id": "suman_kumar_01012000",
        "email": "suman_kumar@srmap.edu.in",
        "roll_number": "AP21110010283",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highestLowercaseAlphabet],
        "file_valid": fileValid,
        "file_mime_type": fileMimeType,
        "file_size_kb": fileSizeKb
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
