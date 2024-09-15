import config from "../config";

// Define constants for pyroproc
const ragtimer = 3320; // 3.32 seconds (added 0.32 seconds)
const VENGEANCE_DISPLAY_DURATION = 1000; // 1 second

let pyroTimerStart = 0;
let ragaxee = false;
let vengeanceMessageTime = 0;
let showPyroTimer = false;
let ragaxeactive = false;
let canceled = false;

// Timer text for pyroproc display
let pyroTimerText = new Text("").setScale(2.5).setShadow(true).setAlign("CENTER").setColor(Renderer.GREEN);
let vengeanceText = new Text("").setScale(2.5).setShadow(true).setAlign("CENTER").setColor(Renderer.RED);

// Function to check if the player is using the Pyrochaos Dagger
function isusingragaxe() {
    const heldItem = Player.getHeldItem();
    if (!heldItem) return false;
    const heldItemName = heldItem.getName();
    console.log(`Held item name: ${heldItemName}`);
    return heldItemName.includes("Ragnarock Axe");
}

// Function to start the pyroproc timer
function ragaxetimer() {
    if (!config.ragaxealerts) return; // Check if the feature is enabled
    pyroTimerStart = Date.now();
    ragaxee = false;
    canceled = false;
    showPyroTimer = true;
    ragaxeactive = true;
    console.log("Rag Axe Timer Started");
}

// Function to handle the pyroproc timer and vengeance message
function handleragaxe() {
    if (!config.ragaxealerts) return; // Respect config setting

    if (pyroTimerStart && !canceled) {
        const elapsedTime = Date.now() - pyroTimerStart;

        // Display the pyroproc timer
        if (elapsedTime < ragtimer) {
            const remaining = (ragtimer - elapsedTime) / 1000;
            pyroTimerText.setString(remaining.toFixed(2));
        } else if (!ragaxee) {
            // Activate vengeance message once timer hits 0
            pyroTimerText.setString("");
            vengeanceText.setString("CASTING");
            World.playSound("random.orb", 1, 1);
            ragaxee = true;
            vengeanceMessageTime = Date.now();
            console.log("Rag Axe Msg Activated.");
        }

        // Hide vengeance message after 1 second
        if (ragaxee && Date.now() - vengeanceMessageTime >= VENGEANCE_DISPLAY_DURATION) {
            vengeanceText.setString("");
            pyroTimerStart = 0; // Reset timer
            showPyroTimer = false;
            ragaxeactive = false;
            console.log("[debug] Hidden Rag Axe");
        }
    }

    // Handle cancellation case
    if (canceled) {
        pyroTimerText.setString("CANCELED !!!");
        showPyroTimer = true;

        setTimeout(() => {
            pyroTimerText.setString("");
            pyroTimerStart = 0;
            showPyroTimer = false;
            ragaxeactive = false;
            canceled = false; // Reset canceled state after 1 second
        }, 1000); // Display "CANCELED !!!" for 1 second
    }
}

// Register the mouse click event
register("clicked", (mouseX, mouseY, button, isButtonDown) => {
    if (!config.ragaxealerts) return; // Check config before starting the timer
    if (button === 1 && isusingragaxe() && !ragaxeactive) { // Right-click with the axe
        ragaxetimer();
    }
});

// Function to strip Minecraft formatting codes
function stripFormatting(message) {
    return message.replace(/§[0-9a-fk-or]/g, "");
}

// Register the chat event to cancel the timer
register("chat", (message) => {
    const cleanMessage = stripFormatting(message);
    if (cleanMessage === "Ragnarock was cancelled due to taking damage!") {
        canceled = true;
        console.log("Ragnarock canceled due to damage.");
    }
}).setCriteria("${message}");

// Register the renderOverlay event to show pyroproc timer and vengeance message
register("renderOverlay", () => {
    if (!config.ragaxealerts) return; // Respect config setting

    const centerX = Renderer.screen.getWidth() / 2;
    const centerY = Renderer.screen.getHeight() / 2;

    // Draw the pyroproc timer and vengeance message centered horizontally and raised vertically
    if (showPyroTimer && pyroTimerText.getString()) {
        pyroTimerText.draw(centerX, centerY - 100); // Raised vertically by 100 pixels
    }
    if (vengeanceText.getString()) {
        vengeanceText.draw(centerX, centerY - 100); // Raised vertically by 100 pixels
    }
});

// Register the tick event to handle the pyroproc logic
register("tick", () => {
    handleragaxe();
});
