IEM HELP WEBSITE PROJECT

--------------------------------------------------------------------------------
SETUP INSTRUCTIONS
--------------------------------------------------------------------------------

1. MOVE PROJECT FOLDER
   - Move this entire "IEM_HELP_WEBSITE" folder to your Desktop (or any preferred location).

2. PREREQUISITES
   - Install Node.js (https://nodejs.org/)
   - Install MySQL Server (https://dev.mysql.com/downloads/installer/)

3. DATABASE SETUP
   - Open your MySQL Workbench or Command Line.
   - Run the script located in "database/schema.sql" to create the database and tables.
     Command: `source database/schema.sql` inside MySQL shell.
   - NOTE: Update the database password in "server/server.js" (line 23) if you have set a password for your root user.

4. INSTALL DEPENDENCIES
   - Open VS Code or Terminal inside the "IEM_HELP_WEBSITE" folder.
   - Run the following command:
     npm install

5. RUN THE SERVER
   - Run the command:
     npm start

   - You should see: "Server running at http://localhost:3000" and "Connected to MySQL database".

6. ACCESS THE WEBSITE
   - Open your browser and go to:
     http://localhost:3000/index.html

--------------------------------------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------------------------------------
/css        - Stylesheet (style.css)
/js         - Frontend logic (auth.js, events.js, etc.)
/server     - Backend Node.js server (server.js)
/database   - SQL Schema (schema.sql)
*.html      - Web pages

--------------------------------------------------------------------------------
FEATURES
--------------------------------------------------------------------------------
- Signup/Login with @college.edu validation.
- Create and View Events.
- Create and Join Teams.
- Leaderboard (Mock Data).
- Resource Sharing (Upload/View).
- Marketplace (Buy/Sell).

Enjoy!
