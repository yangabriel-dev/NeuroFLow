# 🚀 PROMPT PARA CRIAR APP DESKTOP - STUDY TRACKER FUTURÍSTICO

## RESUMO EXECUTIVO

Criar uma aplicação desktop (Windows/Mac/Linux) chamada **"NeuroFlow"** - um rastreador inteligente de rotina de estudos baseado em ciência cognitiva. O app deve ter design futurístico cyberpunk/neon, sistema de gamificação, e acompanhamento automático de progresso.

---

---

# 📋 ESPECIFICAÇÕES TÉCNICAS

## STACK RECOMENDADO

```
Frontend:
├─ React 18+ com TypeScript
├─ Tailwind CSS + Custom CSS
├─ Framer Motion (animações)
├─ Chart.js/Recharts (gráficos)
├─ Zustand (state management)
└─ React Router (navegação)

Desktop:
├─ Electron ou Tauri
└─ SQLite/better-sqlite3 (banco local)

Dev Stack:
├─ Vite (build)
├─ ESLint + Prettier
└─ TailwindCSS + DaisyUI
```

## PLATAFORMA ALVO
- Windows 10+
- macOS 10.13+
- Linux (Ubuntu 18+)

---

---

# 🎨 DESIGN SYSTEM (FUTURÍSTICO)

## PALETA DE CORES

```
Primária (Neon Cyan):
├─ #00D9FF (Cyan Brilhante)
├─ #0099CC (Cyan Escuro)
└─ Glow: rgba(0, 217, 255, 0.5)

Secundária (Purple/Magenta):
├─ #9D4EDD (Purple vibrante)
├─ #FF006E (Magenta)
└─ Glow: rgba(157, 78, 221, 0.4)

Neutros (Dark Cyberpunk):
├─ #0a0e27 (Preto profundo - Background)
├─ #1a1f3a (Cinza muito escuro - Cards)
├─ #2d3561 (Cinza escuro - Hover)
├─ #e8e8e8 (Branco - Texto)
└─ #a0aec0 (Cinza claro - Texto secundário)

Sucesso:
├─ #00ff41 (Verde neon)
├─ Glow: rgba(0, 255, 65, 0.6)

Aviso:
├─ #ffa500 (Laranja)
├─ Glow: rgba(255, 165, 0, 0.5)

Erro:
├─ #ff0055 (Vermelho neon)
├─ Glow: rgba(255, 0, 85, 0.6)
```

## TIPOGRAFIA

```
Headings (H1-H3):
├─ Font: "Inter Bold" ou "IBM Plex Mono Bold"
├─ Tamanho: H1=32px, H2=24px, H3=18px
├─ Letra-espaçamento: 1px (futurístico)
├─ Efeito: Text-shadow neon opcional
└─ Color: #00D9FF (cyan) para títulos principais

Body (Parágrafo):
├─ Font: "Inter" ou "Roboto"
├─ Tamanho: 14-16px
├─ Line-height: 1.6
├─ Color: #e8e8e8
└─ Pesos: Regular (400), Medium (500), Bold (700)

Monospace (Código/Números):
├─ Font: "Courier New" ou "IBM Plex Mono"
├─ Tamanho: 12-14px
└─ Color: #00ff41 (verde neon)
```

## COMPONENTES VISUAIS

### Botões
```
Style: Glassmorphism + Neon Border
├─ Background: rgba(0, 217, 255, 0.1)
├─ Border: 1px solid #00D9FF
├─ Border-radius: 8px
├─ Padding: 12px 24px
├─ Transition: 200ms ease
├─ Hover: 
│  ├─ Background: rgba(0, 217, 255, 0.2)
│  ├─ Box-shadow: 0 0 20px rgba(0, 217, 255, 0.6)
│  └─ Transform: scale(1.02)
├─ Active:
│  ├─ Box-shadow: 0 0 30px rgba(0, 217, 255, 0.8)
│  └─ Transform: scale(0.98)
└─ Font-weight: 600
```

### Cards
```
Style: Glassmorphism + Gradient Border
├─ Background: rgba(26, 31, 58, 0.6)
├─ Backdrop-filter: blur(10px)
├─ Border: 1px solid rgba(0, 217, 255, 0.3)
├─ Border-radius: 12px
├─ Padding: 16px
├─ Box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3)
├─ Hover:
│  ├─ Border-color: rgba(0, 217, 255, 0.6)
│  └─ Box-shadow: 0 0 20px rgba(0, 217, 255, 0.2)
└─ Transition: 300ms ease
```

