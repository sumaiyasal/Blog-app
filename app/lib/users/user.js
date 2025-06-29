import User from '../models/user.model';

import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();

    // Dynamically build the update object
    const updateData = {
      firstName: first_name,
      lastName: last_name,
      profilePicture: image_url,
      email: email_addresses[0]?.email_address,
    };

    // Only add username if it's a non-null string
    if (username) {
      updateData.username = username;
    }

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
    throw error; // ⬅️ You might also want to rethrow for error handling upstream
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};