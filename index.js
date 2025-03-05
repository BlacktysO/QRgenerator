import express from 'express';
import qr from 'qr-image';

const app = express();
const port = 3000;

app.get('/generate', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a URL, e.g., /generate?url=https://example.com');
    }

    const qrCode = qr.image(url, { type: 'png' });

    res.type('png');
    qrCode.pipe(res);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`QR generator running at http://0.0.0.0:${port}`);
});
