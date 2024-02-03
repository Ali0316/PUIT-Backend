const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: [
    {
      title: String,
      link: String,
    },
  ],
  status: {
    type: String,
  }
});

module.exports = mongoose.model("Card", CardSchema);