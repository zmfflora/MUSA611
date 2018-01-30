## A word of caution regarding ST_Buffer

In class we looked at the use of `ST_Buffer` to derive new, larger geometries
on the basis of 1. a provided geometry/geography and 2. the distance from the
original geometry/geography of the buffer periphery. Given a point and a distance
of 500m, `ST_Buffer` should produce a circle whose diameter is 1000m.

In practice, `ST_Buffer` is rarely used due to performance limitations. When
attempting to find all the points within some distance of a geometry, if you
find yourself first building a buffered geometry and then checking to see if
the points in question happen to reside within it: you're doing it wrong.
Instead, you should take advantage of the comparison predicate PostGIS provides
for this very case: `ST_DWithin`. It is much, much faster (provided your
geometry column is indexed — and it really should be if you use this function).

Here's what it might look like to query for all restaurants within 1
mile of "Main Street" (we'll assume we have a table with some line bearing
that designation).

```sql
SELECT
  r.*
FROM
  (SELECT s.* FROM streets as s WHERE s.name == "Main Street" LIMIT 1) as main_street,
  restaurants as r
WHERE
  ST_DWithin(main_street.the_geom::geography, r.the_geom::geography, 1609)
```

A few things worth calling out here:
1. The use of `LIMIT 1` makes sure that we don't accidentally grab multiple
   streets which just happen to have the same `name`

2. We cast these geometries to the `geography` type so that PostGIS
   can correctly handle distance calculations. Projection is hard, but
   the `geography` type ensures that we don't have to think about it in
   this context.

3. We have to provide an alias (`main_street`) for any subqueries (the
   bit inside parentheses).

4. The distance is in meters, so if you want to work with miles, you'll
   need to multiply by 1609. If you want to work in units that are based
   rational considerations rather than the bizarre collection of feudal
   weights and measures still used here in the US, that's OK too.


