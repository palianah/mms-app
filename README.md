# mms-app

A test application to query Github's Graph QL API. The application should query Github's GraphQL API for issues in facebook/react. issues should be searchable, and sortable (asc/desc).

It is bootstrapped with create-react-app
* Uses Jest for testing
* Flowtype for type checking
* React Router for routing
* Redux for state managment
* Axios for fetching the data
* Has a caching system for data
** Localstorage at the moment but the storage could be replaced as it has an abstraction wrapped around LS
* Works offline (assuming cached data - localStorage)
* Uses an intersection observe to load profile images in the list of issues
* Only tested on chrome as no time to do real browser testing
* There are some bugs and a few things still to do... 

Todo:
* View issue in detail still not done
** Comments should be loaded here
* Fix bugs in caching
* Get cahcing to work before the network requests fire.
* Offer the ability to change repo owner and name (actions and reducers exist but no time was available to allow this)
