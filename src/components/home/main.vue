<script setup>
import {
  ref,
  defineProps,
  onMounted,
  provide,
  inject,
  computed,
  watch,
} from "vue";
import WordpressService from "@/service/WordpressService";
import { useForm } from "vee-validate";
import { useAuth } from "@/service/useAuth";
import { useRouter } from "vue-router";
import * as yup from "yup";
import Loader from "@/components/common/Loader.vue";

const allErrors = ref({});
const router = useRouter();
const { Errors, resetForm, handleSubmit } = useForm();
const formData = ref({});
const showSignUpModal = ref(false);
const isDisabledSignUp = ref(false);
const loginModalShow = ref(false);
const loading = ref(false);
const isDisabledLoginUp = ref(false);
const formDataLogin = ref({});
const backendError = ref("");

const toggleSignLogin = (sign = false) => {
  if (sign) {
    loginModalShow.value = false;
    showSignUpModal.value = true;
  } else {
    loginModalShow.value = true;
    showSignUpModal.value = false;
  }
};

const validationSchema = yup.object({
  company_name: yup.string().required("Company name is a required field"),
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),
  password: yup.string().required("Password name is a required field"),
  phone: yup
    .string()
    .required("Phone Number is a required field")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

const validationSchemaLogin = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),
  password: yup.string().required("Password name is a required field"),
});

