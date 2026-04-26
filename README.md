# 🍹 Frajola Drinks — Landing Page

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)

> Landing page completa e responsiva para uma marca de drinks artesanais.  
> Projeto real desenvolvido do zero com HTML, CSS e JavaScript puros — sem frameworks.

> link do projeto: https://frajola-drinks.vercel.app/
---

## 📸 Visão Geral

O site apresenta o cardápio, prova social com fotos reais, timeline de eventos e chamadas para ação via WhatsApp e Instagram. Todo o design segue um tema escuro (dark theme) com identidade visual em vermelho.

---

## ✨ Funcionalidades

- [x] Navbar responsiva com menu hambúrguer e scroll inteligente
- [x] Hero section com animação de entrada sequencial (GSAP)
- [x] Efeito 3D de inclinação nos cards ao mover o mouse (GSAP tilt)
- [x] Ticker de ingredientes com scroll infinito em CSS puro
- [x] Seção Fresh com cards e partículas flutuantes
- [x] Mural de fotos com efeito hover (escala + borda + overlay)
- [x] Contador de números animado ao entrar na tela (IntersectionObserver)
- [x] Timeline de eventos com linha animada
- [x] Animações de scroll (AOS — Animate On Scroll)
- [x] Footer com links, logo e crédito do desenvolvedor
- [x] Favicon personalizado
- [x] Design 100% responsivo (6 breakpoints)

---

## 🗂️ Estrutura do Projeto

```
Frajola Drinks/
│
├── index.html               ← única página HTML (SPA)
│
└── assets/
    ├── css/
    │   ├── style.css        ← ponto de entrada: só @imports em ordem
    │   ├── variables.css    ← cores, tamanhos e tokens de design
    │   ├── global.css       ← reset do browser + estilos base
    │   ├── navbar.css       ← barra de navegação + menu mobile
    │   ├── hero.css         ← seção principal (título, logo, drinks)
    │   ├── features.css     ← cards de diferenciais
    │   ├── drinks.css       ← cards de drinks com álcool
    │   ├── fresh.css        ← cards da linha fresh (sem álcool)
    │   ├── feedbacks.css    ← mural de fotos, stats, timeline, CTA
    │   └── contato.css      ← seção de contato + footer
    │
    ├── js/
    │   ├── hero-entrance.js ← animação de entrada do hero (GSAP)
    │   ├── navbar.js        ← lógica do menu hambúrguer
    │   ├── animations.js    ← inicializa o AOS (Animate On Scroll)
    │   ├── cards.js         ← efeito tilt 3D nos dois tipos de card
    │   └── feedbacks.js     ← contador animado com IntersectionObserver
    │
    └── images/
        ├── frajola-logo.png
        ├── herodrinks.png
        ├── drink-1~3.png
        ├── fresh-1~3.png
        └── feedback1~12.png
```

**Por que separar o CSS em vários arquivos?**  
Cada arquivo tem uma responsabilidade clara. Se um estilo do footer está errado, você vai direto em `contato.css`. Em projetos maiores, isso vira padrão de mercado (arquitetura modular).

---

## 🧠 Conceitos Aplicados

### 🎨 CSS

#### Custom Properties (Variáveis CSS)
```css
/* variables.css */
:root {
  --clr-red:   #cc0000;
  --clr-green: #3ddc84;
  --max-width: 1280px;
}
```
> **Por quê?** Se o cliente quiser mudar a cor vermelha do site inteiro, você altera **uma linha** em `variables.css` em vez de procurar `#cc0000` em 1546 linhas de CSS.

---

#### CSS Grid e Flexbox
| Situação | Solução |
|---|---|
| Layout de 3 colunas (hero) | `grid-template-columns: 1fr auto 1fr` |
| Grade de cards (drinks) | `grid-template-columns: repeat(3, 1fr)` |
| Alinhamento horizontal (navbar) | `display: flex; align-items: center` |
| Distribuição de itens (features) | `justify-content: space-between` |

> **Regra prática:** use **Grid** para layouts bidimensionais (linhas + colunas) e **Flexbox** para alinhamento em uma direção só.

---

#### Tipografia Fluida com `clamp()`
```css
font-size: clamp(38px, 5.5vw, 72px);
/*              mínimo  ideal  máximo */
```
> O tamanho cresce automaticamente com a tela, sem precisar de `@media query` para cada caso. `5.5vw` = 5.5% da largura da janela.

---

#### Animações CSS Puras
```css
/* Ticker de ingredientes */
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.drinks__ticker-track {
  animation: ticker 22s linear infinite;
}
```
> O conteúdo do ticker é **duplicado no HTML** para criar o loop contínuo. Quando o primeiro bloco sai pela esquerda, o segundo já está no lugar certo.

---

#### BEM — Block Element Modifier
```css
/* Block */     .drink-card { }
/* Element */   .drink-card__name { }
/* Modifier */  .drink-card--featured { }
```
> É uma **convenção de nomenclatura** que torna o CSS auto-documentado. Ao ver `.drink-card__name`, você sabe exatamente que é o nome dentro do card de drink.

---

