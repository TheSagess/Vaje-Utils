import config from "../config"
import { prefix, getRoom, getRoomID, getClass } from "../util/util"
import { registerWhen } from "../../BloomCore/utils/Utils"

let runStarted = null
let rooms = []
let roomTimes = []
let inBr = false
let messageSent = false

registerWhen(register("chat", () => {
    runStarted = Date.now()
    roomTimes.push(0)
    inBr = true
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon."), () => config.bloodRushSplits)

registerWhen(register("chat", () => {
    roomTimes.push(Date.now() - runStarted)
}).setCriteria(/.+ opened a WITHER door!/), () => config.bloodRushSplits && (getClass() === "Archer" || getClass() === "Mage"))

registerWhen(register("chat", () => {
    roomTimes.push(Date.now() - runStarted)
    let message = `\n${prefix} &4&lBlood Rush Splits: `
    for (let i = 0; i < rooms.length; ++i) {
        let individualTime = ((roomTimes[i + 1] - roomTimes[i]) / 1000).toFixed(2)
        message += `\n&a${rooms[i]}: &e${individualTime}s `
    }
    message += "\n"
    ChatLib.chat(message)
    inBr = false
    messageSent = true
}).setCriteria("The BLOOD DOOR has been opened!"), () => config.bloodRushSplits && !messageSent && (getClass() === "Archer" || getClass() === "Mage"))

registerWhen(register("tick", () => {
    let roomID = getRoomID()
    let room = getRoom(roomID)
    let roomName = room?.name
    if (roomName && rooms.indexOf(roomName) < 0) {
        if (roomName === "Fairy" || roomName === "Spawn") {
        } else {
            rooms.push(roomName)
        }
    }
}), () => config.bloodRushSplits && (getClass() === "Archer" || getClass() === "Mage") && inBr)

register("worldLoad", () => {
    runStarted = null
    rooms = []
    roomTimes = []
    inBr = false
    messageSent = false
})