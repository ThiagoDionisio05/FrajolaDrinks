/* ══════════════════════════════════════════
   FEEDBACKS — CONTADOR ANIMADO

   Quando a seção de stats entrar na tela,
   os números contam de 0 até o valor final.
   Usa IntersectionObserver (nativo do browser,
   sem precisar de biblioteca extra).
══════════════════════════════════════════ */

/**
 * Anima um número de 0 até o valor em data-target.
 * @param {HTMLElement} el - O elemento <span> com o número
 */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600; /* duração total em ms          */
  const stepMs   = 16;   /* atualiza ~60 vezes por segundo */
  const steps    = duration / stepMs;
  const increment = target / steps;
  let   current  = 0;

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      el.textContent = target; /* garante que termina no valor exato */
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepMs);
}

/**
 * Observa quando os contadores entram na tela
 * e dispara a animação uma única vez.
 */
function initCounters() {
  const counters = document.querySelectorAll('.feedbacks__counter');
  if (!counters.length) return;

  /* IntersectionObserver: callback chamado quando o elemento
     aparece ou desaparece da janela do navegador             */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        animateCounter(entry.target);
        observer.unobserve(entry.target); /* anima só uma vez */
      });
    },
    { threshold: 0.6 } /* dispara quando 60% do elemento está visível */
  );

  counters.forEach(counter => observer.observe(counter));
}

initCounters();
