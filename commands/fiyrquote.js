import { prefix } from "../util/util"; // Assuming this is where the prefix is coming from
import request from "RequestV2"; // Importing RequestV2

// Register the fiyrquote command
export const FiyrquoteCommand = register("command", (...commandArgs) => { // Use spread operator to capture all arguments
    const quoteNumber = commandArgs.join(""); // Combine all arguments into a single number

    if (!quoteNumber || isNaN(quoteNumber)) {
        return ChatLib.chat(`${prefix} &cPlease provide a valid quote number!`);
    }

    const apiUrl = `https://vajeservices.xyz/checkquote?number=${quoteNumber}`;
    getQuote(apiUrl, quoteNumber);
}).setName("fiyrquote", true); // Register command with true flag for overriding

// Function to get the quote using RequestV2
function getQuote(apiUrl, quoteNumber) {
    request(apiUrl).then((data) => {
        try {
            // Parse the response
            const response = JSON.parse(data);
            const quote = response.quote;

            // Check if the quote exists
            if (!quote) {
                throw new Error("No quote found");
            }

            // Send the response back with the quote
            const message = `${prefix} &eQuote ${quoteNumber} is: &a"${quote}"`;
            sendReply(message);
        } catch (e) {
            // Handle parsing errors or missing quote
            const errorMessage = `${prefix} &cError: No quote found for number ${quoteNumber}.`;
            sendReply(errorMessage);
        }
    }).catch((error) => {
        // Handle request errors
        const errorMessage = `${prefix} &cRequest failed: Could not retrieve quote number ${quoteNumber}. Please try again later.`;
        sendReply(errorMessage);
    });
}

// Simulated function to send replies
function sendReply(message) {
    ChatLib.chat(message); // Assuming ChatLib is available to send chat messages
}
