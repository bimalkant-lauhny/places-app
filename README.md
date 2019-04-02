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

### Development

This webapp has been developed using `create-react-app` package and `Visual Studio Code`.
