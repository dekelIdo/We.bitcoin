
<template>
  <div class="contact-page">
    <h1>Your contact zone</h1>
    <div class="filter-for-mobile">
          <ContactFilter @filter="onFilter" />
    </div>
    <div class="main-content">
      <div class="left-container">
        <div class="filter-left-container">
          <div class="filter-title">
            <h3>Search for your friends by their names easily</h3>
            <h4>For your good feeling...</h4>
          </div>
          <ContactFilter @filter="onFilter" />
        </div>
        <div class="filter-right-container">
          <div class="filter-title">
            <h3>Open to add more friends?</h3>
            <h2>Do it here quickly</h2>
          </div>
          <RouterLink :to="`/contact/edit`">
            <button class="add-contact-btn">+ Add contact</button>
          </RouterLink>
        </div>
      </div>
<TransitionGroup name="list" tag="ul">

      <div class="contact-list">
        <section v-for="contact in contactsToShow" v-bind:key="contact._id">
          <contact-preview
            @contact-removed="onRemoveContact"
            v-bind:contact="contact"
          />
        </section>
      </div>
</TransitionGroup>

    </div>
  </div>
</template>

<script>
import { contactService } from "../services/contactService";
import contactPreview from "./contact-preview.vue";
import ContactFilter from "./contact-filter.vue";

export default {
  components: { contactPreview, ContactFilter },
  data() {
    return {
      // contacts: [],
      filterBy: {},
    };
  },
  computed: {
    contactsToShow() {
      const regex = new RegExp(this.filterBy.name, "i");
      return this.contacts.filter((contact) => regex.test(contact.name));
    },
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  async created() {
    // this.getContacts();
    this.$store.dispatch({ type: "loadContacts" });
    console.log("contacts:", this.contacts);
  },

  methods: {
    async getContacts() {
      try {
        const contacts = await contactService.getContacts();
        this.contacts = contacts;
      } catch (err) {
        console.log("err:", err);
      }
    },

    onFilter(filterBy) {
      this.filterBy = filterBy;
    },

    onRemoveContact(contactId) {
      this.$store.dispatch({ type: "removeContact", contactId });
    },
  },
};
</script>
