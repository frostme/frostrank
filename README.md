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

