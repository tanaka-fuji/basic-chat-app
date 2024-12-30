import ChatView from '@/views/ChatView.vue'
import NameView from '@/views/NameView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/name',
      name: 'name',
      component: NameView,
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

router.beforeEach((to, from, next) => {
  const username = localStorage.getItem('username');
  if (to.name === 'name') {
    if (username) next({ name: 'chat' });
    else next();
  } 
  else {
    if (username) next();
    else next({ name: 'name' })
  }
});

export default router
