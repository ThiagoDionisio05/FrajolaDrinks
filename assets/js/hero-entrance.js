/* ══════════════════════════════════════════
   HERO ENTRANCE — ANIMAÇÃO DE ENTRADA

   Usa GSAP para animar os elementos do hero
   em sequência quando a página carrega.

   COMO FUNCIONA EM 2 PASSOS:
   1. gsap.set() — define o estado INICIAL
      de cada elemento (escondido, deslocado)
      antes do browser pintar a tela.
   2. window.load — dispara o timeline que
      anima cada elemento até o estado final.
══════════════════════════════════════════ */

/* ── PASSO 1: define estado inicial imediatamente ──
   Roda antes do browser renderizar,
   prevenindo o flash de conteúdo.          */
gsap.set('.hero__title',     { autoAlpha: 0, y: -50 });
gsap.set('.hero__subtitle',  { autoAlpha: 0, y: 28  });
gsap.set('.hero__buttons',   { autoAlpha: 0, y: 20  });
gsap.set('.hero__logo',      { autoAlpha: 0, scale: 0.72 });
gsap.set('.hero__drinks',    { autoAlpha: 0, x: 70  });
gsap.set('.hero__cta-badge', { autoAlpha: 0, y: 16  });

/* ── PASSO 2: anima ao carregar a página ── */
window.addEventListener('DOMContentLoaded', () => {

  /* Timeline: cada .to() parte do estado definido
     acima e anima até o estado natural (y:0, x:0…) */
  const tl = gsap.timeline({
    delay:    0.15,
    defaults: { ease: 'power3.out' },
  });

  /* Título desce do topo */
  tl.to('.hero__title', {
    autoAlpha: 1, y: 0,
    duration:  1.0,
  })

  /* Subtítulo sobe levemente */
  .to('.hero__subtitle', {
    autoAlpha: 1, y: 0,
    duration:  0.75,
  }, '-=0.55')   /* começa 0.55s antes do anterior terminar */

  /* Botões sobem */
  .to('.hero__buttons', {
    autoAlpha: 1, y: 0,
    duration:  0.6,
  }, '-=0.45')

  /* Logo central cresce com "mola" */
  .to('.hero__logo', {
    autoAlpha: 1, scale: 1,
    duration:  1.0,
    ease:      'back.out(1.6)',
  }, '-=0.7')

  /* Drinks desliza da direita */
  .to('.hero__drinks', {
    autoAlpha: 1, x: 0,
    duration:  1.0,
  }, '-=0.8')

  /* Badge do WhatsApp aparece por último */
  .to('.hero__cta-badge', {
    autoAlpha: 1, y: 0,
    duration:  0.5,
  }, '-=0.3');

});
