import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    // Replace with a new array
    setProduct: (state, action) => {
      return action.payload;
    },

    // Add product
    addProduct: (state, action) => {
      state.push(action.payload);
    },

    // Update product based on product ID
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.findIndex((p) => p._id === updatedProduct._id);
      if (index != -1) {
        state[index] = updatedProduct;
      }
    },

    // Delete product based on product ID
    deleteProduct: (state, action) => {
      const productId = action.payload;
      return state.filter((p) => p._id != productId);
    },

    removeAllProducts: () => {
      return []
    },

    addImage: (state, action) => {
      const { productId, url } = action.payload;
      const product = state.find((p) => p._id === productId);
      if (product) {
        product.images.push({ url, public_id: null });
      }
    },

    deleteImage: (state, action) => {
      const { productId, index } = action.payload;
      const product = state.find((p) => p._id === productId);
      if (product) {
        product.images = product.images.filter((img, ind) => ind !== index);
      }
    },
  },
});

export default productSlice.reducer;
export const { setProduct, addProduct, updateProduct, removeAllProducts, addImage, deleteImage } =
  productSlice.actions;
