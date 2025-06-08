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
  }

  // Announcements logic
  const announcementsList = document.getElementById('announcement-list');
  if (announcementsList) {
    fetch('./assets/data/announcements.json')
      .then(response => response.json())
      .then(data => {
        announcementsList.innerHTML = '';
        data.announcements.forEach((item, idx) => {
          // Create the clickable announcement item
          const li = document.createElement('li');
          li.className = 'announcement-item';

          // Title bar
          const titleDiv = document.createElement('div');
          titleDiv.className = 'announcement-title';
          titleDiv.textContent = item.title || item.text || `Announcement ${idx+1}`;
          li.appendChild(titleDiv);

          // Content (hidden by default)
          const contentDiv = document.createElement('div');
          contentDiv.className = 'announcement-content';
          contentDiv.style.display = 'none';
          // Support multi-line content
          contentDiv.innerHTML = (item.content || item.text || '').replace(/\n/g, '<br>');
          li.appendChild(contentDiv);

          // Toggle logic
          titleDiv.addEventListener('click', function() {
            const isOpen = contentDiv.style.display === 'block';
            // Close all others
            document.querySelectorAll('.announcement-content').forEach(el => el.style.display = 'none');
            if (!isOpen) {
              contentDiv.style.display = 'block';
            } else {
              contentDiv.style.display = 'none';
            }
          });

          announcementsList.appendChild(li);
        });
      })
      .catch(() => {
        announcementsList.innerHTML = '<li class="announcement-item">No announcements at this time.</li>';
      });
  }
});