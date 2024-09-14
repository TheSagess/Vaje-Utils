import config from "../config";

// Define constants for pyroproc
const PYROPROC_TIMER_DURATION = 6000; // 6 seconds
const VENGEANCE_DISPLAY_DURATION = 1000; // 1 second

let pyroTimerStart = 0;
let vengeanceActive = false;
let vengeanceMessageTime = 0;
let showPyroTimer = false;
let pyroprocActive = false;

// Timer text for pyroproc display
let pyroTimerText = new Text("").setScale(2).setShadow(true).setAlign("CENTER").setColor(Renderer.GREEN);
let vengeanceText = new Text("").setScale(2).setShadow(true).setAlign("CENTER").setColor(Renderer.RED);

// Function to check if the player is using the Pyrochaos Dagger
function isUsingPyrochaosDagger() {
    const heldItem = Player.getHeldItem();
    if (!heldItem) return false;
    const heldItemName = heldItem.getName();
    console.log(`Held item name: ${heldItemName}`);
    return heldItemName.includes("Pyrochaos Dagger");
}

// Function to start the pyroproc timer
function startPyroprocTimer() {
    pyroTimerStart = Date.now();
    vengeanceActive = false;
    showPyroTimer = true;
    pyroprocActive = true;
    console.log("Pyroproc timer started.");
}

// Function to handle the pyroproc timer and vengeance message
function handlePyroproc() {
    if (pyroTimerStart) {
        const elapsedTime = Date.now() - pyroTimerStart;

        // Display the pyroproc timer
        if (elapsedTime < PYROPROC_TIMER_DURATION) {
            const remaining = (PYROPROC_TIMER_DURATION - elapsedTime) / 1000;
            pyroTimerText.setString(remaining.toFixed(2));
        } else if (!vengeanceActive) {
            // Activate vengeance message once timer hits 0
            pyroTimerText.setString("");
            vengeanceText.setString("Burning Vengeance Active");
            World.playSound("random.orb", 1, 1);
            vengeanceActive = true;
            vengeanceMessageTime = Date.now();
            console.log("Vengeance message activated.");
        }

        // Hide vengeance message after 1 second
        if (vengeanceActive && Date.now() - vengeanceMessageTime >= VENGEANCE_DISPLAY_DURATION) {
            vengeanceText.setString("");
            pyroTimerStart = 0; // Reset timer
            showPyroTimer = false;
            pyroprocActive = false;
            console.log("Vengeance message hidden.");
        }
    }
}

// Register the mouse click event
register("clicked", (mouseX, mouseY, button, isButtonDown) => {
    if (!config.blazepyro) return
    if (button === 0 && isUsingPyrochaosDagger() && !pyroprocActive) { // 0 is left mouse button
        startPyroprocTimer();
    }
});

// Register the renderOverlay event to show pyroproc timer and vengeance message
register("renderOverlay", () => {
    if (showPyroTimer && pyroTimerText.getString()) {
        pyroTimerText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 30); // Slightly below hit timer
    }
    if (vengeanceText.getString()) {
        vengeanceText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 30);
    }
});

// Register the tick event to handle the pyroproc logic
register("tick", () => {
    handlePyroproc();
});