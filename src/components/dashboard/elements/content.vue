<script setup>
import { ref,defineProps } from 'vue';
import Alert from './Alert.vue';
const props = defineProps({
  dashboardData: Object,
  error: String,
  loading: Boolean,
  resendLink: Function,
});

</script>
<template>
    <Alert v-if="dashboardData" :notification="dashboardData" :resendLink="resendLink"/>
        <div>
        <div v-if="loading">
          <div class="spinner-container" >
            <div class="spinner-border  text-warning" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
          <div v-else>
            <p v-if="error">Error fetching dashboard data.</p>
            <ul v-else>
              <!-- <p v-if="dashboardData">{{ dashboardData }} <a href="#" @click="resendLink">Resend Link</a></p> -->
            </ul>
          </div>
        </div>
          <section id="content-wrapper main-content side-content">
            <div class="side-app"> 
                <div class="main-container container-fluid">
                    <div class="page-header">
                        <ol class="breadcrumb">
                            <!-- breadcrumb -->
                            <li class="breadcrumb-item">
                              <a href="#">
                                <h3 class="mb-0 breadcrump-tittle">Welcome To Agency Dashboard</h3>
                              </a>
                            </li>
                        </ol>
                          <!-- End breadcrumb -->
                        <div class="ms-auto">
                            <div>
                             <!--  <a href="#" class="btn btn-white button-icon me-3 mt-1 mb-1">
                                <span>
                                  <i class="fa fa-shopping-cart"></i>Buy Now </span>
                              </a>
                              <a href="#" class="btn btn-white button-icon me-3 mt-1 mb-1">
                                <span>
                                  <i class="fa fa-print"></i>Print </span>
                              </a> -->
                              <a href="#" class="btn btn-primary button-icon me-3 mt-1 mb-1">
                                <span>
                                  <i class="fa fa-download"></i>Download </span>
                              </a>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="banner banner-color mt-0 row">
                            <div class="col-xl-1 col-lg-2 col-md-2 p-0">
                              <img src="images/02.png" alt="image" class="image">
                            </div>
                            <div class="page-content col-xl-7 col-lg-6 col-md-8">
                              <h3 class="mb-1">Welcome back! <span class="font-weight-bold text-primary">Code4aech</span>
                              </h3>
                              <p class="mb-0 fs-16">Want to be the first to know about Flaira updates? Subscribe Now</p>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-12 text-lg-end">
                              <a href="#" class="btn btn-success me-3 mt-1 mb-1" id="skip">Skip</a>
                              <a href="#" class="btn btn-danger mt-1 mb-1">Subscribe Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="row"> 
                        <div class="col-lg-12 col-xl-9 d-flex justify-content-center" style="margin: 0px auto;"> 
                            <div class="card"> 
                                <div class="card-header custom-header"> 
                                    <div> 
                                        <h3 class="card-title">Wordpres </h3> 
                                    </div> 
                                </div> 
                                <div class="card-body">  
                                    <div class="col-12 col-lg-5 mb-6 mb-lg-0">
                                        <img src="images/wordpress.jpg" alt="Image" class="img-fluid">
                                    </div>
                                    <div class="col-12 col-lg-7 col-xl-5">
                                        <div>
                                          <h2 class="display-4 mb-3">Wordpress Hosting   
                                            <span class="span-text"> Powered By  Google Cloud</span>
                                          </h2>
                                          
                                          
                                        </div>
                                        <div>
                                          <div class="mb-3">
                                            <div class="d-flex align-items-start">
                                              <div class="me-0"> <span class="list-dot" data-bg-color="#01a479" style="background-color: rgb(1, 164, 121);"></span>
                                              </div>
                                              <p class="text-muted">WordPress is the most widely used website builder and content management system (CMS) in the world, powering the sites of users ranging from personal bloggers to small businesses and even globe-spanning corporations.</p>
                                            </div>
                                          </div>
                                          <div class="mb-3">
                                            <div class="d-flex align-items-start">
                                              <div class="me-0"> <span class="list-dot" data-bg-color="#2f2f41" style="background-color: rgb(47, 47, 65);"></span>
                                              </div>
                                              <p class="text-muted">WordPress is a free, open-source platform that can be used both by experienced developers and new users with no site design experience, so it can be used both in general web hosting environments and those dedicated specifically to this platform – a form of hosting called managed WordPress web hosting.</p>
                                            </div>
                                          </div>
                                          <!-- <div>
                                            <div class="d-flex align-items-start">
                                              <div class="me-0"> <span class="list-dot" data-bg-color="#01a479" style="background-color: rgb(1, 164, 121);"></span>
                                              </div>
                                              <p class="text-muted">Easy to Manage Your All Data access to development</p>
                                            </div>
                                          </div> -->
                                          
                                        </div>
                                        
                                      </div>

                                </div>
                                <a href="wordpress.html" class="btn btn-sm btn-primary text-center mb-5"  data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                                        <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                                          <p>Take your agency online with us</p>
                                          </div>
                                        </a>
                            </div> 
                        </div> <!-- COL END --> 
                    </div>
                </div>
            </div>
          </section>
</template>
<style>
.spinner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 9999; 
}

.spinner-border {
  width: 3rem; 
  height: 3rem;
}

</style>
