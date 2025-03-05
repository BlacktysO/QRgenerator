import express from 'express';
import qr from 'qr-image';
import fs from 'fs';
import inquirer from 'inquirer';

const app = express();
const port = 3000;

// Function to prompt the user for a URL
async function getWebsiteInput() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'websiteURL',
            message: 'Enter the website URL to generate QR code:'
        }
    ]);

    return answers.websiteURL;
}

// QR code generation and server setup
async function startServer() {
    const websiteURL = await getWebsiteInput();

    if (!websiteURL) {
        console.log('No URL provided. Exiting...');
        process.exit(1);
    }

    console.log(`Generating QR code for: ${websiteURL}`);

    const qrCode = qr.image(websiteURL, { type: 'png' });
    const qrPath = './qr-code.png';
    const qrStream = fs.createWriteStream(qrPath);
    qrCode.pipe(qrStream);

    qrStream.on('finish', () => {
        console.log(`QR code generated! Access it at: http://localhost:${port}/qr`);
    });

    // Serve the QR code in the browser
    app.get('/qr', (req, res) => {
        res.sendFile(qrPath, { root: '.' });
    });

    app.listen(port, () => {
        console.log(`QR generator running at http://localhost:${port}`);
    });
}

startServer();
