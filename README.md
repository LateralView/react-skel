## A React.js Skeleton born with redux on mind

# spotify-exercise

## A Frontend developer exercise

This exercise is made to test your abilities to solve a typical frontend issue.

### Context

Basically, you'll need to connect to spotify api to be able to do album searchs, then from our backend show the current comments, allowing the user to put a comment on a album. 
The application should be fully responsive, as target from iphone 5 to desktop (1080p).


### Features

- Webpack Configured with a bunch of loaders of common use
  - NODE_ENV and API_URL Variable Replacement for a fast environment switching
  - HMR Configured as Development
  - Webpack Dev Server Configured for Development
  - Babel6, Babel-Polyfill and whatwg-fetch to being able to use latest ES6+ Features
  - Image Optimization with `image-webpack-loader`
  - Sass and PostCSS, with `style-loader` on development
  - react-toolbox & material-icons assets
  - normalize.css
  - React Router v4

- Use Redux as State Manager, and Redux-Saga as Side Effect Manager
- Unit Test Stack:
  - Jest, as Test Runner
  - Chai, as assertion Manager
  - Sinon, as Stub/Spy/Mock Library

- Dev
  - Eslint configured with common good practices
  - Prettier to control the code styling
  - Jest will run the test for the affected files on each commit
  - All will be validated by a git pre commit hook


  ### How to run (With Docker, Recommended)

#### Backend
1. Install [Docker](https://www.docker.com/) in your computer.
1. Run `docker-compose up` and open your browser pointing to `http://localhost:3000`
   * If you want to make it run in any other port, create a `.env` file with this data: `APP_PORT=3000`, Replace 3000 with the desired port
   
#### Frontend
1. run `npm install` to install project dependencies.
2. run `npm run dev` to run the front-end.

### Endpoints
The backend exposes the following endpoints:

- GET /search?q=:searchPayload    -> Returns a filtered list
- GET /album/:albumId             -> Returns album details
- GET /comments/:albumId          -> Returns album comments
- POST /comments                  -> Create a new comment
    - Body: { albumId: String, email: String, text: String }

### Spotify credentials
To comunicate to Spotify through our backend, you must have a Spotify access token. To get this access token, login in:

https://developer.spotify.com/dashboard/

- Create an App and follow the steps
- After creating the App, a `client_id` and a `client_secret` will be provided

Once you have the keys, create `.env` file in the root directory with the following env variables:

```
SPOTIFY_CLIENT_ID=<client_id>
SPOTIFY_CLIENT_SECRET=<client_secret>
```

### Designs

Ask for permissions of the designs, [Zeplin](https://zeplin.io/) is required.
There is a [Preview of the Zeplin Design](https://scene.zeplin.io/project/582b01162ad47b3e76efd0e7)
