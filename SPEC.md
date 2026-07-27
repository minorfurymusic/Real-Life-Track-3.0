# Real Life Track 3.0 - Especificação Completa

## 🎯 Visão do Produto
App de saúde completo com foco em **experiência nativa mobile**, combinando tracking automatizado de atividades físicas, nutrição, sono, saúde feminina, bem-estar mental e social, com IA avançada para insights personalizados e gamificação.

**Diferencial:** Comunidade + Saúde íntima + Tracker completo em UM app.

---

## 📱 Funcionalidades por Categoria

### 1. 🚶 Saúde e Atividade (Nativo)

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Passos nativo** | Contador via HealthKit/Google Fit | 🔴 Alta |
| **Calorias ativas** | Baseado em passos e exercícios | 🔴 Alta |
| **Distância** | Quilômetros percorridos | 🔴 Alta |
| **Escadas** | ANDAR/subir planos detectados | 🟡 Média |
| **Correr/Dirigir** | Atividades aeróbicas detectadas | 🟡 Média |
| **Frequência cardíaca** | Com Apple Watch / Wear OS | 🟡 Média |
| **Saturacao O2** | Com dispositivos compatíveis | ⚪ Baixa |

### 2. 🍎 Nutrição

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Scanner de alimentos** | Câmera + IA para identificar alimentos | 🔴 Alta |
| **Banco de dados nutritional** | 1M+ alimentos (Open Food Facts API) | 🔴 Alta |
| **Registro de refeições** | Café, almoço, lanche, jantar | 🔴 Alta |
| **Água com reminders** | Notificações para beber água | 🔴 Alta |
| **Macros diarios** | Proteína, Carbs, Gordura, Fibra | 🔴 Alta |
| **Calorias automáticas** | Calculado baseado em metas | 🔴 Alta |
| **Código de barras** | Scanner paraindustrializados | 🟡 Média |
| **Receitas** | Criar e salvar receitas | ⚪ Baixa |

### 3. 💪 Exercícios

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Tracking de academia** | Séries, repetições, peso | 🔴 Alta |
| **Exercícios aeróbicos** | Corrida, Bike, Natação | 🔴 Alta |
| **Yoga e alongamento** | Temporizador + poses | 🟡 Média |
| **Treinos personalizados** | Criar rutinas | 🟡 Média |
| **Detecção automática** | Reconhece exercício iniciado | 🟡 Média |
| **Maps para corrida** | GPS + rotas | 🟡 Média |

### 4. 😴 Sono

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Horas dormidas** | Automático via acelerômetro | 🔴 Alta |
| **Qualidade do sono** | Leve/Profundo/REM | 🔴 Alta |
| **Hora de dormir** | Rotina noturna | 🟡 Média |
| **Alarme inteligente** | Acorda no melhor momento | 🟡 Média |
| **Relatório semanal** | Tendências de sono | ⚪ Baixa |

### 5. 🧠 Bem-estar Mental

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Check-in de humor** | Emoji diário + nota | 🔴 Alta |
| **Nível de estresse** | Baseado em HRV/questionário | 🟡 Média |
| **Meditação guiada** | Áudio + timer | 🟡 Média |
| **Exercícios de respiração** | 4-7-8, Box breathing | 🟡 Média |
| **Diário de gratidão** | 3 coisas boas por dia | ⚪ Baixa |

### 6. 💊 Dados Médicos

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Medicamentos** | Lista + lembretes | 🔴 Alta |
| **Pressão arterial** | Registro manual + BP cuff | 🔴 Alta |
| **Glicose no sangue** | Diabéticos | 🟡 Média |
| **Exames de sangue** | Resultados laboratoriais | 🟡 Média |
| **Consultas** | Agenda médica | 🟡 Média |
| **Vacinas** | Carteira de vacinação | ⚪ Baixa |
| **Alergias** | Lista + severidade | 🟡 Média |

### 7. 🤖 IA / Cérebro (NLP)

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Comandos de voz** | "Registrei 2 ovos" | 🔴 Alta |
| **Scanner de foto** | Tira foto do prato → conta macros | 🔴 Alta |
| **Análise de exames** | IA lê resultados de sangue | 🟡 Média |
| **Insights personalizados** | "Você dorme melhor com 7h" | 🔴 Alta |
| **Previsão de peso** | Tendência baseado em padrões | 🟡 Média |
| **Chatbot de saúde** | Perguntas sobre sintomas | 🟡 Média |

### 8. 🏆 Gamificação

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Conquistas/Badges** | Medalhas por metas | 🔴 Alta |
| **Streaks** | Dias consecutivos | 🔴 Alta |
| **Metas diárias** | Passos, água, exercício | 🔴 Alta |
| **Níveis XP** | Pontos por atividades | 🟡 Média |
| **Desafios** | Competições com amigos | ⚪ Baixa |

### 9. 📊 Dashboard

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Resumo do dia** | Tudo em uma tela | 🔴 Alta |
| **Gráficos de tendência** | 7/30/90 dias | 🔴 Alta |
| **Comparativo semanal** | Evolução | 🟡 Média |
| **Relatório mensal** | PDF para médico | ⚪ Baixa |
| **Exportar dados** | CSV/JSON | 🟡 Média |

