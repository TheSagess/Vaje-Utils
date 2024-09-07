import config from "../config";
import { data } from "../util/data";
import { registerWhen } from "../../BloomCore/utils/Utils";

// Define constants
const UPTIME_DISPLAY_DURATION = 5000; // Duration for displaying uptime (5 seconds)
const SCALE_FACTOR = 1.2; // Scale factor for shrinking text
const VERTICAL_OFFSET = 20; // Vertical offset to raise the text a bit

// Timer text for displaying on screen
let uptimeText = new Text("").setScale(3 / SCALE_FACTOR).setShadow(true).setAlign("CENTER").setColor(Renderer.GREEN);
let usernameText = new Text("").setScale(3 / SCALE_FACTOR).setShadow(true).setAlign("CENTER").setColor(Renderer.GREEN);

// Function to format the uptime
function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    return `${hours}h ${minutes}m ${seconds}s`;
}

// Function to get the game uptime
function getGameUptime() {
    const currentTime = Date.now();
    const uptimeInSeconds = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
    return formatUptime(uptimeInSeconds);
}

// Function to handle the display of uptime and username
function handleDisplay() {
    if (config.sessiontimer) {
        const uptime = getGameUptime();
        uptimeText.setString(`Uptime: ${uptime}`);
        uptimeText.draw(Renderer.screen.getWidth() - uptimeText.getWidth() - 10, Renderer.screen.getHeight() - VERTICAL_OFFSET);
    }

    if (config.minecraftname) {
        const username = Player.getName();
        usernameText.setString(`Username: ${username}`);
        usernameText.draw(Renderer.screen.getWidth() - usernameText.getWidth() - 10, Renderer.screen.getHeight() - uptimeText.getHeight() - VERTICAL_OFFSET - 20); // Adjust based on text height
    }
}

// Initialize start time for uptime calculation
const startTime = Date.now();

// Registering renderOverlay event to show uptime and username
register("renderOverlay", () => {
    handleDisplay();
});

// Test command to manually check the uptime and display
register("command", () => {
    ChatLib.chat(`&aCurrent uptime: ${getGameUptime()}`);
}).setName("testuptime");
