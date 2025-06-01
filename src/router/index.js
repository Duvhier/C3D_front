import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Books from '../components/Books.vue';
import Authors from '../components/Authors.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    props: true
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 