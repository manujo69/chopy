🗺️ Mapa Visual de la Architectura (Con server.ts)
El flujo de una petición inicial (por ejemplo, cuando el usuario entra por primera vez a ver el escaparate) sigue este camino exacto:

[ NAVEGADOR ] 
      │
      │ 1. Pide la página '/escaparate' (HTTP GET)
      ▼
┌────────────────────────────────────────────────────────────────────────┐
│ BACKEND (Tus dos servidores en ejecución)                             │
│                                                                        │
│  📁 chopy-front                                                        │
│     └── 📜 server.ts (El servidor Express de Angular SSR)              │
│              │                                                         │
│              │ 2. Intercepta la ruta, arranca el motor de Angular,     │
│              │    y este pide los datos a 'api/showcase'               │
│              ▼                                                         │
│  📁 chopy-back (El servidor Express del BFF)                           │
│        │                                                               │
│        │ 3. Consulta Base de Datos / Microservicios                    │
│        ▼                                                               │
│   [ Base de Datos ] ──(Devuelve Datos)──► [ BFF ] ──(Devuelve JSON)─┐  │
└─────────────────────────────────────────────────────────────────────┼──┘
                                                                      │
      ┌───────────────────────────────────────────────────────────────┘
      ▼
 📜 server.ts ──(Recibe JSON + Renderiza componentes a un String HTML)─┐
                                                                      │
      ┌───────────────────────────────────────────────────────────────┘
      ▼
[ NAVEGADOR ] 
      │ 4. Recibe ese HTML ya cocinado por server.ts (Pintado instantáneo)
      │ 5. Se descarga los JS de Angular e "Hidrata" la web (Se vuelve interactiva)
      │
      ▼ (Navegación posterior del usuario por la tienda)
[ Acción del Cliente ] ──(Pide JSON directo al BFF sin recargar página)──► [ BFF ]
🏢 Las Responsabilidades Actualizadas
1. El Servidor Visual (chopy-front)
El Orquestador: El archivo server.ts.

Misión: Es un servidor Express que actúa como el "anfitrión" en el backend. Cuando alguien pide una página, server.ts despierta al motor de Angular SSR, este hace las llamadas necesarias al BFF (chopy-back), introduce los datos en los componentes y server.ts envía el HTML resultante de vuelta al navegador.

2. El Servidor de Datos (chopy-back / BFF)
El Orquestador: Tu archivo index.ts (Express de Node).

Misión: No sabe qué es un componente, ni qué es server.ts, ni le importa el HTML. Solo espera que el servidor de Angular (o el propio navegador del usuario más adelante) le pida datos para escupir JSON puro.

Con server.ts en el mapa, ahora sí que se ve claro: es el intermediario en el backend que recibe al usuario y se comunica con tu BFF para masticar la página antes de entregarla. ¡Gracias por el aviso, ahora el resumen está completo!