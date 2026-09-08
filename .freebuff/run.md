# Portfolio Preview Run Doc

## Reproduce uncommitted artifacts
No special env files needed. The project uses no `.env` or secrets.
Dependencies are installed in `portfolio/node_modules/`.

## Run the server
```bash
cd portfolio && npm run dev
```
- Port: **5173** (Vite default)
- URL: **http://localhost:5173/**
- Detach on Windows: use PowerShell `Start-Process -FilePath 'npm.cmd'` with stdout/stderr split to log files.
