const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

// Verification endpoint
app.post('/verify', async (req, res) => {
    if (!req.body.reference) {
        return res.status(400).send('Transaction reference not found');
    }

    try {
        const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${req.body.reference}`,
            {
                headers: {
                    'Authorization': 'Bearer secret_key'
                }
            }
        );

        if (response.data.data && response.data.data.status === 'success') {
            res.send('success');
        } else {
            res.send('Transaction was unsuccessful');
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).send('Transaction verification failed');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});