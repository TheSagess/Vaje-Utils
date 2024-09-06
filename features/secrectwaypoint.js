import config from "../config"  // Import the configuration file
import { getRoom } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let roomSecrets = []
let showingSecrets = false

const renderBox = (x, y, z, color) => {
    Renderer.drawLine(
        x - 0.5, y - 0.5, z - 0.5,
        x + 0.5, y - 0.5, z - 0.5, color
    )
    Renderer.drawLine(
        x + 0.5, y - 0.5, z - 0.5,
        x + 0.5, y + 0.5, z - 0.5, color
    )
    Renderer.drawLine(
        x + 0.5, y + 0.5, z - 0.5,
        x - 0.5, y + 0.5, z - 0.5, color
    )
    Renderer.drawLine(
        x - 0.5, y + 0.5, z - 0.5,
        x - 0.5, y - 0.5, z - 0.5, color
    )
}

// Renders secret boxes based on room type
register("renderWorld", () => {
    if (!showingSecrets || !config.secretwaypoin) return  // Check if the feature is enabled

    roomSecrets.forEach(secret => {
        renderBox(secret[0], secret[1], secret[2], Renderer.color(0, 255, 0, 255))  // Green box for secrets
    })
})

// Use register to create a timed event instead of setInterval
let lastCheckTime = 0
register("tick", () => {
    if (!config.secretwaypoin) return  // Check the configuration to see if secretwaypoin is enabled

    const currentTime = Date.now()
    if (currentTime - lastCheckTime < 2000) return  // Check every 2 seconds
    lastCheckTime = currentTime

    const room = getRoom()
    if (!room) return

    let secretsData = data.rooms.find(r => r.name === room.name)?.secret_coords
    if (secretsData) {
        roomSecrets = secretsData.chest.concat(secretsData.item || [])
        showingSecrets = true
    } else {
        roomSecrets = []
        showingSecrets = false
    }
})

// Reset when leaving the room
register("worldUnload", () => {
    roomSecrets = []
    showingSecrets = false
})
