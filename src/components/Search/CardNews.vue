<template>
  <div id="NewsCard" class="">
    <div class="card w-100 mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            :src="item.thumbnail"
            class="img-fluid rounded-start card-img-top img-thumbnail"
            alt="publication img"
            height="75"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.title }}</h5>
            <small>Subject: {{ item.subj }}</small>
            <br />
            <p class="card-text">{{ item.abstract }}</p>
            <div class="row">
              <div class="col">
                <small>Release: {{ item.rl_date }}</small>
              </div>
              <div class="col d-flex justify-content-end">
                <a
                  :href="item.pdf"
                  class="btn btn-primary mx-1"
                  style="font-size: 14px"
                >
                  Download PDF
                  <i class="bi bi-file-earmark-arrow-down-fill"></i>
                </a>
                <a
                  :href="item.slide"
                  class="btn btn-primary mx-1"
                  style="font-size: 14px"
                >
                  Open Slide
                  <i class="bi bi-file-earmark-arrow-down-fill"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardNews",
  props: ["item", "keyword"],
  // computed: {
  //   limitedAbstract() {
  //     const kunci = this.keyword;
  //     const abstractWords = this.item.abstract.split(" ");

  //     // Extract the first 20 words
  //     const first20Words = abstractWords.slice(0, 5).join(" ");

  //     // Filter out words not related to the keyword
  //     const filteredWords = first20Words
  //       .split(" ")
  //       .filter((word) => word.toLowerCase().includes(kunci.toLowerCase()))
  //       .join(" ");

  //     return filteredWords;
  //   },
  // },
};
</script>

<style></style>
