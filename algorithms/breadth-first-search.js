

// Root is the index of the root node to start search at
const bfs = (graph, root) => {
  const result = {};

  for (let i = 0; i < graph.length; i++) {
    // Start every distance at Infinity (not reachable from start node)
    result[i] = Infinity;
  }
  // Root is obviously distance 0 from itself (instead of Infinity)
  result[root] = 0;

  // Keep track of nodes to visit in a queue
  const queue = [root];
  // Keep track of current node we are traversing
  let currentNode;

  // Queue will grow and shrink as we explore nodes
  while (queue.length != 0) {
    // Start with first item in queue, set to currentNode
    // Also remove item from the front of the queue
    currentNode = queue.shift();

    // Get all the nodes connected to the current node
    // Each index of the currentNode is another array of connected nodes
    const currentConnectedNode = graph[currentNode]; // typeof Array
    // Neighbor index array keeps track of list of nodes connected to current node
    const connectedNodes = [];
    // Gets the first index in our current node array with value of 1
    // Will be -1 if no nodes are connected
    let idx = currentConnectedNode.indexOf(1);
    // Once idx is -1 (meaning no more nodes connected) then stop
    while (idx !== -1) {
      // Push the index onto array of neighbors
      connectedNodes.push(idx);
      // Then search for next connected node in our current node starting at next index
      idx = currentConnectedNode.indexOf(1, idx + 1);
    }

    // Now we have all nodes connected to current node in array connectedNodes
    // Loop through each of these nodes and get the distance to the root node
    for (let j = 0; j < connectedNodes.length; j++) {
      // Every value in result{} is set to Infinity except the root node
      // So if a value in result{} is Infinity then we haven't set distance of that node yet
      if (result[connectedNodes[j]] === Infinity) {
        // Set result{}'s connectedNodes[j] to value of result{}'s currentNode + 1
        // *** result[currentNode] starts at the root node so it starts at zero... ***
        // *** ...so each time we move to a new currentNode we already know how far ***
        // *** currentNode is from the root node and thus simply add 1 to that distance ***
        result[connectedNodes[j]] = result[currentNode] + 1;
        // Push this node onto queue to check for connections
        queue.push(connectedNodes[j]);
      }
    }
  }
  return result;
};


// Adjacency matrix graph
const exBFSGraph = [
  [0, 1, 1, 1, 0], // Node 0
  [0, 0, 1, 0, 0], // Node 1
  [1, 1, 0, 0, 0], // Node 2
  [0, 0, 0, 1, 0], // Node 3
  [0, 1, 0, 0, 0]  // Node 4
];

console.log(bfs(exBFSGraph, 1));

//Should return:
// {0: 2, 1: 0, 2: 1, 3: 3, 4: Infinity}
// Key is the node and value is the distance to that node from input node