### Input Fields
```
Style: Neon Focus + Glassmorphism
├─ Background: rgba(0, 0, 0, 0.3)
├─ Border: 1px solid rgba(157, 78, 221, 0.3)
├─ Border-radius: 8px
├─ Padding: 10px 16px
├─ Color: #e8e8e8
├─ Focus:
│  ├─ Border-color: #00D9FF
│  ├─ Box-shadow: 0 0 15px rgba(0, 217, 255, 0.5)
│  └─ Background: rgba(0, 217, 255, 0.05)
└─ Placeholder: #a0aec0
```

### Progress Bars
```
Style: Neon Gradient
├─ Background: rgba(0, 0, 0, 0.5)
├─ Border-radius: 10px
├─ Height: 8px
├─ Filled: Linear-gradient(90deg, #00D9FF, #9D4EDD)
├─ Box-shadow: 0 0 10px rgba(0, 217, 255, 0.6)
└─ Animation: Smooth transition
```

## ANIMAÇÕES

```
Entrando:
├─ Fade-in: 300ms
├─ Slide-up: 400ms + 100ms delay
└─ Stagger children: 50ms cada

Hover Effects:
├─ Glow: Box-shadow animado
├─ Scale: 1.02x para botões/cards
└─ Color shift: Transição suave de cor

Loading:
├─ Spinner: Rotação infinita
├─ Skeleton: Gradient shimmer
└─ Pulse: Opacity pulsante

Sucesso:
├─ Checkmark: Scale + rotate
├─ Confetti: Celebração com particles
└─ Toast notification: Slide-in + fade-out

Erro:
├─ Shake: Movimento lateral
├─ Fade: Slow fade-out
└─ Color flash: Vermelho quick flash
```

---

---

# 📱 INTERFACE & LAYOUT

## TELA PRINCIPAL (Dashboard)

### Layout Grid
```
┌─────────────────────────────────────────┐
│  LOGO | NeuroFlow          [⚙️] [👤]   │  ← Header (80px)
├─────────────────────────────────────────┤
│ SIDEBAR │                               │
│         │    MAIN CONTENT AREA          │
│ Home    │    (80% da tela)              │
│ Rotina  │                               │
│ Métodos │                               │
│ Stats   │                               │
│ Config  │                               │
└─────────────────────────────────────────┘

Sidebar: 240px fixed (dark)
Main: Flex, com scroll
Header: Fixed top
```

### Componentes do Dashboard

**1. CARD DE BOAS-VINDAS (Topo)**
```
┌──────────────────────────────────────┐
│  🧠 Bem-vindo, [Nome do Usuário]!   │
│                                      │
│  Streak: 🔥 5 dias                  │
│  Hoje: 2.5h / 6h planejado          │
│  Próximo: Loops (20 min)            │
│                                      │
│        [COMEÇAR SESSÃO] >>>          │
└──────────────────────────────────────┘
```

**2. ROTINA DO DIA (Principal)**
```
┌─────────────────────────────────────────┐
│  📅 Rotina de Hoje - Segunda-feira      │
├─────────────────────────────────────────┤
│                                         │
│ ☐ 09:00-09:30                         │
│   Feynman Technique - Loops            │
│   ▓▓▓░░░░░░ 30%                        │
│   15 min completados                   │
│   [CONTINUAR] [✓ PRONTO]              │
│                                         │
│ ☑ 09:30-10:00                         │
│   Elaborative Interrogation - Loops    │
│   ▓▓▓▓▓▓▓▓▓▓ 100% ✓                    │
│   30 min completados                   │
│   Tempo extra: +2 min                  │
│                                         │
│ ☐ 10:00-11:30                         │
│   Active Recall + Beecrowd             │
│   ░░░░░░░░░░ 0%                        │
│   90 min planejados                    │
│   [COMEÇAR] [⊕ ADICIONAR]             │
│                                         │
└─────────────────────────────────────────┘

Cada item clicável:
├─ Expand para detalhes
├─ Timer ativável
├─ Notas adicionáveis
└─ Delete/Edit options
```

