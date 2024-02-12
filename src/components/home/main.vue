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
import { useRouter, useRoute } from "vue-router";
import * as yup from "yup";
import Loader from "@/components/common/Loader.vue";

const route = useRoute();
const allErrors = ref({});
const allErrorsLogin = ref({});
const allErrorsForget = ref({});
const allErrorsResset = ref({});
const formDataForget = ref({});
const formDataResset = ref({});
const router = useRouter();
const { Errors, resetForm, handleSubmit } = useForm();
const formData = ref({});
const showSignUpModal = ref(false);
const isDisabledSignUp = ref(false);
const forgetModalShow = ref(false);
const loginModalShow = ref(false);
const loading = ref(false);
const isDisabledLoginUp = ref(false);
const formDataLogin = ref({});
const backendError = ref("");
const isForgetAction = ref(false);
const ModalShowing = ref(false);
const showSuccessMeassge = ref(false);
const feedBackvalues = ref({});
const feedbackModalShow = ref(false);
const feedbackMsg = ref(false);
const feedBackloading = ref(false);
const loginExist = ref(false);
const allErrorsFeedback = ref({});

const showModal = (modal) => {
  ModalShowing.value = true;
  backendError.value = "";
  if (modal === "forget") {
    loginModalShow.value =
      showSignUpModal.value =
      feedbackModalShow.value =
        false;
    forgetModalShow.value = true;
  } else if (modal === "login") {
    loginModalShow.value = true;
    forgetModalShow.value =
      showSignUpModal.value =
      feedbackModalShow.value =
        false;
  } else if (modal === "feedback") {
    feedbackModalShow.value = true;
    forgetModalShow.value =
      showSignUpModal.value =
      loginModalShow.value =
        false;
  } else if (modal === "signup") {
    showSignUpModal.value = true;
    forgetModalShow.value =
      feedbackModalShow.value =
      loginModalShow.value =
        false;
  }
};

const validationSchema = yup.object({
  company_name: yup.string().required("Please enter your company name."),
  name: yup.string().required("Please enter your name."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .required("Please enter your password."),
  phone: yup
    .string()
    .required("Please enter your phone number.")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number."),
});

const validationSchemaLogin = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must not exceed 20 characters.")
    .required("Please enter your password."),
});

const registerUser = handleSubmit(async () => {
  try {
    isDisabledSignUp.value = true;
    loading.value = true;
    await validationSchema.validate(formData.value, { abortEarly: false });
    allErrors.value = {};

    const response = await WordpressService.registerUser(formData.value);
    if (response.status === 200 && response.data.success) {
      const token = response.data.token;
      localStorage.setItem("access_token", token);
      hideModal();
      loading.value = false;
      router.push("/dashboard");
    }
  } catch (error) {
    const errors =
      error.inner && Array.isArray(error.inner)
        ? error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {})
        : {};

    allErrors.value = errors;
    if (error.response && error.response.data && error.response.data.errors) {
      allErrors.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ])
      );
    } else {
      backendError.value = error?.response?.data?.message;
    }
  }
  isDisabledSignUp.value = false;
  loading.value = false;
});

const login = handleSubmit(async () => {
  try {
    isDisabledLoginUp.value = true;
    loading.value = true;
    await validationSchemaLogin.validate(formDataLogin.value, {
      abortEarly: false,
    });
    allErrorsLogin.value = {};
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
    const errors =
      error.inner && Array.isArray(error.inner)
        ? error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {})
        : {};

    allErrorsLogin.value = errors;
    if (error.response && error.response.data && error.response.data.errors) {
      allErrorsLogin.value = Object.fromEntries(
        Object.entries(error.response.data.errors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value,
        ])
      );
    } else {
      backendError.value = error?.response?.data?.message;
    }
  }
  loading.value = false;
  isDisabledLoginUp.value = false;
});

const hideModal = () => {
  ModalShowing.value = false;
  feedbackModalShow.value = false;
  forgetModalShow.value = false;
  loginModalShow.value = false;
  showSignUpModal.value = false;
  allErrors.value = {};
  allErrorsLogin.value = {};
  allErrorsResset.value = {};
  allErrorsFeedback.value = {};
  formData.value = {};
  formDataLogin.value = {};
  feedBackvalues.value = {};
  formDataForget.value = {};
};

const googleSignUp = async (response) => {
  try {
    console.log(response);
    const apiResponse = await WordpressService.GoogleLogin.googleSignUp({
      id_token: response.credential,
    });
    if (apiResponse.status === 200 && apiResponse.data.success) {
      const token = apiResponse.data.access_token;
      localStorage.setItem("access_token", token);
      router.push("/dashboard");
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  const storedToken = localStorage.getItem("access_token");
  if (storedToken) {
    loginExist.value = storedToken;
  }
  if (route.query.login) {
    loginModalShow.value = true;
  }
});

const validationSchemaForget = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please provide your email address."),
});

