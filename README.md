# ablr Demo App
This is the front end of a demo application that retrieves user's personal data from the Singpass MyInfo system.

## Prerequisite
This is a React application. Install the latest npm from https://www.npmjs.com/get-npm to run the application.

## Setting up the environment variables
In order to connect to the backend APIs, we need to specify the API root url. Set the environment variable
`REACT_APP_API_ROOT` to the API root url (e.g. `http://localhost:8000`) before running the application. 
The default api root is set to `http://localhost:8000`.

Since the callback URL of MyInfo test environment is `http://localhost:3001/callback`, we need to run the frontend
application on port 3001.

## Running the development server
To run the development server using npm:
```shell script
# Set API root
export REACT_APP_API_ROOT=http://localhost:8000
# Set port
export PORT=3001
# Install dependencies
npm install
# Start the development server
npm start
```
The application should now be running on `localhost:3001`.
