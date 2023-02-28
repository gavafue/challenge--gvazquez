// Importing the getTVBuscape function from the BUSCAPEwebScrapping module
import { getTVBuscape } from "@/lib/BUSCAPEwebScrapping";

// Defining an asynchronous function named "handler" that takes in a request and a response object
export default async function handler(req, res) {
  // Extracting the request method from the request object
  const method = req.method;
  
  // Invoking the getTVBuscape function to retrieve TV data
  const TVs = await getTVBuscape();
  
  // Using a switch statement to handle different request methods
  switch (method) {
    // Handling GET requests
    case "GET":
      try {
        // If successful, returning a JSON response with TV data and a success message
        return res.status(200).json({
          success: true,
          data: TVs,
          message: "Search successful.",
        });
      } catch (error) {
        // If any error occurs, returning an error response with a message
        return res
          .status(400)
          .json({ success: false, message: "Bad request." + error });
      }
    default:
      // If the request method is not supported, returning an error response
      return res
        .status(400)
        .json({ success: false, message: "Invalid request method." });
  }
}