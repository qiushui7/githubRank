declare global {
    interface Window {
        __INITIAL_STATE__?: any;
    }
}

import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
    const app = createSSRApp(App);
    return app;
}
