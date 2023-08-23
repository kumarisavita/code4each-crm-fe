<script setup>
// import axios from 'axios';
// import { useRouter } from 'vue-router';
import { useAuth } from '../../service/useAuth';
const { logout } = useAuth();

// const router = useRouter();

// const signOut = async () => {
//   try {
//     await axios.get('http://127.0.0.1:8000/api/logout'); // Adjust the URL based on your Laravel routes
//     // Perform any necessary client-side cleanup
//     // Redirect or update the UI as needed
//     router.push('/login'); // Redirect to the login page or another appropriate page
//   } catch (error) {
//     console.error(error);
//     // Handle error if necessary
//   }
// };
</script>

<template>
    <div class="page">
      <div class="page-main">
        <div id="wrapper">
          <aside id="sidebar-wrapper">
            <div class="sidebar-brand">
              <img src="images/black-logo.png">
            </div>
            <ul class="sidebar-nav">
              <li class="active">
                <a href="index.html">
                  <i class="fa fa-wordpress"></i>Wordpress Dashboard</a>
              </li>
              <!-- <li>
                <a href="wordpress.html">
                  <i class="fa fa-product-hunt"></i>Wordpress</a>
              </li> -->
              
            </ul>
          </aside>
          <div id="navbar-wrapper">
            <nav class="navbar navbar-inverse">
              <div class="container-fluid">
                <div class="navbar-header main-header-left">
                  <a href="#" class="navbar-brand" id="sidebar-toggle">
                    <i class="fa fa-align-left"></i>
                  </a>
                </div>
                <div class="main-header-right">
                  <button class="navbar-toggler navresponsive-toggler d-lg-none ms-auto collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4" aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon fa fa-ellipsis-v"></span>
                  </button>
                  <div class="navbar navbar-expand-lg navbar-collapse responsive-navbar p-0">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                      <ul class="nav nav-item header-icons navbar-nav-right ms-auto">
                        <!-- Country-selector-->
                        <li class="dropdown header-search">
                          <a class="nav-link icon header-search" data-bs-toggle="dropdown" href="javascript:void(0);">
                            <i class="fa fa-search"></i>
                          </a>
                          <div class="dropdown-menu">
                            <div class="main-form-search p-2">
                              <input class="form-control" placeholder="Search" type="search">
                              <button class="btn">
                                <i class="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </li>
                        <!-- CART -->
                        <li class="dropdown profile-1">
                          <a href="#" data-bs-toggle="dropdown" class="nav-link  leading-none d-flex">
                            <span>
                              <img src="images/15.jpg" alt="profile-user" class="avatar  profile-user brround cover-image">
                            </span>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <div class="drop-heading">
                              <div class="text-center">
                                <h5 class="text-dark mb-0">Code4each</h5>
                                <small class="text-muted">Administrator</small>
                              </div>
                            </div>
                            <div class="dropdown-divider m-0"></div>
                            <a class="dropdown-item" href="profile.html">
                              <i class="dropdown-icon fa fa-user"></i> Profile </a>
                            <a class="dropdown-item" href="settings.html">
                              <i class="dropdown-icon  fa fa-cog"></i> Settings </a>
                            <a class="dropdown-item" href="email.html">
                              <span class="float-end"></span>
                              <i class="dropdown-icon fa  fa-inbox"></i> Inbox </a>
                            <a class="dropdown-item" href="emailservices.html">
                              <i class="dropdown-icon fa fa-comment"></i> Message </a>
                            <div class="dropdown-divider mt-0"></div>
                            <a class="dropdown-item" @click="logout">
                              <i class="dropdown-icon fa fa-sign-in"></i> Sign out </a>
                          </div>
                        </li>
                        <li class="dropdown header-settings">
                          <a href="javascript:void(0);" class="nav-link icon" data-bs-toggle="sidebar-right" data-bs-target=".sidebar-right">
                            <i class="fa fa-align-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
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
        </div>

      </div>
    </div>
</template>

<style scoped>
@import '../../assets/dashboard.css';
</style>