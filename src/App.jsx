import React, { useEffect, useRef, useState } from 'react';

const Icon = ({ name, size = 22, className = '' }) => {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };

  const drawings = {
    building: <><path d="M4 21V5.5L12 2l8 3.5V21"/><path d="M2 21h20M8 8h1m6 0h1M8 12h1m6 0h1M8 16h1m6 0h1M11 21v-3h2v3"/></>,
    calculator: <><rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
    settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="m19.4 15 .1.1 1.3 1-1.3 2.3-1.6-.6a8 8 0 0 1-1.7 1l-.3 1.7h-2.7l-.3-1.7a8 8 0 0 1-1.7-1l-1.6.6-1.3-2.3 1.3-1a7 7 0 0 1 0-2L6.3 12l1.3-2.3 1.6.6a8 8 0 0 1 1.7-1l.3-1.7h2.7l.3 1.7a8 8 0 0 1 1.7 1l1.6-.6 1.3 2.3-1.3 1a7 7 0 0 1-.1 2Z"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    chart: <><path d="M3 3v18h18"/><path d="m8 14 4-4 3 3 6-7"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    handshake: <><path d="m3 11 4-4 4 1 2-1 4 1 4 4-3 3-3-1-3 2-3-2-2 1-4-4Z"/><path d="m7 7 2-2 4 1 2 1m-8 9-2 2m6-2-2 2m5-3-2 2"/></>,
    eye: <><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="2.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    up: <><path d="M12 19V5m-7 7 7-7 7 7"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l1.8-5.1A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 11h8M8 14h5"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h8"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3.2a2 2 0 0 1-.6 1.7L7.2 10.4a16 16 0 0 0 6.4 6.4l1.8-1.8a2 2 0 0 1 1.7-.6l3.2.5a2 2 0 0 1 1.7 2Z"/></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-9 6a2 2 0 0 1-2 0L2 7"/></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    whatsapp: <><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 21l1.8-4.8a8.5 8.5 0 1 1 15.7-4.4Z"/><path d="M8.5 8.5c.3-.7.6-.7 1-.7h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.3.6 1.3 1.6 2 2 .3.2.5.2.7-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.2.8-2 .7-1-.1-2.4-.7-3.8-2-1.5-1.3-2.3-2.7-2.5-3.7-.2-.9.1-1.8.6-2.5Z"/></>,
    linkedin: <><path d="M5 9v10M5 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10"/><circle cx="5" cy="5" r="1"/></>,
    facebook: <><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9a1 1 0 0 1 1-1Z"/></>,
    play: <><path d="m9 6 10 6-10 6V6Z"/></>,
  };

  return <svg {...shared}>{drawings[name] || drawings.building}</svg>;
};

const services = [
  { icon: 'building', title: 'Faisabilité & dimensionnement', text: 'Analyse des charges, choix des matériaux et estimation préliminaire des coûts.' },
  { icon: 'calculator', title: 'Calculs & modélisation 3D/BIM', text: 'Dimensionnement, vérification des déformations et simulations vent, séisme ou feu.' },
  { icon: 'layers', title: 'Fondations & études de sols', text: 'Études géotechniques G2 à G5 et choix de fondations adaptés au terrain.' },
  { icon: 'settings', title: 'Structures spéciales', text: 'Études de ponts, façades, verrières, grandes portées et formes complexes.' },
  { icon: 'shield', title: 'Parasismique & résilience', text: 'Analyse des risques sismiques et renforcement des structures existantes.' },
  { icon: 'file', title: 'Contrôle et visa des plans', text: 'Revue des plans d’exécution et préparation des dossiers APD et DCE.' },
  { icon: 'chart', title: 'Suivi de chantier', text: 'Visites, contrôles qualité et coordination technique des intervenants.' },
  { icon: 'target', title: 'Pathologies & réhabilitation', text: 'Diagnostic des fissures ou affaissements et solutions de réparation.' },
  { icon: 'users', title: 'BIM & services complémentaires', text: 'Coordination BIM, études d’impact, formation des équipes et appui à la gestion OPC.' },
];

