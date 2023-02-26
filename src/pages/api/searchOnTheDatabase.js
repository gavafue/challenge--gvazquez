// Importing database connection function and Search model
import dbConnect from "./dataBaseConection";
import Search from "@/models/Search";

export default async function handler(req, res) {
  // Connecting to the database
  await dbConnect();
  const method = req.method;
  switch (method) {
    // Handling GET requests
    case "POST":
      try {
        // Creating a regular expression with case-insensitive search for the provided search string
        const regex = new RegExp(req.body.search, "i");
        // Finding all documents in Search collection matching the regular expression
        const previouslySearch = await Search.find({ searchInput: regex });
        // If search results found, returning success response with data

        return res.status(200).json({
          success: true,
          data: previouslySearch,
          message: "Search successful.",
        });
      } catch (error) {
        // If any error occurs, returning error response
        return res
          .status(400)
          .json({ success: false, message: "Bad request." + error });
      }
    default:
      // Returning error response for invalid request methods
      return res
        .status(400)
        .json({ success: false, message: "Invalid request method." });
  }
}
