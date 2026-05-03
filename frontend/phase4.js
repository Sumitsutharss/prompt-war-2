'use strict';
/* ═══════════════════════════════════════════════════
   VoteIQ India — Phase 4 JS
   Parliament · States · 2024 Results
   ═══════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════
   PARLIAMENT — D3.js Semicircle Seating Charts
   ═══════════════════════════════════════════════════ */
(function initParliament() {
  const LS_ALLIANCES = [
    { name: 'BJP',       seats: 240, color: '#FF6200', alliance: 'NDA'    },
    { name: 'INC',       seats: 99,  color: '#12B05E', alliance: 'INDIA'  },
    { name: 'SP',        seats: 37,  color: '#E53935', alliance: 'INDIA'  },
    { name: 'TMC',       seats: 29,  color: '#1E88E5', alliance: 'INDIA'  },
    { name: 'DMK',       seats: 22,  color: '#D32F2F', alliance: 'INDIA'  },
    { name: 'TDP',       seats: 16,  color: '#FFD600', alliance: 'NDA'    },
    { name: 'JDU',       seats: 12,  color: '#4CAF50', alliance: 'NDA'    },
    { name: 'SHS(S)',    seats: 7,   color: '#FF6D00', alliance: 'NDA'    },
    { name: 'NCP(AP)',   seats: 4,   color: '#009688', alliance: 'NDA'    },
    { name: 'YSRCP',     seats: 4,   color: '#7B1FA2', alliance: 'Others' },
    { name: 'LJPRV',     seats: 5,   color: '#3F51B5', alliance: 'NDA'    },
    { name: 'AAP',       seats: 3,   color: '#2196F3', alliance: 'INDIA'  },
    { name: 'CPI(M)',    seats: 4,   color: '#B71C1C', alliance: 'INDIA'  },
    { name: 'NC',        seats: 2,   color: '#006064', alliance: 'INDIA'  },
    { name: 'JMM',       seats: 3,   color: '#795548', alliance: 'INDIA'  },
    { name: 'SHS(UBT)', seats: 9,   color: '#E65100', alliance: 'INDIA'  },
    { name: 'NCP(SP)',   seats: 8,   color: '#26C6DA', alliance: 'INDIA'  },
    { name: 'RJD',       seats: 4,   color: '#F44336', alliance: 'INDIA'  },
    { name: 'Others',    seats: 16,  color: '#607D8B', alliance: 'Others' },
  ];
  const RS_ALLIANCES = [
    { name: 'BJP',    seats: 86, color: '#FF6200', alliance: 'NDA'    },
    { name: 'INC',    seats: 26, color: '#12B05E', alliance: 'INDIA'  },
    { name: 'TMC',    seats: 13, color: '#1E88E5', alliance: 'INDIA'  },
    { name: 'AAP',    seats: 10, color: '#2196F3', alliance: 'INDIA'  },
    { name: 'DMK',    seats: 10, color: '#D32F2F', alliance: 'INDIA'  },
    { name: 'BJD',    seats: 7,  color: '#1565C0', alliance: 'Others' },
    { name: 'YSRCP',  seats: 9,  color: '#7B1FA2', alliance: 'Others' },
    { name: 'BRS',    seats: 3,  color: '#F57F17', alliance: 'Others' },
    { name: 'TDP',    seats: 6,  color: '#FFD600', alliance: 'NDA'    },
    { name: 'JDU',    seats: 5,  color: '#4CAF50', alliance: 'NDA'    },
    { name: 'CPI(M)', seats: 5,  color: '#B71C1C', alliance: 'INDIA'  },
    { name: 'RJD',    seats: 6,  color: '#F44336', alliance: 'INDIA'  },
    { name: 'Others', seats: 59, color: '#607D8B', alliance: 'Others' },
  ];

  function drawSemicircle(containerId, data, totalSeats, majorityLine) {
    const el = document.getElementById(containerId);
    if (!el || typeof d3 === 'undefined') return;
    const W = el.clientWidth || 560, H = 280;
    const cx = W / 2, cy = H - 20, r = Math.min(W * 0.43, H - 40);

    const svg = d3.select(`#${containerId}`)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    svg.selectAll('*').remove();

    // Background arc (full semicircle)
    const bgArc = d3.arc().innerRadius(r * 0.38).outerRadius(r).startAngle(-Math.PI / 2).endAngle(Math.PI / 2);
    svg.append('path').attr('d', bgArc).attr('transform', `translate(${cx},${cy})`).attr('fill', '#0A0C14');

    // Party arcs
    const total = data.reduce((s, d) => s + d.seats, 0);
    let cumAngle = -Math.PI / 2;

    data.forEach(d => {
      const sweep = (d.seats / total) * Math.PI;
      const arc = d3.arc().innerRadius(r * 0.40).outerRadius(r - 3)
        .startAngle(cumAngle).endAngle(cumAngle + sweep);
      const midAngle = cumAngle + sweep / 2;
      svg.append('path')
        .attr('d', arc).attr('transform', `translate(${cx},${cy})`)
        .attr('fill', d.color).attr('stroke', '#04050A').attr('stroke-width', 1)
        .attr('tabindex', 0).attr('role', 'img')
        .attr('aria-label', `${d.name}: ${d.seats} seats`)
        .on('mouseover', function(event) {
          d3.select(this).attr('opacity', 0.8);
          const tt = document.getElementById('parl-tooltip');
          if (tt) { tt.style.opacity = 1; tt.style.left = (event.clientX + 12) + 'px'; tt.style.top = (event.clientY - 8) + 'px'; tt.textContent = `${d.name}: ${d.seats} seats (${((d.seats/total)*100).toFixed(1)}%)`; }
        })
        .on('mouseout', function() { d3.select(this).attr('opacity', 1); const tt = document.getElementById('parl-tooltip'); if (tt) tt.style.opacity = 0; });
      // Labels for bigger parties
      if (d.seats >= 15) {
        const lx = cx + (r * 0.68) * Math.cos(midAngle - Math.PI / 2);
        const ly = cy + (r * 0.68) * Math.sin(midAngle - Math.PI / 2);
        svg.append('text').attr('x', lx).attr('y', ly).attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle').attr('fill', '#fff')
          .attr('font-size', '10').attr('font-family', 'Rajdhani').attr('font-weight', 600)
          .text(d.seats);
      }
      cumAngle += sweep;
    });

    // Majority line
    const majPct = majorityLine / total;
    const majAngle = -Math.PI / 2 + majPct * Math.PI;
    const mx1 = cx + r * 0.35 * Math.cos(majAngle - Math.PI / 2);
    const my1 = cy + r * 0.35 * Math.sin(majAngle - Math.PI / 2);
    const mx2 = cx + r * 1.02 * Math.cos(majAngle - Math.PI / 2);
    const my2 = cy + r * 1.02 * Math.sin(majAngle - Math.PI / 2);
    svg.append('line').attr('x1', mx1).attr('y1', my1).attr('x2', mx2).attr('y2', my2)
      .attr('stroke', '#fff').attr('stroke-width', 2).attr('stroke-dasharray', '4,3');
    svg.append('text').attr('x', mx2 + 4).attr('y', my2).attr('fill', '#A09880')
      .attr('font-size', 10).attr('font-family', 'Rajdhani').text(`${majorityLine} majority`);

    // Centre totals
    svg.append('text').attr('x', cx).attr('y', cy - 24).attr('text-anchor', 'middle')
      .attr('fill', '#F0EDE8').attr('font-size', 28).attr('font-family', 'JetBrains Mono').attr('font-weight', 600)
      .text(totalSeats);
    svg.append('text').attr('x', cx).attr('y', cy - 6).attr('text-anchor', 'middle')
      .attr('fill', '#A09880').attr('font-size', 11).attr('font-family', 'Rajdhani')
      .text('TOTAL SEATS');
  }

  // Draw on load + tab switch
  function drawLS() { drawSemicircle('ls-chart', LS_ALLIANCES, 543, 272); renderParlStats('ls-stats', LS_ALLIANCES); }
  function drawRS() { drawSemicircle('rs-chart', RS_ALLIANCES, 245, 123); renderParlStats('rs-stats', RS_ALLIANCES); }

  function renderParlStats(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const sorted = [...data].sort((a, b) => b.seats - a.seats).slice(0, 8);
    el.innerHTML = sorted.map(d => `
      <div class="parl-stat-card">
        <div class="parl-stat-dot" style="background:${d.color}"></div>
        <div class="parl-stat-name">${d.name}</div>
        <div class="parl-stat-seats">${d.seats}</div>
      </div>
    `).join('');
  }

  // Tab logic
  document.querySelectorAll('.parl-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.parl-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.parl-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = document.getElementById(`parl-pane-${tab.dataset.pane}`);
      if (pane) { pane.classList.add('active'); if (tab.dataset.pane === 'ls') drawLS(); else drawRS(); }
    });
  });

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const content = btn.nextElementSibling;
      if (content) content.classList.toggle('open', !expanded);
    });
  });

  // Draw initial LS chart after a short delay (wait for D3 to load)
  setTimeout(drawLS, 500);
})();