**3. TIMER ATIVO (Quando sessão começada)**
```
┌──────────────────────────────┐
│   🎯 Sessão Ativa            │
├──────────────────────────────┤
│                              │
│       25:47                  │
│     (Pomodoro 25min)         │
│                              │
│   Active Recall - Beecrowd   │
│   Loops Tema                 │
│                              │
│   ▓▓▓▓▓▓▓░░░░░░ 60%         │
│                              │
│  [⏸ PAUSAR] [✓ CONCLUIR]     │
│  [🔴 DESISTIR]               │
│                              │
└──────────────────────────────┘

Floating no canto inferior direito
Clicável para expandir
Som/notificação ao terminar
```

---

## TELA DE ESTATÍSTICAS (Stats)

### Gráficos
```
1. HORAS ESTUDADAS (Semana)
   ┌────────────────────────┐
   │ Gráfico de barras neon │
   │ Seg: 6h                │
   │ Ter: 5.5h              │
   │ Qua: 7h                │
   │ ...                    │
   └────────────────────────┘

2. MÉTODOS MAIS USADOS (Pizza)
   ┌────────────────────────┐
   │ Active Recall: 35%     │
   │ Feynman: 25%           │
   │ Spaced Rep: 20%        │
   │ Interleaving: 20%      │
   └────────────────────────┘

3. STREAK CALENDAR
   ┌────────────────────────┐
   │ Calendário com cells  │
   │ preenchidos (verde)   │
   │ para cada dia com     │
   │ estudo                │
   └────────────────────────┘

4. RESUMO ESTATÍSTICO
   ├─ Total estudado: 45.5h
   ├─ Média diária: 6.5h
   ├─ Melhor dia: 7.5h
   ├─ Streak atual: 5 dias
   ├─ Maior streak: 15 dias
   └─ Exercícios feitos: 157
```

---

## TELA DE GERENCIAMENTO DE ROTINA

### Editar Rotina
```
┌─────────────────────────────────────┐
│  ⚙️ Configurar Rotina               │
├─────────────────────────────────────┤
│                                     │
│ 📅 Selecione o período:            │
│ ○ 2º Período (Semanas 1-16)        │
│ ○ 3º Período (Semanas 1-16)        │
│ ○ Customizado                      │
│                                     │
│ ⏰ Duração da sessão:               │
│ [___] min (recomendado: 90-120)    │
│                                     │
│ 📊 Distribuição de métodos:        │
│ • Feynman: [====] 25%              │
│ • Active Recall: [========] 50%    │
│ • Interleaving: [====] 20%         │
│ • Spaced Rep: [===] 5%             │
│                                     │
│ 🎯 Metas:                          │
│ • Horas/dia: [6] h                 │
│ • Exercícios/semana: [50] ex       │
│ • Projetos/mês: [1] projeto        │
│                                     │
│ [SALVAR] [CANCELAR]                │
│                                     │
└─────────────────────────────────────┘
```

---

## TELA DE MÉTODOS (Educacional)

### Galeria de Métodos
```
┌──────────────────────────────────────┐
│  🧠 Métodos de Aprendizado          │
├──────────────────────────────────────┤
│                                      │
│  [FEYNMAN] [ACTIVE RECALL]          │
│  [SPACED REP] [INTERLEAVING]        │
│  [ELABORATION] [DUAL CODING]        │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │ 🎯 MÉTODO FEYNMAN               │ │
│ │                                 │ │
│ │ Explique em termos simples      │ │
│ │                                 │ │
│ │ Eficácia: ⭐⭐⭐⭐⭐            │ │
│ │ Quando usar: Conceitos novos    │ │
│ │                                 │ │
│ │ [LEIA MAIS] [COMEÇAR]          │ │
│ └─────────────────────────────────┘ │
│                                      │
│ (Cards similares para outros)       │
│                                      │
└──────────────────────────────────────┘

Click em método:
├─ Detalhe completo
├─ Como usar
├─ Exemplos práticos
├─ Pesquisas científicas
└─ Começar sessão com esse método
```

---

## MODAL: COMEÇAR NOVA SESSÃO