const projects = [
  { title: 'Bâtiment R+3', category: 'Dibamba · Douala', type: 'Habitation collective · R+3', location: 'Dibamba, Douala', images: ['project-dibamba-r3.jpg'], description: 'Le dépliant CAC présente ce bâtiment R+3 à Dibamba, dans la ville de Douala.', facts: [{ label: 'Typologie', value: 'Habitation collective · R+3' }, { label: 'Localisation', value: 'Dibamba, Douala' }] },
  { title: 'Modélisation structurelle', category: 'Études & modèles 3D', type: 'Calcul et modélisation structurelle', location: 'Modèles illustrés dans le dépliant CAC', tools: 'Robot Structural Analysis · Revit Structure · CYPECAD · Plaxis 3D', images: ['project-structure-analysis.jpg', 'project-structure-frame.jpg', 'project-structure-curved.jpg'], description: 'Le dépliant illustre plusieurs modèles de structures et cite les logiciels utilisés par CAC pour les études et la modélisation.', facts: [{ label: 'Outils cités', value: 'Robot Structural Analysis, Revit Structure, CYPECAD et Plaxis 3D' }] },
  { title: 'Concession automobile', category: 'Douala · Projets 2 & 3', type: 'Équipement commercial', location: 'Douala', images: ['project-concession-douala-1.jpg', 'project-concession-douala-2.jpg'], description: 'Deux vues de la concession automobile de Douala, présentée parmi les réalisations du dépliant CAC.', facts: [{ label: 'Typologie', value: 'Concession automobile' }, { label: 'Localisation', value: 'Douala' }] },
  { title: 'Bâtiment R+2', category: 'Odza · Yaoundé', type: 'Habitation collective · R+2', location: 'Odza, Yaoundé', images: ['project-odza-r2.jpg'], description: 'Le dépliant CAC identifie ce bâtiment R+2 à Odza, dans la ville de Yaoundé.', facts: [{ label: 'Typologie', value: 'Habitation collective · R+2' }, { label: 'Localisation', value: 'Odza, Yaoundé' }] },
  { title: 'Centre de formation maritime', category: 'Métiers de la mer · Kribi', type: 'Centre de formation professionnelle', location: 'Kribi', images: ['project-kribi-training-1.jpg', 'project-kribi-training-2.jpg'], description: 'Le dépliant présente le Centre de formation professionnelle des métiers de la mer à Kribi.', facts: [{ label: 'Typologie', value: 'Centre de formation professionnelle' }, { label: 'Localisation', value: 'Kribi' }] },
];

const steps = [
  { icon: 'chat', title: 'Écoute & analyse', text: 'de vos besoins' },
  { icon: 'file', title: 'Proposition technique', text: 'et financière' },
  { icon: 'settings', title: 'Études & calculs', text: 'structurels' },
  { icon: 'check', title: 'Vérifications', text: 'et validation' },
  { icon: 'file', title: 'Remise des', text: 'livrables' },
];

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-light' : ''}`} href="#accueil" aria-label="Construire au Cameroun, accueil">
      <img className="brand-logo" src="/images/cac-mark.webp" alt="" aria-hidden="true" />
      <span className="brand-mark" aria-hidden="true">C<span>A</span>C</span>
      <span className="brand-copy">
        <strong>CONSTRUIRE AU CAMEROUN</strong>
        <small>Bureau d’ingénierie structurelle</small>
      </span>
    </a>
  );
}

function SectionKicker({ children }) {
  return <div className="kicker"><span />{children}</div>;
}

