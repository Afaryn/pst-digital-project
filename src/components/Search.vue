<template>
  <div class="container-fluid py-3" style="background-color: #407bff">
    <div class="row height d-flex justify-content-center align-items-center">
      <div class="col-md-8">
        <div class="search">
          <i class="bi bi-search"></i>
          <input
            type="text"
            class="form-control rounded-3"
            placeholder="Have a question? Ask Now"
            v-model="searchQuery"
            @input="updateSearch"
          />
          <button class="btn rounded-3" id="btnSearch" @click="performSearch">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchComponent",
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    updateSearch() {
      // Tidak mengirimkan langsung ke atas
    },
    performSearch() {
      // Hanya mengirimkan setelah tombol ditekan
      this.$emit('search-updated', this.searchQuery.trim());
    }
  }
};
</script>

<style>
body {
  background-color: #eee;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.height {
  height: fit-content;
}

.search {
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search input {
  height: 50px;
  text-indent: 15px;
  border: 2px solid #d6d4d4;
}

.search input:focus {
  box-shadow: none;
  border: 2px solid rgb(60, 59, 59);
}

.bi.bi-search {
  position: absolute;
  top: 12px;
  left: 7px;
  color: rgba(51, 51, 51, 0.849);
}

#btnSearch {
  position: absolute;
  top: 5px;
  right: 5px;
  height: 40px;
  width: 100px;
  background-color: #e4561d;
  color: #eee;
}
</style>
