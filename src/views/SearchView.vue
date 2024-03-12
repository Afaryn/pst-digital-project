<template>
  <div>
    <NavBar />

    <!-- SEARCH BAR -->
    <SearchComponent
      @search-updated="handleSearchUpdate"
      @click="handleButtonClick('table')"
    />

    <!-- FILTER SECTION -->
    <div class="container wrapper">
      <br />
      <div class="row">
        <div class="col">
          <ul
            class="nav nav-pills mb-3 align-items-center"
            id="pills-tab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <button
                class="active btn btn-outline-secondary m-1"
                id="table-search-tab"
                data-bs-toggle="pill"
                @click="handleButtonClick('table')"
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
                @click="handleButtonClick('pub')"
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
                @click="handleButtonClick('news')"
              >
                Kabar Berita
              </button>
            </li>
          </ul>
        </div>
        <div class="col d-flex justify-content-end align-items-center mb-3">
          <i
            class="bi bi-sliders me-2"
            style="color: rgba(51, 51, 51, 0.692)"
          ></i>
          <div class="dropdown-center">
            <select class="form-select" aria-label="Default select example">
              <option selected>Wilayah</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>

      <div class="clearfix"></div>
      <hr />

      <!-- HASIL PENCARIAN -->
      <p>Hasil Pencarian : {{ searchResult }}</p>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade"
          id="pub-search"
          role="tabpanel"
          aria-labelledby="pub-search-tab"
          tabindex="0"
        >
          <div v-if="resultPub && resultPub.length > 0">
            <div v-for="pub in resultPub" :key="pub.pub_id">
              <CardPub :item="pub" :keyword="searchResult" />
            </div>
          </div>
          <div v-else>
            <p>Maaf, data tidak tersedia.</p>
          </div>
        </div>
        <div
          class="tab-pane fade show active"
          id="table-search"
          role="tabpanel"
          aria-labelledby="table-search-tab"
          tabindex="0"
        >
          <div v-if="resultTable && resultTable.length > 0">
            <div v-for="table in resultTable" :key="table.table_id">
              <CardTable :item="table" />
            </div>
          </div>
          <div v-else>
            <p>Maaf, data tidak tersedia.</p>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="news-search"
          role="tabpanel"
          aria-labelledby="news-search-tab"
          tabindex="0"
        >
          <div v-if="resultNews && resultNews.length > 0">
            <div v-for="news in resultNews" :key="news.brs_id">
              <CardNews :item="news" />
            </div>
          </div>
          <div v-else>
            <p>Maaf, data tidak tersedia.</p>
          </div>
        </div>
      </div>

      <div class="push"></div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SearchComponent from "@/components/Search/Search.vue";
import CardTable from "@/components/Search/CardTable.vue";
import CardPub from "@/components/Search/CardPub.vue";
import CardNews from "@/components/Search/CardNews.vue";
import axios from "axios";

const apiKey = "2ad01e6a21b015ea1ff8805ced02600c/";

export default {
  name: "SearchView",
  components: {
    NavBar,
    SearchComponent,
    CardTable,
    CardPub,
    CardNews,
  },
  data() {
    return {
      searchResult: "",
      resultTable: {},
      resultPub: {},
      resultNews: {},
    };
  },
  methods: {
    async handleSearchUpdate(query) {
      this.searchResult = query;
    },
    async handleButtonClick(type) {
      this.searchResult = this.searchResult.trim();
      if (this.searchResult !== "") {
        try {
          const encodedQuery = encodeURIComponent(this.searchResult);

          let key, resultType;

          if (type === "table") {
            key = "statictable";
            resultType = "resultTable";
          } else if (type === "pub") {
            key = "publication";
            resultType = "resultPub";
          } else if (type === "news") {
            key = "pressrelease";
            resultType = "resultNews";
          }

          const response = await axios.get(
            `https://webapi.bps.go.id/v1/api/list/model/${key}/lang/ind/domain/3500/keyword/${encodedQuery}/key/${apiKey}`
          );
          console.warn(`${type} resp`, response.data.data[1]);

          // Use dynamic property to set the result
          this[resultType] = response.data.data[1];
        } catch (error) {
          console.error("Error during API request:", error);
        }
      }
    },
  },
};
</script>

<style></style>
