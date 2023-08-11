// import path for including components in this file
<script setup>
import Header from './elements/Header.vue';
import Footer from './elements/Footer.vue';
import FeatureSection from './elements/FeatureSection.vue';
import AboutSection from './elements/AboutSection.vue';
import PricingSection from './elements/PricingSection.vue';
import MultiSection from './elements/MultiSection.vue';
import WhyChooseUs from './elements/WhyChooseUs.vue';
import Testimonial from './elements/Testimonial.vue';
import WorkingProcess from './elements/WorkingProcess.vue';
import SpeedStart from './elements/SpeedStart.vue';
</script>
<template>
    <!-- Include components In ON Common components -->
    <div>
    <header>
      <!-- Header content -->
      <Header></Header>
    </header>
    <main>
        <FeatureSection></FeatureSection>

        <AboutSection></AboutSection>

        <PricingSection></PricingSection>

        <MultiSection></MultiSection>

        <WhyChooseUs></WhyChooseUs>

        <Testimonial></Testimonial>

        <WorkingProcess></WorkingProcess>

        <SpeedStart></SpeedStart>

         <!-- The matched component will be rendered here -->
    </main>
    <footer>
      <!-- Footer content -->
      <Footer></Footer>
    </footer>
  </div>
  

   

    
</template>