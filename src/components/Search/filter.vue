<template>
  <div class="container wrapper">
    <br />
    <ul
      class="nav nav-pills mb-3 align-items-center"
      id="pills-tab"
      role="tablist"
    >
      <i class="bi bi-sliders me-2" style="color: rgba(51, 51, 51, 0.692)"></i>
      <li class="nav-item" role="presentation">
        <button
          class="active btn btn-outline-secondary m-1"
          id="table-search-tab"
          data-bs-toggle="pill"
          data-bs-target="#table-search"
          type="button"
          role="tab"
          aria-controls="table-search"
          aria-selected="false"
        >
          Tabel
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-secondary m-1"
          id="pub-search-tab"
          data-bs-toggle="pill"
          data-bs-target="#pub-search"
          type="button"
          role="tab"
          aria-controls="pub-search"
          aria-selected="false"
        >
          Publikasi
        </button>
      </li>

      <li class="nav-item" role="presentation">
        <button
          class="btn btn-outline-secondary m-1"
          id="news-search-tab"
          data-bs-toggle="pill"
          data-bs-target="#news-search"
          type="button"
          role="tab"
          aria-controls="news-search"
          aria-selected="false"
        >
          Kabar Berita
        </button>
      </li>
    </ul>
    <div class="clearfix"></div>
    <hr />
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade"
        id="pub-search"
        role="tabpanel"
        aria-labelledby="pub-search-tab"
        tabindex="0"
      >
        publikasi
      </div>
      <div
        class="tab-pane fade show active"
        id="table-search"
        role="tabpanel"
        aria-labelledby="table-search-tab"
        tabindex="0"
      >
        <CardTable />
      </div>
      <div
        class="tab-pane fade"
        id="news-search"
        role="tabpanel"
        aria-labelledby="news-search-tab"
        tabindex="0"
      >
        news
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        v-for="(project, index) in filteredProjects"
        :key="index"
        class="col"
        :data-tag="project.tag"
      >
        <div class="card">
          <img :src="project.imageUrl" class="card-img-top" alt="270x170" />
          <div class="card-body">
            <h4 class="card-title">{{ project.title }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="push"></div>
  </div>
</template>

<script>
import CardTable from "./CardTable.vue";
export default {
  name: "FilterComponent",
  component: {
    CardTable,
  },
};
</script>

<style></style>
