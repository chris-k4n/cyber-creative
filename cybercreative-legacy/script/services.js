    // ── Service panel iframe loader ──────────────────────────────────────────
    const panelFiles = {
      web: 'services/service-web.html',
      app: 'services/service-app.html',
      tech: 'services/service-tech.html',
      hardware: 'services/service-hardware.html',
      software: 'services/service-software.html'
    };

    const centerIcons = {
      web: 'fa-laptop-code',
      app: 'fa-mobile-screen-button',
      tech: 'fa-headset',
      hardware: 'fa-microchip',
      software: 'fa-layer-group'
    };

    const centerNums = {
      web: '01/05', app: '02/05', tech: '03/05', hardware: '04/05', software: '05/05'
    };

    const frame = document.getElementById('servicePanelFrame');
    const slices = document.querySelectorAll('.arc-slice');
    const tabs = document.querySelectorAll('.service-tab');
    const iconEl = document.getElementById('arcCenterIcon');
    const numEl = document.getElementById('arcCenterNum');

    function loadPanel(key) {
      // Animate out
      frame.classList.remove('visible');

      setTimeout(() => {
        frame.src = panelFiles[key];
        frame.onload = () => frame.classList.add('visible');
      }, 200);

      // Update center
      iconEl.innerHTML = `<i class="fa-solid ${centerIcons[key]}"></i>`;
      numEl.textContent = centerNums[key];

      // Update active slice
      slices.forEach(s => s.classList.toggle('active', s.dataset.panel === key));

      // Update active tab (mobile)
      tabs.forEach(t => t.classList.toggle('active', t.dataset.panel === key));

      // Scroll the panel into view on mobile when switching tabs
      if (window.innerWidth <= 860) {
        frame.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Attach clicks to SVG slices
    slices.forEach(slice => {
      slice.style.cursor = 'pointer';
      slice.addEventListener('click', () => loadPanel(slice.dataset.panel));
      // Keyboard support (slices get tabindex/role="button" from script.js)
      slice.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          loadPanel(slice.dataset.panel);
        }
      });
    });

    // Attach clicks to mobile tab pills
    tabs.forEach(tab => {
      tab.addEventListener('click', () => loadPanel(tab.dataset.panel));
    });

    // Show first panel on load
    window.addEventListener('load', () => {
      frame.classList.add('visible');
    });

    // NOTE: previously a MutationObserver here watched slices for
    // 'active' class changes and re-called loadPanel() whenever the
    // class changed. Since loadPanel() itself is what sets that class,
    // it was observing its own output and re-triggering itself on every
    // click (double iframe load, double icon flash). Removed — clicks
    // and keyboard activation above call loadPanel() directly, which is
    // the only trigger this page needs.

