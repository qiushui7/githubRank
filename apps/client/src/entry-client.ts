import { createApp } from './main';
import { createVueRouter } from './router'
import './style.css'

const app = createApp()
const router = createVueRouter('client')

app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
