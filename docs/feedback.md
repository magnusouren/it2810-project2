# Feebacks from fellow students on P2

This document contains the feedback we received from fellow students after the deliveries. We have divided the feedback into P2-1 and P2-2, Some of the feedbacks that were frequently mentioned are collected into one feedback in this document. The feedbacks are translated from Norwegian to English. We have furthered reflected on the feedbacks and written down our thoughts about them. After making improvements, we have written down what we have done to improve the feedbacks.

## P2-1

### Remove filtering and sorting on the page of movies

#### Feedback

When I sort alphabetically and don't want to sort again, nothing happens. You might want to consider making the page revert to default when clicking “none” for sorting. This applies to both sorting by rating and alphabetically.

#### Our reflection

We have not thought about this before. We have now added a function that resets the sorting and filtering, even with a clear button or when clicking on the “none” option.

#### Improvement

TODO

### Design of the detailed Movie page

#### Feedback

- Some design elements have padding and rounded corners, while others don't.
- Some design elements use dark color tones, whereas others are light.
- The background doesn't seem to have a consistent fill, causing the generic background image for the page to cut through.
- On the movie page, there should be added margin or padding at the bottom to provide some space below the text.
- The background might be confusing in terms of contrast. Suggestions include blurring the background or changing its color.

#### Our reflection

This is usefull feedback on the design of the movie page. We will try to redesign the page to make it more user friendly.

#### Improvements

TODO

### Go back button on the detailed Movie page

#### Feedback

There's a need for a back button on the detailed movie page. Currently, users have to click on the site's logo to navigate back.

#### Our reflection

We have not thought about this before. We have now added a back button on the detailed movie page. This function should also remember the previous state of page, genre, and sorting.

#### Improvements

TODO

### Functionality when logged in vs logged out

#### Feedback

There's a functionality that allows users to add movies to a watchlist even when they are not logged in, but these movies don't actually get added to a watchlist. This is confusing for users.

#### Our reflection

This is a bug we have not thought about before. We should fix this bug similar to have the rating works. When user is not logged in, user should be able to just read about the movies, not rate or put to watchlist.

#### Improvements

TODO

### Search functionallity

#### Feedback

The search feature only navigates to individual movie results, rather than displaying multiple results at once.

#### Our reflection

We will look into how much functionality we can add to the search functionallity. As it is now the functionallity is limited, and we will look into how we can improve it.

#### Improvements

TODO

## P2-2

### Design choice of filtering and sorting

#### Feedback

I would combine the sorting menus, since one (obviously) cannot use both at the same time. I don't see the advantage of having two different dropdown menus when they have the same functionality.

![filtering and sortine](./img/filterSort.png)

#### Our reflection

We have not thought about this before. We have now combined the sorting menus into one. This should be done to make the page more user friendly.

#### Improvements

TODO

### Searching for movies

#### Feedback

I wish there was a connection between search and filtering/sorting/pagination. Right now, they are separate, and it's not possible to use them interchangeably. This means, for example, I can't see which of the movies in a film series is the highest rated.

#### Our reflection

This is a good idea. We will look into how we can implement this if time allows it.

#### Improvements

TODO

### Static genres-file to map genre-ids to genre-names

#### Feedback

It's missing fetching categories from the database. Here you are using a hardcoded 'categories.json'.

#### Our reflection

This is something we should fix. We should use the database to fetch the categories. When fetching a movie, we can populate the categories with the genre-ids, and then get data from the database to get the genre-names.

#### Improvements

Solved in [#65](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/65)

TODO

### Watchlist button

#### Feedback

The watchlist button is small, and it's not clear what it does. I would make it bigger and add a describing text.

#### Our reflection

We have not thought about this before. We should make the watchlist button bigger and add a text to it. In combination with the hidden link to watchlist page, it is not clear that it exists a watchlist page and functionality.

#### Improvements

TODO

### Rating movies interract with the database

#### Feedback

The rating system is not connected to the database. This means that the ratings are not saved when the page is reloaded.

#### Our reflection

As it is now, we have saved the rating to the database, but it is not affecting the data about the movie. We should look into how we can make the rating affect the data about the movie.

#### Improvements

TODO
