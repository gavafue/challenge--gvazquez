// Importing the `getRefrigeratorBuscape` function
import { getRefrigeratorBuscape } from "@/lib/BUSCAPEwebScrapping";

// Define an async function to handle incoming requests
export default async function handler(req, res) {
  // Get the HTTP request method from the request object
  const method = req.method;
  
  // Retrieve refrigerator data using `getRefrigeratorBuscape` function
  const refrigerator = await getRefrigeratorBuscape();

  // Use a switch statement to handle different HTTP request methods
  switch (method) {
    // Handling GET requests
    case "GET":
      try {
        // If the GET request is successful, return a success response with refrigerator data
        return res.status(200).json({
          success: true,
          data: refrigerator,
          message: "Search successful.",
        });
      } catch (error) {
        // If any error occurs, return an error response with a message and the error object
        return res
          .status(400)
          .json({ success: false, message: "Bad request." + error });
      }
    default:
      // Return an error response for invalid request methods
      return res
        .status(400)
        .json({ success: false, message: "Invalid request method." });
  }
}
