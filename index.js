var object = require('./lib/object');
var matrix = require('./lib/matrix');

module.exports = {
  rank: function(docs,opts,cb){
    var rankVector;
    var tolerance = opts.tolerance ? opts.tolerance : 0.000001;

    if(opts.type == 'weighted' || opts.type == 'w' || opts.type == 'weight'){
      rankVector = object.unweighted(docs,opts.properties,tolerance);
    } else if(opts.type == 'unweighted' || opts.type == 'u' || opts.type =='unweight') {
      rankVector = object.weighted(docs, opts.properties,tolerance);
    }

    if(cb){
      cb(docs, rankVector);
    } else {
      return rankVector;
    }
  }
};
