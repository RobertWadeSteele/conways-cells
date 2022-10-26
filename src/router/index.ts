import { createRouter, createWebHistory } from 'vue-router'
import  ConwayView from '@/views/ConwayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'conway',
      component: ConwayView
    },
  ]
})

export default router