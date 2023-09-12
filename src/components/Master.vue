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
                <img src="/images/02.png" class="img-fluid" alt="...">
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

<!--feature start-->

<section class="features-section">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-lg-4">
                <div>
                    <h2 class="mb-0"><span class="font-w-4 d-block">Trusted people </span> with Code4each</h2>
                </div>
            </div>
            <div class="col-lg-8 mt-3 mt-lg-0">
                <div class="row align-items-center">
                    <div class="col-12 col-sm-4">
                        <div class="counter">
                            <div class="counter-desc"> <span class="count-number h2 text-primary" data-to="50" data-speed="2000">100</span>
                                <span class="h2 text-primary">+</span>
                                <h6 class="text-muted mb-0">Support Member</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 mt-2 mt-sm-0">
                        <div class="counter">
                            <div class="counter-desc"> <span class="count-number h2 text-primary" data-to="99" data-speed="2000">200</span>
                                <span class="h2 text-primary">+</span>
                                <h6 class="text-muted mb-0">People Love Us</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-4 mt-2 mt-sm-0">
                        <div class="counter">
                            <div class="counter-desc"> <span class="count-number h2 text-primary" data-to="120" data-speed="2000">300</span>
                                <span class="h2 text-primary">+</span>
                                <h6 class="text-muted mb-0">Happy Customers</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row align-items-center mt-5">
            <div class="col-lg-4 col-md-6">
                <div class="p-5 card-color" data-bg-color="#d0faec" style="background-color: rgb(189 241 224);">
                    <div class="f-icon"><img src="/images/prototype.png">
                    </div>
                    <h5 class="mt-4 mb-3">Awesome Design</h5>
                    <p class="mb-0">Design systems help organize product-related knowledge and centralize it.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 mt-4 mt-md-0">
                <div class="p-5 card-color" data-bg-color="#ffeff8" style="background-color: rgb(249 217 235);">
                    <div class="f-icon"><img src="/images/light-bulb.png">
                    </div>
                    <h5 class="mt-4 mb-3">Easy to Use</h5>
                    <p class="mb-0">Ease of use is a basic concept that describes how easily users can use a product.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 mt-4 mt-lg-0">
                <div class="p-5  card-color" data-bg-color="#d3f6fe" style="background-color: rgb(188 238 249);">
                    <div class="f-icon"><img src="/images/friendship.png">
                    </div>
                    <h5 class="mt-4 mb-3">User Friendly</h5>
                    <p class="mb-0">Manage all your websites in a single user-friendly yet very easy to use.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!--feature end-->

<!--about start-->