```
┌────────────────────────────────────────┐
│  🚀 NOVA SESSÃO DE ESTUDO             │
├────────────────────────────────────────┤
│                                        │
│ 📚 Selecione o Tópico:                │
│ ┌──────────────────────────┐          │
│ │ Loops ▼                  │          │
│ └──────────────────────────┘          │
│                                        │
│ 🎯 Escolha o Método:                  │
│ ○ Feynman Technique                   │
│ ○ Active Recall                       │
│ ○ Spaced Repetition                   │
│ ○ Auto (recomendado)                  │
│                                        │
│ ⏱️ Duração:                            │
│ [___] minutos (default: 90)           │
│                                        │
│ 📝 Notas Iniciais:                    │
│ ┌──────────────────────────┐          │
│ │ Estudando loops, será   │          │
│ │ prática no Beecrowd     │          │
│ └──────────────────────────┘          │
│                                        │
│ [🚀 COMEÇAR] [CANCELAR]               │
│                                        │
└────────────────────────────────────────┘
```

---

---

# 🎮 GAMIFICAÇÃO

## SISTEMA DE PONTOS & ACHIEVEMENTS

### XP Points
```
Ação                    → XP Ganho
────────────────────────────────
Completar 25min         → 50 XP
Completar 50min         → 120 XP
Usar Feynman            → +20 XP
Active Recall perfeito  → +30 XP
5-dia streak           → +100 XP
Projeto completado      → +500 XP

Level Up a cada 1000 XP
└─ Unlock badges/features
```

### Badges (Achievements)
```
🏅 Iniciante          - 1º estudo
🔥 Fire Starter      - 3-dia streak
💎 Diamond Study     - 10-dia streak
🚀 Speed Learner     - 100 exercícios
🧠 Master Mind       - Usar todos os métodos
🌟 Perfect Week      - 6 dias completos
📚 Knowledge Master  - 50h estudadas
🎯 Goal Crusher      - 3 metas alcançadas
```

### Visualização de Progresso
```
┌─────────────────────────────┐
│ Level 5 - Programador Junior│
│                             │
│ ▓▓▓▓▓▓░░░░░░░░░░░░░░░░     │
│ 650 / 1000 XP para Level 6  │
│                             │
│ [🏅] [🏅] [🏅] [⬜]         │
│ Badges desbloqueados        │
│                             │
└─────────────────────────────┘
```

---

---

# 💾 ESTRUTURA DE DADOS

## Banco de Dados Local (SQLite)

```sql
USERS TABLE
├─ id (PRIMARY KEY)
├─ name TEXT
├─ email TEXT UNIQUE
├─ created_at DATETIME
├─ current_level INT
├─ total_xp INT
├─ total_hours FLOAT
└─ streak_count INT

ROUTINES TABLE
├─ id (PRIMARY KEY)
├─ user_id (FOREIGN KEY)
├─ name TEXT
├─ period TEXT (2nd/3rd)
├─ created_at DATETIME
└─ is_active BOOLEAN

SESSIONS TABLE
├─ id (PRIMARY KEY)
├─ routine_id (FOREIGN KEY)
├─ topic TEXT
├─ method TEXT (feynman/active_recall/etc)
├─ start_time DATETIME
├─ end_time DATETIME
├─ duration_minutes INT
├─ completed BOOLEAN
├─ notes TEXT
├─ xp_earned INT
└─ created_at DATETIME

TASKS TABLE
├─ id (PRIMARY KEY)
├─ routine_id (FOREIGN KEY)
├─ title TEXT
├─ time_slot TEXT (09:00-09:30)
├─ method TEXT
├─ estimated_duration INT
├─ order INT
├─ is_completed BOOLEAN
└─ completed_at DATETIME

ACHIEVEMENTS TABLE
├─ id (PRIMARY KEY)
├─ user_id (FOREIGN KEY)
├─ badge_name TEXT
├─ earned_at DATETIME
└─ xp_reward INT

STATISTICS TABLE
├─ user_id (FOREIGN KEY)
├─ study_date DATE
├─ hours_studied FLOAT
├─ sessions_completed INT
├─ exercises_done INT
└─ xp_earned INT
```

---

---

# 🔧 FUNCIONALIDADES PRINCIPAIS

## 1. DASHBOARD & HOME
- [x] Visualizar rotina do dia
- [x] Timer Pomodoro/customizado
- [x] Marcar tarefas como concluídas
- [x] Visualizar próximas tarefas
- [x] Resumo de progresso diário
- [x] Botão quick-start para nova sessão

## 2. GERENCIAMENTO DE ROTINA
- [x] Criar/editar rotina customizada
- [x] Copiar rotina existente (2º/3º período)
- [x] Definir duração das sessões
- [x] Escolher métodos prioritários
- [x] Definir metas diárias/semanais
- [x] Agendar rotina para semanas específicas

