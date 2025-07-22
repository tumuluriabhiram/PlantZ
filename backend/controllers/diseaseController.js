import { fileURLToPath } from 'url';
import { dirname } from 'path';

import sharp from 'sharp';
import ort from 'onnxruntime-node';

import diseaseMap from '../models/index_to_class.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all diseases for user
const getDiseases = async (req, res) => {
  res.json({"test": "good"});
};

const postImage = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

    const imgSize = 200

    const imageBuffer = await sharp(req.file.buffer)
      .resize(imgSize, imgSize)
      .toFormat("jpg")
      .raw()
      .toBuffer();


    const floatArray = Float32Array.from(imageBuffer);
    const inputTensor = new ort.Tensor('float32', floatArray, [1, imgSize, imgSize, 3]);
    const session = await ort.InferenceSession.create('../backend/plant_disease.onnx');
    const feeds = { input_1: inputTensor };

    let results = await session.run(feeds);
    results = results.dense_1.cpuData;

    let output = 0

    for (let i = 0; i < results.length; i++) {
      if (results[i]>results[output]) {
        output = i;
      }
    }

    // Return the file information
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      disease: diseaseMap[output],
      confidence: (results[output]*100).toFixed(2) + "%",
      treatment: [
      "Immediately isolate the affected plant to prevent spreading to other plants.",
      "Remove and dispose of heavily infected leaves and stems.",
      "Apply a fungicide specifically formulated for powdery mildew. Neem oil or potassium bicarbonate solutions are effective organic options.",
      "Improve air circulation around the plant by pruning dense foliage.",
      ],
      prevention: "To prevent future infections, ensure good air circulation, avoid overhead watering, and space plants properly. Consider preventative treatments during humid conditions."
    });
    
  } catch (error) {
    console.error("Error handling image upload:", error);
    res.status(500).json({ error: "Failed to process image upload" });
  }
};

export default {
  getDiseases,
  postImage
};