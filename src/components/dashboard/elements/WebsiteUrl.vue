<script setup>
const props = defineProps({
  websiteData: Object,
});
// const {websiteUrl} = props.websiteData.
const openLinkInNewTab = () => {
      const url = props.websiteData['0'].website_domain;
      if (url) {
        window.open(url, '_blank');
      }
};
</script>
<template>
    <div class="col-lg-12 col-xl-12 d-flex justify-content-center" id="wordPressPage" style="margin: 0px auto;">
        <div class="card">
            <div class="card-body">
                <div class="col-12 col-lg-6 mb-6 mb-lg-0">
                    <div class="box-1 bg-light user">
                        <div class="box-inner-1 pb-3 mb-3 ">
                            <div class="img-wrapper">
                                <img src="/images/wordpres.png">
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 col-xl-5">
                    <div class="box-2">
                        <div class="box-inner-2">
                            <div>
                                <p class="fw-bold">Instance Access</p>
                                <p class="text-wrapper">Complete your purchase by providing your payment details</p>
                            </div>
                            <form class="text-start mb-2 mt-3">
                                <div class="form-field  mb-4">
                                    <label for="basic-url" class="form-label">Website URL</label>
                                    <div class="input-group mb-3">
                                        <input type="url" class="form-control" placeholder="https://www.google.com/" :value="websiteData['0'].website_domain"
                                            aria-label="https://www.google.com/" aria-describedby="button-addon2" >
                                    </div>
                                    <button class="btn btn-outline-success btn-success" type="button" id="button-addon2"><i
                                            class="fa fa-share-square"  @click="openLinkInNewTab" ></i></button>
                                    <button class="btn btn-outline-danger btn-danger  text-light" type="button"
                                        id="button-addon3"><i class="fa fa-file-archive-o"></i></button>
                                </div>
                            </form>

                        </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style>
@import '@/assets/wordpress.css';
</style>
