export const changeCorners = (array, corners) => {
    let value

    if (corners) value = 0
    else value = 1

    return array.map(a => {
        if (array.indexOf(a) === 0 || array.indexOf(a) === array.length - 1) {
            return a.map(() => {
                return value
            })
        } else {
            return a.map((x, ind) => {
                if (ind === 0 || ind === a.length - 1) {
                    return value
                } else return x
            })
        }
    })
}