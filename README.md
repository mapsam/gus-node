# gus-node

[Gus](http://mapsam.com/gus) is a service for quickly spinning up a crowd source map point database. This is an experimental version built in Node.js and ReactJS without using Google Spreadsheets. You can read more about the current project at [the gus repository](http://github.com/mapsam/gus).

The data for a map in `gus-node` is stored in a single GeoJSON `FeatureCollection` on the server, which is where the application `GET`s and `POST`s to.