/* ═══════════════════════════════════════════════════
   STATES DASHBOARD — 31 States / UTs
   ═══════════════════════════════════════════════════ */
(async function initStatesDashboard() {
  const grid = document.getElementById('states-grid');
  const tableBody = document.getElementById('states-table-body');
  if (!grid) return;

  const states = await window.VIQ && window.VIQ.states ? window.VIQ.states : (await fetch('/api/data/states').then(r => r.json()).catch(() => []));

  const renderCard = (s) => `
    <div class="state-card" data-alliance="${s.alliance}" data-name="${s.name.toLowerCase()}" data-region="${s.region}">
      <div class="state-card-header">
        <div class="state-name-card">${s.name}</div>
        <div class="state-region-badge">${s.region}</div>
      </div>
      <div class="state-cm">CM: <strong>${s.cm}</strong></div>
      <div class="state-party-line">${s.party} · ${s.alliance}</div>
      <div class="state-stats-mini">
        <div class="state-mini-stat"><div class="state-mini-val">${s.ls_seats}</div><div class="state-mini-key">LS Seats</div></div>
        <div class="state-mini-stat"><div class="state-mini-val">${s.assembly_seats}</div><div class="state-mini-key">MLA Seats</div></div>
      </div>
      <div class="state-next-badge">🗓 Next: ${s.next_election}</div>
    </div>
  `;

  if (grid) {
    grid.innerHTML = states.map(renderCard).join('');
    window.VIQ = window.VIQ || {};
    window.VIQ.states = states;
  }

  // Table view
  if (tableBody) {
    tableBody.innerHTML = states.map(s => {
      const allianceColor = { NDA: '#FF6200', INDIA: '#12B05E', Others: '#607D8B', LDF: '#E53935' };
      return `<tr>
        <td><span class="alliance-dot" style="background:${allianceColor[s.alliance]||'#607D8B'}"></span>${s.name}</td>
        <td>${s.cm}</td>
        <td>${s.party}</td>
        <td><span class="alliance-tag ${s.alliance.toLowerCase().replace(' ','')}">${s.alliance}</span></td>
        <td>${s.ls_seats}</td>
        <td>${s.assembly_seats}</td>
        <td>${s.next_election}</td>
        <td>${s.region}</td>
      </tr>`;
    }).join('');
  }

  // Search
  const searchInput = document.getElementById('states-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.state-card').forEach(card => {
        const name = card.dataset.name || '';
        card.classList.toggle('hidden', q.length > 0 && !name.includes(q));
      });
    });
  }

  // Region filter
  document.querySelectorAll('[data-region-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-region-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.regionFilter;
      document.querySelectorAll('.state-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.region !== f);
      });
    });
  });

  // Card / Table toggle
  document.getElementById('view-cards')?.addEventListener('click', () => {
    document.getElementById('view-cards').classList.add('active');
    document.getElementById('view-table').classList.remove('active');
    grid.style.display = 'grid';
    document.getElementById('states-table-wrap').classList.remove('active');
  });
  document.getElementById('view-table')?.addEventListener('click', () => {
    document.getElementById('view-table').classList.add('active');
    document.getElementById('view-cards').classList.remove('active');
    grid.style.display = 'none';
    document.getElementById('states-table-wrap').classList.add('active');
  });

  // CSV export
  document.getElementById('export-csv')?.addEventListener('click', () => {
    if (!states.length) return;
    const headers = ['State','CM','Party','Alliance','LS Seats','Assembly Seats','Next Election','Region'];
    const rows = states.map(s => [s.name, s.cm, s.party, s.alliance, s.ls_seats, s.assembly_seats, s.next_election, s.region]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    a.download = 'voteiq-india-states-2026.csv'; a.click();
  });
})();

