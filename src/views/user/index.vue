<template>
  <div class="lg:w-11/12 w-full mx-auto bg-white overflow-hidden sm:rounded-lg">
    <div class="container">
      <!-- List data show from here -->
      <table class="table-wrapper">
        <!-- Table row header start from here -->
        <tr class="table-header">
          <th>Id</th>
          <th class="dropdown">
            Name <span class="carret">▼</span>
            <ul class="dropdown-menu">
              <li class="list" @click="handleSorting('asc')">ASC</li>
              <li class="list" @click="handleSorting('desc')">DSC</li>
            </ul>
          </th>
          <th class="dropdown">
            Email <span class="carret">▼</span>
            <ul class="dropdown-menu">
              <li class="list" @click="handleSorting('asc')">ASC</li>
              <li class="list" @click="handleSorting('desc')">DSC</li>
            </ul>
          </th>
          <th class="dropdown">
            Website <span class="carret">▼</span>
            <ul class="dropdown-menu">
              <li class="list" @click="handleSorting('asc')">ASC</li>
              <li class="list" @click="handleSorting('desc')">DSC</li>
            </ul>
          </th>
          <th class="details-btn">Details</th>
        </tr>
        <!-- Table row data start from here -->
        <tr class="table-body" v-for="(user, index) of users" :key="index">
          <td>{{ user?.id }}</td>
          <td>{{ user?.name }}</td>
          <td>{{ user?.email }}</td>
          <td>{{ user?.website }}</td>
          <td>
            <button
              @click="$router.push(`/profile/${user?.id}`)"
              class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded"
            >
              Details
            </button>
          </td>
        </tr>
      </table>

      <div
        v-if="users.length"
        class="lg:w-6/12 mb-10 w-full mx-auto bg-white overflow-hidden sm:rounded-lg"
      >
        <Pagination
          :pages="10"
          :current="page"
          @changed="handleUsePagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { UserApi } from "../../api";
import { reactive, toRefs, onMounted } from "vue";
import { useStore } from "vuex";
import Pagination from "@/components/common/Pagination";
export default {
  components: { Pagination },
  setup() {
    const store = useStore();
    const state = reactive({
      users: [],
      page: 1,
    });

    // Fetch Users Lists
    const fetchUserLists = async (payload = {}) => {
      try {
        store.commit("loading/activate", null, { root: true });
        const response = await UserApi.getUserLists(payload);

        if (response.status === 200) {
          store.commit("loading/deactivate", null, { root: true });
          state.users = response?.data;
        }
      } catch (error) {
        store.commit("loading/deactivate", null, { root: true });
        console.log(error);
      }
    };

    // Users pagination orders
    const handleUsePagination = (page) => {
      state.page = page;
      fetchUserLists({ page: state.page });
    };

    // Handle Sorting function
    const handleSorting = (value) => {
      if (value === "asc") {
        state.users = state.users.sort((a, b) => a.id - b.id);
      } else if (value === "desc") {
        state.users = state.users.sort((a, b) => b.id - a.id);
      }
    };

    onMounted(() => {
      // Fetch all users, dummy purpose use User as id number 2
      fetchUserLists({ page: state.page });
    });

    return {
      ...toRefs(state),
      handleUsePagination,
      handleSorting,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/sass/_variables.scss";
@import "~@/assets/sass/_mixins.scss";
.table-wrapper {
  width: 100%;
  border-spacing: 0;
  margin-top: 40px;
  margin-bottom: 30px;
  tr {
    background: #f9f9f9;
    &:nth-child(even) {
      background: $white;
    }
    th,
    td {
      text-align: center;
      padding: 22px 10px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: $gray;
      height: 70px;
      display: table-cell;
      &.edit-btn,
      &.delete-btn {
        max-width: 80px;
        cursor: pointer;
      }
      &.author-circle {
        justify-content: center;
      }
      &.date-time {
        font-weight: 700;
      }
      &.nickname {
        color: $secondary;
        text-decoration: underline;
      }
      &.status {
        font-weight: 700;
        &.gray {
          color: $gray;
        }
        &.orange {
          color: $secondary;
        }
        &.yellow {
          color: $primary;
        }
      }
      &.details-btn {
        .link {
          background: $secondary;
          color: $white;
          text-align: center;
          min-width: 70px;
          height: 36px;
          display: inline-block;
          line-height: 36px;
          border-radius: 5px;
          outline: none;
          border: none;
          cursor: pointer;
        }
      }
      &.target {
        span {
          height: 30px;
          line-height: 30px;
          text-align: center;
          min-width: 50px;
          display: block;
          border-radius: 4px;
          &.gray {
            border: 1px solid $gray;
            color: $gray;
          }
          &.orange {
            border: 1px solid $secondary;
            color: $secondary;
          }
          &.yellow {
            border: 1px solid $primary;
            color: $primary;
          }
        }
      }
    }
    td {
      font-weight: 400;
    }
    td.details {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .edit-btn,
  .delete-btn {
    img {
      width: 20px;
    }
  }

  .content-link {
    color: $gray;
  }
}
</style>
