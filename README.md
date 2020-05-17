# covid19distance (website: 6ix-feet-apart.tech)
Practice safe social distancing with covid19distance.

## Inspiration

Enabling people to safely distance while outside, as a community effort.

## What it does

Social Distancing is hard, and usually made more difficult by busy parks,
restaurants, and more.  
Our application makes these situations of _busyness_ a part of the past, 
by allowing people to collectively record how many
other people they see near them.  
Then, others can view a real-time heatmap and make decisions as to what
place is the safest to go to.  
This is especially crucial in times like these, where people may have
to go outside and have an opportunity to limit contact with the virus.

## How we built it

We built the project using a Django back-end. We connected the backend to MongoDB
atlas using their free tier. For our front-end, we used Bootstrap to arrange our
map and relevant data for users.
To obtain map data and query in real time, we used Google's Map APIs hosted on
a cloud instance, using a free tier. We used the places API as well as the 
JavaScript API.

## Challenges I ran into

We faced some small issues when implementing our time series feature
(a prediction engine to let users know historical data of how busy a place is).
We put this feature on hold for now and focused on the front end.
We faced some issues connecting to MongoDB using Django's native database 
connector, however, we overcame this by changing our Django version.
We faced some issues connecting to App Engine on Google Cloud - we instead
focused on implementing our app and porting to App Engine after the hackathon.

## Accomplishments that I'm proud of

1. This was our first time connecting to a cloud database, MongoDB!
2. This was our first online hackathon, and we enjoyed it a lot.
3. Connecting our front end (JS) to our backend using a RESTful
interface was the first thing some of our teammates worked on.

## What I learned

We really have to learn a front end technology! We wanted to try out React.
That's our plan for subsequent hackathons.  
For what we really learned, we had an awesome intro to NoSQL databases using Mongo.  
We learned how to work effectively with the Google Maps APIs.  
We learned how to coordinate Django with JS.  

## What's next for 6ix-feet-apart

Porting to App Engine, for sure.  
Enabling insights into historical data for population points.  
Wrapping our front end in React.
