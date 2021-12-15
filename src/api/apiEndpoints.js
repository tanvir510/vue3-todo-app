export const apiEndpoints = Object.freeze({
  USER: {
    GET_USERS: "/users",
    USER_DETAILS: (userId) => `/users/${userId}`,
  },
  BLOG: {
    GET_BLOG_POSTS: "/posts",
  },
});
