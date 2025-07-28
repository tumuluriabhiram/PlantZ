import userModel from '../models/userModel.js';

// Get user rewards
export const getRewards = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ rewards: user.rewards });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rewards', error });
  }
};

// Update user rewards
export const updateRewards = async (req, res) => {
  try {
    const userId = req.params.id;
    const { rewards } = req.body;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.rewards = rewards;
    await user.save();

    res.status(200).json({ message: 'Rewards updated successfully', rewards: user.rewards });
  } catch (error) {
    res.status(500).json({ message: 'Error updating rewards', error });
  }
};
