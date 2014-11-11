//////// setup ////////
var assert = require('assert');
var expect = require('chai').expect;
var frostrank = require('../index');
var matrixOps = require('matrix-ops');
var weightProperties = [{ weight: 1, value: 'type' }, { weight: 2, value: 'category' },{ weight: 2.5, value: 'name' }];
var unweightProperties = ['type','category','name'];
var weightOpts = { type: 'weighted', properties: weightProperties, tolerance: 0.00000000001 };
var unweightOpts = { type: 'unweighted', properties: unweightProperties, tolerance: 0.00000000001 };
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

//////// helper functions ////////
function arrayEquality(arr1, arr2){
  return arr1.map(function(el, id, ar){
    return (el === arr2[id]);
  }).indexOf(false) == -1
};

function rounding(element){
  return Math.round(element * 100000000000000000000) / 100000000000000000000;
};

//////// data setup ////////
var weightedRankings = [ [ 0.3049765308250947 ],
  [ 5.4885092862590825e-12 ],
  [ 1.0346044976897382e-11 ],
  [ 0.5783652498536891 ],
  [ 0.46900976224495505 ],
  [ 0.19562104321286128 ],
  [ 0.38274420665117387 ],
  [ 1.0346044976897377e-11 ],
  [ 1.989164731862428e-12 ],
  [ 0.2733887190424398 ],
  [ 0.3049765308250947 ] ].map(function(element){
  return rounding(element);
});

var testWeightedRankings = frostrank.rank(jobs, weightOpts).map(function(element){
  return rounding(element);
});

var unweightedRankings = [ [ 0.43211792037184993 ],
  [0.08425138179030976 ],
  [0.1492122622925646 ],
  [0.47420137641999793 ],
  [0.33070266859984415 ],
  [0.2825510989288903 ],
  [0.35499418189766374 ],
  [0.11121188144667124 ],
  [0 ],
  [0.21149547407751 ],
  [0.43211792037185004 ] ].map(function(element){
  return rounding(element);
});


var testUnweightedRankings = frostrank.rank(jobs, unweightOpts).map(function(element){
  return rounding(element);
});

 
//////// tests ////////

describe('frostrank', function(){
  describe('#rank', function(){
    describe('when weighted', function(){
      it('should return rankings', function(){
        expect(arrayEquality(weightedRankings, testWeightedRankings)).to.equal(true);
      });
    });
    describe('when unweighted', function(){
      it('should return rankings', function(){
        expect(arrayEquality(unweightedRankings, testUnweightedRankings)).to.equal(true);
      });
    });
  });
});

