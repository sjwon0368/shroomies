document.addEventListener('DOMContentLoaded', function() {
  // Top banner logic
  const bannerRoot = document.getElementById('top-banner-root');
  if (bannerRoot) {
    fetch('./page-settings.json')
      .then(res => res.json())
      .then(settings => {
        const banner = document.createElement('div');
        banner.className = 'top-banner';

        // Logo
        if (settings.logo) {
          const logo = document.createElement('img');
          logo.className = 'top-banner-logo';
          logo.src = settings.logo;
          logo.alt = settings.logoAlt || 'Logo';
          banner.appendChild(logo);
        }

        // Items
        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'top-banner-items';
        (settings.items || []).forEach(item => {
          const a = document.createElement('a');
          a.className = 'top-banner-item';
          a.href = item.href || '#';
          a.textContent = item.label || '';
          itemsDiv.appendChild(a);
        });
        banner.appendChild(itemsDiv);

        bannerRoot.appendChild(banner);
      })
      .catch(() => {
        // Optionally handle error or show fallback banner
      });
  }})