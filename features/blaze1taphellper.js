import config from "../config";
import { data } from "../util/data";
import { registerWhen } from "../../BloomCore/utils/Utils";

// Define constants
const TIMER_DELAY = 1250; // 1.5 seconds
const BEEP_DURATION = 3000; // 3 seconds
const TIMER_DISPLAY_DURATION = 1250; // 1.5 seconds

let armorCheckTime = 0;
let beeping = false;
let showMessage = false;
let messageStartTime = 0;
let wasWearingTarantula = false;

// Timer text for displaying on screen
let timerText = new Text("").setScale(3).setShadow(true).setAlign("CENTER").setColor(Renderer.RED);
let messageText = new Text("").setScale(3).setShadow(true).setAlign("CENTER").setColor(Renderer.RED);

// Function to check if player is wearing full Tarantula armor
function isWearingFullTarantula() {
    const helmet = Player.armor.getHelmet()?.getName() || "";
    const chestplate = Player.armor.getChestplate()?.getName() || "";
    const leggings = Player.armor.getLeggings()?.getName() || "";
    const boots = Player.armor.getBoots()?.getName() || "";

    return helmet.includes("Tarantula") &&
           chestplate.includes("Tarantula") &&
           leggings.includes("Tarantula") &&
           boots.includes("Tarantula");
}

// Function to start the timer
function startTimer() {
    armorCheckTime = Date.now();
    beeping = false;
    showMessage = false;
}

// Function to handle the timer and beeping
function handleTimer() {
    if (armorCheckTime) {
        const elapsedTime = Date.now() - armorCheckTime;

        // Display the timer
        if (elapsedTime < TIMER_DISPLAY_DURATION) {
            const remaining = (TIMER_DISPLAY_DURATION - elapsedTime) / 1000;
            timerText.setString(remaining.toFixed(2));
        } else {
            timerText.setString("");
        }

        // Show message and start beeping after 1.5 seconds
        if (elapsedTime >= TIMER_DELAY && !beeping) {
            ChatLib.chat("&cHIT BOSS NOW!!!");
            World.playSound("random.orb", 1, 1);
            beeping = true;
            showMessage = true;
            messageStartTime = Date.now();
        }

        // Hide message after 3 seconds
        if (showMessage && Date.now() - messageStartTime >= BEEP_DURATION) {
            showMessage = false;
            armorCheckTime = 0; // Reset timer
        }
    }
}

// Registering tick event to handle timer and beeping
register("tick", () => {
    const currentlyWearingTarantula = isWearingFullTarantula();

    if (currentlyWearingTarantula && !wasWearingTarantula) {
        // Player just started wearing full Tarantula armor
        startTimer();
    }

    wasWearingTarantula = currentlyWearingTarantula;
    handleTimer();
});

// Registering renderOverlay event to show timer and message
register("renderOverlay", () => {
    if (timerText.getString()) {
        timerText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2);
    }
    if (showMessage) {
        messageText.setString("HIT BOSS NOW!!!");
        messageText.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2);
    }
});

// Test command to manually check the armor and start the timer
register("command", () => {
    if (isWearingFullTarantula()) {
        ChatLib.chat("&aWearing full Tarantula armor!");
        startTimer(); // Manually start the timer for testing
        ChatLib.chat("&aTimer started manually.");
    } else {
        ChatLib.chat("&cNot wearing full Tarantula armor.");
    }
}).setName("testblaze1tap");
