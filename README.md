# Proyecto Fullstack (Angular + Node.js)

Este repo trae el **backend listo** (Node.js) y el **esqueleto del frontend** (carpeta + comandos para generar Angular con CLI).

## Requisitos
- Node.js 20+ (tienes `node` instalado)
- Acceso a internet para descargar dependencias de npm (Angular/paquetes)

## Estructura
- `backend/`: API Node.js (sin dependencias externas)
- `frontend/`: aquí se generará la app Angular (con `npm run frontend:create`)
- `scripts/`: utilidades para ejecutar ambos

## Empezar

1) Backend (ya funciona sin instalar nada):
```bash
npm run backend:dev
```
Prueba:
```bash
curl http://localhost:3012/api/health
```

Si ves `listen EPERM`, es una restricción del entorno/sandbox donde estás ejecutando (en tu máquina normal debería funcionar).

2) Crear el frontend Angular (requiere internet):
```bash
npm run frontend:create
```

3) Instalar dependencias del frontend y levantarlo:
```bash
cd frontend
npm install
npm start
```

### anime.js (animación de transición)
Si vas a usar la animación inicial (incluida), instala la dependencia en el frontend:
```bash
npm --prefix frontend install
```

4) Levantar ambos a la vez:
```bash
npm run dev
```

## Nota sobre proxy (Angular -> Backend)
Cuando generes Angular, puedes usar `frontend/proxy.conf.json` (incluido) para redirigir `/api` a `http://localhost:3012`.
Luego arranca Angular con:
```bash
npm start -- --proxy-config proxy.conf.json
```
