# Real-Life-Track-3.0

## Rodar localmente no celular (Windows + Expo Go)

Comando do Jean para abrir o app no Android via Expo Go, rodando localmente no Windows (não neste ambiente remoto):

```
cd C:\Users\Jean\.gemini\antigravity-ide\scratch\Real-Life-Track-3.0
npx expo start --tunnel --clear
```

- `--tunnel`: permite abrir no celular mesmo em redes diferentes (celular não precisa estar na mesma Wi-Fi do PC).
- `--clear`: limpa o cache do Metro bundler antes de subir.
- Depois de rodar, escanear o QR code exibido no terminal com o app **Expo Go** (Android).
