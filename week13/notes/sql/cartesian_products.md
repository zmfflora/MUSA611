## Attaining a cartesian product

It can often be useful to compare every member of some group to every other
member. In math this is referred to as a Cartesian product. In SQL terminology,
however, this is a `CROSS JOIN` (plus some filtering to assure items are not
compared to themselves).

In the simplest form, such a query looks like this:

```sql
SELECT
  t1.cartodb_id AS id1, t2.cartodb_id AS id2
FROM
  some_table AS t1
  CROSS JOIN some_table AS t2
WHERE t1.cartodb_id <> t2.cartodb_id
```


You might be tempted to try this using `the_geom`. That won't work. The
comparison operator `<>` is unsuitable for comparing geometries. Instead,
you should use `ST_Equals` as follows:

```sql
SELECT
  t1.cartodb_id AS id1, t2.cartodb_id AS id2
FROM
  some_table AS t1
  CROSS JOIN some_table AS t2
WHERE NOT ST_Equals(t1.the_geom, t2.the_geom)
```

