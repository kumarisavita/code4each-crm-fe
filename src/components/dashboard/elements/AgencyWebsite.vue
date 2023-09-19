<script setup >
import AgencyButton from './AgencyButton.vue';
const props = defineProps({
  dashboardData: Object,
});

</script>
<template>
     <div class="col-lg-12 col-xl-9 d-flex justify-content-center" style="margin: 0px auto;"> 
                            <div class="card"> 
                                <div class="card-header custom-header"> 
                                    <div> 
                                        <h3 class="card-title">CRM </h3> 
                                    </div> 
                                </div> 
                                <div class="card-body">  
                                    <div class="col-12 col-lg-5 mb-6 mb-lg-0">
                                        <img src="/images/wordpress.jpg" alt="Image" class="img-fluid">
                                    </div>
                                    <div class="col-12 col-lg-7 col-xl-5">
                                        <div>
                                          <h2 class="display-4 mb-3">CRM Hosting   
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
                                          
                                        </div>
                                        
                                      </div>

                                </div>
                               <AgencyButton  buttonClass="btn-sm btn-primary text-center mb-5"  :paragraph="true" :dashboardData="dashboardData" />
                            </div> 
                        </div>  
</template>