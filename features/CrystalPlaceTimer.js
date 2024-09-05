import config from "../config"
import { prefix, getDistance } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let pickedUp

registerWhen(register("chat", (name) => {
    if (name != Player.getName()) return
    pickedUp = Date.now()
}).setCriteria(/(\w+) picked up an Energy Crystal!/), () => config.crystalPlaceTimer)

const EnderCrystal = Java.type("net.minecraft.entity.item.EntityEnderCrystal")

registerWhen(register("tick", () => {
    let entities = World.getAllEntitiesOfType(EnderCrystal)
    entities.forEach(e => {
        if (getDistance(e.getX(), e.getZ(), Player.getX(), Player.getZ()) < 2) {
            crystalMsg()
            pickedUp = null
        }
    })
}), () => config.crystalPlaceTimer && pickedUp)

function crystalMsg() {
    let placed = Date.now()
    let placeTime = ((placed - pickedUp) / 1000).toFixed(3)
    let msg = `${prefix} &aCrystal placed in &e${placeTime}s&a.`
    if (placeTime < data.crystalPlaceTimer.pb) {
        data.crystalPlaceTimer.pb = placeTime
        data.save()
        msg += " &d&l(PB)"
    }

    new Message(new TextComponent(msg).setHover("show_text", `&dPersonal Best: &a${data.crystalPlaceTimer[relic]}s`)).chat()
}

register("worldLoad", () => {
    pickedUp = null
})