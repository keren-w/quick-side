# quick-(dec)side
A web app game that tests and provides feedback to the user on his reaction time and quick decision making.

###  Running the app

1. Clone the repository
git clone https://github.com/keren-w/quick-side.git`

2. cd quick-side

3. Npm install on both client and server folders

4. On root project folder: npm start


### Usage
1. An automatic route takes to /login page. Enter username and submit.

2. Click on 'Start game' to start a cycle of games.

3. When Finished, Click on 'Stop Game' to finish the round cycle.

4.  Check up the console - It will show an array of all the users (within the current server run) and their score - Leaderboard call.

### Tech stack
Client:React+Vite, React.context.

Server: expressJS, In-memory storage (chosen for simplicity - in production I would use a valid DB.)

### API
/users/: fetches all user objects and data from the server. Used to log leadeboard data on the console on game stop.

/users/login: Combines logic for loging in existing users or signing in new users. This is not a good practice and is done solely for the sake of a "thin" API.

/users/score: Updates a user score after every game stop. This is a decision I made so that the entire session round scores are being updated instead of each round - more calls.

### More possible additions:
- Add tests, especially for useGameLogic hook (I tried and left it for the time being)
- Change user: local state (context) can support more then one user at a time.
- Persistancy with auth and cookies/jwt.
- Showing the elements on various point on the screen computer later by right/left.