## 3. TIMER & SESSÕES
- [x] Timer Pomodoro (25min)
- [x] Timer customizado
- [x] Pausa/retomar
- [x] Notificação ao terminar
- [x] Som customizável
- [x] Auto-save de tempo estudado
- [x] Opção "Adicionar tempo extra"

## 4. ESTATÍSTICAS & ANALYTICS
- [x] Horas estudadas (dia/semana/mês)
- [x] Gráficos de progresso
- [x] Métodos mais usados
- [x] Streak atual/histórico
- [x] Exercícios completados
- [x] XP ganho
- [x] Calendar view

## 5. GAMIFICAÇÃO
- [x] Sistema de XP pontos
- [x] Levels (1-50)
- [x] Badges/achievements
- [x] Leaderboard pessoal (histórico)
- [x] Notificações de unlock
- [x] Visual de progresso

## 6. EDUCAÇÃO (Integrado)
- [x] Galeria de métodos
- [x] Descrição detalhada (Feynman, Active Recall, etc)
- [x] Quando usar cada método
- [x] Exemplos práticos
- [x] Links para pesquisas
- [x] Video tutorials (links externos)

## 7. CONFIGURAÇÕES
- [x] Tema (Dark/Light - default dark com neon)
- [x] Notificações (ativar/desativar)
- [x] Som customizável
- [x] Idioma (PT-BR/EN)
- [x] Pasta de backup (exportar dados)
- [x] Resetar dados
- [x] Sobre o app

## 8. IMPORTAR/EXPORTAR
- [x] Exportar rotina em JSON
- [x] Importar rotina de arquivo
- [x] Backup automático
- [x] Sincronização nuvem (opcional)

---

---

# 🎯 FLUXOS PRINCIPAIS (UX)

## FLUXO 1: Começar Sessão

```
HOME
  ↓
[COMEÇAR SESSÃO]
  ↓
MODAL: Selecionar tópico/método
  ↓
TIMER ATIVO (floating)
  ↓
Usar Notebook LM / Beecrowd / etc (paralelo)
  ↓
[✓ CONCLUIR] ou [⏸ PAUSAR]
  ↓
RESUMO: Tempo total, XP ganho, Checkpoint salvo
  ↓
HOME atualizada
```

## FLUXO 2: Marcar Tarefa Concluída

```
TAREFA NA ROTINA
  ↓
Click/checkbox [☐]
  ↓
MODAL: Confirmar conclusão?
  ├─ [Tempo atual]
  ├─ [XP ganho] +50
  └─ [Salvar notas?]
  ↓
[✓ CONCLUIR]
  ↓
ANIMAÇÃO: Checkmark + confetti
  ↓
XP adicionado
  ↓
TAREFA vira [☑] (green checkmark)
```

## FLUXO 3: Consultar Estatísticas

```
HOME → MENU → STATS
  ↓
TELA STATS (gráficos/números)
  ↓
Click em gráfico → Detalhe (modal)
  ↓
Visualizar breakdown
  ↓
BACK → HOME
```

---

---

# 📐 RESPONSIVIDADE & LAYOUT

## Breakpoints
```
Desktop: 1920px+ (desktop app principal)
Laptop: 1440px (default)
Notebook: 1024px (caso rode em tela pequena)
Mínimo: 800px (não otimizado para celular)
```

## Layout Principal
```
Sidebar fixo: 240px
Conteúdo: calc(100% - 240px)
Padding: 20px em todos os containers
Gaps: 16px entre componentes
Max-width conteúdo: 1400px
```

---

---

# 🚀 IMPLEMENTAÇÃO RECOMENDADA

## Fase 1: MVP (Semana 1-2)
- [x] Setup projeto (Electron + React + Tailwind)
- [x] Banco de dados SQLite
- [x] Tela Home com tarefas
- [x] Timer básico
- [x] Marcar tarefas concluídas
- [x] Design futurístico minimal

## Fase 2: Funcionalidades (Semana 3)
- [x] Rotinas customizadas
- [x] Estatísticas básicas
- [x] Sistema XP
- [x] Notificações

## Fase 3: Polish (Semana 4)
- [x] Animações Framer Motion
- [x] Badges/Achievements
- [x] Gráficos bonitos
- [x] Dark mode refinado
- [x] Build final (empacotamento)

---

---

