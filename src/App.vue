<template>
  <nav class="bg-purple-600 text-white">
    <div class="container mx-auto">
      <div class="flex items-center">
        <router-link
          to="/"
          class="inline-block px-16 py-4 transition-colors hover:bg-purple-500 duration-300"
          >Home</router-link
        >
        <router-link
          to="/users"
          class="inline-block px-16 py-4 transition-colors hover:bg-purple-500 duration-300"
          >Users</router-link
        >
        <router-link
          to="/profile/2"
          class="inline-block px-16 py-4 transition-colors hover:bg-purple-500 duration-300"
          >My Profile</router-link
        >
      </div>
    </div>
  </nav>
  <router-view />
  <Loading />
</template>
