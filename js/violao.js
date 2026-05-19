document.querySelector('.product-grid').addEventListener('click', e => {
  const fav = e.target.closest('.fav-btn');
  if (fav) { e.stopPropagation(); fav.classList.toggle('active'); }
});
