import mongoose from "mongoose";
const searchSchema = new mongoose.Schema({
  searchInput: {
    type: String,
    required: [true, "Please insert a search input value"],
  },
  site: { type: String, required: [true, "Please insert the site of search"] },
  searchListResults: {
    type: Array,
    required: [true, "Results is required"],
  },
});

export default mongoose.models.Search || mongoose.model("Search", searchSchema);
