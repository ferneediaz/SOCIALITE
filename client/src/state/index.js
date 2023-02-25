  import { createSlice } from "@reduxjs/toolkit";

  // Define initial state for the auth slice
  const initialState = {
    mode: "light", // Default to "light" mode
    user: null, // User object is initially null
    token: null, // Authentication token is initially null
    posts: [], // Empty array for posts
  };

  // Define the auth slice and its reducers using createSlice
  export const authSlice = createSlice({
    name: "auth", 
    initialState,   
    reducers: {
      // Reducer to toggle mode between "light" and "dark"
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      // Reducer to set the user and token based on an action payload
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      // Reducer to clear the user and token fields
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      // Reducer to update the "friends" field of the user object
      setFriends: (state, action) => {
        if (state.user) {
          state.user.friends = action.payload.friends;
        } else {
          console.error("user friends non-existent :(");
        }
      },
      // Reducer to set the posts field to an array of post objects
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      // Reducer to update a specific post object in the posts array
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            return action.payload.post; // Replace post object if IDs match
          }
          return post;
        });
        state.posts = updatedPosts;
      },
    },
  });

  // Export each reducer function as a named export, along with the slice reducer
  export const {
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost,
  } = authSlice.actions;
  export default authSlice.reducer;
