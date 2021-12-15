<template>
  <div class="container">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        v-for="(post, index) in posts"
        :key="index"
        class="p-8 pr-3 bg-white shadow-md rounded items-center justify-between"
      >
        <div class="flex">
          <div>
            <h6 class="text-2xl font-bold mb-1 mt-0">{{ post.title }}</h6>
            <div class="text-gray-500 text-sm">{{ post.body }}</div>
          </div>
          <div class="pl-4 flex">
            <button
              class="px-2 text-red-600 text-xl"
              @click="removePost(index)"
              title="Remove todo"
            >
              &times;
            </button>
            <!-- <button
              class="px-1 text-gray-600 text-xl"
              @click="toggleModal(post)"
              title="Edit post"
            >
              &#9998;
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-10" v-if="posts.length">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="handleLoadMore()"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script>
import { BlogApi } from "@/api/";
import { reactive, onMounted, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  components: {},
  setup() {
    const store = useStore();
    const router = useRoute();
    const state = reactive({
      posts: [],
      page: 1,
      postText: "",
      post: {},
    });

    // Fetch Posts Lists
    const fetchBlogPosts = async (payload = {}) => {
      try {
        store.commit("loading/activate", null, { root: true });
        const response = await BlogApi.getBlogPosts(payload);

        if (response.status === 200) {
          store.commit("loading/deactivate", null, { root: true });
          state.posts = [...state.posts, ...response?.data];
        }
      } catch (error) {
        store.commit("loading/deactivate", null, { root: true });
        console.log(error);
      }
    };

    // Remove todo post
    const removePost = (index) => {
      if (!confirm("Are you sure want to delete ?")) {
        return;
      }
      // Todo: Dummy purpose use splice function but here we'll call delete API to remove item
      state.posts.splice(index, 1);
    };

    // Handle Load More API
    const handleLoadMore = () => {
      state.page = state.page + 1;
      fetchBlogPosts({ userId: router.params.id, page: state.page });
    };

    onMounted(() => {
      // Fetch all blogs, dummy purpose use User as id number 2
      fetchBlogPosts({ userId: router.params.id, page: state.page });
    });

    return {
      ...toRefs(state),
      removePost,
      handleLoadMore,
    };
  },
};
</script>
