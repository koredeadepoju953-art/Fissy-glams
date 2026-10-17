/* Fissy Glam Studio - shared behaviour. Content lives in data.js */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = n => '₦' + Number(n).toLocaleString('en-NG');
  const page = document.body.dataset.page;
  const waLink = msg => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- product art ---------- */
  function art(shape, c) {
    const d = '#2B0F20';
    const shapes = {
      lipstick: `<rect x="34" y="70" width="32" height="50" rx="4" fill="${d}"/><rect x="38" y="30" width="24" height="42" rx="4" fill="${c}"/><path d="M38 30 L62 22 L62 34Z" fill="${c}"/>`,
      gloss: `<rect x="40" y="60" width="20" height="62" rx="6" fill="${c}"/><rect x="44" y="32" width="12" height="30" rx="3" fill="${d}"/>`,
      pencil: `<rect x="44" y="40" width="12" height="76" rx="2" fill="${c}"/><path d="M44 40 L50 18 L56 40Z" fill="${d}"/>`,
      compact: `<circle cx="50" cy="75" r="38" fill="${d}"/><circle cx="50" cy="75" r="30" fill="${c}"/><circle cx="40" cy="65" r="6" fill="#fff" opacity=".3"/>`,
      palette: `<rect x="8" y="35" width="84" height="80" rx="10" fill="${d}"/>${[0,1,2].map(r=>[0,1,2,3].map(k=>`<circle cx="${22+k*19}" cy="${55+r*22}" r="7" fill="${['#F2C9A0','#C8236B','#B8863B','#8A5A9E'][(k+r)%4]}"/>`).join('')).join('')}`,
      brush: `<rect x="46" y="55" width="8" height="64" rx="3" fill="${c}"/><rect x="42" y="42" width="16" height="16" fill="#ccc"/><path d="M42 42 Q50 8 58 42Z" fill="${d}"/>`,
      bottle: `<rect x="36" y="52" width="28" height="68" rx="8" fill="${c}"/><rect x="42" y="30" width="16" height="24" rx="3" fill="${d}"/>`,
      gele: `<path d="M12 90 Q10 40 50 36 Q92 40 88 90 Q70 78 50 80 Q30 78 12 90Z" fill="${c}"/><path d="M26 70 Q50 56 76 70" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/><path d="M30 52 Q50 42 70 52" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/>`,
      lash: `<path d="M10 90 Q50 60 90 90" stroke="${d}" stroke-width="4" fill="none"/>${Array.from({length:11},(_,i)=>{const x=14+i*7.2;const y=84-Math.sin(i/10*Math.PI)*22;return `<line x1="${x}" y1="${y+4}" x2="${x-3+i*0.6}" y2="${y-16}" stroke="${d}" stroke-width="2" stroke-linecap="round"/>`}).join('')}`
    };
    return `<svg viewBox="0 0 100 140" aria-hidden="true">${shapes[shape] || shapes.compact}</svg>`;
  }
 const thumb = p => p.img
  ? `<div class="thumb" style="background:${p.bg}"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>`
  : `<div class="thumb" style="background:${p.bg}">${art(p.shape, p.color)}</div>`;

  /* ---------- cart ---------- */
  const CK = 'fg_cart';
  const getCart = () => { try { return JSON.parse(localStorage.getItem(CK) || localStorage.getItem('tg_cart')) || []; } catch { return []; } };
  const setCart = c => { try { localStorage.setItem(CK, JSON.stringify(c)); } catch {} updateBadge(); };
  const cartCount = () => getCart().reduce((n, l) => n + l.qty, 0);
  function updateBadge() { const b = $('.cart-link b'); if (b) { b.textContent = cartCount(); b.dataset.n = cartCount(); } }
  function addToCart(id, shade) {
    const cart = getCart(); const key = id + '|' + (shade || '');
    const line = cart.find(l => l.key === key);
    if (line) line.qty++; else cart.push({ key, id, shade: shade || '', qty: 1 });
    setCart(cart);
  }
  const product = id => PRODUCTS.find(p => p.id === id);

  function toast(msg) {
    let t = $('.toast'); if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- header & footer ---------- */
  const links = [['index.html', 'home', 'Home'], ['services.html', 'services', 'Services'], ['shop.html', 'shop', 'Shop'], ['training.html', 'training', 'Training'], ['contact.html', 'contact', 'Contact']];
  $('#site-header').outerHTML = `
  <header class="site-header"><div class="wrap bar">
    <a class="logo" href="index.html">Fissy <span>Glam</span> Studio</a>
    <nav class="nav" id="nav" aria-label="Main">${links.map(l => `<a href="${l[0]}" ${page === l[1] ? 'aria-current="page"' : ''}>${l[2]}</a>`).join('')}<a class="nav-book" href="book.html">Book a session</a></nav>
    <div class="bar-actions">
      <a class="cart-link" href="cart.html" aria-label="Cart">Cart <b data-n="0">0</b></a>
      <a class="btn sm" href="book.html">Book now</a>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
    </div></div></header>`;
  $('#site-footer').outerHTML = `
  <footer class="site-footer"><div class="wrap">
    <div class="foot-grid">
      <div><a class="logo" href="index.html">Fissy Glam Studio</a><p style="margin-top:12px">Makeup, gele, training and beauty products. Bookings and orders go straight to Fissy on WhatsApp.</p></div>
      <div><h3>Explore</h3>${links.map(l => `<a href="${l[0]}">${l[2]}</a>`).join('')}<a href="book.html">Book a session</a><a href="cart.html">Cart and checkout</a></div>
      <div><h3>Reach us</h3><a href="${waLink('Hello Fissy Glam Studio')}" target="_blank" rel="noopener">WhatsApp ${esc(SITE.phoneDisplay)}</a><a href="https://instagram.com/${SITE.instagram}" target="_blank" rel="noopener">Instagram @${esc(SITE.instagram)}</a><p style="margin-top:8px">${esc(SITE.address)}<br>${esc(SITE.hours)}</p></div>
    </div>
    <p class="copy">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p></div></footer>
  <a class="float-wa" href="${waLink('Hello Fissy Glam Studio, I have a question.')}" target="_blank" rel="noopener">Chat on WhatsApp</a>`;
  const mb = $('.menu-btn'); mb.addEventListener('click', () => { const o = $('#nav').classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
  updateBadge();

  /* ---------- form helpers ---------- */
  function validate(form) {
    let ok = true, first = null;
    $$('.field', form).forEach(f => {
      const i = $('input,select,textarea', f); if (!i || !i.required) return;
      const bad = !i.value.trim() || (i.type === 'tel' && i.value.replace(/\D/g, '').length < 10);
      f.classList.toggle('invalid', bad); if (bad) { ok = false; first = first || i; }
    });
    if (first) first.focus(); return ok;
  }
  const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const niceDate = iso => new Date(iso + 'T00:00').toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  function sent(container, msg, label) {
    container.innerHTML = `<div class="notice"><strong>${label}</strong><p style="margin-top:6px">WhatsApp should open with your message ready. Press send to complete it. If it did not open, use the button below.</p></div>
      <div class="btn-row"><a class="btn wa" href="${waLink(msg)}" target="_blank" rel="noopener">Open WhatsApp</a><a class="btn ghost" href="index.html">Back to home</a></div>`;
    window.open(waLink(msg), '_blank', 'noopener');
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* ---------- pages ---------- */
  const serviceRows = (groups, withBook) => groups.map(g => `
    <div class="menu-group"><h2>${g.group}</h2><p class="lead">${g.intro}</p>
    <ul class="menu-list">${g.items.map(s => `<li class="menu-item"><div><h3>${s.name}</h3><p>${s.desc} <span>${s.time}</span></p></div><span class="price">${s.from ? 'from ' : ''}${fmt(s.price)}</span>${withBook ? `<a class="btn ghost sm" href="book.html?s=${s.id}">Book</a>` : ''}</li>`).join('')}</ul></div>`).join('');

  const card = p => `<article class="product">${thumb(p)}<h3>${p.name}</h3><p class="desc">${p.desc}</p>
    ${p.shades ? `<select aria-label="Shade for ${p.name}">${p.shades.map(s => `<option>${s}</option>`).join('')}</select>` : ''}
    <div class="row"><span class="price" style="font-size:1.1rem">${fmt(p.price)}</span><button class="btn sm" data-add="${p.id}">Add to cart</button></div></article>`;
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    const sel = b.closest('.product').querySelector('select');
    addToCart(b.dataset.add, sel ? sel.value : ''); toast('Added to cart');
  });

  if (page === 'home') {
    $('#home-products').innerHTML = ['p1', 'p4', 'p8', 'p13'].map(id => card(product(id))).join('');
    $('#home-services').innerHTML = serviceRows([{ group: 'Popular sessions', intro: '', items: [SERVICES[0].items[1], SERVICES[0].items[3], SERVICES[1].items[0], SERVICES[1].items[2]] }], true);
  }

  if (page === 'services') $('#service-list').innerHTML = serviceRows(SERVICES, true);

  if (page === 'shop') {
    const cats = ['All', ...new Set(PRODUCTS.map(p => p.cat))]; let cat = 'All', q = '';
    const chips = $('#chips'); chips.innerHTML = cats.map(c => `<button class="chip" aria-pressed="${c === 'All'}">${c}</button>`).join('');
    const draw = () => {
      const list = PRODUCTS.filter(p => (cat === 'All' || p.cat === cat) && (p.name + p.desc).toLowerCase().includes(q));
      $('#products').innerHTML = list.length ? list.map(card).join('') : '<p class="empty">No products match. Try another category or search word.</p>';
    };
    chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; cat = b.textContent; $$('.chip', chips).forEach(c => c.setAttribute('aria-pressed', c === b)); draw(); });
    $('#search').addEventListener('input', e => { q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  }

  if (page === 'book') {
    const f = $('#book-form'); const pre = new URLSearchParams(location.search).get('s');
    $('#svc-opts').innerHTML = SERVICES.map(g => `<p class="legend" style="margin:14px 0 8px">${g.group}</p>` + g.items.map(s => `<label class="opt"><input type="checkbox" name="svc" value="${s.id}" ${s.id === pre ? 'checked' : ''}><span>${s.name}<small>${s.time}</small></span><span class="p">${s.from ? 'from ' : ''}${fmt(s.price)}</span></label>`).join('')).join('');
    const all = SERVICES.flatMap(g => g.items);
    $('#time').innerHTML = '<option value="">Choose a time</option>' + Array.from({ length: 11 }, (_, i) => { const h = 8 + i, l = (h > 12 ? h - 12 : h) + ':00 ' + (h >= 12 ? 'pm' : 'am'); return `<option>${l}</option>`; }).join('');
    $('#date').min = todayISO();
    const chosen = () => $$('[name=svc]:checked', f).map(c => all.find(s => s.id === c.value));
    const where = () => $('[name=where]:checked', f).value;
    const upd = () => {
      const c = chosen(), t = c.reduce((n, s) => n + s.price, 0);
      $('#est').innerHTML = c.length ? `Estimated total <strong>${fmt(t)}</strong>${c.some(s => s.from) ? ' or more' : ''}. Deposit to confirm: <strong>${fmt(Math.ceil(t / 2))}</strong>.` : 'Choose at least one service to see your estimate.';
      $('#addr-field').hidden = where() !== 'home';
      $('#addr').required = where() === 'home';
    };
    f.addEventListener('change', upd); upd();
    f.addEventListener('submit', e => {
      e.preventDefault();
      const c = chosen(); $('#svc-err').hidden = c.length > 0;
      if (!validate(f) || !c.length) return;
      const t = c.reduce((n, s) => n + s.price, 0);
      const msg = `Hello Fissy Glam Studio, I would like to book:\n\n*Services*\n${c.map(s => `- ${s.name} (${s.from ? 'from ' : ''}${fmt(s.price)})`).join('\n')}\n\n*Date:* ${niceDate($('#date').value)}\n*Time:* ${$('#time').value}\n*Where:* ${where() === 'home' ? 'Home/venue service - ' + $('#addr').value : 'At the studio'}\n*Occasion:* ${$('#occasion').value || 'Not stated'}\n*Estimated total:* ${fmt(t)}\n*Notes:* ${$('#notes').value || 'None'}\n\n*Name:* ${$('#name').value}\n*Phone:* ${$('#phone').value}`;
      sent($('#book-result'), msg, 'Your booking request is ready to send.'); f.hidden = true;
    });
  }

  if (page === 'training') {
    $('#courses').innerHTML = `<ul class="menu-list">${TRAINING.map(t => `<li class="menu-item"><div><h3>${t.name}</h3><p>${t.desc}</p><p><strong>${t.length}</strong></p></div><span class="price">${fmt(t.price)}</span><button class="btn ghost sm" data-course="${t.id}">Enquire</button></li>`).join('')}</ul>`;
    $('#course').innerHTML = '<option value="">Choose a class</option>' + TRAINING.map(t => `<option value="${t.id}">${t.name} (${fmt(t.price)})</option>`).join('');
    document.addEventListener('click', e => { const b = e.target.closest('[data-course]'); if (!b) return; $('#course').value = b.dataset.course; $('#enquire').scrollIntoView({ behavior: 'smooth' }); $('#tname').focus({ preventScroll: true }); });
    const f = $('#train-form');
    f.addEventListener('submit', e => {
      e.preventDefault(); if (!validate(f)) return;
      const t = TRAINING.find(x => x.id === $('#course').value);
      const msg = `Hello Fissy Glam Studio, I would like to enquire about training.\n\n*Class:* ${t.name} (${fmt(t.price)})\n*Experience:* ${$('#level').value}\n*Message:* ${$('#tmsg').value || 'None'}\n\n*Name:* ${$('#tname').value}\n*Phone:* ${$('#tphone').value}`;
      sent($('#train-result'), msg, 'Your enquiry is ready to send.'); f.hidden = true;
    });
  }

  if (page === 'contact') {
    $('#c-addr').textContent = SITE.address; $('#c-hours').textContent = SITE.hours;
    const cw = $('#c-wa'); cw.href = waLink('Hello Fissy Glam Studio'); cw.textContent = SITE.phoneDisplay;
    const ci = $('#c-ig'); ci.href = 'https://instagram.com/' + SITE.instagram; ci.textContent = '@' + SITE.instagram;
    const f = $('#contact-form');
    f.addEventListener('submit', e => {
      e.preventDefault(); if (!validate(f)) return;
      const msg = `Hello Fissy Glam Studio,\n\n${$('#cmsg').value}\n\n*Name:* ${$('#cname').value}\n*Phone:* ${$('#cphone').value}`;
      sent($('#contact-result'), msg, 'Your message is ready to send.'); f.hidden = true;
    });
  }

  if (page === 'cart') {
    const f = $('#order-form'); const list = $('#cart-list');
    $('#zone').innerHTML = DELIVERY_ZONES.map(z => `<option value="${z.id}">${z.label}${z.confirm ? '' : ' - ' + fmt(z.fee)}</option>`).join('');
    $('#bank').innerHTML = `Pay by transfer to:<br><strong>${esc(SITE.bank.bank)}</strong><br>${esc(SITE.bank.number)}<br>${esc(SITE.bank.holder)}<br><span class="muted">Send your receipt on WhatsApp after paying.</span>`;
    const mode = () => $('[name=mode]:checked', f).value;
    const zone = () => DELIVERY_ZONES.find(z => z.id === $('#zone').value);
    const lines = () => getCart().map(l => ({ ...l, p: product(l.id) })).filter(l => l.p);
    function draw() {
      const ls = lines();
      $('#empty').hidden = ls.length > 0; $('#cart-area').hidden = ls.length === 0;
      list.innerHTML = ls.map(l => `<div class="cart-line">${thumb(l.p)}<div><strong>${l.p.name}</strong>${l.shade ? `<div class="muted">Shade: ${esc(l.shade)}</div>` : ''}<div><span class="qty"><button type="button" data-q="-1" data-k="${l.key}" aria-label="Decrease quantity">−</button><span>${l.qty}</span><button type="button" data-q="1" data-k="${l.key}" aria-label="Increase quantity">+</button></span><button type="button" class="link-btn" data-rm="${l.key}">Remove</button></div></div><strong>${fmt(l.p.price * l.qty)}</strong></div>`).join('');
      const sub = ls.reduce((n, l) => n + l.p.price * l.qty, 0), z = zone(), del = mode() === 'delivery';
      $('#delivery-fields').hidden = !del; $('#zone').required = del; $('#address').required = del;
      $('#pickup-note').hidden = del;
      $('#pickup-note').textContent = `Pick up at ${SITE.address}, ${SITE.hours}. We message you when your order is ready.`;
      const fee = del ? z.fee : 0;
      $('#sum').innerHTML = `<div class="sum-row"><span>Items</span><span>${fmt(sub)}</span></div><div class="sum-row"><span>${del ? 'Delivery' : 'Pickup'}</span><span>${del ? (z.confirm ? 'To be confirmed' : fmt(fee)) : 'Free'}</span></div><div class="sum-row total"><span>Total</span><span>${fmt(sub + fee)}${del && z.confirm ? ' + delivery' : ''}</span></div>`;
      updateBadge();
    }
    list.addEventListener('click', e => {
      const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]'); let c = getCart();
      if (q) { const l = c.find(x => x.key === q.dataset.k); l.qty += +q.dataset.q; c = c.filter(x => x.qty > 0); }
      if (r) c = c.filter(x => x.key !== r.dataset.rm);
      if (q || r) { setCart(c); draw(); }
    });
    f.addEventListener('change', draw); draw();
    f.addEventListener('submit', e => {
      e.preventDefault(); if (!validate(f)) return;
      const ls = lines(), z = zone(), del = mode() === 'delivery', sub = ls.reduce((n, l) => n + l.p.price * l.qty, 0), fee = del ? z.fee : 0;
      const msg = `Hello Fissy Glam Studio, I would like to place an order:\n\n${ls.map(l => `- ${l.qty} x ${l.p.name}${l.shade ? ' (' + l.shade + ')' : ''} = ${fmt(l.p.price * l.qty)}`).join('\n')}\n\n*Items:* ${fmt(sub)}\n*${del ? 'Delivery to ' + z.label : 'Pickup'}:* ${del ? (z.confirm ? 'fee to be confirmed' : fmt(fee)) : 'free'}\n*Total:* ${fmt(sub + fee)}${del && z.confirm ? ' + delivery' : ''}\n${del ? '*Address:* ' + $('#address').value + '\n' : ''}*Payment:* ${$('#pay').value}\n*Note:* ${$('#onote').value || 'None'}\n\n*Name:* ${$('#oname').value}\n*Phone:* ${$('#ophone').value}`;
      sent($('#order-result'), msg, 'Your order is ready to send.');
      $('#checkout').hidden = true; setCart([]);
    });
  }
})();
