// Import the Mongoose library
import mongoose from "mongoose";

// Create a new Mongoose schema for the search object
const searchSchema = new mongoose.Schema({
  // Define a field for the user's search input
  searchInput: {
    type: String,
    required: [true, "Please insert a search input value"],
  },
  // Define a field for the site being searched
  site: {
    type: String,
    required: [true, "Please insert the site of search"],
  },
  // Define a field for the search results
  searchListResults: {
    type: Array,
    required: [true, "Results is required"],
  },
});

// Export a Mongoose model for the Search schema, using an existing model if it exists
// Otherwise, create a new model
export default mongoose.models.Search || mongoose.model("Search", searchSchema);