<section class="about-section">
    <div class="pricing-one__shape-1 zoom-fade">
        <img src="/images/pricing-one-shape-1.png" alt="">
    </div>
    <div class="pricing-one__shape-2 float-bob-x">
        <img src="/images/pricing-one-shape-2.png" alt="">
    </div>
    <div class="pricing-one__shape-3 float-bob-y">
        <img src="/images/pricing-one-shape-3.png" alt="">
    </div>
    <div class="pricing-one__shape-4">
        <img src="/images/pricing-one-shape-4.png" alt="">
    </div>
    <div class="pricing-one__shape-5">
        <img src="/images/pricing-one-shape-5.png" alt="">
    </div>
    <div class="pricing-one__shape-6">
        <img src="/images/pricing-one-shape-6.png" alt="">
    </div>
    <div class="pricing-one__shape-7">
        <img src="/images/pricing-one-shape-7.png" alt="">
    </div>
    <div class="pricing-one__shape-8">
        <img src="/images/pricing-one-shape-8.png" alt="">
    </div>
    <div class="pricing-one__shape-22">
        <img src="/images/pricing-one-shape-22.png" alt="">
    </div>
    <div class="pricing-one__shape-9">
        <img src="/images/pricing-one-shape-13.png" alt="">
    </div>
    <div class="pricing-one__shape-10 zoominout">
        <img src="/images/pricing-one-shape-10.png" alt="">
    </div>
    <div class="pricing-one__shape-11">
        <img src="/images/pricing-one-shape-11.png" alt="">
    </div>
    <div class="pricing-one__shape-12 zoominout">
        <img src="/images/pricing-one-shape-10.png" alt="">
    </div>
    <div class="pricing-one__shape-13">
        <img src="/images/pricing-one-shape-13.png" alt="">
    </div>
    <div class="pricing-one__shape-14">
        <img src="/images/pricing-one-shape-14.png" alt="">
    </div>
    <div class="pricing-one__shape-15 float-bob-x">
        <img src="/images/pricing-one-shape-15.png" alt="">
    </div>
    <div class="pricing-one__shape-16">
        <img src="/images/pricing-one-shape-16.png" alt="">
    </div>
    <div class="pricing-one__shape-17">
        <img src="/images/pricing-one-shape-17.png" alt="">
    </div>
    <div class="pricing-one__shape-18">
        <img src="/images/pricing-one-shape-18.png" alt="">
    </div>
    <div class="pricing-one__shape-19">
        <img src="/images/pricing-one-shape-19.png" alt="">
    </div>
    <div class="pricing-one__shape-20">
        <img src="/images/pricing-one-shape-20.png" alt="">
    </div>
    <div class="pricing-one__shape-21">
        <img src="/images/pricing-one-shape-21.png" alt="">
    </div>
    <div class="container">
        <div class="row align-items-center justify-content-between">
            <div class="col-12 col-lg-6 mb-6 mb-lg-0">
                <img src="/images/04.png" alt="Image" class="img-fluid">
            </div>
            <div class="col-12 col-lg-6 col-xl-5">
                <div>
                    <h2 class="display-4 mb-3"><span class="font-w-4 d-block">Unlimited features</span> awaiting for you</h2>
                    <p class="lead">We use the latest technologies it voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                </div>
                <div>
                    <div class="mb-3">
                        <div class="d-flex align-items-start">
                            <div class="me-0"> <span class="list-dot" data-bg-color="#01a479" style="background-color: rgb(1, 164, 121);"></span>
                            </div>
                            <p class="text-muted">Fast Performance technologies it voluptatem</p>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex align-items-start">
                            <div class="me-0"> <span class="list-dot" data-bg-color="#2f2f41" style="background-color: rgb(47, 47, 65);"></span>
                            </div>
                            <p class="text-muted">Quick Access For Build With Static Bootstarp Code</p>
                        </div>
                    </div>
                    <div>
                        <div class="d-flex align-items-start">
                            <div class="me-0"> <span class="list-dot" data-bg-color="#01a479" style="background-color: rgb(1, 164, 121);"></span>
                            </div>
                            <p class="text-muted">Easy to Manage Your All Data access to development</p>
                        </div>
                    </div>

                </div>
                <a href="#" class="btn btn-sm btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                    <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                        <p>Take your agency online with us</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- about end -->

