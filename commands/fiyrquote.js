import { prefix } from "../util/util"; // Assuming this is where the prefix is coming from
import request from "RequestV2"; // Importing RequestV2

// Register the fiyrquote command
export const FiyrquoteCommand = register("command", (commandArgs) => {
    const quoteNumber = commandArgs[0]; // Assuming the number is the first argument
    const apiUrl = `https://vajeservices.xyz/checkquote?number=${quoteNumber}`;
    
    getQuote(apiUrl, quoteNumber);
}).setName("fiyrquote", true); // Register command with true flag for overriding

// Function to get the quote using RequestV2
function getQuote(apiUrl, quoteNumber) {
    request(apiUrl).then((data) => {
        // Parse the response
        const response = JSON.parse(data);
        const quote = response.quote;

        // Send the response back with the quote
        const message = `${prefix} ${quoteNumber} is "${quote}"`;
        sendReply(message); // Assuming a method to send a reply exists
    }).catch((error) => {
        // Handle errors
        const errorMessage = `Could not retrieve quote number ${quoteNumber}. Please try again later.`;
        sendReply(errorMessage);
    });
}

// Simulated function to send replies
function sendReply(message) {
    ChatLib.chat(message); // Assuming ChatLib is available to send chat messages
}
