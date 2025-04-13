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
      const updated = action.payload;
      const index = state.findIndex((p) => p._id === updated._id);
      if (index != -1) {
        state[index] = updated;
      }
    },

    // Delete product based on product ID
    deleteProduct: (state, action) => {
      const productId = action.payload;
      return state.filter((p) => p._id != productId);
    },

    deleteImage: (state, action) => {
      const { productId, publicId } = action.payload;
      console.log("from slice productId:",productId);
      console.log("form slice publicId:", publicId);

      const product = state.find((p) => p._id === productId);
      if (product) {
        product.images = product.images.filter(
          (img) => img.public_id !== publicId
        );
      }
    },
  },
});

export default productSlice.reducer;
export const { setProduct, addProduct, updateProduct, deleteImage } = productSlice.actions;
