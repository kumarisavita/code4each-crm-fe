<script setup>
import RegisterButton from '../../common/RegisterButton.vue';
</script>
<template>
<!--------Testminonals section end------->
<section class="manage-section">
  <div class="container">
    <div class="row align-items-center justify-content-between">
      <div class="col-12 col-lg-6">
        <img src="/images/portfolio-6.jpg" alt="Image" class="img-fluid ">
      </div>
      <div class="col-12 col-lg-5 mt-5 mt-lg-0">
        <div class="mb-4">
          <h2 class="display-4 mb-3 text-light"><span class="font-w-4 d-block">Easily manage</span> your own business</h2>
          <p class="lead mb-0 text-light">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
        </div>
        <div class="row no-gutters">
          <div class="col-sm">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">Perfect Design</p>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">More Flexible</p>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">High Performance</p>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">Key Features</p>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">Based On Bootstrap 4</p>
              </div>
            </div>
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <div> <i class="fa fa-angle-right"></i>
                </div>
                <p class="mb-0 ms-3" style="color: #b7bfc7;">Built with Sass</p>
              </div>
            </div>
          </div>
        </div>
        <RegisterButton buttonClass="btn-sm manage btn-primary text-start me-1" :paragraph="true"/>
      </div>
    </div>
  </div>
</section>

</template>