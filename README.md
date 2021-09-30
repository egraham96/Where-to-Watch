## User Story

```md
AS a user who likes to watch movies using subscription services
I WANT a website 
SO THAT I can track movies on my watch list and where they are streaming
```

## Acceptance Criteria

```md
GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes suggestions for popular movies; navigation links for the homepage and my movie list; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the movie list, and the option to log out
WHEN I click on the homepage option in the navigation AND I am signed in
THEN I am taken to the homepage and presented with my movie list that include where specific movies of my choice are being streamed 
WHEN I click on an movie
THEN I am presented with the movie title, streaming options, average viewer ratings
WHEN I click on the movie list option in the navigation
THEN I am taken to the movie list page and presented with my list of movies, ability to remove a move from the list, and the ability to add a movie to the list
WHEN I click on the button to add a new movie
THEN I am prompted to enter the title of the movie
WHEN I enter the title of the movie, 
THEN the movie will be added to my list if it exists in the API database
WHEN The movie does not exist in the database and I want to add it, 
THEN we do a search on the internet for the movie and add it to the database
WHEN I attempt to add a movie that doesn't exist, 
THEN an error message appears to inform me the movie doesn't exist
WHEN I click the button to delete a movie
THEN the movie is removed from my list. 
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view the page but I am prompted to log in again before I can add, update, or delete from my movie watchlist
