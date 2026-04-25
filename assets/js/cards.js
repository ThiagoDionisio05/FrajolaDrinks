/* ══════════════════════════════════════════
   EFEITO DE INCLINAÇÃO 3D NOS CARDS

   Quando o mouse se move sobre um card,
   ele inclina suavemente na direção do cursor.
   Ao sair, volta com um efeito de "mola".

   Usa a biblioteca GSAP para animações suaves.
   (carregada antes deste arquivo no HTML)
══════════════════════════════════════════ */

/**
 * Aplica o efeito 3D de inclinação em todos os
 * elementos que combinam com o seletor fornecido.
 *
 * @param {string} selector - Seletor CSS (ex: '.drink-card')
 * @param {number} maxTilt  - Graus máximos de inclinação
 */
function initTiltEffect(selector, maxTilt) {
  const cards = document.querySelectorAll(selector);

  cards.forEach(card => {

    /* Quando o mouse se move sobre o card */
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();

      /* Normaliza a posição: -0.5 (esquerda/topo) até 0.5 (direita/baixo) */
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      gsap.to(card, {
        rotateY:              x * maxTilt * 2,   /* inclina para os lados   */
        rotateX:             -y * maxTilt * 2,   /* inclina para cima/baixo */
        transformPerspective: 900,               /* profundidade do efeito 3D */
        duration:             0.4,
        ease:                 'power2.out',
        overwrite:            'auto',
      });
    });

    /* Quando o mouse sai do card: volta com efeito elástico ("mola") */
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY:   0,
        rotateX:   0,
        duration:  0.9,
        ease:      'elastic.out(1, 0.5)',
        overwrite: 'auto',
      });
    });

  });
}

/* Aplica nos dois tipos de card com intensidades diferentes */
initTiltEffect('.drink-card', 10);  /* drinks: 10 graus de inclinação */
initTiltEffect('.fresh-card',  8);  /* fresh:   8 graus (mais suave)  */
