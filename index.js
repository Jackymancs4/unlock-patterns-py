const dimensions={x: 3, y:3, z:3}
const maxLength = 'all'
var result = 0


const getValidNeightboors = function(points, visited) {
  let validPoint=[]
  let found = false

  for (let i = 0; i < points.length; i++) {
    found = false
    for (var j = 0; j < visited.length; j++) {
      if(visited[j]===i) {
        found = true
      }
    }
    if (found === false) {
      validPoint.push(parseInt(i))
    }
  }
  return validPoint
}

const getEuclideanDistance = function(firstPoint, secondPoint, points) {

  let sum=0

  for (var i = 0; i < points[firstPoint].length; i++) {
    sum += Math.pow(points[firstPoint][i]-points[secondPoint][i], 2)
  }

  return Math.sqrt(sum)

}

const isInline = function (firstPoint, secondPoint, thirdPoint, points) {
  let aaa = getEuclideanDistance(firstPoint, secondPoint, points)
  let bbb = (getEuclideanDistance(firstPoint, thirdPoint, points)+getEuclideanDistance(thirdPoint, secondPoint, points))

  // console.log(aaa,bbb)

  return aaa==bbb

}

const getMidSequence = function (point, nextPoint, points, visited) {

  const validNeightboors = getValidNeightboors(points, visited.concat([nextPoint]))
  let midSequence = []

  for (var i = 0; i < validNeightboors.length; i++) {
    if (isInline(point, nextPoint, validNeightboors[i], points)){
      midSequence.push(parseInt(validNeightboors[i]))}
  }

  return midSequence
}


const start = function (point, points, sequence, visited, maxlimit) {
  visited.push(parseInt(point))

  if (visited.length >= maxlimit) {
    // console.log('Next1');
    if(visited.length === maxlimit) {
      // console.log(visited.map((x)=>x+1).join(''))
      result++
    }

    return ;
}


  const validNeightboors = getValidNeightboors(points, visited)

//   if (validNeightboors.length == 0){
//     // console.log('Next2');
//     console.log(visited.map((x)=>x+1))
//     result++
//     return ;
// }

  let midSequence
  let something

  for (var i = 0; i < validNeightboors.length; i++) {

    visitedClone = visited.slice(0)

    midSequence = getMidSequence(point, validNeightboors[i], points, visitedClone)

    if(midSequence.length==0) {
    // visitedClone = visitedClone.concat(midSequence)
    something = start(validNeightboors[i], points, sequence, visitedClone, maxlimit)
}
  }

  // console.log('Next3');
  return ;
}

const iteratePoints = function (dimension, dimensions, pointsRes, pointsFinal) {
    if (dimension >= dimensions.length) { //stop clause
       pointsFinal.push(pointsRes.slice(0))
       return;
   }
   let i
   for (i = 0; i < dimensions[dimension]; i++) {
       pointsRes[dimension] = i;
       iteratePoints(dimension+1,dimensions,pointsRes, pointsFinal);
   }
}

const getPoints = function (dimensions) {
  let points = []
  let dimensionMat = []

  for (var ax in dimensions) {
    if (dimensions.hasOwnProperty(ax)) {
      dimensionMat.push(dimensions[ax])
    }
  }

  iteratePoints(0, dimensionMat, [], points)

  return points

}

const init = function(dimensions, length){

    let points = getPoints(dimensions)
    let visited = []
    let sequence = []

    if (length==='all') {
      for (var j = 0; j < points.length; j++) {
        for (var i = 2; i < points.length; i++) {
          start(j, points, sequence, [], i+1)
          console.log(j,i,result)
        }
      }
    } else {
      for (var i = 0; i < points.length; i++) {
        start(i, points, sequence, [], length==='max'? points.length: length)
      }
    }

    // start(0, points, [], [], length==='max'? points.length: length)

    console.log(result);
}

init(dimensions, maxLength)