#### Responsividade com Breakpoints
```css
/* Os 6 pontos de quebra usados no projeto */
@media (max-width: 1024px) { /* tablet largo  */ }
@media (max-width:  900px) { /* tablet        */ }
@media (max-width:  768px) { /* tablet retrato*/ }
@media (max-width:  580px) { /* mobile grande */ }
@media (max-width:  480px) { /* mobile pequeno*/ }
@media (max-width:  380px) { /* mobile mínimo */ }
```

---

### ⚡ JavaScript

#### IntersectionObserver (feedbacks.js)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target); // só roda quando aparece na tela
      observer.unobserve(entry.target); // para de observar depois
    }
  });
}, { threshold: 0.6 });
```
> **Por que não usar `window.addEventListener('scroll')`?**  
> O evento `scroll` dispara centenas de vezes por segundo enquanto o usuário rola. O `IntersectionObserver` é nativo do browser, eficiente e só chama o callback quando necessário.

---

#### GSAP — Animação de Entrada (hero-entrance.js)
```javascript
// Define estado INICIAL antes do browser pintar (evita flash)
gsap.set('.hero__title', { autoAlpha: 0, y: -50 });

// Cria uma sequência de animações
const tl = gsap.timeline({ delay: 0.15 });

tl
  .to('.hero__title',   { autoAlpha: 1, y: 0, duration: 1.0 })
  .to('.hero__subtitle',{ autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.55');
  //                                                              ^
  //                               começa 0.55s antes do anterior terminar
```
> `autoAlpha` é uma propriedade especial do GSAP que controla `opacity` + `visibility` juntos.  
> O `-=0.55` no segundo `.to()` significa "começa 0.55s antes de o elemento anterior terminar", criando o efeito de sobreposição na sequência.

---

#### Efeito Tilt 3D (cards.js)
```javascript
function initTiltEffect(selector, maxTilt) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 a 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      gsap.to(card, { rotateY: x * maxTilt * 2, rotateX: -y * maxTilt * 2 });
    });
  });
}

initTiltEffect('.drink-card', 10); // reutilizado para os dois tipos de card
```
> O eixo é normalizado entre `-0.5` e `0.5` dividindo pela dimensão do card. Isso garante que o efeito funciona independente do tamanho do elemento na tela.

---

#### Padrão Módulo — Funções Reutilizáveis
> Em vez de copiar e colar o mesmo código em `drinks.js` e `fresh.js` (como estava antes), o código foi refatorado para uma única função `initTiltEffect(selector, maxTilt)` que funciona para qualquer seletor. Isso é o princípio **DRY** — *Don't Repeat Yourself*.

---

### 🖥️ UX/UI

| Decisão | Motivo |
|---|---|
| Dark theme | Contraste alto, visual premium para bebidas |
| Vermelho `#cc0000` | Urgência, energia, apetite (psicologia das cores) |
| Verde `#3ddc84` na linha Fresh | Diferencia visualmente os produtos sem álcool |
| Fotos dessaturadas por padrão | Hover colore → cria curiosidade e engajamento |
| Badge "MAIS VENDIDO" no card central | Prova social + ancora o olhar no produto destaque |
| Stats animados (500+, 100%) | Credibilidade — números concretos vendem mais |
| Timeline de eventos | Prova que a marca está ativa e presente |
| CTA Instagram no final | Converte visitante em seguidor para acompanhar eventos |
| WhatsApp como contato principal | Canal preferido do público-alvo brasileiro |

---

## 🚀 Como Rodar

Não precisa instalar nada.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/frajola-drinks.git

# Abra o arquivo no browser
# (duplo clique no index.html, ou arraste para o browser)
```

> Para melhor experiência de desenvolvimento, use a extensão **Live Server** no VS Code — ela recarrega a página automaticamente ao salvar.

---

## 📦 Bibliotecas Utilizadas

| Biblioteca | Versão | Uso |
|---|---|---|
| [GSAP](https://gsap.com/) | 3.12.5 | Animações (hero, tilt 3D) |
| [AOS](https://michalsnik.github.io/aos/) | 2.3.1 | Fade-in elementos ao rolar |
| [Montserrat](https://fonts.google.com/specimen/Montserrat) | — | Tipografia (Google Fonts) |

> Todas as bibliotecas são carregadas via CDN — sem npm, sem build. Ideal para projetos estáticos.

---

## 📈 Possíveis Melhorias Futuras

- [ ] Formulário de contato funcional com envio via EmailJS ou FormSubmit
- [ ] Modo claro (light mode) com toggle
- [ ] Galeria de fotos com lightbox (zoom ao clicar)
- [ ] Seção de preços/cardápio com valores
- [ ] Deploy no GitHub Pages ou Netlify
- [ ] Otimização de imagens (WebP + lazy loading aprimorado)
- [ ] Migrar para Vite + SCSS para um workflow mais profissional

---

## 👨‍💻 Desenvolvido por

**[dionisio.dev](https://dionisio.dev)**  
Estudante de desenvolvimento web, construindo projetos reais para aprender na prática.

---

*Feito com 🍹 e muito CSS.*
