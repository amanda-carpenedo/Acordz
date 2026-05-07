const products = [
  {
    name: 'Violão Mini Coral',
    desc: 'Violão 1/4 com cordas em nylon, ideal para crianças de 3 a 5 anos.',
    size: '1/4', age: '3-5 anos',
    price: 'R$ 289,00', oldPrice: null,
    badges: ['Novo'], color: 'string-1',
  },
  {
    name: 'Violão Sereno Azul',
    desc: 'Tamanho 1/2 com acabamento azul matte e capa inclusa. Para os primeiros acordes.',
    size: '1/2', age: '5-8 anos',
    price: 'R$ 459,00', oldPrice: 'R$ 549,00',
    badges: ['Promo'], color: 'string-5',
  },
  {
    name: 'Kit Iniciante Tum Tum',
    desc: 'Violão + afinador + capa + manual ilustrado em PDF para começar a tocar hoje.',
    size: '1/2', age: '5-8 anos',
    price: 'R$ 599,00', oldPrice: null,
    badges: ['Popular'], color: 'string-2',
  },
  {
    name: 'Violão Bosque Verde',
    desc: 'Modelo 3/4 com tampo em cedro claro. Som encorpado para alunos avançando.',
    size: '3/4', age: '8-11 anos',
    price: 'R$ 729,00', oldPrice: null,
    badges: [], color: 'string-3',
  },
  {
    name: 'Violão Pequeno Lilás',
    desc: 'Versão 1/4 com detalhes lilás e adesivos personalizáveis para personalizar.',
    size: '1/4', age: '3-5 anos',
    price: 'R$ 319,00', oldPrice: null,
    badges: ['Novo'], color: 'string-6',
  },
  {
    name: 'Violão Compacto Âmbar',
    desc: 'Ergonomia infantil, escala mais curta e cordas leves para pequenos dedos.',
    size: '1/2', age: '5-8 anos',
    price: 'R$ 489,00', oldPrice: null,
    badges: [], color: 'string-2',
  },
];

function guitarSVG(colorVar) {
  return `
    <svg class="guitar-illust" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="105" cy="135" rx="55" ry="48" fill="var(--${colorVar})" opacity="0.95"/>
      <ellipse cx="105" cy="135" rx="55" ry="48" fill="none" stroke="oklch(35% 0.10 60)" stroke-width="1.5"/>
      <circle cx="105" cy="130" r="11" fill="oklch(20% 0.02 60)"/>
      <rect x="89" y="153" width="32" height="5" rx="1.5" fill="oklch(30% 0.05 60)"/>
      <rect x="100" y="55" width="11" height="78" fill="oklch(45% 0.10 60)" rx="2"/>
      <rect x="96" y="40" width="19" height="22" fill="oklch(35% 0.08 60)" rx="2"/>
      <line x1="100" y1="60" x2="111" y2="60" stroke="oklch(80% 0.04 80)" stroke-width="0.8"/>
      <line x1="100" y1="75" x2="111" y2="75" stroke="oklch(80% 0.04 80)" stroke-width="0.8"/>
      <line x1="100" y1="90" x2="111" y2="90" stroke="oklch(80% 0.04 80)" stroke-width="0.8"/>
      <line x1="100" y1="105" x2="111" y2="105" stroke="oklch(80% 0.04 80)" stroke-width="0.8"/>
      <line x1="102" y1="62" x2="98"  y2="158" stroke="oklch(68% 0.18 25)"  stroke-width="0.6"/>
      <line x1="104" y1="62" x2="102" y2="158" stroke="oklch(68% 0.18 70)"  stroke-width="0.6"/>
      <line x1="106" y1="62" x2="105" y2="158" stroke="oklch(68% 0.18 145)" stroke-width="0.6"/>
      <line x1="108" y1="62" x2="108" y2="158" stroke="oklch(68% 0.18 200)" stroke-width="0.6"/>
      <line x1="110" y1="62" x2="112" y2="158" stroke="oklch(68% 0.18 260)" stroke-width="0.6"/>
      <line x1="112" y1="62" x2="115" y2="158" stroke="oklch(68% 0.18 310)" stroke-width="0.6"/>
    </svg>`;
}

function badgeHTML(label) {
  const cls = { Novo: 'new', Promo: 'sale', Popular: 'popular' }[label] ?? '';
  return `<span class="badge ${cls}">${label}</span>`;
}

const heartIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const plusIcon  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;

const grid = document.getElementById('product-grid');
grid.innerHTML = products.map(p => `
  <article class="product-card" tabindex="0">
    <div class="product-image">
      <div class="bg-rings"></div>
      <div class="product-badges">${p.badges.map(badgeHTML).join('')}</div>
      <button class="fav-btn" aria-label="Favoritar">${heartIcon}</button>
      ${guitarSVG(p.color)}
    </div>
    <div class="product-body">
      <div class="product-cat">Violão</div>
      <h3 class="product-title">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-meta">
        <span class="meta-pill">Tam ${p.size}</span>
        <span class="meta-pill">${p.age}</span>
        <span class="meta-pill">Nylon</span>
      </div>
      <div class="product-foot">
        <div class="price-block">
          ${p.oldPrice ? `<span class="price-old">${p.oldPrice}</span>` : ''}
          <span class="price">${p.price}</span>
        </div>
        <button class="add-btn" aria-label="Adicionar ao carrinho">${plusIcon}</button>
      </div>
    </div>
  </article>
`).join('');

grid.addEventListener('click', e => {
  const fav = e.target.closest('.fav-btn');
  if (fav) { e.stopPropagation(); fav.classList.toggle('active'); }
});

document.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});
