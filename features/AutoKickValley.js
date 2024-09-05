import config from "../config"
import { prefix } from "../util/util"

let toggled = true
const names = [
    "Vedzel",
    "Tosigmy",
    "NullOvoid"
]

register("chat", (name) => {
    if (!toggled) return
    if (names.includes(name)) {
        ChatLib.chat(`${prefix} &4FIXING THE PROBLEM.`)
        ChatLib.command(`p kick ${name}`)
    }
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/).setContains()

register("chat", (name) => {
    if (!toggled) return
    if (names.includes(name)) {
        ChatLib.chat(`${prefix} &4FIXING THE PROBLEM.`)
        ChatLib.command(`p kick ${name}`)
    }
}).setCriteria(/.+? (\w+) joined the party./).setContains()

register("command", () => {
    toggled = false
    setTimeout(() => {
        toggled = true
    }, 1000)
}).setName("togglesigmy").setAliases(["soweredoingthisagain", "yesimamasochist", "iwantbadruns", "braceforimpact"])