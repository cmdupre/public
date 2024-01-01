function getFinalOpenedDoors(numDoors) {
  const doors = [];

  // init doors as closed
  for (let i = 0; i < numDoors; i++) 
    doors.push(false);

  // do passes
  for (let i = 0; i < numDoors; i++) {
    // toggle doors
    for (let j = i; j < numDoors; j += (i+1))
      doors[j] = !doors[j];
  }

  return doors
    .map((d,i) => d ? i + 1 : d)
    .filter(d => d);
}

console.log(getFinalOpenedDoors(100));