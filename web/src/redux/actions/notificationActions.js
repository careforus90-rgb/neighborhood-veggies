export const fetchNotifications = () => async (dispatch) => {
  dispatch({ type: 'FETCH_NOTIFICATIONS_START' });
  try {
    const response = await fetch('/api/notifications', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_NOTIFICATIONS_SUCCESS',
        payload: data.notifications
      });
    } else {
      dispatch({
        type: 'FETCH_NOTIFICATIONS_FAILURE',
        payload: data.message || 'Failed to fetch notifications'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_NOTIFICATIONS_FAILURE',
      payload: error.message
    });
  }
};

export const markNotificationAsRead = (notificationId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'MARK_NOTIFICATION_AS_READ',
        payload: notificationId
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

export const markAllNotificationsAsRead = () => async (dispatch) => {
  try {
    const response = await fetch('/api/notifications/read-all', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'MARK_ALL_NOTIFICATIONS_AS_READ'
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }
};

export const deleteNotification = (notificationId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: notificationId
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting notification:', error);
    return false;
  }
};

export const deleteAllNotifications = () => async (dispatch) => {
  try {
    const response = await fetch('/api/notifications', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'DELETE_ALL_NOTIFICATIONS'
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting all notifications:', error);
    return false;
  }
};

export const getUnreadCount = () => async (dispatch) => {
  try {
    const response = await fetch('/api/notifications/unread-count', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'GET_UNREAD_COUNT',
        payload: data.count
      });
      return data.count;
    }
  } catch (error) {
    console.error('Error getting unread count:', error);
  }
};

export const subscribeToNotifications = () => async (dispatch) => {
  try {
    const response = await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'SUBSCRIBE_NOTIFICATIONS_SUCCESS',
        payload: data.subscription
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    return false;
  }
};

export const unsubscribeFromNotifications = () => async (dispatch) => {
  try {
    const response = await fetch('/api/notifications/unsubscribe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'UNSUBSCRIBE_NOTIFICATIONS_SUCCESS'
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error unsubscribing from notifications:', error);
    return false;
  }
};

export const setNotificationPreferences = (preferences) => async (dispatch) => {
  dispatch({ type: 'SET_NOTIFICATION_PREFERENCES_START' });
  try {
    const response = await fetch('/api/notifications/preferences', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(preferences)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'SET_NOTIFICATION_PREFERENCES_SUCCESS',
        payload: data.preferences
      });
      return true;
    } else {
      dispatch({
        type: 'SET_NOTIFICATION_PREFERENCES_FAILURE',
        payload: data.message || 'Failed to set preferences'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'SET_NOTIFICATION_PREFERENCES_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const getNotificationPreferences = () => async (dispatch) => {
  dispatch({ type: 'FETCH_NOTIFICATION_PREFERENCES_START' });
  try {
    const response = await fetch('/api/notifications/preferences', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_NOTIFICATION_PREFERENCES_SUCCESS',
        payload: data.preferences
      });
      return data.preferences;
    } else {
      dispatch({
        type: 'FETCH_NOTIFICATION_PREFERENCES_FAILURE',
        payload: data.message || 'Failed to fetch preferences'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_NOTIFICATION_PREFERENCES_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const addNotification = (notification) => (dispatch) => {
  dispatch({
    type: 'ADD_NOTIFICATION',
    payload: notification
  });
};

export const removeNotification = (notificationId) => (dispatch) => {
  dispatch({
    type: 'REMOVE_NOTIFICATION',
    payload: notificationId
  });
};

export const clearNotificationError = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_NOTIFICATION_ERROR'
  });
};
