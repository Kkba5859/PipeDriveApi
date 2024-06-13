const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const clientId = '65ea62639f4f8d25';
const clientSecret = '850615bb570d4b9351603b7ef38b2db2db8b4c97';
const redirectUri = 'https://5ab8-185-70-52-126.ngrok-free.app/'; 

let accessToken = '704c1b73908f8e581ee6725190ad6b1bf0084f67'; 

app.use(express.json());
app.use(express.static('public'));

// Route to handle OAuth installation
app.get('/install', (req, res) => {
    const authorizationUrl = `https://oauth.pipedrive.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    res.redirect(authorizationUrl);
});

// Route to handle OAuth callback
app.get('/callback', async (req, res) => {
    const authorizationCode = req.query.code;

    try {
        const response = await axios.post('https://oauth.pipedrive.com/oauth/token', {
            grant_type: 'authorization_code',
            code: authorizationCode,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri
        });

        accessToken = response.data.access_token;
        res.send('Authorization successful!');
    } catch (error) {
        console.error('Error getting access token:', error);
        res.status(500).send('Authentication failed');
    }
});

// Route to serve iframe content
app.get('/iframe', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to handle form submissions
app.post('/api/create-job', async (req, res) => {
    const formData = req.body;

    try {
        // Perform API calls to create job in Pipedrive using formData
        const response = await axios.post('https://api.pipedrive.com/v1/deals', formData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        res.json({ message: 'Job created successfully', data: response.data });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).send('Error creating job');
    }
});

app.post('/api/save-info', async (req, res) => {
    const formData = req.body;

    try {
        // Perform API calls to save info in Pipedrive using formData
        const response = await axios.put('https://api.pipedrive.com/v1/deals/1', formData, { // Replace with actual deal ID
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        res.json({ message: 'Info saved successfully', data: response.data });
    } catch (error) {
        console.error('Error saving info:', error);
        res.status(500).send('Error saving info');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
