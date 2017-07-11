Angular app developed with a pre 1.5 (non-component based) structure, I did this to match the requestor's current development infrastructure. The app was developed to fufill the following requirements:

- Produce a NodeJS server that consumes data from a given URL and produces the rendered webpage
- NodeJS server should be executed with `>node server.js`

- Navigating with a web browser to localhost:3000/events should render the events list that looks as close to the attached image as possible

- Implement two of the following enhancements (or three for extra credit)

1. Allow users to remove events from view that they aren't interested in, does not need to persist to next page visit
	
2. Limit the description to display 300 characters at maximum initially. If there are more, append an href with text `More` to the end. When it is clicked show all of the description.
	
3. Implement a feature on the client side that you feel would be as/more useful than the above two.

In addition to implementing features one and two, I added a  location based filter to fufill the third feature. See devnotes.txt for a walk through the development of the app.
