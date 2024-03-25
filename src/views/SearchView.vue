  <template>
  <div>
    <NavBar />

    <!-- SEARCH BAR -->
    <SearchComponent @search-updated="handleSearchUpdate" />

    <!-- FILTER SECTION -->
    <div class="container wrapper">
      <br />
      <ul
        class="nav nav-pills mb-3 align-items-center"
        id="pills-tab"
        role="tablist"
      >
        <i
          class="bi bi-sliders me-2"
          style="color: rgba(51, 51, 51, 0.692)"
        ></i>
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
import SearchComponent from "@/components/Search.vue";
import CardTable from "@/components/CardTable.vue";
import CardPub from "@/components/CardPub.vue";
import CardNews from "@/components/CardNews.vue";
import axios from "axios";

const apiUrl =
  "https://webapi.bps.go.id/v1/api/list/model/statictable/lang/ind/domain/3500/keyword/";
const apiUrlPub =
  "https://webapi.bps.go.id/v1/api/list/model/publication/lang/ind/domain/3500/keyword/";
const apiUrlNews =
  "https://webapi.bps.go.id/v1/api/list/model/pressrelease/lang/ind/domain/3500/keyword/";
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
      const keyword = query.toString().trim();
      if (keyword !== "") {
        try {
          const encodedQuery = encodeURIComponent(query);

          const table_resp = await axios.get(
            `${apiUrl}${encodedQuery}/key/${apiKey}`
          );
          const resp_result = console.warn(
            "Table resp",
            table_resp.data.data[1]
          );

          const pub_resp = await axios.get(
            `${apiUrlPub}${encodedQuery}/key/${apiKey}`
          );
          const resp_result1 = console.warn(
            "Publication resp",
            pub_resp.data.data[1]
          );

          const news_resp = await axios.get(
            `${apiUrlNews}${encodedQuery}/key/${apiKey}`
          );
          const resp_result2 = console.warn(
            "News resp",
            news_resp.data.data[1]
          );

          this.resultNews = news_resp.data.data[1];
          this.resultTable = table_resp.data.data[1];
          this.resultPub = pub_resp.data.data[1];
        } catch (error) {
          console.error("Error during API request:", error);
        }
      }
    },
    // async handlePublication(query) {
    //   this.searchResult = query;
    //   const keyword = query.toString().trim();
    //   if (keyword !== "") {
    //     try {
    //       const encodedQuery = encodeURIComponent(query);

    //       // const table_resp = await axios.get(
    //       //   `${apiUrl}${encodedQuery}/key/${apiKey}`
    //       // );
    //       // const resp_result = console.warn(
    //       //   "Table resp",
    //       //   table_resp.data.data[1]
    //       // );

    //       const pub_resp = await axios.get(
    //         `${apiUrlPub}${encodedQuery}/key/${apiKey}`
    //       );
    //       const resp_result1 = console.warn(
    //         "Publication resp",
    //         pub_resp.data.data[1]
    //       );

    //       // this.resultTable = table_resp.data.data[1];
    //       this.resultPub = pub_resp.data.data[1];
    //     } catch (error) {
    //       console.error("Error during API request:", error);
    //     }
    //   }
    // },
    // async handleNews(query) {
    //   this.searchResult = query;
    //   const keyword = query.toString().trim();
    //   if (keyword !== "") {
    //     try {
    //       const encodedQuery = encodeURIComponent(query);

    //       const news_resp = await axios.get(
    //         `${apiUrlNews}${encodedQuery}/key/${apiKey}`
    //       );
    //       const resp_result2 = console.warn(
    //         "News resp",
    //         news_resp.data.data[1]
    //       );

    //       // this.resultTable = table_resp.data.data[1];
    //       this.resultNews = news_resp.data.data[1];
    //     } catch (error) {
    //       console.error("Error during API request:", error);
    //     }
    //   }
    // },
  },
};
</script>

<style></style>
