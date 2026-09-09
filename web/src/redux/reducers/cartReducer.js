const initialState = {
  items: [],
  totalPrice: 0,
  totalItems: 0
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
          totalItems: state.totalItems + action.payload.quantity
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
        totalItems: state.totalItems + action.payload.quantity
      };
    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        totalItems: state.totalItems - itemToRemove.quantity
      };
    case 'UPDATE_CART_ITEM':
      const updatedItem = state.items.find(item => item.id === action.payload.id);
      const priceDifference = (action.payload.quantity - updatedItem.quantity) * updatedItem.price;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        totalPrice: state.totalPrice + priceDifference,
        totalItems: state.totalItems + (action.payload.quantity - updatedItem.quantity)
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}
