Nick Engeldinger - Zoom Care coding exercise

I created an events list app served from a NodeJS Express server using Angular 1.5 that utilizes pre 1.5 architecture (not a component based design) and ES6. The /app folder contains the development JS files in three sub-directories /modules, /controllers, /filters which contain the various parts of the application. These parts are watched via gulp and concatanted into the app.js file which is then placed in the root/public/js directory. 

Express serves the app via the events.html file when a visitor hits localhost:3000/events, all other page requtests will return a 404. The /public directory is exposed for the inculsion of static assets, in this case our production css and js, as well as our fonts. Development css is written in scss in the root/scss directory which is watched via gulp. Gulp preprocesses, concatenates, amd minifies the css and then places the styles.min.css in the public/css directory. I've also included other dependencies like Font-Awesome and Foundation in the respective public directories, although in production serving these popular libraries via CDN would be the best practice.

I used Foundation.css to bootstrap the design and quickly match the design document with few pieces of scss. In the /scss folder you'll see files for each section along with files for the various imports. I added some css animation flair to the 'RVSP' call to action as well as the 'more' link.

The app itself consists of a single fat controller (a thin controller would have its methods abstracted into services, factories, components, etc) that contains two methods, Angular's $http.get and 'remove'. The $http.get method fetches our data, returns a promise and inside of the chained 'then' method we do a few operations on the data set to prepare it for display in our app. Some of the data is inconsisent, several instances of 'where' are listed as +Performance<br>945 NW Lovejoy St, Portland, OR 97209 while others are listed as ZOOM+Performance<br>945 NW Lovejoy St and since the latter instance conforms with the other ZOOM locations I went with that. Using the array.map method I looped over each object and corrected the +Performance entries if necessary and I added a new object property 'whereName' that consists of only the location name and not the address. This was necessary in order to have properly formatted select element options using Angular's ng-options.

The event listings are created using ng-repeat to loop over each object in the events list array and several filters to format the data consistent with the provided design document. In addition to Angular provided filters like 'date' the app has three additional filters. One is simply a wrapper for a date ordinal format function that I did not write. The second formats the data from the API in order to pass it to the Angular 'date' filter to prperly output the event time, and the last filter un-sanitizes the data so that we can pass as HTML the <br> tag in the middle of th event location and address data.   

The specification called for the user to be able remove an event from the listings and the controller 'remove' method does that by splicing the data array when called by the 'x' icon click. 

The specifications also called for limiting the description to 300 characters, this was acheived using the Angular 'limitTo' filter, intially limiting to 300 and then on the 'More' link click it sets the limit to the length of the description thus revealing the full text.     

I figured I would go for the exta credit and add a third feature that greatly improves the functionality of the app by allowing users to filter the event list based on the location. Inside the select element we have ng-options and ng-model attributes that take the 'whereName' property we created in the controller and use it to generate our location options, then when the select is changed the object is bound to the model and the ng-repeat filter renders only locations that match our selected location.

From the command line:

	Run the app: inside the /zoom directory run 'node server.js' and open a web browser to localhost:3000/events

	Startup dev environment: inside the zoom directory run 'npm install' then once dependencies are installed run 'gulp watch'