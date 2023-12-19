# Playlist App

A React, Redux and JavaScript web application

By Noah Kise & Henry Oberholtzer

## Techologies Used

- React
- Redux
- FireBase
- JavaScript
- WebPack
- React DND??


## Features

User Should
- Be able to submit a form
- Form
    - Form should have a field for playlist title
    - Form should have a field for playlist description
    - Form should have a field for playlist artwork
    - Form should have a dropdown field for "vibe" which is just nonsense questions
    - Form should have a field to let user pick a color (vibe) for the playlist
        - Colormind API?
    - Form should allow users to input a track
    - A track should have a place for the artist name, the track title, album?, year?, image?
        - Possible implementation of API call to retrieve data (autofill track fields?)
    - User should be able to change track order in playlist
    - User should be able to add a new track field as needed to increase playlist length
    - User should be able to set public vs. private
    - User can put in tags
- Form submission should be associated with a user
- Form data should get sent to firebase
- When viewing the dashboard, retrieve all playlists associated with the user (including private)
- When viewing the browse page, retrieve all playlists set to public on the server
- When viewing the broswer page, be able to filter results by genre or vibe
Eventually
- Be able to log in
- Be able to register an account
- Log in requires a username
- Log in will eventually require a password
- Be able to rate playlists (four to five stars)
- Generate a listenable playlist using an API call to service of choice?????????
- Print out the playlist on a document to give to your friends C:
    - It could be like a letter and you give it the mailing mailing address to print on it

## Component Structure

```
App
├── Header
│   │   - App Name
│   │   - Log In
│   │   - Navigation for Mainpage
│   ├── MainPage
│   │   ├── BrowsePage
│   │   │   - View All Posts
│   │   │   - Includes all filters for playlists on the top of the page
│   │   │   - See the playlists listed with images & their colors
│   │   │   ├── PlayListItemComponent
│   │   │   │   - Click on change size and reveal playlist contents
│   │   │   │   - Displays image and vibe color
│   │   ├── UserDashboard
│   │   │   ├── PlayListItemComponent
│   │   │   - Modify profile picture if implemented
│   │   │   - Modify username if implemented
│   │   │   - Modify password if implemented
│   │   │   - See all user playlists
│   │   ├── PlaylistForm
│   │   │   - See above features, creates a new playlist
│   │   │   - Will also serve as the playlist editing form
│   │   ├── LogInPage
│   │   │   - Allows user to log in
│   │   ├── RegistrationPage
│   │   │   - Allows user to register
```

### Licenses

CD image via [Wikimedia](https://commons.wikimedia.org/wiki/Compact_disc#/media/File:CD_autolev_crop_new.jpg)