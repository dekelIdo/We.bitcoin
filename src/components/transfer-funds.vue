<template>
  <section v-if="toContact" class="transfer-funds-container">
    <RouterLink :to="`/contact/${toContact._id}`"
      ><img
        class="go-back-icon"
        :src="`./images/go-back-icon.svg`"
        alt=""
    /></RouterLink>
    <h1 class="label">Transfer funds</h1>
    <h2>Sending to : {{ toContact.name }}</h2>
    <div class="contact-details-image"><img v-bind:src="getImgUrl" /></div>
    <div class="transfer-content">
      <h3 class="label">Transfer amount</h3>
      <input v-model="amount" type="text" placeholder="amount" />
    </div>
    <div class="edit-actions">
      <button class="edit-contact-btn">
        <RouterLink :to="`/contact`"> Cancel </RouterLink>
      </button>
      <button @click="onClickSend" class="edit-contact-btn">Send</button>
    </div>
  </section>
</template>

<script>
import { contactService } from "../services/contactService";
export default {
  data() {
    return {
      toContact: null,
      amount: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.toContact._id}@ashallendesign.co.uk`;
    },
  },

  methods: {
    async onClickSend() {
      const payload = {
        toUser: this.toContact,
        fromUser: this.user,
        amount: this.amount,
      };
      this.$store.dispatch({ type: "transferFunds", payload });
            this.$router.push(`/contact/${this.toContact._id}`);
    },
  },

  async created() {
    const _id = this.$route.params._id;
    const contact = await contactService.getContactById(_id);
    this.toContact = contact;
  },
};
</script>

