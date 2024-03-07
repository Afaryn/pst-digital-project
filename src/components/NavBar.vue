<template>
  <div>
    <nav
      class="navbar sticky-top navbar-expand-lg"
      style="background-color: #ffff"
    >
      <div class="container-fluid mx-3 my-1">
        <!-- Use router-link to make the logo clickable -->
        <router-link to="/">
          <img
            class="navbar-brand"
            src="../assets/images/frame_pst_bps.png"
            height="45"
          />
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-lg-0 align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/faq">FAQ</router-link>
            </li>
            <router-link class="nav-link" to="/login"
              ><Button class="nav-item btn btn-outline-info" to="/login"
                >Login</Button
              ></router-link
            >
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
Button {
  background-color: #e4561d;
}
</style>
