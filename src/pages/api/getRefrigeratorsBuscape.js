import { getRefrigeratorBuscape } from "@/lib/BUSCAPEwebScrapping";

export default async function handler(req, res) {
  const method = req.method;
  const refrigerator = await getRefrigeratorBuscape();
  switch (method) {
    // Handling GET requests
    case "GET":
      try {
        return res.status(200).json({
          success: true,
          data: refrigerator,
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
