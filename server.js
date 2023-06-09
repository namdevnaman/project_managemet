const { google } = require("googleapis");
const fs = require("fs");

const express = require('express');
const { google } = require('googleapis');
const credentials = JSON.parse(fs.readFileSync("credentials/credentials.json"));
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const app = express();
const port = 3000;

// Google Calendar API credentials
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

// Google Calendar API authentication
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

// After the user grants permission, obtain the authorization code and exchange it for an access token
// Add your code here

// Generate the authorization URL
function getAuthUrl() {
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
}
const express = require("express");
const app = express();
const { google } = require("googleapis");
const fs = require("fs");

// Step 2: Load the required modules

// Step 3: Load the Google credentials and create OAuth2 client
const credentials = JSON.parse(fs.readFileSync("credentials/credentials.json"));
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

// Step 4: Set up authorization flow and obtain access token
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

// After the user grants permission, obtain the authorization code and exchange it for an access token
// Add your code here

// Step 5: Save the access token and refresh token
fs.writeFileSync("credentials/token.json", JSON.stringify(token));

// Step 6: Load the access token and refresh token
const token = JSON.parse(fs.readFileSync("credentials/token.json"));
oAuth2Client.setCredentials(token);

// Step 7: Create a function to create a new event in Google Calendar
async function createCalendarEvent(project) {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: project.name,
    start: {
      date: project.startDate,
    },
    end: {
      date: project.endDate,
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    console.log("Event created: %s", response.data.htmlLink);
  } catch (error) {
    console.error("Error creating event:", error);
  }
}

// Step 8: Call createCalendarEvent after saving the project
app.post("/create-project", (req, res) => {
  const project = req.body;
  
  // Save project to local storage or send to server
  // Add your code here

  // Create calendar event
  createCalendarEvent(project)
    .then(() => {
      res.status(200).json({ message: "Project created successfully." });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating project." });
    });
});

// Rest of your existing server-side code

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Exchange the authorization code for access and refresh tokens
async function exchangeToken(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
}

// Create an event in Google Calendar
async function createEvent(projectName, startDate, endDate) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const event = {
    summary: projectName,
    start: {
      date: startDate,
    },
    end: {
      date: endDate,
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  console.log('Event created:', response.data);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/auth', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;
  const tokens = await exchangeToken(code);

  // Store the tokens in a database for future use
  // (e.g., associate with the user's profile)

  res.send('Authorization successful!');
});

app.post('/projects', express.json(), async (req, res) => {
  const { projectName, startDate, endDate } = req.body;

  // Create event in Google Calendar
  await createEvent(projectName, startDate, endDate);

  const project = {
    projectName,
    startDate,
    endDate,
  };

  res.status(200).json(project);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
