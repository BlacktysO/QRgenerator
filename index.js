import express from 'express';
import qr from 'qr-image';
import readline from 'readline';

const app = express();
const port = 3000;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the website name: ', (websiteName) => {
    console.log(`Website name: ${websiteName}`);
});

// QR code generation route
app.get('/generate', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a URL, e.g., /generate?url=https://example.com');
    }

    const qrCode = qr.image(url, { type: 'png' });
    res.type('png');
    qrCode.pipe(res);
});

// Start the server and keep it alive
app.listen(port, '0.0.0.0', () => {
    console.log(`QR generator running at http://0.0.0.0:${port}`);
});
