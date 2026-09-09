const initialState = {
  products: [],
  loading: false,
  error: null,
  filteredProducts: [],
  selectedProduct: null
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_PRODUCTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload
      };
    case 'FILTER_PRODUCTS':
      const { category, priceRange, searchTerm } = action.payload;
      let filtered = state.products;

      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (category) {
        filtered = filtered.filter(product => product.category === category);
      }

      if (priceRange) {
        filtered = filtered.filter(product =>
          product.price >= priceRange.min && product.price <= priceRange.max
        );
      }

      return {
        ...state,
        filteredProducts: filtered
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
        filteredProducts: [...state.filteredProducts, action.payload]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        filteredProducts: state.filteredProducts.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        filteredProducts: state.filteredProducts.filter(product => product.id !== action.payload)
      };
    default:
      return state;
  }
}