<!-- Pricing section start -->
<section class="pricing-section">
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-lg-8">
                <div class="mb-5">
                    <h2 class="display-4 mb-3"><span class="font-w-4 d-block">Simple, Fair and</span> affordable prices for all.</h2>
                    <p class="lead mb-0">We use the latest technologies it voluptatem accusantium doloremque laudantium.</p>
                </div>
            </div>
        </div>
    </div>
    <section class="position-relative  z-index-1">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 z-index-1" style="z-index: 99;">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <!-- Card -->
                            <div class="card bg-white border-0 shadow">
                                <!-- Body -->
                                <div class="card-body py-5 px-4">
                                    <img class="f-icon" src="/images/predictive.png" alt="">
                                    <!-- Badge -->
                                    <div class="my-4"> <span class="h2">Basic</span>
                                        <p class="mb-0 text-muted">Perfect For Small Business</p>
                                    </div>
                                    <!-- Features -->
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Free Custom Domain</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Flexible, simple license</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Monthly updates</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Optimized for mobile</p>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Outstanding Support</p>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-5 pt-5 border-top">
                                        <!-- Price -->
                                        <div class="d-flex align-items-start justify-content-center"> <span class="text-muted mt-2">$</span>
                                            <span class="price display-4 font-w-6 text-primary mb-0">23</span>
                                            <span class="text-muted h4 mb-1 align-self-end">/mo</span>
                                        </div>
                                        <a href="#" class="btn btn-sm pricing pricing-test btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                                            <div class="d-inline-block"> <small class="d-block">7 DAY FREE TRIAL</small>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 col-md-6 mb-5 mb-lg-0">
                            <!-- Card -->
                            <div class="card  border-0 shadow" style="background: #d0faec;">
                                <!-- Body -->
                                <div class="card-body py-5 px-4">
                                    <img class="f-icon" src="/images/predictive.png" alt="">
                                    <!-- Badge -->
                                    <div class="my-4 bg-dark p-3 rounded"> <span class="h2 text-white">Standard</span>
                                        <p class="mb-0  text-light">Perfect For Small Business</p>
                                    </div>
                                    <!-- Features -->
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-danger"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Unlimited Domain</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Flexible, simple license</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Monthly updates</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Optimized for mobile</p>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Outstanding Support</p>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-5 pt-5 border-top">
                                        <!-- Price -->
                                        <div class="d-flex align-items-start justify-content-center"> <span class="text-muted mt-2">$</span>
                                            <span class="price display-4 font-w-6 text-primary mb-0">77</span>
                                            <span class="text-muted h4 mb-1 align-self-end">/mo</span>
                                        </div>
                                        <!-- Button -->
                                        <a href="#" class="btn btn-sm pricing pricing-test btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                                            <div class="d-inline-block"> <small class="d-block">7 DAY FREE TRIAL</small>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-4 col-md-6">
                            <!-- Card -->
                            <div class="card bg-white border-0 shadow">
                                <!-- Body -->
                                <div class="card-body py-5 px-4">
                                    <img class="f-icon" src="/images/eco-light.png" alt="">
                                    <!-- Badge -->
                                    <div class="my-4"> <span class="h2">Premium</span>
                                        <p class="mb-0  text-muted">Perfect For Small Business</p>
                                    </div>
                                    <!-- Features -->
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-danger"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Unlimited Domain</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Flexible, simple license</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Monthly updates</p>
                                    </div>
                                    <div class="d-flex align-items-center mb-2">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Optimized for mobile</p>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <!-- Check -->
                                        <div class="me-3"> <i class="fa fa-check-circle-o text-primary"></i>
                                        </div>
                                        <!-- Text -->
                                        <p class="mb-0">Outstanding Support</p>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-5 pt-5 border-top">
                                        <!-- Price -->
                                        <div class="d-flex align-items-start justify-content-center"> <span class="text-muted mt-2">$</span>
                                            <span class="price display-4 font-w-6 text-primary mb-0">99</span>
                                            <span class="text-muted h4 mb-1 align-self-end">/mo</span>
                                        </div>
                                        <!-- Button -->
                                        <a href="#" class="btn btn-sm pricing pricing-test btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                                            <div class="d-inline-block"> <small class="d-block">7 DAY FREE TRIAL</small>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="col-12 d-flex justify-content-center">
                            <a href="#" class="btn btn-sm pricing btn-primary  text-start me-1 mt-5" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                                <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                                    <p>Take your agency online with us</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- / .row -->
        </div>
        <!-- / .container -->
        <div class="shape-1 overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,202.7C672,181,768,107,864,69.3C960,32,1056,32,1152,80C1248,128,1344,224,1392,272L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
        </div>
    </section>
</section>

