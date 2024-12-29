import ChatView from '@/views/ChatView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SigninView from '@/views/SigninView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView
    },
  ],
})

export default router
