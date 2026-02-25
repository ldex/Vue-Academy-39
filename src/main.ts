import './assets/main.css'

import { createApp, type ComponentPublicInstance } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Registering all community features globally
ModuleRegistry.registerModules([ AllCommunityModule ]);

const app = createApp(App)

app.use(createPinia())
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