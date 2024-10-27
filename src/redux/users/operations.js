import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dark-side-of-the-app01.onrender.com';

export const fetchLiters = createAsyncThunk(
  'auth/register',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/auth/register');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

axios.defaults.baseURL = 'https://dark-side-of-the-app01.onrender.com';

// export const fetchLiters = createAsyncThunk(
//   'auth/register',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/auth/register');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.massage);
//     }
//   }
// );

export const uploadUserPhoto = createAsyncThunk(
  'users/uploadPhoto',
  async ({ photo, token }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('photo', photo);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('/users/photo', formData, config);
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 401
          ? 'Unauthorized. Please log in.'
          : error.response?.status === 404
          ? 'User not found.'
          : 'Failed to upload photo.';
      return rejectWithValue(message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'users/updateInfo',
  async (
    { id, name, email, gender, password, newPassword, token },
    { rejectWithValue }
  ) => {
    try {
      const data = {
        ...(name && { name }),
        ...(email && { email }),
        ...(gender && { gender }),
      };
      if (password && newPassword) {
        data.password = password;
        data.newPassword = newPassword;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.patch(`/users/${id}`, data, config);
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 400
          ? 'New password cannot be the same as the old password.'
          : error.response?.status === 401
          ? 'Unauthorized access. Please log in again.'
          : 'Failed to update user information.';
      return rejectWithValue(message);
    }
  }
);
