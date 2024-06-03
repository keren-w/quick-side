# quick-side
A web app game that tests and provides feedback to the user on his reaction time and quick decision making.

I chose to use in memory storage for the matter of the assignment. needless to say in producting I would use a valid DB.

###API
The API call for '/login' combines logic for loging in existing users or signing in new users. This is not a good practice and is done solely for the sake of a "thin" API.

More possible additions:
- local state (context) can support more then one user at a time.
- persistancy with auth and cookies/jwt.