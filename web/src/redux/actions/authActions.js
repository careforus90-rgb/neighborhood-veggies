export const registerUser = (userData) => async (dispatch) => {
  dispatch({ type: 'REGISTER_START' });
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: data.user
      });
      return true;
    } else {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: data.message || 'Registration failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data.user
      });
      return true;
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: data.message || 'Login failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch({
    type: 'LOGOUT'
  });
};

export const loadUserFromLocalStorage = () => (dispatch) => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      dispatch({
        type: 'LOAD_USER',
        payload: JSON.parse(user)
      });
    }
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
  }
};

export const updateUserProfile = (userId, profileData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PROFILE_START' });
  try {
    const response = await fetch(`/api/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(profileData)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: data.user
      });
      return true;
    } else {
      dispatch({
        type: 'UPDATE_PROFILE_FAILURE',
        payload: data.message || 'Update failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'UPDATE_PROFILE_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const changePassword = (userId, oldPassword, newPassword) => async (dispatch) => {
  dispatch({ type: 'CHANGE_PASSWORD_START' });
  try {
    const response = await fetch(`/api/auth/users/${userId}/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ oldPassword, newPassword })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'CHANGE_PASSWORD_SUCCESS'
      });
      return true;
    } else {
      dispatch({
        type: 'CHANGE_PASSWORD_FAILURE',
        payload: data.message || 'Password change failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'CHANGE_PASSWORD_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: 'FORGOT_PASSWORD_START' });
  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FORGOT_PASSWORD_SUCCESS',
        payload: data.message
      });
      return true;
    } else {
      dispatch({
        type: 'FORGOT_PASSWORD_FAILURE',
        payload: data.message || 'Request failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'FORGOT_PASSWORD_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  dispatch({ type: 'RESET_PASSWORD_START' });
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, newPassword })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'RESET_PASSWORD_SUCCESS'
      });
      return true;
    } else {
      dispatch({
        type: 'RESET_PASSWORD_FAILURE',
        payload: data.message || 'Reset failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'RESET_PASSWORD_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  dispatch({ type: 'VERIFY_EMAIL_START' });
  try {
    const response = await fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'VERIFY_EMAIL_SUCCESS'
      });
      return true;
    } else {
      dispatch({
        type: 'VERIFY_EMAIL_FAILURE',
        payload: data.message || 'Verification failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'VERIFY_EMAIL_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const clearAuthError = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_AUTH_ERROR'
  });
};
