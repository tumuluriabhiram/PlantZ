import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    enum: ['Fungal', 'Bacterial', 'Viral', 'Nutritional', 'Algae', "N/A"],
    required: true
  },
  iscurable: {
    type: Boolean,
    required: true
  },
  prevention: {
    type:[String],
    required: true
  },
  treatment:{
    type: [String],
    required: true
  }
});

const Disease = mongoose.model("Disease", DiseaseSchema);

export default Disease;