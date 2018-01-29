# Final Project Proposal

Your assignment this week is to write a detailed proposal for your final
project. In proposing your final, try to address each of the following
areas.

## Problem / Question

Applications are ultimately just tools. What problem or question does
your application attempt to resolve or grapple with? How does your
application speak to this problem/question?

### I am trying to figure out the pattern of Uber trip pick-up locations, my application would geolocate the pick-up locations and use heat map or animated aggregation to visualize it.

## The data

Geospatial applications are all about working with data. What datasets
would you plan/like to use? If the data you'll be working with isn't
already stored in a way that you can use, how will you be storing your data?

### Uber trip data in New York City in 2014, csv file as well as geojson file have been collected

## Technologies used

Which technologies covered in class (or discovered on your own!) do you
plan to use? How do you anticipate using each of these technologies?

Review the APIs/online examples of leaflet, turf, jQuery, underscore (or
any library not explicitly covered in class) for functions/uses which
you'd like to explore. Briefly describe how you might use them.

### Use leaflet to get basemap and underscore to geolocate geojson file to the map, or upload my data to Carto and realize the visualization in Carto and import the Carto map to my web application.

## Design spec

#### User experience

At a high level, how do you expect people to use your application?
- Who are the users?
- What do they gain from your application' use?
- Are there any website/application examples in the wild to which you can compare your final?

###
-Uber drivers and uber users. -Uber drivers may wanna know the most common pick-up locations of their potential customers. The Uber users may use this to avoid competing with too many Uber users at the same place to call a Uber. -https://eng.uber.com/data-viz-intel/

#### Layouts and visual design

So far, we've built all our applications with a side bar for
representing non-map content and navigation. This is not the only
successful design. Extra content could be displayed in a top bar,
through modals, through side bars on both sides, and any combination of
these as well as a number not mentioned. Try to describe your
application's visual layout. Conceptually (no need for extensive CSS
here), what will this design require?

### Navigation bar is in the left, sidebar in the middle-left and map in the right. The map could be visualized by time(animated), or by basic aggregation analysis, we could also show the overall statistical analysis results(charts or tables) to provide background information about Uber trip data to web users.

## Anticipated difficulties

Thinking about weaknesses can be useful. What do you anticipate being
most difficult about this project? How will you attempt to cope with
these difficulties? For example, asynchronous behavior (ajax, events)
are hard to use and think about. Global variables are a strategy for
coping with that difficulty by breaking data out of the asynchronous
context.

### data cleaning and try to pop up basic statistic analysis charts to brief show the result of Uber trip data.

## Missing pieces

We've only managed to scratch the surface of the available technologies
by which you could construct an application. What use-cases haven't we covered
that you think would be useful? What technologies not covered seem exciting to
you (you don't necessarily have to fully understand what they're for,
this is a chance for you to get our help interpreting a technology's
purpose/usage).
