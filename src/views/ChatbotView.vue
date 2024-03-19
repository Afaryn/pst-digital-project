<template>
<div>
    <NavBar />
<div class="container">
  <div class="row ">
  <div class="col-md-3 sidebar">
        <p>Chatbot</p>
        <img src="../assets/images/image-chatbot.png" width="200" height="150" alt="Image">
    
          <div class="sidebar-text"> 
            <i class="bi bi-question-circle "></i> FAQ</div>
            <div class="d-grid gap-2 col-10 ">
              <a href="#" class="btn btn-outline-secondary btn-sm">komoditas perkebunan 2023</a>
              <a href="#" class="btn btn-outline-secondary btn-sm">pertumbuhan ekonomi 2023</a>
              <a href="#" class="btn btn-outline-secondary btn-sm">stunting</a>
            </div>
            
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
      </div>

      <div class="col-9 main-content d-flex flex-column-reverse">
        <div class="row center mt-3">
          <div class="col">
           
            <div class="input-group ">
              <input type="text" 
              class="form-control me-2 rounded-3" 
              placeholder="Tulis pesan..." 
              v-model="message" @keyup.enter="sendMessage">
              <button class="btn btn-secondary rounded-3" 
                type="button" @click="sendMessage"><i class="bi bi-send"></i></button>
                
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</div>
 
       
<!--    
  <footer>
    <p>&copy; 2023 PST DIGITAL</p>
  </footer> -->

</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'ChatbotView', 
 components:{
    NavBar,}

}

</script>

<style>
.container {
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
}

.sidebar {
  background-color: #f5f5f5;
  padding: 20px;
  height: 87vh;
}

.main-content {
  padding: 20px;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}


</style>