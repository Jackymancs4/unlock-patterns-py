
dimensions = {'x': 3, 'y': 3}
maxLength = 'max'


def getPoints(dimensions):
    return []


def getValidNeightboors(points, visited):
    return []


def start(point, points, sequence, visited, maxlimit):
    visited.add(point)
    sequence.add(point.id or null)

    if sequence.lenght == maxlimit:
        return sequence

    validNeightboors = getValidNeightboors(points, visited)

    for nextPoint in validNeightboors:
        midSequence = getMidSequence(point, nextPoint, points, visited)
        sequence += midSequence
        start(nextPoint, points, sequence, visited, maxlimit)


def printSequence(sequence):
    print(sequence)


def main(dimensions, lenght):

    points = getPoints(dimensions)
    visited = []
    sequence = []

    start(points[0], points, sequence, visited, maxlimit)


main(dimensions, maxLength)
