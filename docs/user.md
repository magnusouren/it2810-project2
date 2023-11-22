# User Implementation

Our login system is not intended to function properly or securely. It is purely a simulaton of user login to make the interaction with the website feel more like what we imagined it to be. The professor hinted in Piazza that projects with sofiesticated login systems took significantly longer to review. Therefore we decided to implement a simple login simulation to ensure our project was easier to review, and move our priorities to other parts of the project.

The user is given a random username and a UUID and when clicking the log in. It is stored strictly in local storage, however the UUID is used in the database to map the user to the ratings and watchlist. This means that the user can log in and out, and keep the watchlist and ratings. We have added a "Delete user" button to allow testers of the site to delete the user and start over with a new.

### Back to [documentation](./README.md).
