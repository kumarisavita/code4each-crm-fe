 <template>
       <header class="header position-absolute" id="header-wrap">
      <div class="container">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg  navbar-dark navbar-bg-light">
                <div class="navbar-brand" href="#">
                    <a href="index.html"><img src="/images/black-logo.png"></a>
                    </div>
                <button class="navbar-toggler  ms-auto ms-md-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
              <!-- Left links -->
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                
              </ul>
              <!-- Left links -->
              <div class="d-flex align-items-center">
                <button type="button" class="btn btn-primary me-3"> Login To Desktop </button>
                
              </div>
            </div>
            <!-- Collapsible wrapper -->
          
          <!-- Container wrapper -->
        </nav>
        <!-- Navbar -->
        </div>
    </header>
    <section class="custom-py-1 position-relative hero-shape3 overflow-hidden">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-lg-5 col-xl-6 order-lg-2 mb-8 mb-lg-0">
              <!-- Image -->
              <img src="images/02.png" class="img-fluid" alt="...">
            </div>
            <div class="col-12 col-lg-7 col-xl-6 order-lg-1">
              <h1 class="display-4 mb-3">
                The World’s <span class="font-w-7">Fastest WordPress &amp; Hosting</span>               
                  </h1>
              <!-- Text -->
              <p class="lead text-muted mb-4">We use the latest technologies it voluptatem accusantium doloremque laudantium. Build a Beautiful, Clean &amp; Modern Design website with flexible Bootstrap components.</p>
              <!-- Buttons -->
              <a href="#" class="btn btn-sm btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                  <p>Take your agency online with us</p>
                  </div>
              </a>
            </div>
          </div>
          <!-- / .row -->
        </div>
        <!-- / .container -->
    </section>

      <!-- ------------Popup design code start ------------------ -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center" id="exampleModalLabel">Start Your 7 Day Free Trial Today!</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <form method="post">
                    <div class="form-group">
                        <input type="text" name="companyname" placeholder="Company Name.." class="form-control input">
                        <input type="text" name="name" placeholder="Full Name..." class="form-control input">
                        <input type="text" name="email" placeholder="Email Address..." class="form-control input" autocomplete="new">
                        <input value="" type="tel" name="phone" placeholder="Phone Number..." class="form-control input" autocomplete="off">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Submit</button>
                    </div>
                </form>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-success">Login</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div> -->
          </div>
        </div>
      </div>
    <!-- -------------------popup design code end ------------- -->

 </template>



