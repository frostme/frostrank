matrixOps = require('matrix-ops');

module.exports = {
  normalize: function(vector){
    var total = 0;
    vector.forEach(function(row){
      total += Math.pow(row,2);
    });

    return Math.sqrt(total);
  },

  ones: function(n){
    var length = n.length;
    var array = [];
    for(i=0;i<length;i+=1){
      array.push([1]);
    }

    return matrixOps.create(array);
  },

  tolerance: function(b1, b0){
    return this.normalize(matrixOps.subtract(b1, b0));
  },

  power: function(m1, t){
    var b0 = this.ones(m1);
    var m    = matrixOps.create(m1);

    var product = matrixOps.product(m, b0);
    var b1  = matrixOps.scalar((1/this.normalize(product)), product);

    while(this.tolerance(b1, b0) > t){
      b0 = b1;
      product = matrixOps.product(m, b0);
      b1 = matrixOps.scalar((1/this.normalize(product)), product);
    }

    return b1;
  }
}
