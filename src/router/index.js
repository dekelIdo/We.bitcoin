import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import LoginSignup from '../views/login-signup.vue'
import ContactList from '../components/contact-list.vue'
import ContactDetails from '../components/contact-details.vue'
import ContactEdit from '../components/contact-edit.vue'
import TransferFunds from '../components/transfer-funds.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginSignup
    },
    {
      path: '/contact',
      component: ContactList
    },
    {
      path: '/contact/:_id',
      component: ContactDetails
    },
    {
      path: '/contact/TransferFunds/:_id',
      component: TransferFunds
    },
    {
      path: '/contact/edit/:_id?',
      component: ContactEdit
    },
    {
      path: '/home',
      component: Home
    },
  ]
})

export default router
