import request from "RequestV2"
import {prefix} from "../util/util"
import config from "../config"


// Functions / logic

// Function to fetch Slayer XP from the API
function getSlayerXP(username) {
    request(`https://api.vajeservices.xyz/skyblock/slayer?name=${username}`).then((data) => {
        try {
            let response = JSON.parse(data);

            // Check if the response contains the Slayer XP data
            if (!response) {
                return ChatLib.chat(`${prefix} &cFailed to fetch Slayer XP data for &e${username}&c!`);
            }

            // Construct the Slayer XP message
            let slayerXPMessage = `${prefix} &e${username}&a's Slayer XP:\n`
                + `&eBlaze XP: &a${response.blaze_xp || 0}\n`
                + `&eEnderman XP: &a${response.enderman_xp || 0}\n`
                + `&eSpider XP: &a${response.spider_xp || 0}\n`
                + `&eZombie XP: &a${response.zombie_xp || 0}\n`
                + `&eWolf XP: &a${response.wolf_xp || 0}\n`
                + `&eVampire XP: &a${response.vampire_xp || 0}`;

            // Send the message to the chat
            ChatLib.chat(slayerXPMessage);
        } catch (e) {
            ChatLib.chat(`${prefix} &cError fetching Slayer XP: &e${e.message}`);
        }
    }).catch((err) => {
        ChatLib.chat(`${prefix} &cRequest failed: &e${err}`);
    });
}

function getMP(name) {
    request(`https://api.vajeservices.xyz/skyblock/mp/${name}`).then((data) => {
        try {
            let response = JSON.parse(data);
            let mp = response.magical_power;

            if (mp === undefined) {
                return ChatLib.chat(prefix + " &cFailed to get Magical Power!");
            }

            ChatLib.chat(`${prefix} &e${name}&a's magical power is &e${mp}&a!`);
        } catch (e) {
            ChatLib.chat(prefix + " &cError fetching magical power.");
        }
    }).catch((err) => {
        ChatLib.chat(prefix + " &cRequest failed: " + err);
    });
}

function runstillcata(name, cata, floor) {
    request(`https://api.vajeservices.xyz/skyblock/runstillcata/${name}/${cata}/${floor}`).then((data) => {
        try {
            let response = JSON.parse(data);
            let runsleft = response["Runs Left"];

            if (runsleft === undefined) {
                return ChatLib.chat(prefix + " &cFailed to get runs remaining!");
            }

            // Outputting the player's Cata level and floor
            ChatLib.chat(`${prefix} &e${name}&a Has ${runsleft} runs left on  &e${floor}&a!`);
        } catch (e) {
            ChatLib.chat(prefix + " &cError fetching runs left: " + e.message);
        }
    }).catch((err) => {
        ChatLib.chat(prefix + " &cRequest failed: " + err);
    });
}

// Exporting the commands 

export const mpCommand = register("command", ...args => {
    if (!args[0]) {
        getMP(Player.getName());
    } else {
        getMP(args[0]);
    }
}).setName("mp")

register("chat", (user) => {
    if (config.showMP) getMP(user)
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/)


register("chat", (user) => {
    if (config.showMP) getMP(user)
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/)



// Register the command /rtc with {name}, {cata}, and {floor} as required arguments
export const runstillcatacommand = register("command", (name, cata, floor) => {
    if (!name || !cata || !floor) {
        ChatLib.chat(prefix + " &cPlease provide a name, cata level, and floor.");
        return;
    }

    // Run the function with the provided arguments
    runstillcata(name, cata, floor);
}).setName("rtc");



// Register the command /slayer with {username} as the argument
export const slayerCommand = register("command", (username) => {
    if (!username) {
        ChatLib.chat(`${prefix} &cPlease provide a username!`);
        return;
    }

    // Fetch and display the Slayer XP for the provided username
    getSlayerXP(username);
}).setName("slayer");