# 📝 EXEMPLO PROMPT PARA AI CODE GENERATOR

Se usar Claude/ChatGPT para gerar código:

```
Crie um app desktop com Electron + React + TypeScript.

REQUISITOS:
1. Nome: NeuroFlow
2. Design: Futurístico cyberpunk com cores neon (#00D9FF cyan, #9D4EDD purple)
3. Paleta: Fundo #0a0e27, cards rgba(26, 31, 58, 0.6), glassmorphism
4. Componentes: Buttons com neon border + glow, Cards com blur, Inputs com neon focus

TELAS PRINCIPAIS:
1. Dashboard: Rotina do dia, timer, streak
2. Stats: Gráficos horas/exercícios, streak calendar, badges
3. Rotina: Gerenciar tarefas, métodos, metas
4. Métodos: Galeria educacional
5. Settings: Configurações

FUNCIONALIDADES:
- Timer (Pomodoro + customizado)
- Marcar tarefas como concluídas
- Animações suaves (Framer Motion)
- XP + Levels
- Banco SQLite local
- Notificações
- Exportar/importar rotina JSON

ESTRUTURA PASTAS:
src/
├─ components/
│  ├─ Dashboard/
│  ├─ TaskItem/
│  ├─ Timer/
│  ├─ Stats/
│  └─ ...
├─ pages/
├─ store/ (Zustand)
├─ services/ (SQLite)
├─ styles/ (Tailwind config)
└─ App.tsx

Comece com MVP: Home + Timer + Marcar concluído. Use TypeScript, funcionalidade > perfeccionismo inicial.
```

---

---

# 🎨 EXEMPLOS DE COMPONENTES

## Componente: TaskItem

```jsx
interface TaskItemProps {
  id: string;
  time: string;
  title: string;
  method: string;
  progress: number;
  completed: boolean;
  onComplete: () => void;
  onStart: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({...}) => {
  return (
    <div className="group">
      {/* Card glassmorphism com neon border */}
      <div className="relative overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl 
                     transition-all duration-300 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20">
        
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <input 
                type="checkbox" 
                checked={completed}
                className="mt-1 accent-cyan-500" 
              />
              <div>
                <p className="text-sm text-cyan-400 font-mono">{time}</p>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="text-sm text-gray-400">{method}</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/50 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2 justify-end">
            <button className="neon-button">Começar</button>
            <button className="neon-button-secondary">Pronto</button>
          </div>
        </div>

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 -z-10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                       blur-xl shadow-lg shadow-cyan-500/20" />
      </div>
    </div>
  );
};
```

## Componente: NeonButton

```jsx
const NeonButton: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'border-cyan-500 text-cyan-400 hover:shadow-cyan-500/50',
    secondary: 'border-purple-500 text-purple-400 hover:shadow-purple-500/50',
    success: 'border-lime-500 text-lime-400 hover:shadow-lime-500/50',
  };

  return (
    <button
      className={`
        relative px-6 py-2 font-bold
        border rounded-lg transition-all duration-200
        bg-slate-900/40 backdrop-blur-xl
        ${variants[variant]}
        hover:bg-slate-900/60
        hover:shadow-lg active:scale-95
        transform hover:scale-105
      `}
      {...props}
    >
      {children}
      <span className="absolute inset-0 -z-10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000" />
    </button>
  );
};
```

---

---

# 📦 CHECKLIST FINAL

## Design
- [ ] Paleta de cores neon definida
- [ ] Tipografia escolhida
- [ ] Componentes base criados
- [ ] Figma/mockup pronto (opcional)

## Funcionalidade
- [ ] Banco SQLite funcionando
- [ ] CRUD de tarefas
- [ ] Timer funcional
- [ ] Cálculo de XP
- [ ] Backup/exportação
- [ ] Notificações

## Integração
- [ ] Rotina do 2º período
- [ ] Rotina do 3º período
- [ ] Métodos educacionais
- [ ] Dicas de ciência cognitiva

## Polish
- [ ] Animações suaves
- [ ] Sem lag/bugs
- [ ] Performance otimizada
- [ ] Build empacotado (.exe, .app, .AppImage)

---

**Este prompt é completo e profissional. Pode ser usado com:**
- Claude/ChatGPT (com custom instructions)
- GitHub Copilot
- Aider (AI pair programming)
- Perplexity
- Ou como guia para desenvolvimento manual

Boa codificação! 🚀
