# Feeback from fellow students on P2

This document contains the feedback we received from fellow students after the deliveries. We have divided the feedback into P2-1 and P2-2, Some of the feedbacks that were frequently mentioned are collected into one feedback in this document. The feedbacks are translated from Norwegian to English. We have furthered reflected on the feedbacks and written down our thoughts about them. After making improvements, we have written down what we have done to improve the feedbacks.

# P2-1

## Remove filtering and sorting on the page of movies

### Feedback

When I sort alphabetically and don't want to sort again, nothing happens. You might want to consider making the page revert to default when clicking “none” for sorting. This applies to both sorting by rating and alphabetically.

### Our reflection

We have not thought about this before. We have now added a function that resets the sorting and filtering, even with a clear button or when clicking on the “none” option.

## Design of the detailed movie page

### Feedback

- Some design elements have padding and rounded corners, while others don't.
- Some design elements use dark color tones, whereas others are light.
- The background doesn't seem to have a consistent fill, causing the generic background image for the page to cut through.
- On the movie page, there should be added margin or padding at the bottom to provide some space below the text.
- The background might be confusing in terms of contrast. Suggestions include blurring the background or changing its color.

### Our reflection

This is usefull feedback on the design of the movie page. We will try to redesign the page to make it more user friendly.

### Improvements

Fixed in [#43](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/43) and implemented with [!23](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/23)

## Go back button on the detailed movie page

### Feedback

There's a need for a back button on the detailed movie page. Currently, users have to click on the site's logo to navigate back.

### Our reflection

We have not thought about this before. We have now added a back button on the detailed movie page. This function should also remember the previous state of page, genre, and sorting.

### Improvements

Fully implemented in [!46](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/46) and [!47](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/47).

## Functionality when logged in vs logged out

### Feedback

There's a functionality that allows users to add movies to a watchlist even when they are not logged in, but these movies don't actually get added to a watchlist. This is confusing for users.

### Our reflection

This is a bug we have not thought about before. We should fix this bug similar to have the rating works. When user is not logged in, user should be able to just read about the movies, not rate or put to watchlist.

### Improvements

Implicitly implemented with other updates.

## Search functionallity

### Feedback

The search feature only navigates to individual movie results, rather than displaying multiple results at once.

### Our reflection

We will look into how much functionality we can add to the search functionallity. As it is now the functionallity is limited, and we will look into how we can improve it.

# P2-2

## Design choice of filtering and sorting

### Feedback

I would combine the sorting menus, since one (obviously) cannot use both at the same time. I don't see the advantage of having two different dropdown menus when they have the same functionality.

![filtering and sortine](./img/filterSort.png)

### Our reflection

We have not thought about this before. We have now combined the sorting menus into one. This should be done to make the page more user friendly.

### Improvements

Solved in [!42](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/42/commits)

## Filtering result count

### Feedback

It is not possible to see how many movies I have before/after filtering.

### Our reflection

This is true, we have not impelemented a count for the results. We will look into how we can implement this.

### Improvements

Fixed in [#70](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/70) and implemented in [!42](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/42).

## Filter and sort clear button

### Feedback

I would add a button to reset the filters and sorting. Right now, if I have chosen sorting and filtering, I have to go into both and choose “None” to reset them.

### Our reflection

This is a valid point. We have now added a clear button to reset the filters and sorting. We have decided to keep the filters if the user navigates to another page, but the filters and sorting will be reset if the user refreshes the page.

### Improvements

Fixed in [#69](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/69) and implemented in [!42](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/42).

## Searching for movies

### Feedback

I wish there was a connection between search and filtering/sorting/pagination. Right now, they are separate, and it's not possible to use them interchangeably. This means, for example, I can't see which of the movies in a film series is the highest rated.

### Our reflection

This is a good idea. We will look into how we can implement this if time allows it.

## Static genres-file to map genre-ids to genre-names

### Feedback

It's missing fetching categories from the database. Here you are using a hardcoded 'categories.json'.

### Our reflection

This is something we should fix. We should use the database to fetch the categories. When fetching a movie, we can populate the categories with the genre-ids, and then get data from the database to get the genre-names.

### Improvements

Solved in [#65](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/65).

## Watchlist button

### Feedback

The watchlist button is small, and it's not clear what it does. I would make it bigger and add a describing text.

### Our reflection

We have not thought about this before. We should make the watchlist button bigger and add a text to it. In combination with the hidden link to watchlist page, it is not clear that it exists a watchlist page and functionality.

### Improvements

Implemented in [!41](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/41).

## Rating movies interract with the database

### Feedback

The rating system is not connected to the database. This means that the ratings are not saved when the page is reloaded.

### Our reflection

As it is now, we have saved the rating to the database, but it is not affecting the data about the movie. We should look into how we can make the rating affect the data about the movie.

### Improvements

Fixed in [#62](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/62) and implemented in [!39](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/39)

## User Logic

### Feedback

1. If you log out and refresh the page, you are logged in.

2. I am a little confused - it looks like you generate random usernames and such if you try to log in?

### Our reflection

This is a bug we have not noticed before. We will implement a new user-logic to make sure the user does not automatically get logged in.

About the implementation of user, it is true that we generate random usernames. Full explenation of this can be found in the [user.md](./user.md) file.

### Improvements

Fixed in [#66](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/issues/66) Implemented in [!38](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/38).

# P2-3

## Combine filtering and search

### Feedback

I would combine the filtering and search functionality. Right now, they are separate, and it's not possible to use them interchangeably. This means, for example, I can't see which of the movies in a film series is the highest rated.

### Our reflection

This is a good idea. Unfortunately, we did not have time to implement this.

## Removing movie from watchlist

### Feedback

When I am inside Watchlist and remove a movie, I expect it to disappear from there right away

### Our reflection

This is a valid point, and we have thought about it. However, we concluded that it is annoying if the movie disappears right away in case of a misclick. We have therefore decided to keep the movie in the watchlist until the user refreshes the page. We could have applies a delay to the removal of the movie, but we focused on other functionality.

## Home page

### Feedback

Site-navigation feels a bit unnatural, it's not quite intuitive that home (logo) = search.

### Our reflection

As a home-page and a search page would look and function very similar, we decided to set the landing page as the main page with the search functionality.

## Movie pictures

### Feedback

I would use WEBP instead of jpg for the images, as it is a more modern format and that reduces climate impact.

### Our reflection

This is a good idea, however we are restriced by the dataset we are using as it has stored the URLs for jpg images. We have not found a good way to convert the images to WEBP.

## Keyboard navigation

### Feedback

1. It is possible to "tab" to components you cannot interact with.
2. It is sometimes hard to see which component is focused when navigating with the keyboard.

### Our reflection

1. This is because we have used the `tabindex` attribute to make certain text-components focusable. This allows screenreaders to read the text.
2. This was something we were aware of with the delivery. We have since then added a focus indicator to the components that are focusable.

### Improvements

2. Fixed in [!60](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-16/prosjekt-2/-/merge_requests/60).

## Skeleton loading

### Feedback

It would be nice to have a skeleton loading animation while waiting for the data to load, to prevent the page from "jumping".

### Our reflection

This is a good idea, and we have thought about it. However, we decided to focus on other functionality as it would add additional computational requirements to the client, and not reflect our focus on sustainable development.

### Back to [documentation](./README.md).
