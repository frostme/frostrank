matrixOps = require("matrix-ops");
matrix    = require('./matrix');
module.exports = {
  incident: function(matters, properties){
    var fullArray = matters.map(function(matter){
      var array = [];
      matters.forEach(function(matter1){
        var total = properties.map(function(property){
          if(matter[property] == matter1[property]){
            return 1;
          } else {
            return 0;
          }
        }).reduce(function(pV,cV,i,arr){
          return pV + cV
        });

        array.push(total);
      });

      return array;
    });

   return  matrixOps.create(fullArray);
  },

  weighted: function(matters, tolerance, properties){
    var self = this;
    if(!properties) {
      properties = getKeys(matters);
      return this.unweighted(matters, properties);
    }
    
    var rankVector=properties.map(function(property){
      return matrixOps.scalar(property.weight, matrix.power(self.incident(matters,[property.value]),tolerance));
    }).reduce(function(pV,cV,i,arr){
      return matrixOps.add(pV,cV);
    });

    return matrixOps.scalar(1/matrix.normalize(rankVector), rankVector);
  },

  unweighted: function(matters, tolerance, properties){
    if(!properties) {
      properties = getKeys(matters);
    }
    
    var rankVector = matrix.power(this.incident(matters, properties), tolerance);

    return rankVector;
  },

  getKeys: function(matters){
    var fullArray = [];
    var fragArray = matters.map(function(matter){
      return Object.keys(matter);
    });

    fragArray.forEach(function(frag){
      frag.forEach(function(prop){
        fullArray.push(prop);
      });
    });

    return fullArray.filter(function(value, index, self){
      return self.indexOf(value) === index;
    });

  }
}
