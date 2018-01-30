# Named map

To get this to work, you'll need to make changes to template.json. Then, enter the following code in
the command line.

```
curl -X POST \
   -H 'Content-Type: application/json' \
   -d @template.json \
   'https://[cartoUserName].carto.com/api/v1/map/named?api_key=[cartoApiKey]'
```