const registerUser = handleSubmit(async () => {
  try {
    isDisabledSignUp.value = true;
    loading.value = true;
    await validationSchema.validate(formData.value, { abortEarly: false });
    allErrors.value = {};
    const customHeaders = {
      "Content-Type": "multipart/form-data",
    };

    const response = await WordpressService.registerUser(formData.value);
    if (response.status === 200 && response.data.success) {
      const token = response.data.token;
      localStorage.setItem("access_token", token);
      hideModal();
      loading.value = false;
      router.push("/dashboard");
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    allErrors.value = errors;
  }
  isDisabledSignUp.value = false;
});

const login = handleSubmit(async () => {
  try {
    isDisabledLoginUp.value = true;
    loading.value = true;
    await validationSchemaLogin.validate(formDataLogin.value, {
      abortEarly: false,
    });
    allErrors.value = {};
    const response = await WordpressService.loginUser(formDataLogin.value);
    if (response.status === 200 && response.data.success) {
      const token = response.data.token;
      localStorage.setItem("access_token", token);
      const fetchDashboardData = await WordpressService.fetchDashboardData();
      if (
        fetchDashboardData.status === 200 &&
        fetchDashboardData.data.success
      ) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  } catch (error) {
    console.error(error, "ppppp");

    const errors =
      error.inner && Array.isArray(error.inner)
        ? error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {})
        : {};

    allErrors.value = errors;
    if (error.response && error.response.data && error.response.data.errors) {
      backendError.value = Object.values(error.response.data.errors).flat();
    } else {
      backendError.value = error?.response?.data?.message; // Set an error message
    }
    loading.value = false;
    isDisabledLoginUp.value = false;
  }
});

const hideModal = () => {
  loginModalShow.value = false;
  showSignUpModal.value = false;
  formData.value = {};
  formDataLogin.value = {};
};
</script>
<template>
  <header class="header-section">
    <nav
      class="navbar navbar-light bg-white navbar-static-top navbar-expand-lg header-sticky"
    >
      <div class="container">
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
        >
          <i class="fa fa-align-left"></i>
        </button>
        <a class="navbar-brand-logo" href="index.html">
          <img class="img-fluid" src="/images/speedylogo.png" alt="logo" />
        </a>
        <div class="add-listing d-none d-sm-block">
          <a class="btn btn-primary btn-md" @click="loginModalShow = true"
            ><i class="fa fa-plus-circle"></i> Login to dashboard
          </a>
        </div>
      </div>
    </nav>
    <section class="home-banner" id="home">
      <div
        class="bg-holder"
        style="
          background-image: url('images/hero-bg.png');
          background-position: bottom;
          background-size: cover;
        "
      ></div>
      <!--/.bg-holder-->
      <div class="container position-relative">
        <div class="row align-items-center py-8">
          <div class="col-md-6 col-lg-6 order-md-1 text-center text-md-end">
            <img class="img-fluid" src="/images/hero-img.png" />
          </div>
          <div class="col-md-6 col-lg-6 text-center text-md-start">
            <span
              class="badge bg-light rounded-pill text-dark align-items-center d-flex flex-row-reverse justify-content-end mx-auto mx-md-0 ps-0 w-75 w-sm-50 w-md-75 w-xl-50 mb-3"
              >#1 Editiors Choice App of 2020<img
                class="img-fluid float-start me-3"
                src="/images/arrow-right.png"
                alt=""
            /></span>
            <h1 class="mb-4 display-3 fw-bold lh-sm">
              Build Your Website. <br /><span
                class="d-block d-lg-none d-xl-block"
                style="color: #1c316a"
                >Start A Funnel. Sell Anything!</span
              >
            </h1>
            <p class="mt-3 mb-4">
              Start your website, engage with your audience,and grow
              <br class="d-none d-lg-block" />and grow your business online from
              one place.
            </p>
            <div class="buttons-design">
              <a
                class="btn btn-lg button-trial rounded-pill hover-top"
                @click="showSignUpModal = true"
                >Try for free <span></span>
                <span></span>
                <span></span>
                <span></span>
              </a>
              <a
                class="btn-2 btn-link ps-md-4 hover-slide-right"
                href="#"
                role="button"
              >
                Watch demo video</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
  <!----- about section design code------>
  <section class="about-section">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <h2>Websites & Funnels Working Together</h2>
          <p>
            The first platform that combines both under one place working
            seamlessly.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="about-area">
          <div class="col-lg-5 col-md-6">
            <div class="textarea">
              <h3>Do Anything With Just Your Mouse</h3>
              <h4>Create the design you always wanted!</h4>
              <p class="abouttext">
                "Speedysites’ drag and drop builder is extremely easy to use and
                we were finally able to create the exact website we had in
                mind!"
              </p>
              <div class="custom-button" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-7 col-md-6">
            <div class="about-img">
              <video
                class="simple-video"
                poster="#"
                playsinline=""
                autoplay="autoplay"
                loop="loop"
                muted="muted"
                style="opacity: 1"
              >
                <!--<source src="https://content.simvoly.com/s/24444282803329/uploads/A-Home/drag-video2-2864231.webm" type='video/webm;codecs="vp8, vorbis"'>-->
                <!-- <source src="/images/1a-6401489.mp4" type="video/mp4" /> -->
              </video>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="about-area1">
          <div class="col-lg-6 col-md-6">
            <div class="about-img">
              <img src="/images/aboutimg.png" />
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="textarea1">
              <h3>Achieve Much More With Funnels</h3>
              <p class="abouttext2">
                Funnels are pages connected together with a specific goal that
                can have a HUGE impact on your business.
              </p>
              <div
                class="type1 icon-section"
                style="background: transparent; padding: 6px"
              >
                <div class="icon-header-wrapper">
                  <div class="icon border-color-secondary1">
                    <i
                      class="icon-section-icon fa fa-hand-o-right color-secondary1"
                    ></i>
                  </div>
                  <div class="icon-title text-widget-content">
                    <h4 style="line-height: 1.4">
                      <span style="font-size: 20px"
                        >A/B Split Test Your Pages</span
                      >
                    </h4>
                  </div>
                </div>
                <div class="icon-content">
                  <div class="text-widget-content">
                    <p>
                      The first platform that allows you to A/B test your
                      website pages thanks to the built-in funnels.
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="type1 icon-section"
                style="background: transparent; padding: 6px"
              >
                <div class="icon-header-wrapper">
                  <div class="icon border-color-secondary1">
                    <i
                      class="icon-section-icon fa fa-hand-o-right color-secondary1"
                    ></i>
                  </div>
                  <div class="icon-title text-widget-content">
                    <h4 style="line-height: 1.4">
                      <span style="font-size: 20px"
                        >Sales Funnels & Custom Checkouts</span
                      >
                    </h4>
                  </div>
                </div>
                <div class="icon-content">
                  <div class="text-widget-content">
                    <p>
                      Customize the sales steps for the customer that wants to
                      buy your products.
                    </p>
                  </div>
                </div>
              </div>
              <div class="custom-button1" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- --------about section design code end----------->
  <div class="feature-icon-wrapper section-space--ptb_100">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section-title-wrap text-center section-space--mb_40">
            <h6 class="section-sub-title mb-20">Industries we Serve</h6>
            <h3 class="heading">
              Services We Deliver <br />
              we provide
              <span class="text-color-primary">
                truly prominent IT solutions.</span
              >
            </h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="feature-list__two">
            <div class="row">
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-heart-o"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">IT Design</h5>
                      <div class="text">
                        We provide the most responsive and functional IT design
                        for companies and businesses worldwide.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-suitcase" aria-hidden="true"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">IT Management</h5>
                      <div class="text">
                        It’s possible to simultaneously manage and transform
                        information from one server to another.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <!-- ht-box-icon Start -->
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-shield" aria-hidden="true"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">Data Security</h5>
                      <div class="text">
                        We provide the most responsive and functional IT design
                        for companies and businesses worldwide.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- ht-box-icon End -->
                </div>
              </div>
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <!-- ht-box-icon Start -->
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-shield" aria-hidden="true"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">Business Reform</h5>
                      <div class="text">
                        We provide the most responsive and functional IT design
                        for companies and businesses worldwide.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- ht-box-icon End -->
                </div>
              </div>
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <!-- ht-box-icon Start -->
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-shield" aria-hidden="true"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">Infrastructure Plan</h5>
                      <div class="text">
                        We provide the most responsive and functional IT design
                        for companies and businesses worldwide.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- ht-box-icon End -->
                </div>
              </div>
              <div
                class="col-lg-4 col-md-6 wow move-up animated"
                style="visibility: visible"
              >
                <div class="ht-box-icon style-02 single-svg-icon-box">
                  <!-- ht-box-icon Start -->
                  <div class="icon-box-wrap">
                    <div class="icon">
                      <i class="fa fa-shield" aria-hidden="true"></i>
                    </div>
                    <div class="content">
                      <h5 class="heading">Firewall Advance</h5>
                      <div class="text">
                        We provide the most responsive and functional IT design
                        for companies and businesses worldwide.
                      </div>
                      <div class="feature-btn">
                        <a href="#">
                          <span class="button-text">Discover now</span>
                          <i class="fa fa-long-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- ht-box-icon End -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
          <div
            class="feature-list-button-box mt-30 text-center"
            id="button-hover"
          >
            <a
              class="btn btn-lg button-trial rounded-pill hover-top"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              >Talk to a consultant<span></span>
              <span></span>
              <span></span>
              <span></span>
            </a>

            <a href="#" class="ht-btn ht-btn-md btn-try hover-top"
              >Contact us now
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="sectione-Commerce1">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-12">
          <h4>E-Commerce Made Smart</h4>
          <h2>New Evolution In Selling Online</h2>
          <p>
            With the power of a storefront, sales funnels, detailed analytics,
            and full customization freedom.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="ecommerce-row">
          <div class="col-lg-6 col-md-6">
            <div class="E-Commerce">
              <img src="/images/datailedimg.png" />
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="E-Commerce-text">
              <h3>Detailed Analytics</h3>
              <p class="e-commercetext">
                Know more about your sales, customers, and where your revenue is
                coming from with detailed e-commerce analytics.
              </p>
              <div class="custom-1" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>

                <h5>Free Trial . No Credit Card Required</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="custom-checkouts-row">
          <div class="col-lg-6 col-md-12">
            <div class="custom-checkouts-text">
              <h3>Custom Checkouts</h3>
              <p class="customtext">
                Have the freedom to shape and design the looks of your checkouts
                to build trust and convert more of your visitors.
              </p>
              <div class="custom-2" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>

                <h5>Free Trial . No Credit Card Required</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="E-Commerce1">
              <img src="/images/datailedimg1.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="email-custom">
    <div class="container-fluid grid-row">
      <div class="grid-customsection">
        <div class="email-imgdiv">
          <img src="/images/datailedimg3.png" style="width: 100%" />
        </div>
        <div class="email-textdiv">
          <div class="email-textdiv1">
            <h4>Email Marketing & Automations</h4>
            <h1>Send Emails. Engage With Your Users.</h1>
            <div class="email-textdiv2">
              <p>
                Create your emails and campaigns easier than ever before.
                Automate everything with just a few clicks.
              </p>
            </div>
            <div class="email-textdiv3">
              <div class="custom-list">
                <i class="fa fa-hand-o-right"></i>
                <h3>Drag and drop email builder</h3>
              </div>
              <div class="custom-list">
                <i class="fa fa-hand-o-right"></i>
                <h3>Automation flow builder</h3>
              </div>
              <div class="custom-list">
                <i class="fa fa-hand-o-right"></i>
                <h3>Build your email lists and segments</h3>
              </div>
              <div class="custom-3" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </a>

                <h5>Free Trial . No Credit Card Required</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="footer-section">
    <div class="container w-container">
      <div class="subscription-wrapper">
        <div class="subscription-text-side">
          <h3 class="subscription-heading">Are you a Home Owner?</h3>
          <p class="subscription-details-text">
            Put your email address and get listed.
          </p>
        </div>
        <div class="subscription-form-side">
          <div class="subscription-form-block w-form">
            <form
              id="wf-form-Subscription"
              name="wf-form-Subscription"
              data-name="Subscription"
              method="get"
              class="subscription-form"
              data-wf-page-id="6224513e7396e87469269d7c"
              data-wf-element-id="98cbcd15-ebec-acd4-d0c3-f43ba56fbf96"
              aria-label="Subscription"
            >
              <input
                type="email"
                class="email-field w-input"
                maxlength="256"
                name="Email"
                data-name="Email"
                placeholder="Enter your email here..."
                id="Email-3"
                required=""
              />
              <input
                type="submit"
                value="Get Listed"
                data-wait="Please wait..."
                class="button submit-button w-button"
              />
            </form>
            <div
              class="w-form-done"
              tabindex="-1"
              role="region"
              aria-label="Subscription success"
            >
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div
              class="w-form-fail"
              tabindex="-1"
              role="region"
              aria-label="Subscription failure"
            >
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-wrapper">
        <div class="footer-single-block footer-logo-blojg">
          <div class="footer-logo-block">
            <img
              src="/images/speedylogo.png"
              loading="lazy"
              alt="Footer Logo Image"
              class="footer-logo-image"
            />
          </div>
          <div class="footer-content">
            <p class="footer-details">
              Properties are most budget friendly so you have are find
              opportunity is main responsibility to clients
            </p>
          </div>
        </div>
        <div class="footer-single-block">
          <div class="footer-title-block">
            <h3 class="footer-heading">
              Addrees <span class="color-shape"></span>
            </h3>
          </div>
          <div class="footer-link-block">
            <div class="footer-center col-md-4 col-sm-6">
              <div>
                <i class="fa fa-map-marker"></i>
                <p>
                  <span>
                    Plot No.1273, 3rd Floor, Sector 82, JLPL Industrial Area,
                  </span>
                  Sahibzada Ajit Singh, Punjab 160055
                </p>
              </div>
              <div>
                <i class="fa fa-phone"></i>
                <p>+91 (797)363-0617</p>
              </div>
              <div>
                <i class="fa fa-envelope"></i>
                <p><a href="#">hr@code4each.com</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-single-block address-block">
          <div class="footer-title-block">
            <h3 class="footer-heading">
              Soical links <span class="color-shape"></span>
            </h3>
          </div>

          <div class="footer-social-network-block">
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-facebook-f"></i>
            </a>
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-whatsapp"></i>
            </a>
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <div class="footer-social-network-block">
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-instagram"></i>
            </a>
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-twitter"></i>
            </a>
            <a
              href="#"
              target="_blank"
              class="social-single-link w-inline-block"
            >
              <i class="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-text">
          Code4Each.<a> All Rights Reserved - Privacy Policy </a>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    :class="{ show: showSignUpModal, 'd-block': showSignUpModal }"
  >
    <div class="modal-dialog popup-model" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <!-- <Loader v-if="loading" /> -->

          <div class="column" id="main">
            <button
              type="button"
              class="btn-close"
              @click="hideModal"
              aria-label="Close"
            >
              <i class="fa fa-times"></i>
            </button>

            <h1>Start Your 7 Day Free Trial Today!</h1>

            <form class="form-start">
              <div class="main-form">
                <div class="form-group">
                  <label for="exampleInputName">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputName"
                    placeholder="Company  Name"
                    v-model="formData.company_name"
                  />
                  <div class="text-danger">{{ allErrors.company_name }}</div>
                </div>

                <div class="form-group">
                  <label for="exampleInputName">Name</label>
                  <input
                    type="name"
                    class="form-control"
                    id="exampleInputName"
                    placeholder="Name"
                    v-model="formData.name"
                  />
                  <div class="text-danger">{{ allErrors.name }}</div>
                </div>
              </div>
              <div class="main-form">
                <div class="form-group">
                  <label for="exampleInputEmail1">E-mail </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="E-mail"
                    v-model="formData.email"
                  />
                  <div class="text-danger">{{ allErrors.email }}</div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Phone no.</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Phone Number..."
                    v-model="formData.phone"
                  />
                  <div class="text-danger">{{ allErrors.phone }}</div>
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  v-model="formData.password"
                />
                <div class="text-danger">{{ allErrors.password }}</div>
              </div>
              <button
                type="submit"
                class="btn btn-primary1"
                @click="registerUser"
                :disabled="isDisabledSignUp"
              >
                Sign Up
              </button>
              <div v-if="loading" class="three-body4">
                <div class="three-body__dot1"></div>
                <div class="three-body__dot1"></div>
                <div class="three-body__dot1"></div>
              </div>
            </form>
          </div>
          <div>
            <!-- <?xml version="1.0" encoding="UTF-8"?> -->
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
              <title>Path</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                  id="Path"
                  fill="#0e1532"
                ></path>
              </g>
            </svg>
          </div>
          <div class="column" id="secondary">
            <div class="sec-content">
              <h2>Welcome Back!</h2>
              <h3>Already have an account?</h3>
              <button
                type="button"
                @click="toggleSignLogin()"
                class="btn btn-primary"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showSignUpModal" class="modal-backdrop fade show"></div>
  <div v-if="loginModalShow" class="modal-backdrop fade show"></div>
  <div
    class="modal fade"
    :class="{ show: loginModalShow, 'd-block': loginModalShow }"
    id="exampleModalLabel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog popup-model" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="column" id="main">
            <button
              type="button"
              class="btn-close"
              @click="hideModal"
              aria-label="Close"
            >
              <i class="fa fa-times"></i>
            </button>

            <h1>Start Your 7 Day Free Trial Today!</h1>

            <form class="form-start">
              <div class="main-form1">
                <div class="form-group">
                  <label for="exampleInputEmail1">E-mail </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="formDataLogin.email"
                  />
                  <div class="text-danger">{{ allErrors.email }}</div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="formDataLogin.password"
                  />
                  <div class="text-danger">{{ allErrors.password }}</div>
                </div>
                <div class="text-danger">{{ backendError }}</div>
              </div>

              <button
                type="submit"
                class="btn btn-primary1"
                @click="login"
                :disabled="isDisabledLoginUp"
              >
                Login
              </button>
              <div v-if="loading" class="three-body3">
                <div class="three-body__dot1"></div>
                <div class="three-body__dot1"></div>
                <div class="three-body__dot1"></div>
              </div>
            </form>
          </div>
          <div>
            <!-- <?xml version="1.0" encoding="UTF-8"?> -->
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com -->
              <title>Path</title>
              <desc>Created with Sketch.</desc>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <path
                  d="M11.3847656,-5.68434189e-14 C-7.44726562,36.7213542 5.14322917,126.757812 49.15625,270.109375 C70.9827986,341.199016 54.8877465,443.829224 0.87109375,578 L67,578 L67,-5.68434189e-14 L11.3847656,-5.68434189e-14 Z"
                  id="Path"
                  fill="#0e1532"
                ></path>
              </g>
            </svg>
          </div>
          <div class="column" id="secondary">
            <div class="sec-content">
              <h2>Welcome Back!</h2>
              <h3>Don't have an account?</h3>
              <button
                type="button"
                class="btn btn-primary"
                @click="toggleSignLogin(true)"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

