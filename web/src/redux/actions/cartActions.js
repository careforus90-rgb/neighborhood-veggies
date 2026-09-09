export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity || 1,
      image: product.image,
      farmerId: product.farmerId
    }
  });
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: productId
  });
};

export const updateCartItem = (productId, quantity) => (dispatch) => {
  dispatch({
    type: 'UPDATE_CART_ITEM',
    payload: {
      id: productId,
      quantity
    }
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: 'CLEAR_CART'
  });
};

export const saveCartToLocalStorage = (cart) => (dispatch) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const loadCartFromLocalStorage = () => (dispatch) => {
  try {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      dispatch({
        type: 'LOAD_CART',
        payload: parsedCart
      });
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
};

export const applyCoupon = (couponCode) => async (dispatch) => {
  try {
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: couponCode })
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: 'APPLY_COUPON',
        payload: {
          code: couponCode,
          discount: data.discount,
          discountType: data.discountType
        }
      });
      return true;
    } else {
      dispatch({
        type: 'COUPON_ERROR',
        payload: data.message || 'Invalid coupon'
      });
      return false;
    }
  } catch (error) {
    dispatch({
      type: 'COUPON_ERROR',
      payload: error.message
    });
    return false;
  }
};

export const removeCoupon = () => (dispatch) => {
  dispatch({
    type: 'REMOVE_COUPON'
  });
};
