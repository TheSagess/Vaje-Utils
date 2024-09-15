import config from "../config";

// Define constants
const CHAT_MESSAGE_TO_CHECK = "[BOSS] The Watcher: Let's see how you can handle this.";
const DISPLAY_MESSAGE_DURATION = 5000; // Duration to show the message (5 seconds)

// Define state variables
let messageShown = false;
let messageStartTime = 0;

// Define text for display message
let displayMessageText = new Text("Go Kill Blood MOBS").setScale(3).setShadow(true).setAlign("CENTER").setColor(Renderer.RED);

// Function to check for the specific chat message
function checkChatMessage(message) {
    if (!config.bloodreminder) return; // Check if the feature is enabled

    const cleanMessage = stripFormatting(message);
    if (cleanMessage === CHAT_MESSAGE_TO_CHECK) {
        messageShown = true;
        messageStartTime = Date.now();
        console.log("Boss message detected. Displaying alert.");
    }
}

// Function to strip Minecraft formatting codes
function stripFormatting(message) {
    return message.replace(/§[0-9a-fk-or]/g, "");
}

// Register the chat event to check for the specific message
register("chat", (message) => {
    checkChatMessage(message);
}).setCriteria("${message}");

// Register the renderOverlay event to show the display message
register("renderOverlay", () => {
    if (config.bloodreminder && messageShown) { // Check if feature is enabled and message should be shown
        const centerX = Renderer.screen.getWidth() / 2;
        const centerY = Renderer.screen.getHeight() / 2;
        displayMessageText.draw(centerX, centerY);
        
        // Hide the message after the specified duration
        if (Date.now() - messageStartTime >= DISPLAY_MESSAGE_DURATION) {
            messageShown = false;
        }
    }
});
