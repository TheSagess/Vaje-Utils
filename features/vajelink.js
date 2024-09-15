import config from "../config";
import request from "RequestV2";

function loggedin() {
    request('https://vajeservices.xyz/stats/onload', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive'
        }
    })
    .then(response => {
        // Assuming response is a text, handle it as needed
        console.log("Logged in successfully! Response: " + response);
    })
    .catch(error => {
        console.error("Failed to log in: " + error);
    });
}

function loggedout() {
    request('https://vajeservices.xyz/stats/onquit', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive'
        }
    })
    .then(response => {
        // Assuming response is a text, handle it as needed
        console.log("Logged out successfully! Response: " + response);
    })
    .catch(error => {
        console.error("Failed to log out: " + error);
    });
}

register("gameLoad", () => {
    if (!config.vajeweb) return
    loggedin();
});

register("gameUnload", () => {
    loggedout();
});