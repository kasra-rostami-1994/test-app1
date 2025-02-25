const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve the HTML page
app.get("/", (req, res) => {
    res.send(`
        <html>
        <head><title>Greeting Page</title></head>
        <body>
            <h1>Welcome to My Page!</h1>
            <p><a href="/server.js">Click here to view server.js</a></p>
        </body>
        </html>
    `);
});

// Serve server.js as a downloadable file
app.get("/server.js", (req, res) => {
    res.sendFile(path.join(__dirname, "server.js"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
