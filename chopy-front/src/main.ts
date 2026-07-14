import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  // Detectar FCP usando la API nativa del navegador
if (typeof window !== 'undefined') {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntriesByName('first-contentful-paint');
    if (entries.length > 0) {
      const fcp = entries[0].startTime;

      console.log(`⏱️ [chopy Performance] FCP: ${fcp.toFixed(2)} ms`);

      // Clasificación estándar de Google Lighthouse
      if (fcp < 1800) {
        console.log('🟢 Estado FCP: Bueno');
      } else if (fcp <= 3000) {
        console.log('🟡 Estado FCP: Necesita mejorar');
      } else {
        console.log('🔴 Estado FCP: Pobre');
      }

      observer.disconnect(); // Dejamos de observar una vez capturado
    }
  });

  // Registramos el observador para métricas de "paint"
  observer.observe({ type: 'paint', buffered: true });
}