### 10. 🔔 Notificações

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Lembretes de água** | A cada 1-2 horas | 🔴 Alta |
| **Hora de dormir** | Notificação noturna | 🔴 Alta |
| **Medicamentos** | Horários programados | 🔴 Alta |
| **Metas não batidas** | "Faltam 2k passos" | 🟡 Média |
| **Achievements** | Parabéns por conquistas | 🟡 Média |

### 11. 👥 Social/Comunidade

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Convidar amigos** | Link/código único | 🔴 Alta |
| **Compartilhar rede social** | Instagram, TikTok, Facebook | 🔴 Alta |
| **Leaderboard** | Rankings de passos/streaks | 🔴 Alta |
| **Desafios em grupo** | Competições semanais | 🔴 Alta |
| **Perfis públicos** | Ver progresso de amigos | 🟡 Média |
| **Grupos** | Emagrecimento, diabetes, etc | 🟡 Média |
| **Chat direto** | Mensagens entre amigos | ⚪ Baixa |

### 12. 🩸 Saúde Feminina (Ciclo Menstrual)

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Calendário menstrual** | Previsão de período | 🔴 Alta |
| **Janela fértil** | Para quem quer engravidar | 🔴 Alta |
| **Sintomas diários** | Cólicas, inchaço, TPM | 🔴 Alta |
| **Humor correlacionado** | Padrões pré-menstruação | 🔴 Alta |
| **Temperatura basal** | Fertilidade | 🟡 Média |
| **Peso/água** | Retenção hídrica | 🟡 Média |
| **Ovulação** | Sintomas de ovulação | 🟡 Média |
| **Desejo sexual** | Rastrear libido | ⚪ Baixa |

### 13. 🚽 Saúde Digestiva/Urinária

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Frequência urinária** | Vezes por dia | 🔴 Alta |
| **Cor da urina** | Escala visual (1-8) | 🔴 Alta |
| **Escala de Bristol** | 7 tipos de fezes | 🔴 Alta |
| **Consistência** | Diarreia/constipação | 🔴 Alta |
| **Sangue?** | Alerta vermelho | 🔴 Alta |
| **Dor/desconforto** | Escala 1-10 | 🟡 Média |
| **Gases** | Frequência/intensidade | ⚪ Baixa |
| **Hálito** | Manhã/dia todo | ⚪ Baixa |

### 14. 🤕 Saúde Geral/Dor

| Feature | Descrição | Prioridade |
|---------|-----------|------------|
| **Dor de cabeça** | Frequência + intensidade | 🔴 Alta |
| **Temperatura** | Febre tracking | 🔴 Alta |
| **Alergias** | Exposição a alérgenos | 🔴 Alta |
| **Pele** | Acne, eczema, feridas | 🟡 Média |
| **Cabelo** | Queda, oleosidade | 🟡 Média |
| **Unhas** | Qualidade, quebradiças | ⚪ Baixa |
| **Visão** | Óculos/uso lentes | ⚪ Baixa |
| **Audição** | Teste auditivo | ⚪ Baixa |

---

## 🔧 Stack Técnica

### Frontend
- **React Native** ou **Flutter** (recomendado Flutter para Performance)
- **Capacitor** para empacotamento

### Backend
- **Firebase** (Auth, Firestore, Functions)
- Ou **Supabase** (alternativa open-source)

### APIs Externas
- **Google Fit SDK**
- **Apple HealthKit**
- **Open Food Facts API**
- **Gemini API** para IA

### native Modules
```yaml
# pubspec.yaml (Flutter)
health_kit: ^2.0.0        # iOS HealthKit
health_connect: ^1.0.0    # Android Google Fit
pedometer: ^2.0.0         # Step counter
apple_sign_in: ^1.0.0     # Sign in with Apple
firebase_auth: ^4.0.0     # Auth
firebase_firestore: ^4.0  # Database
flutter_local_notifications: ^14.0  # Push notifications
camera: ^2.0.0            # Food scanner
google_mlkit_text_recognition: ^0.10  # OCR
```

---

## 📦 Monetização (Futuro)

| Plano | Preço | Features |
|-------|-------|----------|
| **Free** | R$0 | Core features, 100 scanner/mês |
| **Premium** | R$19.90/mês | Ilimitado, insights avançados |
| **Family** | R$29.90/mês | 5 membros, compartilhamento |

---

## ✅ Checklist MVP (3.0)

Para release inicial:

- [ ] Contador de passos nativo
- [ ] Registro de água
- [ ] Registro de refeições
- [ ] Dashboard com métricas
- [ ] Gamificação básica (streaks)
- [ ] Notificações
- [ ] Auth (Google/Apple)
- [ ] Onboarding IA
- [ ] Scanner de alimentos
- [ ] Medicamentos com reminders

---

## 📋 Estrutura de Pastas

```
Real-Life-Track-3.0/
├── SPEC.md
├── README.md
├── src/
│   ├── components/         # Componentes React Native
│   ├── screens/            # Telas do app
│   ├── services/           # APIs (HealthKit, Firebase, Gemini)
│   ├── hooks/              # Custom hooks
│   ├── context/            # Estado global
│   ├── utils/              # Funções auxiliares
│   ├── types/              # TypeScript types
│   └── assets/             # Imagens, fontes
├── android/               # Projeto Android (Capacitor)
├── ios/                   # Projeto iOS (Capacitor)
└── tests/                 # Testes
```