const sendMailToVerifyEmail = handleSubmit(async () => {
  try {
    loading.value = true;
    isForgetAction.value = true;
    await validationSchemaForget.validate(formDataForget.value, {
      abortEarly: false,
    });
    allErrorsForget.value = {};
    const response = await WordpressService.ResetPassword.forgotPassword(
      formDataForget.value
    );
    if (response.status === 200 && response.data.success) {
      showSuccessMeassge.value = true;

      setTimeout(() => {
        showSuccessMeassge.value = false;
        hideModal();
      }, 5000);
    }
  } catch (error) {
    const errors =
      error.inner && Array.isArray(error.inner)
        ? error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {})
        : {};

    allErrorsForget.value = errors;
    if (error.response && error.response.data && error.response.data.errors) {
      backendError.value = Object.values(error.response.data.errors).flat();
    }
  }
  loading.value = false;
  isForgetAction.value = false;
});

const validationSchemaFeedBack = yup.object({
  message: yup.string().required("Message is a required field"),
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is a required field"),
  phone: yup
    .string()
    .required("Phone Number is a required field")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

const submitFeedback = handleSubmit(async () => {
  try {
    feedBackloading.value = true;
    let formValues = feedBackvalues.value;
    await validationSchemaFeedBack.validate(feedBackvalues.value, {
      abortEarly: false,
    });
    const formData = new FormData();
    formData.append("type", "inquiry");
    formData.append("title", "this is home page contact mail");
    formData.append("email", formValues.email);
    formData.append("phone", formValues.phone);
    formData.append("name", formValues.name);
    formData.append("message", formValues.message);
    const response = await WordpressService.FeedBack.submitFeedback(formData);
    if (response.status === 200 && response.data.success) {
      allErrorsFeedback.value = {};
      feedBackvalues.value = {};
      feedbackMsg.value = true;
      setTimeout(() => {
        feedbackMsg.value = false;
        hideModal();
      }, 5000);
    }
  } catch (validationErrors) {
    const errors = validationErrors.inner.reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});

    allErrorsFeedback.value = errors;
  }
  feedBackloading.value = false;
});

