# mms-app

A test application to query Github's Graph QL API. The application should allow the user to search issues in facebook/react and be sortable (asc/desc).

The project's wiki contains links to useful information discovered whilst developing. 

The search criteria are key value pairs (just like you see added in github's issues search box). See the wiki for a link containing possible terms/values.

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
* The caching is primative due to time constraints
* Is multilingual (using a translation component) - change the default lang in the HTML in the dev version to DE to view german - no real translation. just showing that it works.
* Works offline (assuming cached data - localStorage)
* Uses an intersection observer to load profile images in the list of issues
* Only tested on chrome as no time to do real browser testing
* Login requires a valid Github Token. A link is contained within the app for those that don't know where to get them.
* There are some bugs and a few things still to do... 

## Todo:
* View issue in detail still not done (Comments should be loaded here...)
* Fix bugs in caching
* Get caching to work before the network requests fire.
* Offer the ability to change repo owner and name (actions and reducers exist but no time was available to allow this)
* Test coverage is NOT 100% - there are still certain things to test
* Dan Abramov's opinion is that 100% coverage is often unrealistic: https://github.com/facebook/create-react-app/issues/1386
* Maybe for a test app like his it should be doable?
* Currently the home layout is just a stub and now route matches it. It i sthere in case I had time to add a "home" page.

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

**Search the repo with the app for issues whilst online**

**Go offline - really, don't use chromes dev tools - the CSS/Fonts are not served by CRA's serviceworker when simulated - at least not in my tests! Switching on Aeropolane mode worked (at least on Ubuntu)**
* naviagtor.onLine is always true if the browser can make a connection to a LAN or a router
* Just turning the wifi in UBUNTU off didn't seem to change navigator.onLine