function ProjectVisual({ art }) {
  if (art === 'residential') {
    return <img src="/images/hero.webp" alt="Immeuble résidentiel contemporain" className="project-photo project-photo--residential" />;
  }
  if (art === 'education') {
    return <img src="/images/hero.webp" alt="Bâtiment conçu pour un équipement public" className="project-photo project-photo--education" />;
  }
  if (art === 'commercial') {
    return (
      <div className="project-art project-art--commercial" aria-label="Illustration architecturale d’un bâtiment commercial" role="img">
        <span className="sun" />
        <svg viewBox="0 0 440 220" aria-hidden="true">
          <path className="ground" d="M0 178 440 157v63H0Z" />
          <path className="store-shadow" d="m45 172 73-76 264 17 31 55-65 27-269-9Z" />
          <path className="store-side" d="m302 46 80 14v91l-80-12Z" />
          <path className="store-front" d="M55 65 302 46v93L55 161Z" />
          <path className="store-roof" d="m43 55 258-24 83 18-82 16Z" />
          <path className="glass" d="m76 79 58-5v65l-58 5Zm72-7 59-5v67l-59 5Zm74-7 59-5v68l-59 5Zm92-4 53 9v70l-53-9Z" />
          <path className="frame" d="M138 73v67m73-74v68m73-75v68M66 153l235-18m-235-50 235-19" />
          <path className="sign" d="M152 44h86" />
          <path className="car" d="m251 174 10-13 47-4 18 10 15 2v13l-9 2a10 10 0 0 1-19 0l-39-1a10 10 0 0 1-19-1l-7-1Z" />
          <circle className="wheel" cx="283" cy="184" r="6" /><circle className="wheel" cx="322" cy="184" r="6" />
        </svg>
      </div>
    );
  }
  return (
    <div className="project-art project-art--structure" aria-label="Illustration d’une modélisation de structure" role="img">
      <svg viewBox="0 0 440 220" aria-hidden="true">
        <path className="model-ground" d="m71 166 127-55 177 32-132 61Z" />
        <path className="model-base" d="m101 151 105-46 125 22-109 49Z" />
        <path className="beam beam--green" d="m116 139 105-43 113 18m-113-18v-31m56 42V78m57 36V83m-113 35v-32m-53 53V94m53 24 56-23m-110 45 54-23m55-18 56 11m-56 12 57-24" />
        <path className="beam beam--blue" d="m116 139 1-45 105-44 112 22v46m-112-24 1-44m56 56V66m-111 28 112 23 54-22m-110 45v-34m55 45V91m56 26V83" />
        <path className="beam beam--orange" d="m117 94 105 25m-51-46v72m108-79v73m-162-25 105-46m1 45 56-23m-1 73 1-49" />
        <path className="model-edge" d="m71 166 127-55 177 32-132 61Z" />
        <circle className="model-dot" cx="116" cy="94" r="3"/><circle className="model-dot" cx="222" cy="50" r="3"/><circle className="model-dot" cx="334" cy="72" r="3"/>
      </svg>
      <span className="art-label">STRUCTURE 3D · R+4</span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const panel = document.getElementById('site-drawer');
        const focusable = panel?.querySelectorAll('a[href], button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    document.querySelector('.drawer-close')?.focus();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      document.querySelector('.menu-toggle')?.focus();
    };
  }, [open]);

  return (
    <header className="site-header">
      <ScrollProgress />
      <div className="header-inner">
        <Brand />
        <button className="menu-toggle" type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} aria-controls="site-drawer" onClick={() => setOpen((value) => !value)}>
          <Icon name={open ? 'close' : 'menu'} size={25} />
        </button>
        <nav className={open ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Navigation principale">
          <a className="nav-link nav-link--active" href="#accueil" onClick={close}>Accueil</a>
          <a className="nav-link" href="#apropos" onClick={close}>À propos</a>
          <a className="nav-link" href="#services" onClick={close}>Services</a>
          <a className="nav-link" href="#realisations" onClick={close}>Réalisations</a>
          <a className="nav-link" href="#contact" onClick={close}>Contact</a>
          <a className="button button--orange nav-cta" href="#contact" onClick={close}><Icon name="users" size={17} />Demander un devis</a>
        </nav>
      </div>
      <button className={`drawer-backdrop${open ? ' drawer-backdrop--visible' : ''}`} type="button" aria-label="Fermer le menu" aria-hidden={!open} tabIndex={open ? 0 : -1} onClick={close} />
      <aside className={`side-drawer${open ? ' side-drawer--open' : ''}`} id="site-drawer" role="dialog" aria-modal={open || undefined} aria-label="Navigation et contact" aria-hidden={!open} inert={!open}>
        <div className="drawer-topline"><div className="drawer-brand"><img src="/images/cac-mark.webp" alt="" aria-hidden="true" /><span className="drawer-kicker">MENU RAPIDE</span></div><button type="button" className="drawer-close" aria-label="Fermer le menu" onClick={close}><Icon name="close" size={21} /></button></div>
        <div className="drawer-heading"><span className="drawer-mark">CAC<span />STRUCTURES</span><h2>Construisons<br /><em>du solide.</em></h2><p>Une équipe d’ingénierie à vos côtés, de l’idée à la réalisation.</p></div>
        <nav className="drawer-nav" aria-label="Navigation du panneau">
          <a href="#accueil" onClick={close}><span>01</span>Accueil<Icon name="arrow" size={17} /></a>
          <a href="#apropos" onClick={close}><span>02</span>À propos<Icon name="arrow" size={17} /></a>
          <a href="#services" onClick={close}><span>03</span>Nos services<Icon name="arrow" size={17} /></a>
          <a href="#realisations" onClick={close}><span>04</span>Réalisations<Icon name="arrow" size={17} /></a>
          <a href="#methodologie" onClick={close}><span>05</span>Méthodologie<Icon name="arrow" size={17} /></a>
          <a href="#faq" onClick={close}><span>06</span>FAQ<Icon name="arrow" size={17} /></a>
          <a href="#contact" onClick={close}><span>07</span>Contact<Icon name="arrow" size={17} /></a>
        </nav>
        <div className="drawer-contact">
          <span className="drawer-kicker">PARLONS DE VOTRE PROJET</span>
          <a href="tel:+237654141053" onClick={close}><Icon name="phone" size={17} />+237 654 141 053</a>
          <a href="mailto:construireaucameroun98@gmail.com" onClick={close}><Icon name="mail" size={17} />Nous écrire par e-mail</a>
          <a className="button button--orange drawer-whatsapp" href="https://wa.me/237654141053?text=Bonjour%2C%20je%20souhaite%20parler%20de%20mon%20projet%20de%20construction." target="_blank" rel="noreferrer" onClick={close}><Icon name="whatsapp" size={18} />Discuter sur WhatsApp</a>
        </div>
      </aside>
    </header>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}

