import config from "../config"
import { prefix } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let hide = false
let inP3 = false

const EntityPlayer = Java.type("net.minecraft.entity.player.EntityPlayer")

function showPlayers() {
    hide = false
    ChatLib.chat(`${prefix} &aRevealing Players!`)
}

function hidePlayers() {
    hide = true
    ChatLib.chat(`${prefix} &aHiding Players!`)
}

registerWhen(register("chat", () => {
    if (!config.onlyAfterLeaping) hidePlayers()
    inP3 = true
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance."), () => config.hidePlayersInP3)

registerWhen(register("chat", () => {
    if (!config.onlyAfterLeaping) showPlayers()
    inP3 = false
}).setCriteria("The Core entrance is opening!"), () => config.hidePlayersInP3)

registerWhen(register("chat", () => {
    hidePlayers()
    setTimeout(() => {
        showPlayers()
    }, 2000)
}).setCriteria(/You have teleported to .+/), () => config.hidePlayersInP3 && config.onlyAfterLeaping && inP3)

registerWhen(register("renderEntity", (entity, pos, pt, event) => {
    if (entity.getEntity() instanceof EntityPlayer) {
        let entityName = entity.getName()
        if (entityName !== Player.getName()){
            cancel(event)
        }
    }
}), () => hide)

register("worldLoad", () => {
    hide = false
    inP3 = false
})