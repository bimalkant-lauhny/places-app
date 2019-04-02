Places Nearby
==============

Web App for searching places nearby you.


### Requirements for running

This webapp has been tested in an environment with the following -
1. node v10.15.3
2. npm 6.4.1
3. OS - Ubuntu 18.10


### Instructions to run

1. `clone` this repo anywhere in your system. Enter the cloned directory.
```sh
git clone https://github.com/code-master5/places-app.git
cd places-app
```
2. (optional, but recommended for better experience) Edit `src/index.html` file
    inside cloned directory. Find the following line in the file -
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC20Y-L9Za1Z8jGuTk4XAUsd8hS74iuNI4&libraries=places"></script>
```
The `key=AIzaSyC20Y-L9Za1Z8jGuTk4XAUsd8hS74iuNI4` part is my Google Maps API key with Places, Maps JavaScript and Geocoder APIs enabled. It has limited number of requests enabled. Therefore, I recommend that you create your own API key and replace it with your key.

```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places"></script>
```

3. Install required `npm` packages.
```sh
npm install
```
4. Build webapp for serving.
```sh
npm run-script build
```
You should see following output on your terminal after build is complete.
```sh
The build folder is ready to be deployed.
You may serve it with a static server:
    serve -s build
Find out more about deployment here:
    https://bit.ly/CRA-deploy
```
4. Serve after building.
```sh
serve -s build
```
You should see following output (or similar) on your terminal.
```sh
    Serving!
    - Local:            http://localhost:5000
    - On Your Network:  http://192.168.43.81:5000
    Copied local address to clipboard!
```

5. Open address `http://localhost:5000` in your browser.


### Using Webapp

1. After you open link `http://localhost:5000` in your browser, you'll be asked for location permission as shown in screenshot below.

    ![Location Permission](location-permission.png)
    
It is recommended that you allow app to access your location. (Custom Location Feature is under development! could not test it due to API restrictions. Sorry!)

2. Below is a screenshot of webapp.
    
    ![Screenshot](screenshot.png)

* Input Box on upper left side is for putting custom location (in case if you did not allow application to fetch your location)!
  (Custom Location Feature is under development! could not test it due to API restrictions. Sorry!)

* Input Box on upper right side is for Nearby Places queries. For example, if you type `pizza` and press `Search` button (or `Enter` key), it will fetch nearby locations where you can get a pizza.

* Map is visible on the lower left side of screen. It will show markers at locations on Nearby Places (after you submit a search query).

* List of Nearby Places is visible in form of scrollable cards on lower right side on screen (after you submit a search query). Each card has `Place Name` and `Place Address`. You can click on any card to zoom it's location on Map.


### Development

This webapp has been developed using `create-react-app` package and `Visual Studio Code`.
