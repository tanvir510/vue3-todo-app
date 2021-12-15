import MyProfile from "@/views/user/Profile";
import UserLists from "@/views/user";

export default [
  {
    path: "/profile/:id",
    name: "profile",
    component: MyProfile,
  },
  {
    path: "/users",
    name: "users",
    component: UserLists,
  },
];