const navigate = () => {
  router.push("/dashboard");
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
        <a class="navbar-brand-logo">
          <img class="img-fluid" src="/images/speedylogo.png" alt="logo" />
        </a>
        <div class="add-listing d-none d-sm-block">
          <a
            v-if="!loginExist"
            class="btn btn-lg button-trial rounded-pill hover-top"
            @click="showModal('login')"
            >LOGIN / SIGNUP
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
          <a
            v-else
            class="btn btn-lg button-trial rounded-pill hover-top"
            @click="navigate"
            >DASHBOARD
            <span></span>
            <span></span>
            <span></span>
            <span></span>
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
      <div class="container position-relative">
        <div class="row align-items-center py-8">
          <div class="col-md-6 col-lg-6 order-md-1 text-center text-md-end">
            <img class="img-fluid" src="/images/hero-img.png" />
          </div>
          <div class="col-md-6 col-lg-6 text-center text-md-start">
            <span
              class="badge bg-light rounded-pill text-dark align-items-center d-flex flex-row-reverse justify-content-end mx-auto mx-md-0 ps-0 w-75 w-sm-50 w-md-75 w-xl-50 mb-3"
              >Average website creation time on SpeedySites is 5 SEC<img
                class="img-fluid float-start me-3"
                src="/images/arrow-right.png"
                alt=""
            /></span>
            <h1 class="mb-4 display-3 fw-bold lh-sm">
              Build Your Website. <br /><span
                class="d-block d-lg-none d-xl-block"
                style="color: #1c316a"
                >In Less Then 10 Seconds</span
              >
            </h1>
            <p class="mt-3 mb-4">
              Create your website with no coding skills and no designing expertise! 
              <br class="d-none d-lg-block" />
              SpeedySites will design a completely unique website that you can start using right away.
             
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
              <!-- <a
                class="btn-2 btn-link ps-md-4 hover-slide-right"
                href="#"
                role="button"
              >
                Watch demo video</a
              > -->
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
          <h2>Build A Fully Functional Website</h2>
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
              <div class="custom-1" id="button-hover">
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
              <img src="/images/datailedimg1.png" />
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
              <h3>Think of SpeedySites as your personal website developer</h3>
              <p class="abouttext2">
                Where you partner with SpeedySites who grasp your business objectives and design a customized website aligned with your brand guidelines, ensuring continuous support.
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
                        >Fast & Easy To Use</span
                      >
                    </h4>
                  </div>
                </div>
                <div class="icon-content">
                  <div class="text-widget-content">
                    <!--<p>
                      The first platform that allows you to A/B test your
                      website pages thanks to the built-in funnels.
                    </p>-->
                    <div class="custom-list">
                      <ul>
                        <li><strong>Step 1:</strong> Login / Signup to SpeedySites</li>
                        <li><strong>Step 1:</strong> Enter the name of your business</li>
                        <li><strong>Step 2:</strong> Submit keywords describing your business</li>
                        <li><strong>Step 3:</strong> Get your website ready in seconds!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
             
              <div class="custom-button1" id="button-hover">
                <a
                  class="btn btn-lg button-trial rounded-pill hover-top"
                  @click="showSignUpModal = true"
                  >Try for free
                  <span></span>
                  <span></span>
                  <span></span>
                  <span> </span>
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
            <!--<h6 class="section-sub-title mb-20">Industries we Serve</h6>-->
            <h3 class="heading">
              More Than Just A Website Builder <br />
              
            </h3>
            <h5><span class="text-color-primary">
                The most unique and powerful platform on the planet as your own
                </span
              >
              </h5>
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
                      <h5 class="heading">Templates Library</h5>
                      <div class="text">
                        Pre defined website templates to choose from matching your business needs.
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
                      <h5 class="heading">Custom Branding</h5>
                      <div class="text">
                        Tailor your platform to reflect your brand identity with features like adding your logo, domain, and custom styling.
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
                      <h5 class="heading">Drag & Drop Building Editor</h5>
                      <div class="text">
                        Create pages as fast as humanly possible with our drag & drop builder.
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
              @click="showModal('signup')"
              >TRY FOR FREE
              <span></span>
              <span></span>
              <span></span>
              <span> </span>
            </a>

            <a
              class="ht-btn ht-btn-md btn-try hover-top"
              @click="showModal('feedback')"
              style="curser: pointer"
              >CONTACT US
            </a>
            <!-- <a
              class="btn btn-lg button-trial rounded-pill hover-top"
              @click="showModal('feedback')"
              style="curser: pointer"
              >CONTACT US NOW
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
 
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
                  >Try for free
                  <span></span>
                  <span></span>
                  <span></span>
                  <span> </span>
                </a>
                <h5>Free Trial. No Credit Card Required</h5>
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
          <h3 class="subscription-heading">
            Questions? Feedback? Contact us for prompt assistance and support
          </h3>
        </div>
        <div class="subscription-form-side">
          <a
            class="btn btn-lg button-trial rounded-pill hover-top"
            @click="showModal('feedback')"
            >Contact Us
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </a>
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
              Instant Websites, Zero Coding, Maximum Impact!
            </p>
            <!-- <div class="footer-copyright-text small-device-none">© <a  class="company-link">Brandbes.</a> All Rights Reserved - Privacy Policy </div> -->
          </div>
        </div>
        <!----<div class="footer-single-block">
          <div class="footer-title-block">
            <h3 class="footer-heading">
              Address <span class="color-shape"></span>
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
                <p><a>hr@code4each.com</a></p>
              </div>
            </div>
          </div>
        </div>-->
        <div class="footer-single-block address-block">
          <div class="footer-title-block">
            <h3 class="footer-heading">
              Social links <span class="color-shape"></span>
            </h3>
          </div>

          <div class="footer-social-network-block">
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-facebook-f"></i>
            </a>
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-whatsapp"></i>
            </a>
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
          <div class="footer-social-network-block">
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-instagram"></i>
            </a>
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-twitter"></i>
            </a>
            <a target="_blank" class="social-single-link w-inline-block">
              <i class="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-text">
          SpeedySites.<a> All Rights Reserved - Privacy Policy </a>
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
                  <label for="exampleInputEmail1">Email </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
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
              
              <div class="text-danger">{{ backendError }}</div>
              <div class="form-group mt-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck">
                  <label class="form-check-label" for="gridCheck">
                    Remember Me
                  </label>
                </div>
              </div>
              <div class="form-group">
                  <a class="text-body forgotPassword" @click="showModal('forget')"
                  >Forgot password?</a
                >
              </div>
              <div class="dual-logo">
                <button
                  type="submit"
                  class="btn btn-primary1"
                  @click="registerUser"
                  :disabled="isDisabledSignUp"
                >
                  Sign Up
                </button>
                <div v-if="loading" class="three-body3">
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                </div>
              </div>
            </form>
          </div>
          <div>
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
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
                @click="showModal('login')"
                class="btn btn-primary"
              >
                Login
              </button>
              <GoogleLogin :callback="googleSignUp" prompt auto-login />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="ModalShowing" class="modal-backdrop fade show"></div>
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

            <h1>Login</h1>

            <form class="form-start">
              <div class="main-form1">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email"
                    aria-describedby="emailHelp"
                    v-model="formDataLogin.email"
                  />
                  <div class="text-danger">{{ allErrorsLogin.email }}</div>
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
                  <div class="text-danger">{{ allErrorsLogin.password }}</div>
                </div>
                <a class="text-body forgotPassword" @click="showModal('forget')"
                  >Forgot password?</a
                >

                <div class="text-danger">{{ backendError }}</div>
              </div>
              <div class="dual-logo">
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
              </div>
            </form>
          </div>
          <div>
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
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
                @click="showModal('signup')"
              >
                Sign Up
              </button>
              <GoogleLogin :callback="googleSignUp" prompt auto-login />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    :class="{ show: forgetModalShow, 'd-block': forgetModalShow }"
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

            <h1>Forgot Password?</h1>

            <form class="form-start">
              <div class="main-form1">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Registered Email"
                    aria-describedby="emailHelp"
                    v-model="formDataForget.email"
                  />
                </div>
                <div class="text-danger">{{ allErrorsForget.email }}</div>
                <div class="text-danger">{{ backendError }}</div>
                <div
                  v-if="showSuccessMeassge"
                  class="mt-3"
                  style="
                    background-color: #dff0d8;
                    color: #3c763d;
                    padding: 10px;
                    border: 1px solid #d6e9c6;
                  "
                >
                  Please check your inbox and verify your email!
                </div>
              </div>

              <div class="dual-logo">
                <button
                  type="submit"
                  class="btn btn-primary1"
                  @click="sendMailToVerifyEmail"
                  :disabled="isForgetAction"
                >
                  Email Reset Link
                </button>
                <div v-if="loading" class="three-body3">
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                </div>
              </div>
            </form>
          </div>
          <div>
            <svg
              width="67px"
              height="578px"
              viewBox="0 0 67 578"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
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
                @click="showModal('login')"
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

  <div
    class="modal feedback-model fade"
    id="modalContactForm"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
    :class="{ show: feedbackModalShow, 'd-block': feedbackModalShow }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header" style="border: 0">
          <button
            type="button"
            class="btn-close"
            @click="hideModal"
            aria-hidden="true"
          ></button>
        </div>
        <div class="modal-body mx-3">
          <div class="card-layout layout-medium">
            <div class="content">
              <div class="close-button"></div>

              <h1 class="title">Contact Us</h1>
              <label data-error="wrong" data-success="right" for="form34"
                >Name*</label
              >
              <input
                type="text"
                class="form-control"
                id="field1"
                placeholder="Name"
                v-model="feedBackvalues.name"
              />
              <div class="text-danger">{{ allErrorsFeedback.name }}</div>
              <label data-error="wrong" data-success="right" for="form34"
                >Email*</label
              >
              <input
                type="text"
                class="form-control"
                id="field1"
                placeholder="Email"
                v-model="feedBackvalues.email"
              />
              <div class="text-danger">{{ allErrorsFeedback.email }}</div>
              <label data-error="wrong" data-success="right" for="form34"
                >Phone*</label
              >
              <input
                type="text"
                class="form-control"
                id="field1"
                placeholder="Phone"
                v-model="feedBackvalues.phone"
              />
              <div class="text-danger">{{ allErrorsFeedback.phone }}</div>
              <label data-error="wrong" data-success="right" for="form34"
                >Message*</label
              >

              <textarea
                class="form-control input"
                placeholder="Write Your Message.."
                rows="5"
                v-model="feedBackvalues.message"
              ></textarea>
              <div class="text-danger">{{ allErrorsFeedback.message }}</div>
              <div
                v-if="feedbackMsg"
                class="mt-3"
                style="
                  background-color: #dff0d8;
                  color: #3c763d;
                  padding: 10px;
                  border: 1px solid #d6e9c6;
                "
              >
                Thank you for reaching out! Your message has been successfully
                submitted. We'll get back to you as soon as possible.
              </div>
              <div class="user-actions">
                <div v-if="feedBackloading" class="three-body3">
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                  <div class="three-body__dot1"></div>
                </div>
                <button class="feedback-btn-primary" @click="submitFeedback">
                  Send
                </button>

                <button
                  class="feedback-btn-outline"
                  data-dismiss="modal"
                  aria-hidden="true"
                  @click="hideModal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.forgotPassword {
  cursor: pointer;
}
.succmsg {
  color: "#197817";
}
</style>

