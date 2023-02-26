// Importing database connection function and Search model
import dbConnect from "./dataBaseConection";
import Search from "@/models/Search";

export default async function handler(req, res) {
  // Connecting to the database
  await dbConnect();
  const method = { req };
  switch (method) {
    // Handling GET requests
    case "GET":
      try {
        // Creating a regular expression with case-insensitive search for the provided search string
        const regex = new RegExp(req.body.search, "i");
        // Finding all documents in Search collection matching the regular expression
        const previouslySearch = await Search.find({ search: regex });
        // If search results found, returning success response with data
        if (previouslySearch) {
          return res
            .status(200)
            .json({
              success: true,
              data: previouslySearch,
              message: "Search successful.",
            });
        } else {
          // If no search results found, returning success response with empty data
          res
            .status(404)
            .json({
              success: true,
              data: previouslySearch,
              message: "No search results found.",
            });
        }
      } catch (error) {
        // If any error occurs, returning error response
        return res
          .status(400)
          .json({ success: false, message: "Bad request.", error });
      }
    // Handling POST requests
    case "POST":
      try {
        // Creating a new Search document with the provided request body
        const newSearch = await Search.create(req.body);
        // Returning success response with the newly created document
        return res
          .status(200)
          .json({
            success: true,
            data: newSearch,
            message: "New search saved successfully.",
          });
      } catch (error) {
        // If any error occurs, returning error response
        return res
          .status(400)
          .json({ success: false, message: "Bad request.", error });
      }
    // Handling all other requests
    default:
      // Returning error response for invalid request methods
      return res
        .status(400)
        .json({ success: false, message: "Invalid request method." });
  }
}
