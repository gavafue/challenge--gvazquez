// Importing the getBuscapeSearch function from the BUSCAPEwebScrapping module
import { getBuscapeSearch } from "@/lib/BUSCAPEwebScrapping";

// Defining an asynchronous function named "handler" that takes in a request and a response object
export default async function handler(req, res) {
  // Extracting the request method and the search input from the request object
  const method = req.method;
  const searchInput = req.body.searchInput;

  // Invoking the getBuscapeSearch function to retrieve search results based on the input
  const result = await getBuscapeSearch(searchInput);

  // Using a switch statement to handle different request methods
  switch (method) {
    // Handling POST requests
    case "POST":
      try {
        // If successful, returning a JSON response with the search results and a success message
        return res.status(200).json({
          success: true,
          data: result,
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