'use strict';
/* ═══════════════════════════════════════════════════
   VoteIQ India — Phase 3: Interactive Sections JS
   India Map · Government · Leaders · Parties
   ═══════════════════════════════════════════════════ */

// ─── Global data store ────────────────────────────
const VIQ = window.VIQ || {};
window.VIQ = VIQ;

// ─── Fetch helper ─────────────────────────────────
async function fetchData(resource) {
  if (VIQ[resource]) return VIQ[resource];
  try {
    const r = await fetch(`/api/data/${resource}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    VIQ[resource] = await r.json();
    return VIQ[resource];
  } catch (e) {
    console.warn(`Failed to load ${resource}:`, e);
    return [];
  }
}

/* ═══════════════════════════════════════════════════
   INDIA MAP (D3.js + TopoJSON)
   ═══════════════════════════════════════════════════ */
(async function initIndiaMap() {
  const svgEl = document.getElementById('india-svg');
  if (!svgEl || typeof d3 === 'undefined' || typeof topojson === 'undefined') return;

  const states = await fetchData('states');
  const stateMap = {};
  states.forEach(s => { stateMap[s.name.toLowerCase()] = s; });

  // Alliance colors
  const ALLIANCE_COLOR = { NDA: '#FF6200', INDIA: '#046A38', Others: '#607D8B', LDF: '#B71C1C' };
  const TURNOUT_COLOR  = d => d3.interpolateYlOrRd((d || 60) / 100);

  let currentMode    = 'ls_results';
  let currentAlliance = 'all';

  // Load India GeoJSON from CDN
  let geoData;
  try {
    const resp = await fetch('https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States');
    geoData = await resp.json();
  } catch {
    // Fallback: show message if map fails to load
    svgEl.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#A09880" font-family="Rajdhani" font-size="16">Map loading — check internet connection</text>';
    return;
  }

  const width = svgEl.clientWidth || 500;
  const height = 520;

  const svg = d3.select('#india-svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const projection = d3.geoMercator().fitSize([width, height], geoData);
  const path       = d3.geoPath().projection(projection);

  // Tooltip
  const tooltip = d3.select('#map-tooltip');

  const getFill = (feature) => {
    const name = (feature.properties.NAME_1 || feature.properties.ST_NM || feature.properties.name || '').toLowerCase();
    const s    = stateMap[name] || Object.values(stateMap).find(x => name.includes(x.name.toLowerCase().split(' ')[0]));
    if (!s) return '#1A1E30';
    if (currentMode === 'ls_results')   return ALLIANCE_COLOR[s.alliance] || '#607D8B';
    if (currentMode === 'ruling_party') return s.color || '#607D8B';
    if (currentMode === 'turnout')      return TURNOUT_COLOR(65);
    return s.color || '#607D8B';
  };

  // Draw states
  svg.append('g').attr('id', 'states-group')
    .selectAll('path')
    .data(geoData.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', d => getFill(d))
    .attr('data-name', d => d.properties.NAME_1 || d.properties.ST_NM || '')
    .on('mousemove', (event, d) => {
      const name = (d.properties.NAME_1 || d.properties.ST_NM || d.properties.name || '');
      const s    = stateMap[name.toLowerCase()] || Object.values(stateMap).find(x => name.toLowerCase().includes(x.name.toLowerCase().split(' ')[0]));
      if (!tooltip.node()) return;
      tooltip.style('opacity', 1)
        .style('left', (event.clientX + 16) + 'px')
        .style('top',  (event.clientY - 10) + 'px')
        .html(s ? `
          <div class="tooltip-state">${s.name}</div>
          <div class="tooltip-row"><span>Chief Minister</span><span class="tooltip-val">${s.cm}</span></div>
          <div class="tooltip-row"><span>Party</span><span class="tooltip-val">${s.party} · ${s.alliance}</span></div>
          <div class="tooltip-row"><span>LS Seats</span><span class="tooltip-val">${s.ls_seats}</span></div>
          <div class="tooltip-row"><span>Next Election</span><span class="tooltip-val">${s.next_election}</span></div>
        ` : `<div class="tooltip-state">${name}</div>`);
    })
    .on('mouseleave', () => tooltip.style('opacity', 0))
    .on('click', (event, d) => {
      const name = (d.properties.NAME_1 || d.properties.ST_NM || d.properties.name || '');
      const s    = stateMap[name.toLowerCase()] || Object.values(stateMap).find(x => name.toLowerCase().includes(x.name.toLowerCase().split(' ')[0]));
      openStatePanel(s || { name, cm: '—', party: '—', alliance: '—', ls_seats: '—', assembly_seats: '—', next_election: '—', governor: '—', region: '—' });
    });

  // Redraw fills
  function redrawFills() {
    svg.selectAll('#states-group path').attr('fill', d => getFill(d));
  }

  // State panel
  function openStatePanel(s) {
    const panel = document.getElementById('state-panel');
    if (!panel) return;
    const allianceBadge = { NDA: 'badge-saffron', INDIA: 'badge-green', Others: 'badge-glass', LDF: 'badge-glass' };
    panel.innerHTML = `
      <button class="panel-close" onclick="document.getElementById('state-panel').innerHTML='<div class=\\'map-panel-placeholder\\'><div class=\\'big-icon\\'>🗺️</div><p>Click any state to see details</p></div>'" aria-label="Close panel">✕</button>
      <div class="panel-state-name">${s.name}</div>
      <div class="panel-badge"><span class="badge ${allianceBadge[s.alliance] || 'badge-glass'}">${s.alliance || 'Others'}</span></div>
      <div class="panel-grid">
        <div><div class="panel-stat-label">Chief Minister</div><div class="panel-stat-val" style="font-family:var(--font-ui);font-size:14px">${s.cm || '—'}</div></div>
        <div><div class="panel-stat-label">Party</div><div class="panel-stat-val" style="font-family:var(--font-ui);font-size:14px">${s.party || '—'}</div></div>
        <div><div class="panel-stat-label">LS Seats</div><div class="panel-stat-val">${s.ls_seats || '—'}</div></div>
        <div><div class="panel-stat-label">Assembly Seats</div><div class="panel-stat-val">${s.assembly_seats || '—'}</div></div>
        <div><div class="panel-stat-label">Region</div><div class="panel-stat-val" style="font-family:var(--font-ui);font-size:14px">${s.region || '—'}</div></div>
        <div><div class="panel-stat-label">Next Election</div><div class="panel-stat-val">${s.next_election || '—'}</div></div>
        <div style="grid-column:span 2"><div class="panel-stat-label">Governor</div><div class="panel-stat-val" style="font-family:var(--font-ui);font-size:13px">${s.governor || '—'}</div></div>
      </div>
      <div class="panel-bar-label">Alliance (NDA vs INDIA vs Others)</div>
      <div class="panel-bar-wrap">
        <div class="panel-bar-fill" style="width:${s.alliance === 'NDA' ? 100 : s.alliance === 'INDIA' ? 100 : 50}%;background:${ALLIANCE_COLOR[s.alliance] || '#607D8B'}"></div>
      </div>
    `;
  }

  // View mode controls
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.view;
      redrawFills();
    });
  });

  // Alliance filter
  document.querySelectorAll('[data-alliance-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-alliance-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentAlliance = btn.dataset.allianceFilter;
      svg.selectAll('#states-group path').each(function(d) {
        const name = (d.properties.NAME_1 || d.properties.ST_NM || '').toLowerCase();
        const s    = stateMap[name] || Object.values(stateMap).find(x => name.includes(x.name.toLowerCase().split(' ')[0]));
        if (currentAlliance === 'all') {
          d3.select(this).classed('dimmed', false).classed('highlighted', false);
        } else {
          const match = s && s.alliance === currentAlliance;
          d3.select(this).classed('dimmed', !match).classed('highlighted', match);
        }
      });
    });
  });

  // Search
  const searchInput = document.getElementById('map-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      svg.selectAll('#states-group path').each(function(d) {
        const name = (d.properties.NAME_1 || d.properties.ST_NM || '').toLowerCase();
        if (!q) { d3.select(this).classed('dimmed', false).classed('highlighted', false); }
        else {
          const match = name.includes(q);
          d3.select(this).classed('dimmed', !match).classed('highlighted', match);
        }
      });
    });
  }
})();

/* ═══════════════════════════════════════════════════
   CURRENT GOVERNMENT
   ═══════════════════════════════════════════════════ */
(async function initGovernment() {
  const section = document.getElementById('government');
  if (!section) return;

  const CABINET = [
    { name: 'Narendra Modi',       portfolio: 'Prime Minister',           party: 'BJP' },
    { name: 'Rajnath Singh',       portfolio: 'Defence',                  party: 'BJP' },
    { name: 'Amit Shah',           portfolio: 'Home & Cooperation',       party: 'BJP' },
    { name: 'Nitin Gadkari',       portfolio: 'Road Transport',           party: 'BJP' },
    { name: 'J. P. Nadda',         portfolio: 'Health & BJP President',   party: 'BJP' },
    { name: 'Shivraj Chouhan',     portfolio: 'Agriculture',              party: 'BJP' },
    { name: 'Nirmala Sitharaman',  portfolio: 'Finance & Corporate',      party: 'BJP' },
    { name: 'S. Jaishankar',       portfolio: 'External Affairs',         party: 'BJP' },
    { name: 'Manohar Lal Khattar', portfolio: 'Housing & Urban Affairs',  party: 'BJP' },
    { name: 'H. D. Kumaraswamy',   portfolio: 'HMT & Steel',             party: 'JDU' },
    { name: 'Piyush Goyal',        portfolio: 'Commerce & Industry',      party: 'BJP' },
    { name: 'Dharmendra Pradhan',  portfolio: 'Education',                party: 'BJP' },
    { name: 'Jitan Ram Manjhi',    portfolio: 'MSME',                     party: 'HAM' },
    { name: 'Rajiv Ranjan Singh',  portfolio: 'Jal Shakti',              party: 'JDU' },
    { name: 'Sarbananda Sonowal',  portfolio: 'Ports, Shipping & Waterways', party: 'BJP' },
    { name: 'Virendra Kumar',      portfolio: 'Social Justice & Empowerment', party: 'BJP' },
    { name: 'Kinjarapu Ram Mohan', portfolio: 'Civil Aviation',           party: 'TDP' },
    { name: 'Chirag Paswan',       portfolio: 'Food Processing',          party: 'LJPRV' },
    { name: 'C. R. Patil',         portfolio: 'Jal Shakti (MoS)',        party: 'BJP' },
    { name: 'G. Kishan Reddy',     portfolio: 'Coal & Mines',            party: 'BJP' },
    { name: 'Prahlad Joshi',       portfolio: 'New & Renewable Energy',   party: 'BJP' },
    { name: 'Jyotiraditya Scindia',portfolio: 'Telecom & Development of NE', party: 'BJP' },
    { name: 'Bhupender Yadav',     portfolio: 'Environment, Forest & Climate', party: 'BJP' },
    { name: 'Giriraj Singh',       portfolio: 'Textiles',                 party: 'BJP' },
    { name: 'Ashwini Vaishnaw',    portfolio: 'Railways, IT & Electronics', party: 'BJP' },
    { name: 'Mansukh Mandaviya',   portfolio: 'Labour & Employment',      party: 'BJP' },
    { name: 'Kiren Rijiju',        portfolio: 'Parliamentary Affairs & Minority', party: 'BJP' },
    { name: 'Hardeep Puri',        portfolio: 'Petroleum & Natural Gas',  party: 'BJP' },
    { name: 'Dr. Virendra Kumar',  portfolio: 'Tribal Affairs',           party: 'BJP' },
    { name: 'Annpurna Devi',       portfolio: 'Women & Child Development', party: 'BJP' },
  ];

  const grid = document.getElementById('cabinet-grid');
  if (grid) {
    grid.innerHTML = CABINET.map(m => `
      <div class="minister-card reveal">
        <div class="minister-name">${m.name}</div>
        <div class="minister-portfolio">${m.portfolio}</div>
        <span class="minister-party">${m.party}</span>
      </div>
    `).join('');
  }

  const showAllBtn = document.getElementById('show-all-cabinet');
  if (showAllBtn && grid) {
    grid.querySelectorAll('.minister-card:nth-child(n+9)').forEach(c => c.style.display = 'none');
    showAllBtn.addEventListener('click', () => {
      grid.querySelectorAll('.minister-card').forEach(c => c.style.display = '');
      showAllBtn.style.display = 'none';
    });
  }

  // Re-trigger scroll reveal for dynamically added cards
  setTimeout(() => {
    document.querySelectorAll('#cabinet-grid .reveal').forEach(el => {
      if (typeof window.VIQ_revealObserver !== 'undefined') window.VIQ_revealObserver.observe(el);
    });
  }, 100);
})();

/* ═══════════════════════════════════════════════════
   LEADERS (Tabbed + Card Flip)
   ═══════════════════════════════════════════════════ */
(async function initLeaders() {
  const section = document.getElementById('leaders');
  if (!section) return;

  const leaders = await fetchData('leaders');
  if (!leaders.length) return;

  const tabs  = { government: [], opposition: [], eci: [] };
  leaders.forEach(l => { if (tabs[l.tab]) tabs[l.tab].push(l); });

  const renderCard = (l) => `
    <div class="leader-card" tabindex="0" role="button" aria-label="Flip card for ${l.name}" onclick="this.classList.toggle('flipped')" onkeypress="if(event.key==='Enter')this.classList.toggle('flipped')">
      <div class="leader-card-inner">
        <div class="leader-front">
          <div class="leader-photo-placeholder" aria-hidden="true">👤</div>
          <div class="leader-name">${l.name}</div>
          <div class="leader-role">${l.role}</div>
          <span class="leader-party-badge">${l.party}</span>
          <div class="leader-constituency">${l.constituency || ''}</div>
        </div>
        <div class="leader-back" aria-hidden="true">
          <div class="leader-name">${l.name}</div>
          <div class="leader-back-row">📅 Born: <strong>${l.born}</strong></div>
          <div class="leader-back-row">🎓 <strong>${l.education || 'N/A'}</strong></div>
          <div class="leader-back-row">🏛️ In politics: <strong>${l.years_in_politics || '—'} years</strong></div>
          ${l.margin ? `<div class="leader-back-row">✅ Win margin: <strong>${l.margin.toLocaleString('en-IN')}</strong></div>` : ''}
          <span class="leader-party-badge">${l.alliance || l.party}</span>
        </div>
      </div>
    </div>
  `;

  const paneGovt = document.getElementById('pane-government');
  const paneOpp  = document.getElementById('pane-opposition');
  const paneEci  = document.getElementById('pane-eci');

  if (paneGovt) paneGovt.innerHTML = `<div class="leaders-grid">${tabs.government.map(renderCard).join('')}</div>`;
  if (paneOpp)  paneOpp.innerHTML  = `<div class="leaders-grid">${tabs.opposition.map(renderCard).join('')}</div>`;
  if (paneEci)  paneEci.innerHTML  = `<div class="leaders-grid">${tabs.eci.map(renderCard).join('')}</div>`;

  // Tab switching
  document.querySelectorAll('.leader-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.leader-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.leader-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(`pane-${tab.dataset.tab}`);
      if (pane) pane.classList.add('active');
    });
  });
})();

/* ═══════════════════════════════════════════════════
   POLITICAL PARTIES (Filter + Modal)
   ═══════════════════════════════════════════════════ */
(async function initParties() {
  const grid = document.getElementById('parties-grid');
  if (!grid) return;

  const parties = await fetchData('parties');
  if (!parties.length) return;

  const renderCard = (p) => `
    <div class="party-card" data-alliance="${p.alliance}" data-id="${p.id}"
         role="button" tabindex="0" aria-label="${p.name} — click for details"
         onclick="openPartyModal(${JSON.stringify(JSON.stringify(p)).slice(1,-1)})"
         onkeypress="if(event.key==='Enter')this.click()">
      <span class="party-alliance-badge ${p.alliance === 'NDA' ? 'nda' : p.alliance === 'INDIA' ? 'india' : 'other'}">${p.alliance}</span>
      <div class="party-abbr" style="color:${p.color || 'var(--text-saffron)'}">${p.abbr}</div>
      <div class="party-full-name">${p.name}</div>
      <div class="party-stat-row"><span class="party-stat-key">LS Seats</span><span class="party-stat-val">${p.ls_seats}</span></div>
      <div class="party-stat-row"><span class="party-stat-key">RS Seats</span><span class="party-stat-val">${p.rs_seats}</span></div>
      <div class="party-stat-row"><span class="party-stat-key">Founded</span><span class="party-stat-val">${p.founded}</span></div>
      <div class="party-stat-row"><span class="party-stat-key">President</span><span class="party-stat-val" style="font-size:11px;font-family:var(--font-body)">${p.president}</span></div>
    </div>
  `;

  grid.innerHTML = parties.map(renderCard).join('');

  // Alliance filter
  document.querySelectorAll('[data-party-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-party-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.partyFilter;
      document.querySelectorAll('.party-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.alliance !== f);
      });
    });
  });
})();

// Party modal (global)
window.openPartyModal = function(jsonStr) {
  try {
    const p = JSON.parse(jsonStr);
    const overlay = document.getElementById('party-modal');
    if (!overlay) return;
    overlay.querySelector('.modal-title').textContent = p.name;
    overlay.querySelector('.modal-subtitle').textContent = `${p.abbr} · Founded ${p.founded} · ${p.alliance} Alliance`;
    overlay.querySelector('.modal-grid').innerHTML = `
      <div class="modal-stat"><div class="modal-stat-label">Lok Sabha Seats</div><div class="modal-stat-val">${p.ls_seats}</div></div>
      <div class="modal-stat"><div class="modal-stat-label">Rajya Sabha Seats</div><div class="modal-stat-val">${p.rs_seats}</div></div>
      <div class="modal-stat"><div class="modal-stat-label">Party President</div><div class="modal-stat-val" style="font-size:14px;font-family:var(--font-ui)">${p.president}</div></div>
      <div class="modal-stat"><div class="modal-stat-label">Ideology</div><div class="modal-stat-val" style="font-size:13px;font-family:var(--font-body)">${p.ideology}</div></div>
      <div class="modal-stat" style="grid-column:span 2"><div class="modal-stat-label">Ruling States</div><div class="modal-stat-val" style="font-size:13px;font-family:var(--font-body)">${(p.ruling_states || []).join(', ') || '—'}</div></div>
    `;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
  } catch(e) { console.error('Modal error', e); }
};

window.closePartyModal = function() {
  const overlay = document.getElementById('party-modal');
  if (overlay) { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden', 'true'); }
};

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') window.closePartyModal();
});
