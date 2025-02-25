const express = require('express');
const app = express();
const path = require('path');

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TransFor Sign In</title>

        </head>
        <body>
            <div class="container">
                <h1>TransForm Homes Sign in/Sign Out</h1>
                <form>
                    <input type="text" placeholder="FULL NAME" required>
                    <input type="text" placeholder="COMPANY NAME" required>
                    <!-- Dropdown for Jobsite Names -->
                    <select required>
                        <option value="" disabled selected>Select Jobsite</option>
                        <option value="jobsite1">Jobsite 1</option>
                        <option value="jobsite2">Jobsite 2</option>
                        <option value="jobsite3">Jobsite 3</option>
                        <option value="jobsite4">Jobsite 4</option>
                    </select>

                    <div class="checkbox-group">
                        <label>
                            <input type="checkbox" required> I have read and signed any high risk work SWMS's
                        </label>
                        <label>
                            <input type="checkbox" required> I have been inducted into this site
                        </label>
                    </div>

                    <button type="submit">Sign in</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net:${PORT}`);
});