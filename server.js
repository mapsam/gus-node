var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var FC = path.join(__dirname, 'points.geojson');

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.get('/api/points', function(req, res) {
//   fs.readFile(FC, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }
//     res.setHeader('Cache-Control', 'no-cache');
//     res.json(JSON.parse(data));
//   });
// });

// dataset is a GeoJSON FeatureCollection of points
app.post('/api/points', function(req, res) {
  fs.readFile(FC, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    var points = JSON.parse(data);
    var newPoint = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      },
      "properties": {
        "name": req.body.title,
        "description": req.body.description,
        "date": new Date()
      }
    };
    points.features.push(newPoint);

    fs.writeFile(FC, points, function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(points);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});