<!-- Pricing section end -->
<!-----------multi-sec start------------>
<section class="multi-section" style="background-image: url('images/img.png');">
    <div class="container">
        <div class="row align-items-center justify-content-between">
            <div class="col-12 col-lg-6 mb-5 mb-lg-0">
                <div class="card border-0  rounded">
                    <div class="position-relative p-3">
                        <img src="/images/09.jpg" alt="Image" class="card-img-top">
                        <!-- <div class="video-btn video-btn-pos"> <a class="play-btn popup-youtube" href="https://www.youtube.com/watch?v=P_wKDMcr1Tg"><i class="la la-play"></i></a>
                      <div class="spinner-eff">
                        <div class="spinner-circle circle-1"></div>
                        <div class="spinner-circle circle-2"></div>
                      </div>
                    </div> -->
                    </div>
                    <div class="card-body p-4">
                        <h5>
                            Watch make it simple to take your business success with code4each.
                        </h5>
                        <p class="mb-0">code4each Amazing Landing Page of businesses need access to development resources.</p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="mb-5">
                    <h2 class="display-4 mb-3"><span class="font-w-4 d-block">Perfect Solution</span> For your Small Business</h2>
                    <p class="lead">Code4each Amazing Landing Page of businesses need access to development resources.</p>
                </div>
                <div class="row align-items-center">
                    <!-- <div class="col-md-4 col-sm-4 col-6">
                        <div class="client-logo">
                            <img class="img-fluid" src="https://code4each.com/wp-content/uploads/2021/11/bridgestone_logo.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-6">
                        <div class="client-logo">
                            <img class="img-fluid" src="https://code4each.com/wp-content/uploads/2021/11/FirstStop-1536x259-1.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-6 mt-3 mt-sm-0">
                        <div class="client-logo">
                            <img class="img-fluid" src="https://code4each.com/wp-content/uploads/2023/05/FC-MB-logo-e1665166377327.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-6 mt-3">
                        <div class="client-logo">
                            <img class="img-fluid" src=" https://code4each.com/wp-content/uploads/2021/11/kumho-tire-vector-logo-removebg-preview.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-6 mt-3">
                        <div class="client-logo">
                            <img class="img-fluid" src=" https://code4each.com/wp-content/uploads/2021/11/uplers1-removebg-preview.png" alt="">
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-6 mt-3">
                        <div class="client-logo">
                            <img class="img-fluid" src="https://code4each.com/wp-content/uploads/2023/05/360alumninew.png" alt="">
                        </div>
                    </div> -->
                    <a href="#" class="btn btn-sm multi-section btn-primary  text-start me-1 mt-5" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                        <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                            <p>Take your agency online with us</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
<!--------multi-sec end------->

<!--------why choose Us------->
<section class="why-choose-one">
    <div class="why-choose-one__bg" style="background-image: url(images/why-choose-one-bg.jpg);"></div>
    <div class="container">
        <div class="row">
            <div class="col-xl-6 col-lg-6">
                <div class="why-choose-one__left fadeInRight">
                    <div class="why-choose-one__img float-bob-y">
                        <img src="/images/why-choose-one-img-1.png" alt="">
                    </div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-6">
                <div class="why-choose-one__right">
                    <h2 class="why-choose-one__title">Manage your apps with our <br> award-winning Hostup
                    </h2>
                    <ul class="list-unstyled why-choose-one__points">
                        <li>
                            <div class="why-choose-one__icon">
                                <i class="fa fa-cog" aria-hidden="true"></i>
                            </div>
                            <div class="why-choose-one__content">
                                <h4 class="why-choose-one__content-title">Control Panel CPanel</h4>
                                <p class="why-choose-one__text">The point of using Lorem Ipsum is that it has a
                                    more look like readable English.</p>
                            </div>
                        </li>
                        <li>
                            <div class="why-choose-one__icon">
                                <i class="fa  fa-cube" aria-hidden="true"></i>
                            </div>
                            <div class="why-choose-one__content">
                                <h4 class="why-choose-one__content-title">100+ Free Hosting apps</h4>
                                <p class="why-choose-one__text">The point of using Lorem Ipsum is that it has a
                                    more look like readable English.</p>
                            </div>
                        </li>
                        <li>
                            <div class="why-choose-one__icon">
                                <i class="fa fa-magic" aria-hidden="true"></i>
                            </div>
                            <div class="why-choose-one__content">
                                <h4 class="why-choose-one__content-title">Automated backups</h4>
                                <p class="why-choose-one__text">The point of using Lorem Ipsum is that it has a
                                    more look like readable English.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

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
                <!-- Button -->
                <a href="#" class="btn btn-sm manage btn-primary text-start me-1" data-toggle="modal" data-target="#exampleModal"> <i class="la la-apple me-2 ic-2x d-inline-block"></i>
                    <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
                        <p>Take your agency online with us</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<!-- -----tabs section start ---------->

<!-- <section class="rts-project-area rts-section-gap">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="tab-button-area-one">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">All Projects</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">App</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Design</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tabs" data-bs-toggle="tab" data-bs-target="#contacts" type="button" role="tab" aria-controls="contacts" aria-selected="false">Development</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tabrts" data-bs-toggle="tab" data-bs-target="#contactrts" type="button" role="tab" aria-controls="contactrts" aria-selected="false">Software</button>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</section> -->