function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-photo" role="img" aria-label="Immeuble moderne et plans de construction" />
      <div className="hero-shade" />
      <div className="hero-inner hero-content">
        <SectionKicker>CONSTRUIRE AU CAMEROUN</SectionKicker>
        <h1>Des structures solides.<br /><span>Des projets maîtrisés.</span></h1>
        <p>Études structurelles, dimensionnement, fondations, suivi de chantier<br className="desktop-break" /> et assistance technique pour un Cameroun plus solide.</p>
        <div className="hero-actions">
          <a href="#contact" className="button button--orange"><Icon name="users" size={18} />Demander un devis</a>
          <a href="#realisations" className="button button--outline-light"><Icon name="eye" size={19} />Découvrir nos projets</a>
        </div>
        <div className="hero-benefits" aria-label="Quelques repères CAC">
          <div><Icon name="building" /><span>Plus de<br />20 opérations</span></div>
          <div><Icon name="clock" /><span>Devis sous<br />24 heures</span></div>
          <div><Icon name="shield" /><span>Ingénieurs inscrits<br />à l’ONIGC</span></div>
          <div><Icon name="users" /><span>Équipe disponible<br />7 jours sur 7</span></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="services-intro reveal">
        <SectionKicker>NOS SERVICES</SectionKicker>
        <h2>Une expertise complète</h2>
        <p>Des solutions sur mesure pour tous vos projets de construction, de la conception à la réalisation.</p>
        <a href="#contact" className="button button--outline-orange">Voir tous les services <Icon name="arrow" size={17} /></a>
      </div>
      <div className="service-grid">
        {services.map((service, index) => (
          <article className="service-card reveal" key={service.title} style={{ '--reveal-delay': `${index * 70}ms` }}>
            <Icon name={service.icon} size={28} className="service-icon" />
            <div><h3>{service.title}</h3><p>{service.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="apropos">
      <div className="about-image-wrap reveal">
      <img src="/images/engineers.webp" alt="Des ingénieurs étudient des plans sur un chantier" className="about-image" loading="lazy" decoding="async" />
        <div className="image-caption"><span className="caption-dot" />Une expertise de terrain, au service de vos projets</div>
      </div>
      <div className="about-content reveal" style={{ '--reveal-delay': '140ms' }}>
        <SectionKicker>À PROPOS DE CAC</SectionKicker>
        <div className="about-main">
          <div className="about-story">
            <h2>Notre engagement</h2>
            <p>CONSTRUIRE AU CAMEROUN (CAC) est un bureau d’ingénierie structurelle. Sa mission : transformer vos conceptions architecturales en structures solides, durables et innovantes, dans le respect des Eurocodes, des DTU et des normes parasismiques.</p>
            <a href="#contact" className="button button--outline-light">En savoir plus <Icon name="arrow" size={17} /></a>
          </div>
          <div className="about-values">
            <div className="value-item"><span className="value-icon"><Icon name="target" size={25} /></span><div><h3>Notre mission</h3><p>Transformer vos idées en projets solides et durables.</p></div></div>
            <div className="value-item"><span className="value-icon"><Icon name="eye" size={25} /></span><div><h3>Notre vision</h3><p>Être la référence en ingénierie structurelle au Cameroun et en Afrique.</p></div></div>
            <div className="value-item"><span className="value-icon"><Icon name="shield" size={25} /></span><div><h3>Nos valeurs</h3><p>Qualité, rigueur, innovation, proximité.</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const commitments = [
    { icon: 'shield', title: 'Des ingénieurs inscrits à l’ONIGC', text: 'Le dépliant CAC présente une équipe d’ingénieurs civils diplômés et inscrits à l’Ordre national des ingénieurs de génie civil.' },
    { icon: 'file', title: 'Des études expliquées clairement', text: 'CAC annonce des notes de calcul exploitables, établies selon les Eurocodes et les DTU mentionnés dans le dépliant.' },
    { icon: 'users', title: 'Un accompagnement suivi', text: 'Le dépliant indique un accompagnement du permis de construire jusqu’à la réception du projet.' },
  ];

  return (
    <section className="trust-section section-pad" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust-heading reveal">
          <SectionKicker>DES ENGAGEMENTS CLAIRS</SectionKicker>
          <h2 id="trust-title">Une expertise qui se vérifie</h2>
          <p>Les repères présentés par CAC pour vous aider à avancer avec confiance.</p>
        </div>
        <div className="trust-grid">
          {commitments.map((item, index) => (
            <article className="trust-card reveal" key={item.title} style={{ '--reveal-delay': `${index * 80}ms` }}>
              <span className="trust-icon"><Icon name={item.icon} size={24} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const dialogOpener = useRef(null);

  useEffect(() => {
    if (!selectedProject) return undefined;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
      if (event.key === 'Tab') {
        const focusable = document.querySelectorAll('.project-dialog button, .project-dialog a[href]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = 'hidden';
    document.querySelector('.dialog-close')?.focus();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      dialogOpener.current?.focus();
    };
  }, [selectedProject]);

  return (
    <section className="projects section-pad" id="realisations">
      <div className="container">
        <div className="projects-heading reveal">
          <div><SectionKicker>NOS RÉALISATIONS</SectionKicker><h2>Des projets qui parlent d’eux-mêmes</h2><p>Découvrez quelques-unes de nos réalisations et notre savoir-faire en action.</p></div>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card reveal" key={project.title} style={{ '--reveal-delay': `${index * 80}ms` }}>
              <button className="project-trigger" type="button" onClick={(event) => {
                dialogOpener.current = event.currentTarget;
                setSelectedProject(project);
              }} aria-label={`Découvrir le projet : ${project.title}`}>
                <div className="project-image"><img src={'/images/' + project.images[0]} alt={`${project.title} — ${project.location || project.category}`} loading="lazy" decoding="async" /></div>
                <span className="project-copy"><span><strong>{project.title}</strong><small>{project.category}</small></span><Icon name="arrow" size={18} /></span>
              </button>
            </article>
          ))}
        </div>
      </div>
      {selectedProject && (
        <div className="dialog-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}>
          <section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
            <button className="dialog-close" type="button" aria-label="Fermer les détails du projet" onClick={() => setSelectedProject(null)}><Icon name="close" size={20} /></button>
            <div className={'project-gallery' + (selectedProject.images.length === 1 ? ' project-gallery--single' : '')}>
              {selectedProject.images.map((image, index) => (
                <img src={'/images/' + image} alt={`${selectedProject.title} — vue ${index + 1}`} key={image} />
              ))}
            </div>
            <div className="dialog-copy">
              <span className="dialog-category">{selectedProject.category}</span>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
              {selectedProject.facts?.length > 0 && <dl className="project-facts">{selectedProject.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
              <a className="button button--orange" href="#contact" onClick={() => setSelectedProject(null)}>Parler d’un projet similaire <Icon name="arrow" size={17} /></a>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function Methodology() {
  return (
    <section className="methodology section-pad" id="methodologie">
      <div className="method-intro reveal"><SectionKicker>NOTRE MÉTHODOLOGIE</SectionKicker><h2>Un accompagnement<br />à chaque étape</h2><p>De la première prise de contact à la livraison des livrables, nous avançons avec vous, pas à pas.</p></div>
      <div className="steps">
        {steps.map((step, index) => <div className="step reveal" key={step.title} style={{ '--reveal-delay': `${index * 75}ms` }}>
          <div className="step-icon-wrap"><span className="step-number">0{index + 1}</span><span className="step-icon"><Icon name={step.icon} size={27} /></span></div>
          <p><strong>{step.title}</strong><br />{step.text}</p>
        </div>)}
      </div>
    </section>
  );
}

function FAQ() {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const questions = [
    { question: 'Quels services structurels propose CAC ?', answer: 'Le dépliant présente notamment les études de faisabilité, le dimensionnement, la modélisation 3D/BIM, les fondations et études de sols, le contrôle de plans, le suivi de chantier ainsi que le diagnostic et la réhabilitation.' },
    { question: 'Quels documents préparer pour une première estimation ?', answer: 'Indiquez la ville, le type de bâtiment, l’étape du projet et le service recherché. Vous pouvez joindre ou décrire les plans et documents de sol disponibles ; CAC pourra vous préciser les éléments manquants.' },
    { question: 'Sous quel délai puis-je recevoir une estimation ?', answer: 'Le dépliant CAC annonce une estimation sous 24 heures. Le délai peut dépendre des informations et des pièces disponibles pour votre projet.' },
    { question: 'Quelles normes sont prises en compte ?', answer: 'La présentation CAC cite les Eurocodes, les DTU et les normes parasismiques pour ses études structurelles.' },
    { question: 'Dans quelles villes les projets présentés sont-ils situés ?', answer: 'Le dépliant montre des réalisations à Douala, à Odza dans la ville de Yaoundé, et à Kribi. Contactez CAC pour confirmer la prise en charge de votre projet dans une autre localité.' },
  ];

  return (
    <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div className="faq-intro reveal">
          <SectionKicker>QUESTIONS FRÉQUENTES</SectionKicker>
          <h2 id="faq-title">Avant de lancer votre projet</h2>
          <p>Quelques réponses pour préparer votre premier échange avec l’équipe CAC.</p>
          <a href="#contact" className="text-link">Poser une question <Icon name="arrow" size={16} /></a>
        </div>
        <div className="faq-list reveal" style={{ '--reveal-delay': '100ms' }}>
          {questions.map((item, index) => {
            const isOpen = expandedQuestion === item.question;
            const answerId = `faq-answer-${index + 1}`;
            return (
              <div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <h3 className="faq-question-wrap">
                  <button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setExpandedQuestion(isOpen ? null : item.question)}>
                    {item.question}<span className="faq-toggle" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-answer" id={answerId} aria-hidden={!isOpen}>
                  <div><p>{item.answer}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      'Bonjour CAC, je souhaite demander une première estimation pour mon projet.',
      `Nom : ${form.get('name')}`,
      `Ville : ${form.get('city')}`,
      `Type de projet : ${form.get('projectType')}`,
      `Étape actuelle : ${form.get('stage') || 'À préciser'}`,
      `Mon besoin : ${form.get('details')}`,
    ].join('\n');
    window.open(`https://wa.me/237654141053?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-backdrop" />
      <div className="contact-inner contact-layout">
        <div className="contact-info">
          <div className="contact-intro reveal"><SectionKicker>BESOIN D’UN ACCOMPAGNEMENT ?</SectionKicker><h2>Parlons de votre projet</h2><p>Décrivez votre besoin en quelques lignes. Le dépliant CAC annonce une première estimation sous 24 heures.</p></div>
          <div className="contact-details reveal" style={{ '--reveal-delay': '100ms' }}>
            <a href="tel:+237654141053"><Icon name="phone" size={19} /><span>+237 654 141 053 <i /> +237 655 504 533</span></a>
            <a href="mailto:construireaucameroun98@gmail.com"><Icon name="mail" size={19} /><span>construireaucameroun98@gmail.com</span></a>
            <a href="https://maps.google.com/?q=Ange+Rapha%C3%ABl+Douala" target="_blank" rel="noreferrer"><Icon name="pin" size={20} /><span>Ange Raphaël, face UBA — Douala</span></a>
          </div>
        </div>
        <form className="project-form reveal" style={{ '--reveal-delay': '150ms' }} onSubmit={handleSubmit}>
          <div className="form-heading"><h3>Décrivez votre besoin</h3><p>Les champs marqués d’un * sont obligatoires.</p></div>
          <div className="form-grid">
            <label>Votre nom *<input name="name" autoComplete="name" maxLength="80" required placeholder="Nom et prénom" /></label>
            <label>Ville du projet *<input name="city" autoComplete="address-level2" maxLength="80" required placeholder="Ex. Douala" /></label>
            <label>Type de projet *<select name="projectType" required defaultValue=""><option value="" disabled>Choisir une option</option><option>Habitation</option><option>Commerce ou bureaux</option><option>Équipement collectif</option><option>Autre projet</option></select></label>
            <label className="form-field-wide">Où en est le projet ?<select name="stage" defaultValue=""><option value="">À préciser</option><option>Idée ou faisabilité</option><option>Plans en cours</option><option>Plans disponibles</option><option>Chantier commencé</option></select></label>
            <label className="form-field-wide">Votre besoin *<textarea name="details" required minLength="12" maxLength="1200" rows="4" placeholder="Par exemple : étude de structure pour un bâtiment R+2…" /></label>
          </div>
          <button className="button button--orange form-submit" type="submit"><Icon name="whatsapp" size={18} />Préparer ma demande sur WhatsApp</button>
          <p className="form-note">Votre message s’ouvre dans WhatsApp. Vous pourrez le vérifier avant de l’envoyer à CAC.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand footer />
        <nav className="footer-nav" aria-label="Navigation de pied de page"><a href="#accueil">Accueil</a><a href="#apropos">À propos</a><a href="#services">Services</a><a href="#realisations">Réalisations</a><a href="#methodologie">Méthodologie</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></nav>
        <div className="footer-social" aria-label="Contacter CAC"><a href="https://wa.me/237654141053" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" size={16} /></a><a href="mailto:construireaucameroun98@gmail.com" aria-label="E-mail"><Icon name="mail" size={16} /></a><a href="tel:+237654141053" aria-label="Téléphone"><Icon name="phone" size={16} /></a><small>© 2025 CONSTRUIRE AU CAMEROUN. Tous droits réservés. · <a href="https://dekinicode.vercel.app" target="_blank" rel="noreferrer">Conçu par DeKiniCode</a></small></div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);
  return (
    <button className={`back-to-top${visible ? ' is-visible' : ''}`} type="button" aria-label="Retour en haut de page" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} tabIndex={visible ? 0 : -1}>
      <Icon name="up" size={19} />
    </button>
  );
}

function MadeByDeKiniCode() {
  return (
    <a className="made-by-dekinicode" href="https://dekinicode.vercel.app" target="_blank" rel="noreferrer" aria-label="Made by DeKiniCode - ouvrir le portfolio">
      <span className="made-by-mark" aria-hidden="true">D</span>
      <span className="made-by-copy"><small>Made by</small><strong>DeKiniCode</strong></span>
      <Icon name="arrow" size={13} className="made-by-arrow" />
    </a>
  );
}

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <><Header /><main><Hero /><Services /><About /><TrustSection /><Projects /><Methodology /><FAQ /><Contact /></main><Footer /><BackToTop /><MadeByDeKiniCode /></>;
}
