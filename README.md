# mms-app

A test application to query Github's Graph QL API. The application should allow the user to search issues in facebook/react and be sortable (asc/desc).

## Time Spent Developing:
6 Days (4 whilst working full time + a weekend) 

## It is bootstrapped with create-react-app
* Uses Jest for testing
* Flowtype for type checking
* React Router for routing
* Redux for state managment
* Axios for fetching the data
* YUP for validating user input
* Has a caching system for data (Localstorage at the moment but the storage could be replaced as it has an abstraction wrapped around LS)
* Works offline (assuming cached data - localStorage)
* Uses an intersection observer to load profile images in the list of issues
* Only tested on chrome as no time to do real browser testing
* There are some bugs and a few things still to do... 

## Todo:
* View issue in detail still not done (Comments should be loaded here...)
* Fix bugs in caching
* Get caching to work before the network requests fire.
* Offer the ability to change repo owner and name (actions and reducers exist but no time was available to allow this)
* Test coverage is NOT 100% - there are still certain things to test

## To Run:
**Clone repo**

**"npm install"**

**"npm run start"**
* Run the dev version

**"npm run build"**
* Makes the production ready version
* Install serve: "sudo npm install -g serve"
* After building run "serve -s build" to start the build version

**"npm run test"**
* Run jest

**"npm run testv"**
* Run jest in verbose mode

**"npm run testc"**
* Run jest coverage