<!------- tab section end----- -->
<!-- ---------Working process start------------>

<section class="work-process">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
                <div class="section-heading text-center">
                    <h4 class="h5 text-primary">Process</h4>
                    <h2>We Follow Our Work Process</h2>
                    <p>Enthusiastically engage cross-media leadership skills for alternative experiences.
                        Proactively drive vertical systems than intuitive architectures.</p>
                </div>
            </div>
        </div>
        <div class="row align-items-center justify-content-between">
            <div class="col-lg-5 col-md-12 order-1 order-lg-0">
                <div class="img-wrap">
                    <img src="/images/office-img-1.jpg" alt="work process" class="img-fluid rounded-custom">
                </div>
            </div>
            <div class="col-lg-6 col-md-12 order-0 order-lg-1">
                <ul class="work-process-list list-unstyled">
                    <li class="d-flex align-items-start mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="50">
                        <div class="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                            <i class="fa fa-folder fa-2x"></i>
                        </div>
                        <div class="icon-content">
                            <span class="text-primary h6">Step 1</span>
                            <h3 class="h5 mb-2">Research and Content Planing</h3>
                            <p>Progressively foster enterprise-wide systems whereas equity invested
                                web-readiness harness installed base bandwidth.
                            </p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                        <div class="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                            <i class="fa fa-random fa-2x"></i>
                        </div>
                        <div class="icon-content">
                            <span class="text-primary h6">Step 2</span>
                            <h3 class="h5 mb-2">Publishing and Execution</h3>
                            <p>Dramatically administrate progressive metrics without error-free globally simplify
                                standardized alignments plagiarize distributed.
                            </p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start mb-4 aos-init aos-animate" data-aos="fade-up" data-aos-delay="150">
                        <div class="process-icon-2 border border-2 rounded-custom bg-white me-4 mt-2">
                            <i class="fa fa-database fa-2x"></i>
                        </div>
                        <div class="icon-content">
                            <span class="text-primary h6">Step 3</span>
                            <h3 class="h5 mb-2">Product Prototyping</h3>
                            <p>Interactively whiteboard transparent testing procedures before
                                bricks-and-clicks initiatives administrate competencies.
                            </p>
                        </div>
                    </li>
                    <li class="d-flex align-items-start   mb-4 mb-lg-0 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                        <div class=" fa-icon border border-2 rounded-custom bg-white me-4 mt-2">
                            <i class="fa fa-truck fa-2x"></i>
                        </div>
                        <div class="icon-content">
                            <span class="text-primary h6">Step 4</span>
                            <h3 class="h5 mb-2">Deliver the Final Product</h3>
                            <p>Dramatically plagiarize distributed progressive metrics without error-free globally simplify
                                standardized alignments.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
<!-- ---------Working process end ---------->
<!-- --------------speed section start------------------- -->

<section class="subscribe-section">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="bg-light bg-pos-l py-6 px-4 px-lg-6  rounded">
                    <div class="text-wrapper mb-5">
                        <h2 class="display-4 mb-3"><span class="font-w-4">Ready</span> for speed ?</h2>
                        <p class="lead">Once you’re ready for a test, we’ll be waiting on chat! Let us do a FREE test migration for you so you can see the difference yourself on a temporary URL, without updating any domain settings!</p>
                    </div>
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="subscribe-form">
                                <a href="#" class="btn btn--primary btn--md">
                                    See plans pricing</a>

                                <a href="#" class="btn btn--secondary">
                                    Chat with us <i class="ml-1">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="currentColor" d="M8.601 17.601a1.25 1.25 0 0 0 1.768 1.768l-1.768-1.768ZM15.971 12l.883.884a1.25 1.25 0 0 0 0-1.768l-.883.884Zm-5.602-7.37A1.25 1.25 0 0 0 8.601 6.4L10.37 4.63Zm0 14.74 6.485-6.486-1.767-1.768L8.6 17.601l1.768 1.768Zm6.485-8.254L10.37 4.631 8.601 6.399l6.486 6.485 1.767-1.768Z"></path>
                                        </svg>
                                    </i>
                                </a>
                            </div>

                        </div>
                        <small class="text-dark text-center">Get started for 7 day free trial No Purchace required.</small>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- ---------footer section start -->
