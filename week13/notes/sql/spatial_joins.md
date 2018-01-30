## A look at spatial joins

One of the primary features of a spatial database is the ability to filter
with the assistance of spatial comparisons. One difficulty facing new users
is the variety of different comparison predicates provided by PostGIS. These
are the most commonly used spatial predicates and what they mean.(Short
descriptions sourced from: http://revenant.ca/www/postgis/workshop/basic_exercises.html)

[ST_Contains(A,B)](http://postgis.org/docs/ST_Contains.html) —
Returns true if and only if no points of B lie in the exterior of A, and at
least one point of the interior of B lies in the interior of A.

[ST_ContainsProperly(A,B)](http://postgis.org/docs/ST_ContainsProperly.html) —
Returns true if B intersects the interior of A but not the boundary,
otherwise false.

[ST_Covers(A,B)](http://postgis.org/docs/ST_Covers.html) —
Returns true if no point in B is outside of A, otherwise false.

[ST_CoveredBy(A,B)](http://postgis.org/docs/ST_CoveredBy.html) —
Returns true if no point in A is outside of B, otherwise false.

[ST_Crosses(A,B)](http://postgis.org/docs/ST_Crosses.html) —
Returns true if A and B share some but not all points in common, otherwise false.

[ST_Disjoint(A,B)](http://postgis.org/docs/ST_Disjoint.html) —
Returns true if there are no points in common between A and B, otherwise false.

[ST_Intersects(A,B)](http://postgis.org/docs/ST_Intersects.html) —
Returns true if there are any points in common between A and B, otherwise false.

[ST_Overlaps(A,B)](http://postgis.org/docs/ST_Overlaps.html) —
Returns true if the geometries intersect, but are not contained and are of the
same dimension (i.e. both lines, both points or both polygons), otherwise false.

[ST_Touches(A,B)](http://postgis.org/docs/ST_Touches.html) —
Returns true if A and B have at least one point in common but their interiors
don’t overlap, otherwise false.

[ST_Within(A,B)](http://postgis.org/docs/ST_Within.html) —
Returns true if A is completely inside B, otherwise false.

[ST_DWithin(A,B,D)](http://postgis.org/docs/ST_DWithin.html) —
Returns true if B is within distance D of A. See the note on [`ST_Buffer`
vs `ST_DWithin`](./buffer_vs_dwithin.md)

