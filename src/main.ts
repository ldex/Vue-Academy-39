import './assets/main.css'

import { createApp, type ComponentPublicInstance } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')

// Global error handler
app.config.errorHandler = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error('Global error: ', errorMessage);
  console.error('Vue info: ', info);

  router.push({ name: 'error' });
};