<footer class="position-relative overflow-hidden ">
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-5 col-xl-4 me-auto mb-5 mb-lg-0"> <a class="footer-logo h2 text-primary mb-0 font-w-7" href="index.html">
                    <img src="/images/black-logo.png"></a>
                <p class="my-3">Winck - Bootstrap 5 Multipurpose Landing Page Is fully responsible, Build whatever you like with the Winck.</p>

                <ul class="list-inline">
                    <li class="list-inline-item"><a class="border rounded px-2 py-1 text-dark" href="#"><i class="fa fa-facebook"></i></a>
                    </li>
                    <li class="list-inline-item"><a class="border rounded px-2 py-1 text-dark" href="#"><i class="fa fa-whatsapp"></i></a>
                    </li>
                    <li class="list-inline-item"><a class="border rounded px-2 py-1 text-dark" href="#"><i class="fa fa-instagram"></i></a>
                    </li>
                    <li class="list-inline-item"><a class="border rounded px-2 py-1 text-dark" href="#"><i class="fa fa-linkedin"></i></a>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-lg-6 col-xl-7">
                <div class="row">
                    <div class="col-12 col-sm-6 mt-6 mt-sm-0 navbar-light">
                        <h5 class="mb-4">Our Address</h5>
                        <div class="mb-3">
                            <p class="mb-0 text-muted">
                                <div class="links"><i class="fa fa-map" style="color:#000;"></i> </div>Plot 50, Sector 82, JLPL Industrial Area, Mohali, Punjab 160055
                            </p>
                        </div>
                        <div class="mb-3"> <a class="btn-link text-dark" href="mailto:themeht23@gmail.com">
                                <div class="links"><i class="fa fa-envelope " style="color:#000;"></i></div> hr.code4each.com
                            </a>
                        </div>
                        <div class="mb-3">
                            <a class="btn-link text-dark" href="tel:079736 30617">
                                <div class="links"> <i class="fa fa-phone" style="color:#000;"></i></div> 079736 30617
                            </a>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 mt-6 mt-sm-0 navbar-light">
                        <h5 class="mb-4">Subscribe today</h5>

                        <div class="align-self-start justify-content-start">
                            <h5 class="mb-2" style="line-height: 20px;">Newsletter</h5>
                            <p class="mb-0">Subscribe to our newsletter to get our news & deals delivered to you.</p>

                            <form action="#" method="post" id="mc-embedded-subscribe-form2" name="mc-embedded-subscribe-form" class="validate dark-fields" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll2">
                                    <div class="mc-field-group input-group form-floating">
                                        <input type="email" value="" name="EMAIL" class="required email form-control" placeholder="Email Address" id="mce-EMAIL2">
                                        <label for="mce-EMAIL2">Email Address</label>
                                        <input type="submit" value="Join" name="subscribe" id="mc-embedded-subscribe2" class="btn btn-primary">
                                    </div>
                                    <div id="mce-responses2" class="clear">
                                        <div class="response" id="mce-error-response2" style="display:none"></div>
                                        <div class="response" id="mce-success-response2" style="display:none"></div>
                                    </div> <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_ddc180777a163e0f9f66ee014_4b1bcfa0bc" tabindex="-1" value=""></div>
                                    <div class="clear"></div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row my-5">
            <div class="col">
                <hr class="m-0">
            </div>
        </div>
        <div class="row align-items-center justify-content-center mb-5">
            <div class="col-md-12 text-center">Copyright © 2023 Code4each. All rights reserved. | <i class="fa fa-heart text-primary heartBeat2"></i> <u><a class="text-primary" href="#">Code4each</a></u>
            </div>
            <!-- <div class="col-md-6 text-md-end mt-3 mt-md-0">
        <ul class="list-inline mb-0">
          <li class="me-3 list-inline-item"> <a class="list-group-item-action" href="#">
                  Term Of Service
                </a>
          </li>
          <li class="me-3 list-inline-item"> <a class="list-group-item-action" href="#">
                  Privacy Policy
                </a>
          </li>
          <li class="list-inline-item"> <a class="list-group-item-action" href="#">
                  Support
                </a>
          </li>
        </ul>
      </div> -->
        </div>
    </div>
</footer>
<!-- ------footer section end -->
</template>
