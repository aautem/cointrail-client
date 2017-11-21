# Cointrail

> An online Connect 4/Tic-Tac-Toe hybrid with no tie games. The client repo contains the Android/iOS codebase built with React Native while the API repo contains the web socket server and RESTful API.

## Table of Contents

* [Google Play](#google-play)
* [Development](#development)
  * [Cointrail API](#cointrail-api)
    * [MongoDB](#mongodb)
    * [Auth0](#auth0)
    * [Starting the Server](#starting-the-server)
  * [Cointrail Client](#cointrail-client)
    * [Available Scripts](#available-scripts)
      * [npm run android](#npm-run-android)
      * [npm run ios](#npm-run-ios)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Resources](#resources)

## Google Play

The alpha version of Contrail is currently available in the [Google Play Store](https://play.google.com/store/apps/details?id=com.cointrail&hl=en) for testing and feedback. Thank you in advance to anyone taking the time to download and play the game.

## Development

For best results, work off of the `develop` branch in the client and API repositories.

### Cointrail API

Running this application locally requires a separate [API repository](https://github.com/aautem/cointrail-api) for the web socket server and RESTful API and will need some custom configuration.

First, run `npm install` from the root directory to download the dependencies.

#### MongoDB

On line 2 of `./database/db.js` you will need to plug in your own local [MongoDB](https://www.mongodb.com/) URI.

#### Auth0

You will also need to create an [Auth0](https://auth0.com/) client for authentication with Google and Facebook connections. Auth0 already provides dev keys for these two platforms so you'll just have to enable them. Add the following to your client's "Allowed Callback URLs":

```
http://localhost:3000/callback,
com.cointrail://${YOUR_AUTH0_DOMAIN}/android/com.cointrail/callback,
org.reactjs.native.example.cointrail://${YOUR_AUTH0_DOMAIN}/ios/org.reactjs.native.example.Cointrail/callback
```

Plug your Auth0 client credentials into the `./config.js` file.

#### Starting the Server

Run `npm start` from the root directory and navigate to `localhost:3000` in your browser where you'll see the text `.~::  C O I N T R A I L  ::~.` if your server is running correctly.

### Cointrail Client

- Run `npm install` from the root directory to download the dependencies.
- Update the `API_URL` constant on line 2 of `./src/utilities/const.js` to use your locally running server at `localhost:3000` from above.
- Update `./android/local.properties` to point to the location of your Android SDK.
- Add this to your `./android/settings.gradle` file to correctly configure Auth0:
```
rootProject.name = 'Cointrail'
include ':react-native-auth0'
project(':react-native-auth0').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-auth0/android')

include ':app'
```
- Format the .MainActivity portion of your AndroidManifest.xml file to look like so, plugging your Auth0 domain into the `android:host` property:
```
<activity
  android:name=".MainActivity"
  android:label="@string/app_name"
  android:launchMode="singleTask"
  android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
  android:screenOrientation="portrait"
  android:windowSoftInputMode="adjustResize">
  <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
  <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data
          android:host="${YOUR_AUTH0_DOMAIN}"
          android:pathPrefix="/android/${applicationId}/callback"
          android:scheme="${applicationId}" />
  </intent-filter>
</activity>
```
- Add this to your `./android/app/build.gradle` file to manually link vector icons:
```
// React Native vector icons
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```
- Run `react-native link` from the root directory to link any other unlinked dependencies.

#### Available Scripts

##### `npm run android`

Runs your app in development mode and attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

##### `npm run ios`

Runs your app in development mode and attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

If this command fails, manually launch the Xcode project file in `./ios` then "Clean," "Build" and "Run." 

### Roadmap

Please find the Cointrail roadmap and open issues [here](https://github.com/aautem/cointrail-client/issues).

## Contributing

Please see `./.eslintrc.json` for style guidelines and thank you in advance for any PRs. I appreciate the help!

## Resources

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app) and has since been ejected.