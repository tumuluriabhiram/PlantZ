import userModel from "../models/userModel.js";
import { isAuthenticated } from "./authController.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        
        if(!user){
          return res.json({ success: false, message: 'User not found' });
      }

      res.json({
          success: true,
          userData: {
            userId: user._id,
            name: user.name,
            email: user.email,
            about: user.about,
            isAccountVerified: user.isAccountVerified
          },

      })

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const updateUserData = async (req, res) => {

  try {
        const { userId, name, email, about } = req.body;

        const user = await userModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.about = about || user.about;

        await user.save();

        res.json({ success: true, message: 'User data updated successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}