<template>
  <div>
    <NavBar />
    <div class="container">
      <!-- Desktop -->
      <div class="d-none d-md-block">
        <div class="row">
          <div class="col-md-3 sidebar d-block">
            <!-- Sidebar content -->
            <p>Layanan Chatbot</p>
            <img
              src="../assets/images/image-chatbot.png"
              style="width: 25vh; height: auto"
              class="img-fluid d-block"
              alt="Image"
            />
            <div class="my-2">
              <div class="sidebar-text">
                <i class="bi bi-question-circle"></i> FAQ
              </div>
            </div>
            <!--membuat isi FAQ-->
            <div class="d-grid gap-2">
              <button v-for="(faq, index) in faqs" :key="index" class="btn btn-outline-secondary btn-sm" @click="sendFAQ(faq)">
                {{ faq }}
              </button>

            </div>
          </div>
          <div class="col-md-9 ml-3 d-block">
            <div class="main-content-wrapper">
              <div class="main-content px-3 py-4">
                <div class="chat-main-content" ref="chatContent">
                  <div class="row center mt-3">
                    <div class="col">
                      <div
                        v-for="(msg, index) in messages"
                        :key="index"
                        :class="{
                          'text-start': msg.owner === 'chatbot',
                          'text-end': msg.owner === 'user',
                        }"
                        class="message-item"
                      >
                        <div class="d-flex align-items-center">
                          <img
                            v-if="msg.owner === 'chatbot'"
                            src="../assets/images/logo_pst_light.png"
                            alt="Chatbot Avatar"
                            class="avatar ms-2"
                          />
                          <div
                            :class="[
                              'bubble',
                              { 'bubble-right': msg.owner === 'user' },
                            ]"
                            :style="{ width: 100 }"
                          >
                            {{ msg.text }}
                          </div>
                          <i
                            v-if="msg.owner === 'user'"
                            class="bi bi-person-circle me-2"
                            style="font-size: 30px; color: #727272"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="input-group position-absolute bottom-0 start-0 w-100 mb-3"
              >
                <input
                  type="text"
                  class="form-control me-2 rounded-3"
                  placeholder="Tulis pesan..."
                  v-model="message"
                  @keyup.enter="sendMessage"
                />
                <button
                  class="btn btn-secondary rounded-3"
                  type="button"
                  @click="sendMessage"
                >
                  <i class="bi bi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row">
        <div class="col-md-9 main-content d-flex flex-column">
          <div class="main-content-wrapper">
            <div class="chat-main-content">
              <div class="row center mt-3">
                <div class="col-md-12">
                  <div
                    v-for="(msg, index) in messages"
                    :key="index"
                    :class="{
                      'text-start': msg.owner === 'chatbot',
                      'text-end': msg.owner === 'user',
                    }"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        v-if="msg.owner === 'chatbot'"
                        src="../assets/images/logo_pst_light.png"
                        alt="Chatbot Avatar"
                        class="avatar ms-2"
                      />
                      <div
                        :class="[
                          'bubble',
                          { 'bubble-right': msg.owner === 'user' },
                        ]"
                        :style="{ width: 100 }"
                      >
                        {{ msg.text }}
                      </div>
                      <i
                        v-if="msg.owner === 'user'"
                        class="bi bi-person-circle me-2"
                        style="font-size: 30px; color: #727272"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="input-group mt-3">
            <input
              type="text"
              class="form-control me-2 rounded-3"
              placeholder="Tulis pesan..."
              v-model="message"
              @keyup.enter="sendMessage"
            />
            <button
              class="btn btn-secondary rounded-3"
              type="button"
              @click="sendMessage"
            >
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "ChatbotView",
  components: {
    NavBar,
  },
  data() {
    return {
      message: "",
      messages: [
        // Initial messages
        {
          text: "Selamat datang di Chatbot PST DIGITAL, ada yang bisa saya bantu?",
          owner: "chatbot",
        }, // contoh pesan chatbot
        {
          text: "Saya ingin informasi tentang kemiskinan di tahun 2023",
          owner: "user",
        }, // contoh pesan pengguna
        { text: "Tentu, tunggu sebentar...", owner: "chatbot" }, // contoh pesan chatbot
        // menambahkan pesan-pesan lainnya di sini
      ],
      faqs: [
        "Publikasi pertanian di Jawa Timur",
        "Data Kemisikinan di Jawa Timur",
        "stunting"
      ]
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim() !== "") {
        this.messages.push({ text: this.message, owner: "user" });
        // Scroll otomatis ke bawah setiap kali pesan baru dikirimkan
        this.$nextTick(() => {
          const chatContent = this.$refs.chatContent;
          chatContent.scrollTop = chatContent.scrollHeight;
        });
        this.message = "";
      }
    },
    sendFAQ(faqText) {
      this.messages.push({ text: faqText, owner: "user" });
    }
  },
};
</script>

<style scoped>
/* Existing styles */
.container {
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
}

.sidebar {
  background-color: #f5f5f5;
  padding: 20px;
  /* height: auto; */
}

.main-content-wrapper {
  position: relative;
  height: calc(100vh - 50px); /* 50px for input-group */
}

.main-content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.bubble {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  max-width: 50vw;
  margin: 5px;
  text-align: left;
}

.text-start .bubble {
  background-color: #007bffad; /* Warna untuk pesan chatbot */
}

.text-end .bubble {
  background-color: #f0742cad; /* Warna untuk pesan pengguna */
}

.input-group {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
  padding: 10px;
}

.chat-main-content {
  height: calc(100% - 50px);
  overflow-x: hidden;
  overflow-y: scroll;
  /* overflow-anchor: unset; */
}
.chat-main-content::-webkit-scrollbar {
  width: 3px; /* Ubah ukuran lebar scrollbar di sini */
}

.avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  object-fit: cover;
}

.bubble-right {
  margin-left: auto;
}
.message-item {
  opacity: 0;
  animation: slideIn 0.5s forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
