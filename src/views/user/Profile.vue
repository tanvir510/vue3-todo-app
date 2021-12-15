<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="container mx-auto px-4">
    <div
      class="lg:w-11/12 w-full mx-auto bg-white overflow-hidden sm:rounded-lg"
    >
      <div class="py-5">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Personal Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details and show my activities.
        </p>
      </div>
      <figure class="md:flex border-y-1 mb-5 rounded-xl p-8 md:p-0">
        <img
          class="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          src="@/assets/images/common/Tanvir.jpg"
          alt=""
          width="384"
          height="512"
        />
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p class="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <figcaption class="font-medium">
            <div class="text-gray-700">
              <span class="text-gray-400">Fullname:</span> {{ user?.name }}
            </div>
            <div class="text-gray-700">
              <span class="text-gray-400">Email:</span> {{ user?.email }}
            </div>
            <div class="text-gray-700">
              <span class="text-gray-400">Webiste:</span> {{ user?.website }}
            </div>
          </figcaption>
        </div>
      </figure>

      <div class="py-5">
        <h3 class="text-lg leading-6 mb-5 font-medium text-gray-900">
          My Blog Posts
        </h3>
        <PostListView />
      </div>
    </div>
  </div>
</template>

<script>
import { UserApi } from "@/api";
import { useRoute } from "vue-router";
import { onMounted, reactive, toRefs } from "vue";
import PostListView from "@/components/posts/ListView";
export default {
  name: "Profile",
  components: { PostListView },
  setup() {
    const router = useRoute();
    const state = reactive({
      user: {},
    });

    // Fetch User details
    const fetchUserDetails = async (userId) => {
      try {
        const response = await UserApi.getUserDetails(userId);
        state.user = response?.data;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      // Fetch User details data
      fetchUserDetails(router.params.id);
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
