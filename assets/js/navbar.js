/* ══════════════════════════════════
   MENU HAMBÚRGUER (MOBILE)

   Em telas pequenas, o menu de navegação
   fica escondido. Ao clicar no botão de
   três linhas (hambúrguer), ele abre/fecha.

   A classe "is-open" é adicionada/removida
   pelo JS, e o CSS cuida da aparência.
══════════════════════════════════ */

const hamburger = document.querySelector('.navbar__hamburger');
const nav       = document.getElementById('nav-menu');

/* Fecha o menu e atualiza o atributo de acessibilidade */
function closeMenu() {
  nav.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
}

/* Abre ou fecha ao clicar no botão hambúrguer */
hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

/* Fecha ao clicar em qualquer link de navegação */
nav.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* Fecha ao clicar em qualquer área fora do menu */
document.addEventListener('click', e => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});
