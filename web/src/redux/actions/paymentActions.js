export const initiatePayment = (paymentData) => async (dispatch) => {
  dispatch({ type: 'INITIATE_PAYMENT_START' });
  try {
    const response = await fetch('/api/payments/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(paymentData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'INITIATE_PAYMENT_SUCCESS',
        payload: data.payment
      });
      return data.payment;
    } else {
      dispatch({
        type: 'INITIATE_PAYMENT_FAILURE',
        payload: data.message || 'Failed to initiate payment'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'INITIATE_PAYMENT_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const processPayment = (paymentId, paymentDetails) => async (dispatch) => {
  dispatch({ type: 'PROCESS_PAYMENT_START' });
  try {
    const response = await fetch(`/api/payments/${paymentId}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(paymentDetails)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'PROCESS_PAYMENT_SUCCESS',
        payload: data.payment
      });
      return data.payment;
    } else {
      dispatch({
        type: 'PROCESS_PAYMENT_FAILURE',
        payload: data.message || 'Payment processing failed'
      });
      return null;
    }
  } catch (error) {
    dispatch({
      type: 'PROCESS_PAYMENT_FAILURE',
      payload: error.message
    });
    return null;
  }
};

export const verifyPayment = (paymentId, transactionId) => async (dispatch) => {
  dispatch({ type: 'VERIFY_PAYMENT_START' });
  try {
    const response = await fetch(`/api/payments/${paymentId}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ transactionId })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'VERIFY_PAYMENT_SUCCESS',
        payload: data.payment
      });
      return true;
    } else {
      dispatch({
        type: 'VERIFY_PAYMENT_FAILURE',
        payload: data.message || 'Payment verification failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'VERIFY_PAYMENT_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const refundPayment = (paymentId, refundReason) => async (dispatch) => {
  dispatch({ type: 'REFUND_PAYMENT_START' });
  try {
    const response = await fetch(`/api/payments/${paymentId}/refund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ reason: refundReason })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'REFUND_PAYMENT_SUCCESS',
        payload: data.payment
      });
      return true;
    } else {
      dispatch({
        type: 'REFUND_PAYMENT_FAILURE',
        payload: data.message || 'Refund failed'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'REFUND_PAYMENT_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const fetchPaymentMethods = () => async (dispatch) => {
  dispatch({ type: 'FETCH_PAYMENT_METHODS_START' });
  try {
    const response = await fetch('/api/payments/methods', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_PAYMENT_METHODS_SUCCESS',
        payload: data.methods
      });
    } else {
      dispatch({
        type: 'FETCH_PAYMENT_METHODS_FAILURE',
        payload: data.message || 'Failed to fetch payment methods'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_PAYMENT_METHODS_FAILURE',
      payload: error.message
    });
  }
};

export const addPaymentMethod = (methodData) => async (dispatch) => {
  dispatch({ type: 'ADD_PAYMENT_METHOD_START' });
  try {
    const response = await fetch('/api/payments/methods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(methodData)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'ADD_PAYMENT_METHOD_SUCCESS',
        payload: data.method
      });
      return true;
    } else {
      dispatch({
        type: 'ADD_PAYMENT_METHOD_FAILURE',
        payload: data.message || 'Failed to add payment method'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'ADD_PAYMENT_METHOD_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const removePaymentMethod = (methodId) => async (dispatch) => {
  dispatch({ type: 'REMOVE_PAYMENT_METHOD_START' });
  try {
    const response = await fetch(`/api/payments/methods/${methodId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'REMOVE_PAYMENT_METHOD_SUCCESS',
        payload: methodId
      });
      return true;
    } else {
      dispatch({
        type: 'REMOVE_PAYMENT_METHOD_FAILURE',
        payload: 'Failed to remove payment method'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'REMOVE_PAYMENT_METHOD_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const fetchPaymentHistory = (filters = {}) => async (dispatch) => {
  dispatch({ type: 'FETCH_PAYMENT_HISTORY_START' });
  try {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.fromDate) queryParams.append('fromDate', filters.fromDate);
    if (filters.toDate) queryParams.append('toDate', filters.toDate);
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);

    const response = await fetch(`/api/payments/history?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'FETCH_PAYMENT_HISTORY_SUCCESS',
        payload: data.payments
      });
    } else {
      dispatch({
        type: 'FETCH_PAYMENT_HISTORY_FAILURE',
        payload: data.message || 'Failed to fetch payment history'
      });
    }
  } catch (error) {
    dispatch({
      type: 'FETCH_PAYMENT_HISTORY_FAILURE',
      payload: error.message
    });
  }
};

export const setDefaultPaymentMethod = (methodId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/payments/methods/${methodId}/default`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      dispatch({
        type: 'SET_DEFAULT_PAYMENT_METHOD_SUCCESS',
        payload: methodId
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error setting default payment method:', error);
    return false;
  }
};

export const generatePaymentReceipt = (paymentId) => async (dispatch) => {
  dispatch({ type: 'GENERATE_RECEIPT_START' });
  try {
    const response = await fetch(`/api/payments/${paymentId}/receipt`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.blob();
    if (response.ok) {
      dispatch({
        type: 'GENERATE_RECEIPT_SUCCESS'
      });
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      return true;
    } else {
      dispatch({
        type: 'GENERATE_RECEIPT_FAILURE',
        payload: 'Failed to generate receipt'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'GENERATE_RECEIPT_FAILURE',
      payload: error.message
    });
    return false;
  }
};

export const clearPaymentError = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_PAYMENT_ERROR'
  });
};
