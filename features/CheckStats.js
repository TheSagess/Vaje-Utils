import request from "RequestV2"
import {prefix} from "../util/util"
import config from "../config"

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

function getMP(name) {
    request(`https://vajeservices.xyz/api/mp/${name}`).then((data) => {
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

register("chat", (user) => {
    if (config.showMP) getMP(user)
}).setCriteria(/Party Finder > (\w+) joined the dungeon group! .+/)

function runstillcata(name, cata, floor) {
    request(`https://vajeservices.xyz/api/runstillcata/${name}/${cata}/${floor}`).then((data) => {
        try {
            let response = JSON.parse(data);
            let runsleft = response["Runs Left"];

            if (runsleft === undefined) {
                return ChatLib.chat(prefix + " &cFailed to get runs remaining!");
            }

            // Outputting the player's Cata level and floor
            ChatLib.chat(`${prefix} There are ${runsleft} runs left on ${floor}!`);
        } catch (e) {
            ChatLib.chat(prefix + " &cError fetching runs left: " + e.message);
        }
    }).catch((err) => {
        ChatLib.chat(prefix + " &cRequest failed: " + err);
    });
}

// Register the command /rtc with {name}, {cata}, and {floor} as required arguments
export const runstillcatacommand = register("command", (name, cata, floor) => {
    if (!name || !cata || !floor) {
        ChatLib.chat(prefix + " &cPlease provide a name, cata level, and floor.");
        return;
    }

    // Run the function with the provided arguments
    runstillcata(name, cata, floor);
}).setName("rtc");