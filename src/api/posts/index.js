import { apiEndpoints } from "../apiEndpoints";

export class BlogApi {
  static getBlogPosts(payload) {
    // eslint-disable-next-line no-undef
    return axios.get(
      apiEndpoints.BLOG.GET_BLOG_POSTS,
      payload ? { params: payload } : null
    );
  }
}
