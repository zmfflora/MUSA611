## Building complex strings

We've spoken at length about prototyping SQL statements in an ad hoc
fashion from a SQL console and transitioning those prototyped bits of
SQL instruction to javascript so that dynamic queries which respond to
user input are a possibility. This is a straightforward affair with a
simple structure like a `POINT`:

```sql
SELECT
  p.*
FROM
  point_table AS p
WHERE
  ST_DWithin(ST_GeomFromText('POINT(0 0)')::geography, p.the_geom::geography, 1000)
```
In javascript, assuming we've got our hands on a latitude and a longitude:
```javascript
var lat = ???
var lng = ???
var sqlStart = "SELECT p.* FROM point_table as p WHERE ST_DWithin(ST_GeomFromText('POINT("
var sqlEnd = ")')::geography, p.the_geom::geography, 1000)"
var sqlQuery = sqlStart + lng + " " + lat  + sqlEnd
```

This is easy to do because points have only one lat and one lng — this
is something we can know a priori (i.e. non-empirically). We lack this
sort of certainty in the case of, e.g., lines:

```sql
SELECT
  p.*
FROM
  point_table AS p
WHERE
  ST_DWithin(ST_GeomFromText('LINESTRING(0 0, 1 1, 2 2, 3 3)')::geography, p.the_geom::geography, 1000)
```

Constructing this string is not nearly as straightforward if we imagine
that arbitrary lines could be provided. Maybe this is coming from
Leaflet Draw — that line could be *any valid line whatsoever*.

The case is more general than working with WKT, however. Consider the
case of arbitrarily large filter sets: If I have a set of checkboxes for
different pizza toppings and I'm looking to produce a set of filters
which corresponds to all and only the boxes I've checked, we'll run into
a similar difficulty:

Let's say I want to filter for pizzas with a 'pepperoni' or 'green
pepper' topping. Let's also fiat that the table has a "toppings" column
which simply lists the toppings in a string (i.e. "pepperoni, cheese,
jalapeno"). In such a case, I'd likely produce a `WHERE` clause using
SQL's `ILIKE` operator:

```sql
WHERE pizza.toppings ILIKE "%pepperoni%" OR pizza.toppings ILIKE "%green
pepper%"
```

In both of these cases, we have a START of the string, an END of the
string, and what I'll refer to as the JOIN string. The JOIN string is
optional. It only appears when we have more than one value to use.
Here's a strategy for constructing SQL `LINESTRING`s in javascript for
an arbitrary number of points:

```javascript
// Our data
theData1 = [[1,2],[3,4]]
theData2 = [[1,2],[3,4], [12, 44]]
start = "LINESTRING("
end = ")"
join = ", "

// Mapping over it to produce the components which we will join together
_.map(theData, function(d) { return (d[0] + " " + d[1]); })

// Javascript's join method on arrays can be used here
// ["a", "b"].join('blahblahblah') == "ablahblahblahb"
// ["a", "b", "c"].join('blahblahblah') == "ablahblahblahbblahblahblahc"
// In our imagined case:
middle = _.map(theData, function(d) { return (d[0] + " " + d[1]); }).join(join)
start + middle + end
```















