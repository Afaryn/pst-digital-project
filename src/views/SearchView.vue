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
        <div class="col-sm-12 col-md-8">
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
        <div
          class="col d-flex justify-content-start align-items-center mb-3 ms-2"
        >
          <i
            class="bi bi-sliders me-2"
            style="color: rgba(51, 51, 51, 0.692)"
          ></i>

          <!-- FILTER SELECT REGION -->
          <d3>Wilayah:</d3>
          <div class="ms-2 dropdown-center">
            <select
              class="form-select"
              v-model="selectedRegion"
              aria-label="Default select example"
            >
              <option
                v-for="(region, index) in regions"
                :key="index"
                :value="region.value"
              >
                {{ region.label }}
              </option>
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
      resultTable: [],
      resultPub: [],
      resultNews: [],
      key: "",
      resultType: "resultTable",
      selectedRegion: "3500", // Set default value to "Jawa Timur"
      regions: [
        { label: "Jawa Timur", value: "3500" },
        { label: "Kab. Bangkalan", value: "3526" },
        { label: "Kab. Banyuwangi", value: "3510" },
        { label: "Kab. Blitar", value: "3505" },
        { label: "Kab. Bojonegoro", value: "3522" },
        { label: "Kab. Bondowoso", value: "3511" },
        { label: "Kab. Gresik", value: "3525" },
        { label: "Kab. Jember", value: "3509" },
        { label: "Kab. Jombang", value: "3517" },
        { label: "Kab. Kediri", value: "3506" },
        { label: "Kab. Lamongan", value: "3524" },
        { label: "Kab. Lumajang", value: "3508" },
        { label: "Kab. Madiun", value: "3519" },
        { label: "Kab. Magetan", value: "3520" },
        { label: "Kab. Malang", value: "3507" },
        { label: "Kab. Mojokerto", value: "3516" },
        { label: "Kab. Nganjuk", value: "3518" },
        { label: "Kab. Ngawi", value: "3521" },
        { label: "Kab. Pacitan", value: "3501" },
        { label: "Kab. Pamekasan", value: "3528" },
        { label: "Kab. Pasuruan", value: "3514" },
        { label: "Kab. Ponorogo", value: "3502" },
        { label: "Kab. Probolinggo", value: "3513" },
        { label: "Kab. Sampang", value: "3527" },
        { label: "Kab. Sidoarjo", value: "3515" },
        { label: "Kab. Situbondo", value: "3512" },
        { label: "Kab. Sumenep", value: "3529" },
        { label: "Kab. Trenggalek", value: "3503" },
        { label: "Kab. Tuban", value: "3523" },
        { label: "Kab. Tulungagung", value: "3504" },
        { label: "Kota Batu", value: "3579" },
        { label: "Kota Blitar", value: "3572" },
        { label: "Kota Kediri", value: "3571" },
        { label: "Kota Madiun", value: "3577" },
        { label: "Kota Malang", value: "3573" },
        { label: "Kota Mojokerto", value: "3576" },
        { label: "Kota Pasuruan", value: "3575" },
        { label: "Kota Probolinggo", value: "3574" },
        { label: "Kota Surabaya", value: "3578" },
      ],
      loading: false, // Initialize loading state
    };
  },
  watch: {
    selectedRegion: function (newRegion, oldRegion) {
      this.loading = false;
      this.makeApiCall(this.key, newRegion);
    },
  },
  methods: {
    async handleSearchUpdate(query) {
      this.searchResult = query.trim();
    },
    async handleButtonClick(type) {
      if (this.searchResult) {
        try {
          if (type === "table") {
            this.key = "statictable";
            this.resultType = "resultTable";
          } else if (type === "pub") {
            this.key = "publication";
            this.resultType = "resultPub";
          } else if (type === "news") {
            this.key = "pressrelease";
            this.resultType = "resultNews";
          }
          this.loading = true;
          this.makeApiCall(this.key, this.selectedRegion);
        } catch (error) {
          this.loading = false;
          console.error("Error during API request:", error);
        }
      }
    },
    async makeApiCall(key, region) {
      try {
        const encodedQuery = encodeURIComponent(this.searchResult);
        const response = await axios.get(
          `https://webapi.bps.go.id/v1/api/list/model/${key}/lang/ind/domain/${region}/keyword/${encodedQuery}/key/${apiKey}`
        );
        console.warn(`${key} resp`, response.data.data[1]);

        this[this.resultType] = response.data.data[1];
        this.loading = false;
      } catch (error) {
        console.error("Error during API request:", error);
        this.loading = false;
      }
    },
  },
};
</script>
<style></style>
