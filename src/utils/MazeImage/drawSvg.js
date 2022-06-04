import { SVG } from "@svgdotjs/svg.js";

export const drawSvg = (maze) => {

    const newWindow = window.open()
    newWindow.document.write('<html lang="">')
    newWindow.document.write('<head><title>Image</title><style>#container {height: 100%; width: 100%}</style></head>')
    newWindow.document.write('<body><svg id="container"></svg><link id="link"/></body></html>')

    const canvas = SVG()
        .addTo(newWindow.document.getElementById("container"))
        .size("100%", "100%")
        .viewbox(`0 0 ${maze.length * 42} ${maze[0].length * 42}`)

    const group = canvas.group().addClass("grid")
    const size = 42.5

    maze.forEach((el, index) => {
        el.forEach((x, ind) => {

            switch (x) {
                case 0:
                    group.rect(size, size).fill("black").move(ind * 42, index * 42)
                    break
                case 1:
                    group.rect(size, size).fill("white").move(ind * 42, index * 42)
                    break
                case 2:
                    group.rect(size, size).fill("rgb(255, 165, 0)").move(ind * 42, index * 42)
                    break
                case 3:
                    group.rect(size, size).fill("rgb(0, 128, 0)").move(ind * 42, index * 42)
                    break
            }
            if (index === 0) {
                group.path("M 0 0 L 42.5 0").move(ind * 42, index * 42).stroke("black")
            } else if (index === maze.length - 1) {
                group.path("M 0 42.5 L 42.5 42.5").move(ind * 42, index * 42 + 42).stroke("black")
            }

            if (ind === 0) {
                group.path("M 0 0 L 0 42.5").move(ind * 42, index * 42).stroke("black")
            } else if (ind === maze[0].length - 1) {
                group.path("M 42.5 0 L 42.5 42.5").move(ind * 42 + 42, index * 42).stroke("black")
            }
        })
    })

    newWindow.document.close()
}
