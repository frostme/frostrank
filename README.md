frostrank
=========

Relation rank to find the most important entity of a group based on either properties or proximity.

## Installation
```
npm install frostrank
```

## Usage
### rank
```js
ranker = require('frostrank');

ranker.rank(docs, opts, cb);
```

- docs: Array of objects for which you are trying to rank.
- opts: Options for ranking which include the folwing items
  - type: string containing the type of ranking (weighted or unweighted)
    - weighted: Each property has a stranger weight of correlation. Some property are more important that others.
    - unweighted: All properties are weighted the same.
  - properties (optional): Array that contains the properties on which you are ranking.
    - weighted: If type is weighted, each entity in properties must contain a numerical weight, and string value.
    - unweighted: properties is an array of strings.
  - tolerance (optional): The precision of the calculation (lower tolerance = higher precision). The lowest without degraded operation is 1 * 10^-17
- cb (optional): Callback contain arguments below. If no cb is specified, method just returns array of rankings.
  - docs: array of objects passed into method
  - rankings: array of ranks respective to docs

## Examples
### rank
```js
var frostrank = require('./index');

var properties = [{ weight: 1, value: 'type' }, { weight: 2, value: 'category' },{ weight: 2.5, value: 'name' }];

var opts = { type: 'weighted', properties: properties, tolerance: 0.00000000001 };
var jobs = [
  { type: 'software', category: 'contract',  name : 'Front End Developer' },
  { type: 'business', category: 'par-time',  name : 'Business Analyst' },
  { type: 'it',       category: 'full-time', name : 'Cloud Infrastructure Designer' },
  { type: 'software', category: 'contract',  name : 'Full Stack JavaScript Developer' },
  { type: 'business', category: 'contract',  name : 'Project Manager' },
  { type: 'it',       category: 'contract',  name : 'Linux OS Administrator' },
  { type: 'software', category: 'full-time', name : 'Full Stack JavaScript Developer' },
  { type: 'finance',  category: 'full-time', name : 'Accountant' },
  { type: 'hr',       category: 'part-time', name : 'Account Representative' },
  { type: 'business', category: 'full-time', name : 'Project Manager' },
  { type: 'software', category: 'contract',  name : 'Full Stack Ruby Developer' },
];

var cb = function(jobs, rankings){
  console.log('Rankings');
  console.log(rankings);
};

frostrank.rank(jobs, opts, cb);

```
Which outputs
```
Rankings
[ [ 0.3049765308250947 ],
  [ 5.4885092862590825e-12 ],
  [ 1.0346044976897382e-11 ],
  [ 0.5783652498536891 ],
  [ 0.46900976224495505 ],
  [ 0.19562104321286128 ],
  [ 0.38274420665117387 ],
  [ 1.0346044976897377e-11 ],
  [ 1.989164731862428e-12 ],
  [ 0.2733887190424398 ],
  [ 0.3049765308250947 ] ]


```

In the above example, I am doing a weighted ranking against available jobs at a certain company. I am ranking in respect
to the following properties, type, category, and name. In this ranking I am saying the connection between type, is more 
important than both category and name (1 vs 2 and 2.5). I am also saying category is slightly more important than name (2 vs. 2.5).

The results show that the Full Stack JavaScript Developer position are the post "important". Basically, they are the most used name
in the most prominent category, in the most popular type. This is just a simple exampe. Your situation can be as complex as
you'd like. 

