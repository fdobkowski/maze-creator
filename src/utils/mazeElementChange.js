export const mazeElementChange = (array, x, y, value) => {
    return array.map(a => {
        if (array.indexOf(a) === x) {
            return a.map((b, ind) => {
                return ind === y ? value : b
            })
        } else return a
    })
}