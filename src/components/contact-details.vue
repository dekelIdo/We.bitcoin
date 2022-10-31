
<template>
  <section v-if="contact" class="contact-details">
    <RouterLink to="/contact"
      ><img
        class="go-back-icon"
        :src="`./images/go-back-icon.svg`"
        alt=""
    /></RouterLink>
    <h1>Contact Details</h1>
    <h2>{{ contact.name }}</h2>
    <div class="contact-details-image"><img v-bind:src="getImgUrl" /></div>
    <span class="contact-mail">{{ contact.email }}</span>
    <span class="contact-phone">{{ contact.phone }}</span>
    <div class="details-actions">
      <RouterLink :to="`/contact/edit/${contact._id}`">
        <button class="edit-contact-btn">Edit</button>
      </RouterLink>

      <RouterLink :to="`/contact/TransferFunds/${contact._id}`">
        <button class="edit-contact-btn transfer-btn">Transfer</button>
      </RouterLink>
    </div>
    <div v-if="user" class="details-activities">
      <div
        v-for="transaction in user.transactions"
        v-bind:key="transaction.at"
        v-bind:transactions="user.transactions"
      >
        <h3>Last transitions :</h3>
        <div v-if="user.transactions.length" class="activities-container">
          <div class="left-container">
            <span> {{ transaction.at }}</span>
            <h3>{{ transaction.to }}</h3>
            <span class="preview-price">${{ transaction.amount }}</span>
          </div>
          <div class="right-container">
            <span></span>
            <span class="preview-status"
              >type : <span class="approved">{{ transaction.type }}</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { contactService } from "../services/contactService";

import LogoSVG from "../../public/images/go-back-icon.svg";
import { userService } from "../services/user.service";

export default {
  components: { LogoSVG },
  data() {
    return {
      contact: null,
      user: null,
    };
  },
  async created() {
    const _id = this.$route.params._id;
    this.contact = await contactService.getContactById(_id);
    const getUser = await userService.getContactById(_id);
    this.user = getUser;
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  },
};
</script>

<style>
</style>