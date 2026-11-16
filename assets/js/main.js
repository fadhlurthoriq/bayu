// Komponen header dan footer digunakan bersama di semua halaman.
const pathPrefix = location.pathname.includes('/pages/') ? '../' : '';
const navItems = [
  {label:'Beranda',href:pathPrefix+'index.html',key:'index'},
  {label:'Profil',href:pathPrefix+'pages/profil.html',key:'profil'},
  {label:'Berita',href:pathPrefix+'pages/berita.html',key:'berita'},
  {label:'Layanan',href:pathPrefix+'pages/layanan.html',key:'layanan'},
  {label:'Kontak',href:pathPrefix+'pages/kontak.html',key:'kontak'}
];
const currentFile = location.pathname.split('/').pop() || 'index.html';
const currentKey = currentFile.replace('.html','');
const linkClass = item => `nav-link ${currentKey===item.key?'active':''}`;
const navLink = item => `<a class="${linkClass(item)}" href="${item.href}">${item.label}</a>`;

document.getElementById('site-header').innerHTML = `
<header class="site-header" id="header">
  <div class="container flex h-[76px] items-center justify-between gap-5">
    <a href="${pathPrefix}index.html" class="flex items-center gap-3" aria-label="Nusa Digital, beranda">
      <span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-sm font-extrabold text-white">ND</span>
      <span><span class="block text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">NUSA DIGITAL</span><span class="block text-[9px] font-semibold tracking-[.13em] text-slate-500">PORTAL INFORMASI</span></span>
    </a>
    <nav class="desktop-nav flex items-center gap-7" aria-label="Navigasi utama">
      ${navLink(navItems[0])}
      <div class="dropdown relative">
        <button class="nav-link inline-flex items-center gap-1" id="about-toggle" aria-expanded="false">Tentang <span>⌄</span></button>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="${pathPrefix}pages/profil.html">Profil organisasi</a>
          <a class="dropdown-item" href="${pathPrefix}pages/profil.html#visi">Visi dan misi</a>
        </div>
      </div>
      ${navLink(navItems[2])}${navLink(navItems[3])}${navLink(navItems[4])}
    </nav>
    <div class="flex items-center gap-2">
      <button id="theme-toggle" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Ganti tema"><span id="theme-icon">☾</span></button>
      <button id="mobile-toggle" class="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-lg md:hidden dark:border-slate-700" aria-label="Buka menu" aria-expanded="false">☰</button>
    </div>
  </div>
  <div id="mobile-panel" class="mobile-panel bg-white px-5 pb-4 dark:bg-slate-950 md:hidden">
    <nav class="container flex flex-col gap-1" aria-label="Navigasi mobile">
      ${navItems.map(navLink).join('')}
      <div class="dropdown"><button class="nav-link py-3" id="mobile-about-toggle">Tentang ⌄</button><div class="dropdown-menu"><a class="dropdown-item" href="${pathPrefix}pages/profil.html">Profil organisasi</a><a class="dropdown-item" href="${pathPrefix}pages/profil.html#visi">Visi dan misi</a></div></div>
    </nav>
  </div>
</header>`;

document.getElementById('site-footer').innerHTML = `
<footer class="site-footer">
  <div class="container grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
    <div><a href="${pathPrefix}index.html" class="flex items-center gap-3"><span class="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-sm font-extrabold text-white">ND</span><span class="text-sm font-extrabold text-slate-900 dark:text-white">NUSA DIGITAL</span></a><p class="mt-4 max-w-sm text-xs leading-7 text-slate-500">Portal informasi dan layanan. Ganti deskripsi ini dengan identitas organisasi atau proyek kamu.</p></div>
    <div><h3 class="text-xs font-extrabold text-slate-900 dark:text-white">Navigasi</h3><div class="mt-4 grid grid-cols-2 gap-3">${navItems.map(i=>`<a class="footer-link" href="${i.href}">${i.label}</a>`).join('')}</div></div>
    <div><h3 class="text-xs font-extrabold text-slate-900 dark:text-white">Informasi kontak</h3><p class="mt-4 text-xs leading-7 text-slate-500">halo@domainanda.id<br>Indonesia</p></div>
  </div>
  <div class="border-t border-slate-200/80 py-5 dark:border-slate-800"><div class="container flex flex-col justify-between gap-2 text-[10px] text-slate-500 sm:flex-row"><span>© <span id="year"></span> Nusa Digital. Seluruh hak cipta dilindungi.</span><span>Dibuat dengan fokus pada aksesibilitas dan kemudahan informasi.</span></div></div>
</footer>`;

const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
function updateThemeIcon(){themeIcon.textContent=root.classList.contains('dark')?'☀':'☾';}
updateThemeIcon();
themeToggle.addEventListener('click',()=>{root.classList.toggle('dark');localStorage.setItem('site-theme',root.classList.contains('dark')?'dark':'light');updateThemeIcon();});

const mobileToggle=document.getElementById('mobile-toggle');
const mobilePanel=document.getElementById('mobile-panel');
mobileToggle.addEventListener('click',()=>{const opened=mobilePanel.classList.toggle('open');mobileToggle.setAttribute('aria-expanded',String(opened));mobileToggle.textContent=opened?'×':'☰';});
document.getElementById('about-toggle')?.addEventListener('click',e=>{const parent=e.currentTarget.closest('.dropdown');parent.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(parent.classList.contains('open')));});
document.getElementById('mobile-about-toggle')?.addEventListener('click',e=>e.currentTarget.closest('.dropdown').classList.toggle('open'));

const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>8),{passive:true});
document.getElementById('year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Pencarian sederhana untuk daftar berita.
const search=document.getElementById('news-search');
if(search){search.addEventListener('input',()=>{const term=search.value.toLowerCase().trim();let visible=0;document.querySelectorAll('#news-grid article').forEach(card=>{const match=(card.dataset.search||card.innerText).toLowerCase().includes(term);card.classList.toggle('hidden',!match);if(match)visible++;});document.getElementById('empty-state').classList.toggle('hidden',visible!==0);});}

// Form kontak demo: belum mengirim data ke server.
document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('form-message').textContent='Terima kasih! Form demo berhasil divalidasi, tetapi belum terhubung ke backend.';e.currentTarget.reset();});
