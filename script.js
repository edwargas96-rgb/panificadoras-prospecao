const nav = document.querySelector('nav');
document.querySelector('.menu-btn').addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Pedido de encomenda -> WhatsApp
document.getElementById('encomenda').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Olá, Santtini! Gostaria de fazer uma encomenda.%0A` +
    `*Nome:* ${f.get('nome')}%0A*Produto:* ${f.get('produto')}%0A*Data:* ${f.get('data') || 'a combinar'}%0A*Detalhes:* ${f.get('obs') || '-'}`;
  window.open(`https://wa.me/5541997146521?text=${msg}`, '_blank');
});
