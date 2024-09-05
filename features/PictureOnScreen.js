import config from "../config"
import { prefix } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let image
let imageWidth = 0
let imageHeight = 0

try {
    image = new Image("pictureOnScreen.png", "../assets/pictureOnScreen.png")
    imageWidth = image.getTextureWidth()
    imageHeight = image.getTextureHeight()
} catch (e) {
    ChatLib.chat(":/")
}


registerWhen(register("renderOverlay", () => {
    let x = data.pictureOnScreen.x
    let y = data.pictureOnScreen.y
    let w = imageWidth * data.pictureOnScreen.scale
    let h = imageHeight * data.pictureOnScreen.scale
    image.draw(x, y, w, h)
}), () => config.pictureOnScreen && image)

registerWhen(register("renderOverlay", () => {
    if (config.pictureOnScreenGui.isOpen()) {
        image.draw(data.pictureOnScreen.x, data.pictureOnScreen.y, data.pictureOnScreen.scale * imageWidth, data.pictureOnScreen.scale * imageHeight)
    }
}), () => image)

register("dragged", (dx, dy, x, y, bn) => {
    if (!config.pictureOnScreenGui.isOpen() || bn == 2) return
    data.pictureOnScreen.x = x
    data.pictureOnScreen.y = y
    data.save()
})

register("scrolled", (x, y, dir) => {
    if (!config.pictureOnScreenGui.isOpen()) return
    if (dir == 1) data.pictureOnScreen.scale += 0.01
    else data.pictureOnScreen.scale -= 0.01
    data.save()
})