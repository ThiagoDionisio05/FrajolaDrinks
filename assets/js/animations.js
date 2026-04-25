/* ══════════════════════════════════
   ANIMAÇÕES DE SCROLL (AOS)

   AOS = Animate On Scroll
   Faz elementos aparecerem com animação
   suave conforme o usuário rola a página.

   Para aplicar em um elemento HTML, adicione:
   data-aos="fade-up"
   data-aos-delay="100"  ← atraso opcional em ms
══════════════════════════════════ */

AOS.init({
  duration: 750,         /* duração de cada animação em milissegundos */
  easing:   'ease-out-cubic',
  once:     true,        /* anima só na primeira vez que aparece       */
  offset:   60           /* px antes de entrar na tela para iniciar    */
});
