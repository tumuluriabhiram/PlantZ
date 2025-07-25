import { fileURLToPath } from 'url';
import { dirname } from 'path';

import sharp from 'sharp';
import ort from 'onnxruntime-node';

import Disease from '../models/Disease.js';

import diseaseMap from '../models/index_to_class.js';
import { get } from 'http';

const __filename = fileURLToPath(import.meta.url);


async function getDisease(index){
  const diseaseName = diseaseMap[index];

  if (diseaseName.toLowerCase().includes("healthy")) {
    return {
      name: diseaseName,
      type: "N/A",
      iscurable: false,
      prevention: ["Regular care and maintenance"],
      treatment: ["No action required"]
    };
  } 
  else {
    try {
      const disease = await Disease.findOne({ name: diseaseName }, { _id: 0 });
      if (!disease) {
        throw new Error(`Disease with name '${diseaseName}' not found`);
      }
      return disease;
    } catch (err) {
      console.error("Error fetching disease data:", err);
      throw new Error("Failed to fetch disease data");
    }
  }
}


//@Public
//@Path: /api/disease/
//@Method: GET
const getDiseases = async (req, res) => {
  try{
    const diseases = await Disease.find();
    res.json({
      success: true,
      count: diseases.length,
    });
  }
  catch (err) {
    console.error('Get diseases error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch diseases'
    });
  }
};


/// MOST IMP FUNCTION ///


//@Public
//@Path: /api/disease/
//@Method: POST
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

    const diseaseData = await getDisease(output);

    // Return the file information
    res.status(200).json({
      success: true,
      disease: diseaseData,
      confidence: (results[output]*100).toFixed(2) + "%"
      
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