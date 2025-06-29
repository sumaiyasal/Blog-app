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

    // Construct the $set data without null values
    const updateData = {
      firstName: first_name,
      lastName: last_name,
      profilePicture: image_url,
      email: email_addresses?.[0]?.email_address,
    };

    // Only include username if it's not null/undefined/empty
    if (typeof username === 'string' && username.trim() !== '') {
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
    throw error;
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