/* ═══════════════════════════════════════════════════
   2024 LOK SABHA RESULTS
   ═══════════════════════════════════════════════════ */
(async function initResults2024() {
  const section = document.getElementById('results-2024');
  if (!section) return;

  // Stacked bar animation
  const bar = section.querySelector('.results-stacked');
  if (bar) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        section.querySelector('.results-stacked-nda').style.width   = `${(293/543*100).toFixed(1)}%`;
        section.querySelector('.results-stacked-india').style.width = `${(234/543*100).toFixed(1)}%`;
        section.querySelector('.results-stacked-other').style.width = `${(16/543*100).toFixed(1)}%`;
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(bar);
  }

  // Party comparison bar chart (Chart.js)
  const chartCanvas = document.getElementById('results-chart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const topParties = [
      { name: 'BJP', seats: 240, color: '#FF6200' },
      { name: 'INC', seats: 99,  color: '#12B05E' },
      { name: 'SP',  seats: 37,  color: '#E53935' },
      { name: 'TMC', seats: 29,  color: '#1E88E5' },
      { name: 'DMK', seats: 22,  color: '#D32F2F' },
      { name: 'TDP', seats: 16,  color: '#FFD600' },
      { name: 'JDU', seats: 12,  color: '#4CAF50' },
      { name: 'SHS(UBT)', seats: 9, color: '#E65100' },
      { name: 'NCP(SP)', seats: 8, color: '#26C6DA' },
      { name: 'LJPRV', seats: 5, color: '#3F51B5' },
    ];
    new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: topParties.map(p => p.name),
        datasets: [{
          label: 'Lok Sabha Seats Won (2024)',
          data: topParties.map(p => p.seats),
          backgroundColor: topParties.map(p => p.color),
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.raw} seats` } }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A09880', font: { family: 'Rajdhani', weight: '600' } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#A09880', font: { family: 'JetBrains Mono' } }, beginAtZero: true, max: 260 }
        }
      }
    });
  }

  // Constituencies table
  const results = await fetch('/api/data/results_2024').then(r => r.json()).catch(() => []);
  const tbody = document.getElementById('const-table-body');
  if (tbody && results.length) {
    tbody.innerHTML = results.slice(0, 30).map(r => {
      const allianceTag = r.alliance === 'NDA' ? 'nda' : r.alliance === 'INDIA' ? 'india' : 'other';
      return `<tr>
        <td>${r.name}</td>
        <td>${r.state}</td>
        <td><strong>${r.winner}</strong></td>
        <td><span class="alliance-tag ${allianceTag}">${r.party}</span></td>
        <td>${r.margin.toLocaleString('en-IN')}</td>
        <td>${r.turnout ? r.turnout + '%' : '—'}</td>
      </tr>`;
    }).join('');
  }

  // Show more
  document.getElementById('show-more-results')?.addEventListener('click', async () => {
    const res = await fetch('/api/data/results_2024').then(r => r.json()).catch(() => []);
    const tbody = document.getElementById('const-table-body');
    if (tbody) {
      tbody.innerHTML = res.map(r => {
        const allianceTag = r.alliance === 'NDA' ? 'nda' : r.alliance === 'INDIA' ? 'india' : 'other';
        return `<tr><td>${r.name}</td><td>${r.state}</td><td><strong>${r.winner}</strong></td><td><span class="alliance-tag ${allianceTag}">${r.party}</span></td><td>${r.margin.toLocaleString('en-IN')}</td><td>${r.turnout ? r.turnout + '%' : '—'}</td></tr>`;
      }).join('');
    }
    document.getElementById('show-more-results').style.display = 'none';
  });
})();
