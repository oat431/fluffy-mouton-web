# Fluffy Mounton Web

a url shortener Frontend built with React Typescript and DaisyUI

## Docker Deployment

This project includes a production-ready `Dockerfile` and `docker-compose.yml`.

1. Set your backend URL in `.env`:

```env
FLUMOU_API_URL=https://your-backend-host/api/v1
```

2. Build and run with Docker Compose:

```bash
docker compose up -d --build
```

3. Open the app at `http://localhost:3000`.
