import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, '../uploads');

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
    
    // Create a unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(req.file.originalname).toLowerCase();
    const filename = `plant-${uniqueSuffix}${ext}`;
    const filepath = path.join(uploadDir, filename);
    
    // Write the file to disk
    await fs.writeFile(filepath, req.file.buffer);

        
    // Return the file information
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      fileData: {
        filename: filename,
        path: filepath,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
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