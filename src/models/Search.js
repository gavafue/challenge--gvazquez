import mongoose from "mongoose";
const searchSchema = new mongoose.Schema({
  searchInput: {
    type: String,
    required: [true, "Please insert a search input value"],
  },
  searchListResults: {
    type: Array,
    required: [true, "Results is required"],
  },
});

export default mongoose.models.Search || mongoose.model("Search", searchSchema);
