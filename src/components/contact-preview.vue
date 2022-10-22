<template>
  <section class="contact-preview">
    <div class="flex">
      <div class="contact-image-preview">
        <img v-bind:src="getImgUrl" />
      </div>
      <div class="contact-info">
        <h3>{{ contact.name }}</h3>
        <span>{{ contact.email }}</span>
      </div>
    </div>
    <div class="contact-preview-actions">
      <button @click="onRemoveContact(contact._id)" >Remove</button>
      <button> <RouterLink v-bind:to="`/contact/${contact._id}`"> Details</RouterLink></button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      // contacts: []
    };
  },

  methods: {
    onRemoveContact(contactId){
            this.$emit('contact-removed', contactId)
    }
  },
  computed: {
    getImgUrl() {
      return `https://joeschmoe.io/api/v1/${this.contact._id}@ashallendesign.co.uk`;
    },
  },
};
</script>
