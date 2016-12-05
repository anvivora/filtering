/*var  PriorityQueue =function () {
  		this._nodes = [];

  		this.enqueue = function (priority, key) {
    		this._nodes.push({key: key, priority: priority });
    		this.sort();
  	}
  		this.dequeue = function () {
    		return this._nodes.shift().key;
  		}
  		this.sort = function () {
    		this._nodes.sort(function (a, b) {
      			return (a.priority - b.priority);
    		});
  		}
  		this.isEmpty = function () {
    		return !this._nodes.length;
  		}
}*/


function PriorityQueue(i,ScoreFunction){
  this.content = [];
  this.scoreFunction = ScoreFunction;
  this.i = i;
  /*function(element) {
    return element.priority; 
  };*/
}

PriorityQueue.prototype = {
  enqueue: function(priority,element) {
    // Add the new element to the end of the array.
    this.content.push({key: element, priority: priority });
    // Allow it to bubble up.
    this.bubbleUp(this.content.length - 1);
  },

  dequeue: function() {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result.key;
  },

  peek: function() {
    var result = this.content[0];
    return result != null?this.scoreFunction(result,this.i):null;

  },

  sort: function(node) {
    var n = -1;
    for(var k in this.content) {
      if(this.content[k].key.x == node.x && this.content[k].key.y == node.y) {
        n = k;
      }
    }
    if(n == -1) {
      return;
    }
    var num = parseInt(n);
    this.bubbleUp(num);
    this.sinkDown(num);
  },

  remove: function(node) {
    var length = this.content.length;
    // To remove a value, we must search through the array to find
    // it.
    for (var i = 0; i < length; i++) {
      if (this.content[i] != node) continue;
      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      var end = this.content.pop();
      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;
      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.content[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  },

  size: function() {
    return this.content.length;
  },

  isEmpty: function() {
    if(this.content.length == 0) {
      return true;
    }
    else {
      return false;
    }

  },

  bubbleUp: function(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n], score = this.scoreFunction(element,this.i);
    // When at 0, an element can not go up any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = Math.floor((n + 1) / 2) - 1,
      parent = this.content[parentN];
      // If the parent has a lesser score, things are in order and we
      // are done.
      
      if (score >= this.scoreFunction(parent,this.i))
        break;

      // Otherwise, swap the parent with the current element and
      // continue.
      this.content[parentN] = element;
      this.content[n] = parent;
      n = parentN;
    }
  },

  

  sinkDown: function(n) {
    // Look up the target element and its score.
    var length = this.content.length,
    element = this.content[n],
    elemScore = this.scoreFunction(element,this.i);

    while(true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2, child1N = child2N - 1;
      // This is used to store the new position of the element,
      // if any.
      var swap = null;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N],
        child1Score = this.scoreFunction(child1,this.i);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore)
          swap = child1N;
      }
      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N],
        child2Score = this.scoreFunction(child2,this.i);
        if (child2Score < (swap == null ? elemScore : child1Score))
          swap = child2N;
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.content[n] = this.content[swap];
      this.content[swap] = element;
      n = swap;
    }
  }
};