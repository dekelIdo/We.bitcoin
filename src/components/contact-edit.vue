<template>
  <section v-if="contact" class="contact-edit">
    <RouterLink :to="`/contact/${contact._id}`"
      ><img
        class="go-back-icon"
        :src="`../../public/images/go-back-icon.svg`"
        alt=""
    /></RouterLink>
    <h1>Edit contact</h1>
    <div class="edit-contact-container">
      <!-- <h2>{{ name }}</h2> -->
      <h3 class="label">Enter new name</h3>
      <input v-model="name" type="text" />
      <h3 class="label">Enter contact email</h3>
      <input v-model="email" type="text" placeholder="example@gmail.com" />
      <h3 class="label">Enter contact phone</h3>
      <input v-model="phone" type="text" placeholder="+972-8030492" />
      <div class="contact-edit-image"><img v-bind:src="getImgUrl" /></div>

      <div class="edit-actions">
        <button class="edit-contact-btn">
          <RouterLink :to="`/contact`"> Cancel </RouterLink>
        </button>
        <button @click="onSaveContact" class="edit-contact-btn">Save</button>
      </div>
    </div>
  </section>
  <section v-else class="contact-edit">
    <RouterLink :to="`/contact`"
      ><img
        class="go-back-icon"
        :src="`../../public/images/go-back-icon.svg`"
        alt=""
    /></RouterLink>
    <h1>Add new contact</h1>
    <div class="add-contact-container">
      <h3 class="label">Enter contact name</h3>
      <input v-model="name" type="text" placeholder="Enter new name" />
      <h3 class="label">Enter contact email</h3>
      <input v-model="email" type="text" placeholder="example@gmail.com" />
      <h3 class="label">Enter contact phone</h3>
      <input v-model="phone" type="text" placeholder="+972-8030492" />

      <div class="edit-actions">
        <button class="edit-contact-btn">
          <RouterLink :to="`/contact`"> Cancel </RouterLink>
        </button>
        <button @click="onAddContact" class="edit-contact-btn">Save</button>
      </div>
    </div>
  </section>
</template>

<script>
import { contactService } from "../services/contactService";
export default {
  data() {
    return {
      contact: null,
      name: "",
      email: "",
      phone: "",
    };
  },
  async created() {
    const _id = this.$route.params._id;
    if (_id) {
      const contact = await contactService.getContactById(_id);
      this.contact = contact;
      this.name = contact.name;
      this.email = contact.email;
      this.phone = contact.phone;
    }
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  },

  methods: {
    async onSaveContact() {
      this.contact.name = this.name;
      this.contact.email = this.email;
      this.contact.phone = this.phone;
      // await contactService.saveContact(this.contact);
      if (!this.name || !this.phone || !this.email) return;
      this.$store.dispatch({ type: "saveContact", contact: this.contact });
      this.$router.back();
    },

    async onAddContact() {
      if (!this.name || !this.phone || !this.email) return;

      const newContact = await contactService.getEmptyContact();
      newContact.name = this.name;
      newContact.email = this.email;
      newContact.phone = this.phone;
      this.$store.dispatch({ type: "saveContact", contact: newContact });
      // await contactService.saveContact(newContact);
      this.$router.back();
    },
  },
};
</script>

<style>
</style>