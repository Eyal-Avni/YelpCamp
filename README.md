# YelpCamp
This is an implementation of a Node.js application as taught on Udemy course - The Web Developer Bootcamp by Colt Steele

Try a deployed demo at: [https://young-cliffs-59519.herokuapp.com/](https://young-cliffs-59519.herokuapp.com/)

## About
This is an educational project done in order to deepen my knowledge with several web development technologies
## Features

* Authentication and Authorization:
  
  * User login with username and password
  
  * Camps and reviews can be viewed by non-users
  
  * Logged in users can create new camps and reviews. 

  * Camps and reviews can be edited and removed only by the creating user
  
* Additional features:
  
  * View camp location on map useing the Mapbox API.
  
  * Upload photos of camps and storing them at Cloudinary (using Cloudinary API) 
  
 
## Installation

```sh
git clone https://github.com/lucasweng/yelp-camp.git
```

### Install dependencies

```sh
npm install
```

## Technologies in use

### Front-end

* [ejs](http://ejs.co/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)

### Back-end

* [express](https://expressjs.com/)
* [mongoDB](https://www.mongodb.com/)
* [mongoose](http://mongoosejs.com/)
* [async](http://caolan.github.io/async/)
* [helmet](https://helmetjs.github.io/)
* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#passport-local)
* [express-session](https://github.com/expressjs/session#express-session)
* [method-override](https://github.com/expressjs/method-override#method-override)
* [cloudinary](https://cloudinary.com/)
* [geocoder](https://github.com/wyattdanger/geocoder#geocoder)
* [connect-flash](https://github.com/jaredhanson/connect-flash#connect-flash)

### Platforms

* [Cloudinary](https://cloudinary.com/)
* [Mapbox](https://www.mapbox.com/)
* [Heroku](https://www.heroku.com/)
