import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

const referenceAsset = (name) => `/assets/reference/${name}`;
const officialAsset = (name) => `/assets/official/${name}`;
const generatedAsset = (name) => `/assets/generated/${name}`;
const orderUrl = 'https://wa.me/918089898999';
const menuPdfUrl = '/assets/ChilliesMenu_Oct25.pdf';

const menuItems = [
  { title: 'Biriyani', description: 'Fragrant rice, unforgettable taste.', image: 'menu-biriyani-hq.jpg', alt: 'Authentic Malabar Dum Biriyani served at Chillies Restaurant Wandoor, Kerala', category: 'Main Course' },
  { title: 'Grills', description: 'Charcoal flavours that hit different.', image: 'menu-grill-hq.jpg', alt: 'Charcoal grilled chicken and Al Faham at Chillies Restaurant Kerala', category: 'Grills' },
  { title: 'Starters', description: 'Perfect to start your meal.', image: 'menu-starters-hq.jpg', alt: 'Spicy chicken starter platters at Chillies Restaurant', category: 'Starters' },
  { title: 'Shawarma', description: 'Juicy, flavour-packed and satisfying.', image: 'menu-shawarma-hq.jpg', alt: 'Chillies authentic Rumali Shawarma rolls', category: 'Shawarma' },
  { title: 'Rice Dishes', description: 'Comforting and delicious.', image: 'menu-rice-hq.jpg', alt: 'Fragrant Ghee Rice and Mandhi in Malappuram, Kerala', category: 'Rice Dishes' },
];

const locations = [
  {
    name: 'Wandoor',
    locality: 'Wandoor',
    region: 'Kerala',
    postalCode: '679328',
    lat: '11.2445',
    lng: '76.2030',
    address: 'Nilambur Road, opposite bus stand',
    phone: '+918606186666',
    image: 'location-wandoor-new.png',
    source: 'generated',
    map: 'https://www.google.com/maps/place/Chillies+Restaurant/@11.2445001,76.2030182,966m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba63b1576ac3abf:0x8afab220bc63ce89!8m2!3d11.2445001!4d76.2030182!16s%2Fg%2F11t7k_2c0f?entry=ttu'
  },
  {
    name: 'Anchachavidi',
    locality: 'Anchachavidi',
    region: 'Kerala',
    postalCode: '676525',
    lat: '11.2335',
    lng: '76.2570',
    address: 'Near high school, Anchachavidi',
    phone: '+918943608000',
    image: 'location-anchachavidi-new.png',
    source: 'generated',
    map: 'https://www.google.com/maps/place/Chillies+Restaurant+Anchachavidi/data=!4m2!3m1!1s0x0:0xf41500c0e16c0890'
  },
  {
    name: 'Pullikalodi',
    locality: 'Pullikalodi',
    region: 'Kerala',
    postalCode: '676525',
    lat: '11.2150',
    lng: '76.2420',
    address: 'Main Road, Khadeeja Building',
    phone: '+917025222260',
    image: 'location-pullikalodi-new.png',
    source: 'generated',
    map: 'https://maps.google.com/?q=Chillies+Restaurant+Pullikalodi+Kerala'
  },
  {
    name: 'Thiruvalli',
    locality: 'Thiruvalli',
    region: 'Kerala',
    postalCode: '679323',
    lat: '11.1680',
    lng: '76.1950',
    address: 'Near Thiruvalli Panchayat',
    phone: '+918089898999',
    image: 'location-thiruvali-color.png',
    source: 'generated',
    map: 'https://maps.google.com/?q=Chillies+Restaurant+near+Thiruvalli+Panchayat'
  },
];

const reviews = [
  { quote: '“Best biriyani in town! The flavour is just next level. Always a great experience. The ambience and service make it even better.”', name: 'Raseel A.', role: 'Regular Customer', image: 'customer-raseel.webp' },
  { quote: '“The food, ambience and service are all excellent. Perfect place for family and friends. Chillies never disappoints!”', name: 'Shahana P.', role: 'Food Lover', image: 'customer-shahana.webp' },
  { quote: '“Their grilled chicken is a must try. Consistent quality and amazing taste every time. Chillies always feels like home.”', name: 'Faisal K.', role: 'Regular Customer', image: 'customer-faisal.webp' },
];

function Arrow({ className = '', direction = 'right' }) {
  return <svg aria-hidden="true" className={`arrow${direction === 'left' ? ' arrow-left' : ''} ${className}`} viewBox="0 0 32 18" fill="none">
    <path d="M2 9h26m-8-7 8 7-8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function LineIcon({ name }) {
  const drawings = {
    utensils: <><path d="M7 2v8M4 2v5a3 3 0 0 0 6 0V2M7 10v12M17 2v20M17 2c-2 2-3 5-3 8h3" /></>,
    leaf: <><path d="M20 4C10 4 4 8 4 15a5 5 0 0 0 5 5c7 0 11-6 11-16Z" /><path d="M3 21c4-5 8-8 14-12" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2z" /><path d="M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1h-3" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    chilli: <><path d="M20 4c-3-1-5 1-7 3-2 2-4 3-8 3-2 0-3 2-2 4 2 4 7 6 11 3 3-2 4-6 6-10Z" /><path d="M5 10c0-2 1-4 3-5" /></>,
    heart: <path d="M20.8 8.7c0 5-8.8 11.3-8.8 11.3S3.2 13.7 3.2 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 8.8 2.7Z" />,
  };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{drawings[name]}</svg>;
}

function WhatsAppIcon() {
  return <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 11.8a8.2 8.2 0 0 1-12.1 7.1L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.4Z" /><path d="M8.4 8.3c.3-.6.6-.6.9-.6h.5c.2 0 .4.1.5.4l.8 1.8c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7-.1l.8-1c.2-.2.4-.3.7-.2l1.8.9c.3.1.4.3.4.5 0 .4-.2 1-.6 1.3-.4.4-1 .6-1.7.6-1 0-2.5-.5-4-1.8-1.5-1.3-2.6-3-2.8-4.2-.2-.8.1-1.4.7-2.1Z" /></svg>;
}

function InstagramIcon() {
  return <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></svg>;
}

function BagIcon() {
  return <svg className="bag-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Chillies Restaurant home"><img src={officialAsset('chillies-logo.png')} alt="Chillies Restaurant" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset('logo-board.webp'); }} /></a>;
}

function Button({ children, href, variant = 'red', className = '', ...props }) {
  return <a className={`button button-${variant} ${className}`} href={href} {...props}>{children}</a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#top');
  const links = [
    ['Home', '#top'],
    ['Menu', '#menu'],
    ['Our Story', '#story'],
    ['Locations', '#locations'],
    ['Contact', '#contact'],
  ];

  useEffect(() => {
    let rafId = null;
    let lastScrolled = false;
    let lastHref = '#top';

    const updateNav = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 20;
      if (isScrolled !== lastScrolled) {
        lastScrolled = isScrolled;
        setScrolled(isScrolled);
      }

      let newHref = '#top';
      if (scrollY >= 120) {
        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
          newHref = '#contact';
        } else {
          for (let i = links.length - 1; i >= 0; i--) {
            const [, href] = links[i];
            if (href === '#top') continue;
            const el = document.querySelector(href);
            if (el && el.getBoundingClientRect().top <= 160) {
              newHref = href;
              break;
            }
          }
        }
      }

      if (newHref !== lastHref) {
        lastHref = newHref;
        setActiveHref(newHref);
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateNav();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateNav();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <Brand />
        <nav className={`main-nav${menuOpen ? ' open' : ''}`} id="main-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a
              className={activeHref === href ? 'active' : ''}
              href={href}
              key={href}
              onClick={() => {
                setActiveHref(href);
                closeMenu();
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <Button href={orderUrl} className="header-order" target="_blank" rel="noreferrer">
          <WhatsAppIcon /> Order Now <Arrow />
        </Button>
        <button
          className={`menu-toggle${menuOpen ? ' is-active' : ''}`}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>
      {menuOpen && (
        <div
          className="nav-backdrop"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}
    </>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const quickTos = useRef(null);
  const rectRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    quickTos.current = {
      foodX: gsap.quickTo('.hero-food', 'x', { duration: 0.6, ease: 'power2.out' }),
      foodY: gsap.quickTo('.hero-food', 'y', { duration: 0.6, ease: 'power2.out' }),
      foodR: gsap.quickTo('.hero-food', 'rotate', { duration: 0.6, ease: 'power2.out' }),
      brushX: gsap.quickTo('.hero-brush', 'x', { duration: 0.8, ease: 'power2.out' }),
      brushY: gsap.quickTo('.hero-brush', 'y', { duration: 0.8, ease: 'power2.out' }),
      brushR: gsap.quickTo('.hero-brush', 'rotate', { duration: 0.8, ease: 'power2.out' }),
      noteMalayX: gsap.quickTo('.hero-note-malay', 'x', { duration: 0.7, ease: 'power2.out' }),
      noteMalayY: gsap.quickTo('.hero-note-malay', 'y', { duration: 0.7, ease: 'power2.out' }),
      noteTasteX: gsap.quickTo('.hero-note-taste', 'x', { duration: 0.7, ease: 'power2.out' }),
      noteTasteY: gsap.quickTo('.hero-note-taste', 'y', { duration: 0.7, ease: 'power2.out' }),
    };

    const updateRect = () => {
      if (heroRef.current) rectRef.current = heroRef.current.getBoundingClientRect();
    };
    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, []);

  const handleMouseEnter = () => {
    if (heroRef.current) rectRef.current = heroRef.current.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!quickTos.current) return;
    const rect = rectRef.current || heroRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const q = quickTos.current;
    q.foodX(x * 18);
    q.foodY(y * 14);
    q.foodR(x * 2.5);
    q.brushX(x * -16);
    q.brushY(y * -12);
    q.brushR(x * -3);
    q.noteMalayX(x * 22);
    q.noteMalayY(y * 18);
    q.noteTasteX(x * -20);
    q.noteTasteY(y * 20);
  };

  const handleMouseLeave = () => {
    if (!quickTos.current) return;
    const q = quickTos.current;
    q.foodX(0); q.foodY(0); q.foodR(0);
    q.brushX(0); q.brushY(0); q.brushR(0);
    q.noteMalayX(0); q.noteMalayY(0);
    q.noteTasteX(0); q.noteTasteY(0);
  };

  return (
    <section
      className="hero section-paper"
      id="top"
      aria-labelledby="hero-title"
      ref={heroRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-copy">
        <p className="eyebrow">Chillies Restaurant <i>·</i> Est. 2009</p>
        <h1 id="hero-title">
          <span className="hero-line"><span>Good</span></span>
          <span className="hero-line"><span>Food <em>Brings</em></span></span>
          <span className="hero-line"><span>People</span></span>
          <span className="hero-line"><span>Together<span className="red-dot">.</span></span></span>
        </h1>
        <p className="hero-description">Experience the authentic taste of Kerala with our fragrant Malabar Dum Biriyani, charcoal-grilled favourites and much more.</p>
        <div className="hero-actions"><Button href={orderUrl} target="_blank" rel="noreferrer"><WhatsAppIcon /> Order Now <Arrow /></Button><a className="text-link" href="#menu">Explore Menu <span className="link-arrow"><Arrow /></span></a></div>
      </div>
      <div className="hero-visual" aria-label="Malabar dum biriyani served with charcoal-grilled chicken">
        <svg className="hero-brush" viewBox="0 0 820 760" preserveAspectRatio="none" aria-hidden="true"><path d="M118 112 C209 42 337 54 431 46 C554 36 671 64 734 145 C791 219 784 336 774 436 C764 545 738 628 645 664 C556 699 440 685 338 690 C224 695 122 701 65 633 C12 580 23 443 31 339 C39 237 37 174 118 112 Z" fill="#FFC414" /></svg>
        <img className="hero-brush-rim" data-ornament src={generatedAsset('yellow-brush-ring.png')} alt="" aria-hidden="true" />
        <span className="hero-food-shadow" aria-hidden="true" />
        <div className="hero-steam" aria-hidden="true">
          <span className="steam-line steam-1" />
          <span className="steam-line steam-2" />
          <span className="steam-line steam-3" />
        </div>
        <img className="hero-food" src={generatedAsset('hero-bucket-branded.png')} alt="Authentic Malabar Dum Biriyani and charcoal grilled chicken in Chillies takeaway bucket in Wandoor, Kerala" fetchPriority="high" />
        <div className="hero-note hero-note-malay" data-draw><span>Malabar</span><strong>Dum Biriyani</strong><svg viewBox="0 0 110 48" aria-hidden="true"><path d="M4 8c20 1 30 31 61 23 13-3 23-15 37-18m-3 0 13-3-6 12" /></svg></div>
        <div className="hero-note hero-note-taste" data-draw><span>Same Great Taste</span><strong>Always!</strong><svg viewBox="0 0 120 24" aria-hidden="true"><path d="M3 16c32-14 78-12 114-4" /></svg></div>
        <div className="hero-spice-doodle-wrap" data-ornament>
          <img className="hero-spice-doodle" src={generatedAsset('star-anise-outline.png')} alt="" aria-hidden="true" />
        </div>
      </div>
      <span className="hero-bottom-note">Authentic Kerala flavours · Since 2009</span>
    </section>
  );
}

function MenuSection() {
  const trackRef = useRef(null);
  const runwayRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const runway = runwayRef.current;
    if (!track || !runway) return undefined;
    const desktop = window.matchMedia('(min-width: 761px)');
    if (!desktop.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const getCycleWidth = () => {
      const cards = [...track.querySelectorAll('.food-card')];
      if (cards.length < menuItems.length * 2) return 0;
      return Math.max(0, cards[menuItems.length].offsetLeft - cards[0].offsetLeft);
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(track, { x: 0 }, {
        x: () => -getCycleWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: runway,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });
    }, runway);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    const refreshAfterImages = [...track.querySelectorAll('img')].map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    });
    Promise.all(refreshAfterImages).then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollToCard = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.food-card:not([data-loop-copy])')[index];
    if (!track || !card) return;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    track.scrollTo({ left: track.scrollLeft + cardCenter - (trackBounds.left + track.clientWidth / 2), behavior: 'smooth' });
  };
  const moveCards = (direction) => scrollToCard(Math.max(0, Math.min(menuItems.length - 1, activeCard + direction)));

  return (
    <section className="menu-section section-paper" id="menu">
      <div className="menu-pin-runway" ref={runwayRef}><div className="menu-stage">
        <div className="section-heading menu-heading"><div><p className="eyebrow" data-typewriter><i /> Our Menu <i /></p><h2>Flavours<br />for Every Mood<span className="red-dot">.</span></h2><p>From charcoal-grilled classics to comforting rice dishes,<br className="desktop-only" /> explore a menu made for every appetite.</p><Button href={menuPdfUrl} target="_blank" rel="noopener noreferrer">View Full Menu <Arrow /></Button></div><div className="menu-art"><div className="hand-note">Real ingredients<br /><strong>Real taste!</strong><svg viewBox="0 0 130 32" aria-hidden="true" data-draw><path d="M3 20c36-18 79-18 120-8m-8 0 10-1-4 10" /></svg></div><img className="menu-stamp" data-ornament src={referenceAsset('menu-food-stamp-transparent.png')} alt="Good food, good people" /></div></div>
        <div className="menu-carousel menu-train" data-reveal><button className="carousel-arrow carousel-prev" onClick={() => moveCards(-1)} aria-label="Previous menu categories"><Arrow direction="left" /></button><div className="food-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; if (!track) return; const cardW = track.firstElementChild?.offsetWidth || 240; const index = Math.round(track.scrollLeft / (cardW + 12)); setActiveCard(Math.max(0, Math.min(menuItems.length - 1, index % menuItems.length))); }}>
          {[0, 1, 2, 3].flatMap((copy) => menuItems.map((item) => <a className="food-card" href={menuPdfUrl} target="_blank" rel="noopener noreferrer" key={`${copy}-${item.title}`} data-loop-copy={copy !== 1 ? 'true' : undefined} aria-hidden={copy !== 1} tabIndex={copy !== 1 ? -1 : 0} itemScope itemType="https://schema.org/MenuItem"><meta itemProp="menuAddOn" content={item.category} /><img src={item.source ? officialAsset(item.source) : referenceAsset(item.image)} alt={copy === 1 ? item.alt : ''} loading="lazy" decoding="async" itemProp="image" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = referenceAsset(item.image); }} /><div className="food-info"><h3 itemProp="name">{item.title}</h3><p itemProp="description">{item.description}</p><span className="round-arrow" aria-label={`View ${item.title} menu`}><Arrow /></span></div></a>))}
        </div><button className="carousel-arrow carousel-next" onClick={() => moveCards(1)} aria-label="Next menu categories"><Arrow /></button><div className="carousel-dots" aria-label="Menu category pages">{menuItems.map((item, i) => <button key={item.title} className={activeCard === i ? 'active' : ''} aria-label={`Show ${item.title}`} onClick={() => scrollToCard(i)} />)}</div></div>
      </div></div>
      <div className="signature-band" itemScope itemType="https://schema.org/MenuItem"><meta itemProp="name" content="Malabar Dum Biriyani" /><meta itemProp="description" content="Aromatic rice, tender meat and authentic Malabar spices." /><img src={generatedAsset('hero-biryani.webp')} alt="Signature Malabar Dum Biriyani at Chillies Restaurant Wandoor, Kerala" loading="lazy" decoding="async" itemProp="image" /><div><p className="eyebrow" data-typewriter>Signature Dish</p><h2>Malabar<br />Dum <em>Biriyani</em></h2><p>A perfect blend of aromatic rice, tender meat<br className="desktop-only" /> and authentic spices — a taste that keeps<br className="desktop-only" /> bringing you back.</p><Button href={menuPdfUrl} target="_blank" rel="noopener noreferrer" variant="light">Explore Biriyani <Arrow /></Button></div><div className="signature-art" aria-hidden="true"><div className="signature-art-group"><img className="signature-art-image botanical-art" src={generatedAsset('botanical-sprig.png')} alt="" /><img className="signature-art-image leaf-art" src={generatedAsset('heart-leaf-outline.png')} alt="" /></div><span>The taste<br /><b>that stays</b></span></div></div>
    </section>
  );
}

function StorySection() {
  const values = [['leaf', 'Quality', 'ingredients'], ['chilli', 'Authentic', 'flavours'], ['users', 'Hygienic', 'preparation'], ['sun', 'Warm', 'ambience']];
  const history = [['2009', 'First branch opens in Wandoor, Malappuram'], ['2019', 'Treatley fine dining opens in Wandoor'], ['2020', 'Cloud kitchen opens in Anchachavidi'], ['2021', 'Cloud kitchen becomes a fine dining restaurant in Anchachavidi'], ['2022', 'New launch at Pullikalodi'], ['2026', 'New launch at Thiruvalli']];
  return (
    <section className="story-section section-paper" id="story">
      <div className="story-intro"><p className="eyebrow" data-typewriter><i /> Why Chillies <i /></p><h2>More Than<br />Just a Meal<span className="red-dot">.</span></h2><p>Good food is always better when shared. At Chillies, we bring people together with authentic Malabar flavours that feel like home.</p><div className="values">{values.map(([icon, title, detail]) => <span key={title}><LineIcon name={icon} /><span>{title}<br />{detail}</span></span>)}</div></div>
      <div className="story-photo-wrap" data-reveal><img src={generatedAsset('grilled-chicken.webp')} alt="Charcoal-grilled chicken and Al Faham prepared with fresh herbs and spices at Chillies Restaurant" loading="lazy" decoding="async" /></div>
      <div className="story-bottom"><div className="story-bottom-photo" data-reveal><img src={generatedAsset('restaurant-interior.webp')} alt="Warmly lit Chillies restaurant family dining room in Wandoor, Kerala" loading="lazy" decoding="async" /></div><div className="story-bottom-copy"><p className="eyebrow" data-typewriter>Our Story</p><h2>A Journey<br />of Great Food.</h2><p>From our first restaurant in Wandoor in 2009 to a growing family of branches across Kerala, Chillies has always been about great food and the people who bring it to the table.</p><Button href="https://chilliesgroup.com/about.php" variant="dark">Discover Our Story <Arrow /></Button></div><div className="timeline">{history.map(([year, text]) => <p key={year}><b>{year}</b><span>{text}</span></p>)}</div></div>
    </section>
  );
}

function LocationsSection() {
  const trackRef = useRef(null);
  const [activeLocation, setActiveLocation] = useState(0);
  const locationCount = locations.length;
  const scrollToLocation = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.location-card')[index];
    if (!track || !card) return;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const cardCenter = cardBounds.left + cardBounds.width / 2;
    track.scrollTo({ left: track.scrollLeft + cardCenter - (trackBounds.left + track.clientWidth / 2), behavior: 'smooth' });
  };
  const moveLocations = (direction) => scrollToLocation(Math.max(0, Math.min(locationCount - 1, activeLocation + direction)));

  return (
    <section className="locations-section section-paper" id="locations">
      <div className="locations-heading">
        <div>
          <p className="eyebrow" data-typewriter><i /> Our Locations <i /></p>
          <h2>Good Food,<br />Closer to <em>You.</em></h2>
          <p>Visit one of our locations, check the details<br className="desktop-only" /> and get directions or call to order.</p>
        </div>
        <div className="locations-art" aria-hidden="true">
          <div className="locations-art-cluster">
            <img className="locations-sprig" src={generatedAsset('botanical-sprig.png')} alt="" />
            <img className="locations-leaf" src={generatedAsset('heart-leaf-outline.png')} alt="" />
            <img className="locations-chilli" src={generatedAsset('chilli-outline.png')} alt="" />
            <img className="locations-spice" src={generatedAsset('star-anise-outline.png')} alt="" />
          </div>
          <svg className="locations-route" viewBox="0 0 160 40" fill="none" data-draw>
            <path d="M4 30C36 8 68 8 92 24s48 18 64-10m-10 2 10-2-4 10" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="92" cy="24" r="3.5" fill="#cf1028" stroke="white" strokeWidth="1.5" />
          </svg>
          <span className="locations-art-note">Serving 4 Hubs <i>✦</i></span>
        </div>
        <div className="map-note">Authentic flavours<br /><b>across Kerala</b></div>
      </div>
      <div className="location-carousel"><button className="carousel-arrow carousel-prev" onClick={() => moveLocations(-1)} aria-label="Previous locations"><Arrow direction="left" /></button><div className="location-grid" ref={trackRef} onScroll={(event) => { const track = event.currentTarget; const center = track.getBoundingClientRect().left + track.clientWidth / 2; const cards = [...track.querySelectorAll('.location-card')]; const nearest = cards.reduce((bestIndex, card, index) => Math.abs(card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - center) < Math.abs(cards[bestIndex].getBoundingClientRect().left + cards[bestIndex].getBoundingClientRect().width / 2 - center) ? index : bestIndex, 0); setActiveLocation(nearest); }}>{locations.map((place) => (
        <article className="location-card" key={place.name} itemScope itemType="https://schema.org/Restaurant">
          <meta itemProp="name" content={`Chillies Restaurant - ${place.name}`} />
          <meta itemProp="servesCuisine" content="Kerala, Malabar Biryani, Charcoal Grill" />
          <meta itemProp="priceRange" content="₹₹" />
          <div itemProp="geo" itemScope itemType="https://schema.org/GeoCoordinates" style={{ display: 'none' }}>
            <meta itemProp="latitude" content={place.lat} />
            <meta itemProp="longitude" content={place.lng} />
          </div>
          <img src={place.source === 'generated' ? generatedAsset(place.image) : referenceAsset(place.image)} alt={`Chillies Restaurant ${place.name} branch in Kerala - Malabar Biryani & Grills`} loading="lazy" decoding="async" itemProp="image" />
          <div className="location-info">
            <h3 itemProp="name">{place.name}</h3>
            <p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">{place.address}</span>,{' '}
              <span itemProp="addressLocality">{place.locality}</span>,{' '}
              <span itemProp="addressRegion">{place.region}</span>{' '}
              <span itemProp="postalCode">{place.postalCode}</span>
            </p>
            <div>
              <a href={`tel:${place.phone}`} itemProp="telephone">☎&nbsp; Call</a>
              <a href={place.map} target="_blank" rel="noreferrer" itemProp="hasMap">📍&nbsp; Directions</a>
            </div>
          </div>
        </article>
      ))}</div><button className="carousel-arrow carousel-next" onClick={() => moveLocations(1)} aria-label="Next locations"><Arrow /></button><div className="carousel-dots" aria-label="Location pages">{Array.from({ length: locationCount }, (_, i) => <button key={i} className={activeLocation === i ? 'active' : ''} aria-label={`Show location ${i + 1}`} onClick={() => scrollToLocation(i)} />)}</div></div>
      <div className="locations-ribbon">
        <div className="ribbon-sketch-wrap">
          <img
            src={referenceAsset('location-sketch.png?v=4')}
            alt="Hand-drawn architectural sketch of Chillies Restaurant storefront with palm trees"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = referenceAsset('location-sketch.webp');
            }}
          />
        </div>
        <div className="ribbon-content">
          <span className="ribbon-tagline">Great food<br /><b>in more places.</b></span>
          <div className="ribbon-features">
            <i><LineIcon name="pin" /><span>Strategic<br />locations</span></i>
            <i><LineIcon name="users" /><span>Easy<br />accessibility</span></i>
            <i><LineIcon name="utensils" /><span>Same great<br />taste</span></i>
            <i><LineIcon name="heart" /><span>A growing<br />family</span></i>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const trackRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const updateOverflow = () => setHasOverflow(track.scrollWidth > track.clientWidth + 1);
    const observer = new ResizeObserver(updateOverflow);
    observer.observe(track);
    updateOverflow();
    return () => observer.disconnect();
  }, []);

  const moveReviews = () => {
    const track = trackRef.current;
    const card = track?.querySelector('.review-card');
    if (card) track.scrollBy({ left: card.getBoundingClientRect().width + 14, behavior: 'smooth' });
  };
  return (
    <section className={`reviews-section${hasOverflow ? ' has-review-overflow' : ''}`}>
      <div className="review-intro">
        <p className="eyebrow" data-typewriter>What our customers say</p>
        <h2>Flavours That<br />Create <em>Memories.</em></h2>
        <p>From first visits to lifelong favourites,<br /> our guests share what makes Chillies special.</p>
      </div>
      <div className="review-track" id="review-track" ref={trackRef}>
        {reviews.map(review => (
          <article className="review-card" key={review.name}>
            <div className="stars" aria-label="5 stars rating">
              <span className="star-char">★</span>
              <span className="star-char">★</span>
              <span className="star-char">★</span>
              <span className="star-char">★</span>
              <span className="star-char">★</span>
              <span className="quote-char">”</span>
            </div>
            <p>{review.quote}</p>
            <div className="reviewer">
              <img src={referenceAsset(review.image)} alt="" loading="lazy" decoding="async" />
              <b>{review.name}<small>{review.role}</small></b>
            </div>
          </article>
        ))}
      </div>
      {hasOverflow && <button className="review-next" aria-label="Show next reviews" onClick={moveReviews}>→</button>}
    </section>
  );
}

function Footer() {
  const [signupStatus, setSignupStatus] = useState('Opens your email app to send your request.');
  const requestUpdates = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    const subject = encodeURIComponent('Chillies Restaurant updates');
    const body = encodeURIComponent(`Please add ${email} to your updates list.`);
    window.location.href = `mailto:chillieswdr@gmail.com?subject=${subject}&body=${body}`;
    setSignupStatus('Your email app should open with a draft addressed to Chillies.');
    event.currentTarget.reset();
  };

  return <footer id="contact"><section className="footer-cta"><div><h2>Hungry?<br />Let’s Get You<br />Something <em>Great.</em></h2><p>Call us or order through WhatsApp for a quick<br className="desktop-only" /> and delicious experience. Great food is always<br className="desktop-only" /> just a few clicks away.</p><div className="footer-actions"><Button href={orderUrl} target="_blank" rel="noreferrer"><BagIcon /> Order Now <Arrow /></Button><Button href={orderUrl} variant="outline" target="_blank" rel="noreferrer"><WhatsAppIcon /> Chat on WhatsApp <Arrow /></Button></div></div><img src={generatedAsset('hero-biryani.webp')} alt="Freshly prepared Malabar Dum Biriyani spread with raita and pickle at Chillies Restaurant Kerala" loading="lazy" decoding="async" /></section>
    <div className="footer-main"><div className="footer-brand"><Brand /><p>Authentic flavours. Great food. Good people.</p><div className="socials"><a href="https://instagram.com/" aria-label="Follow Chillies on Instagram" target="_blank" rel="noreferrer"><InstagramIcon /></a><a href="https://facebook.com/chillies_restaurant_" aria-label="Chillies on Facebook" target="_blank" rel="noreferrer">f</a><a href={orderUrl} aria-label="Chillies on WhatsApp" target="_blank" rel="noreferrer"><WhatsAppIcon /></a><a href="https://maps.google.com/?q=Chillies+Restaurant+Wandoor" aria-label="Chillies on Maps" target="_blank" rel="noreferrer"><LineIcon name="pin" /></a></div></div><div className="footer-links"><h3>Quick Links</h3><a href="#top">Home</a><a href="#menu">Our Menu</a><a href="#story">Our Story</a><a href="#locations">Locations</a><a href="#contact">Contact</a></div><div className="footer-locations" itemScope itemType="https://schema.org/Organization"><meta itemProp="name" content="Chillies Restaurant Group" /><h3>Our Locations in Kerala</h3><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Wandoor</strong> <small itemProp="streetAddress">Nilambur Road, opposite bus stand, Kerala 679328</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Anchachavidi</strong> <small itemProp="streetAddress">Near high school, Kerala 676525</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Pullikalodi</strong> <small itemProp="streetAddress">Main Road, Khadeeja Building, Kerala 676525</small></p><p itemProp="address" itemScope itemType="https://schema.org/PostalAddress">📍 &nbsp;<strong itemProp="addressLocality">Thiruvalli</strong> <small itemProp="streetAddress">Near Thiruvalli Panchayat, Kerala 679323</small></p></div><div className="footer-news"><h3>Stay Updated</h3><p>Get the latest updates, special offers<br /> and new dishes straight to your inbox.</p><form onSubmit={requestUpdates}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" name="email" type="email" placeholder="Enter your email address" autoComplete="email" required /><button type="submit" aria-label="Request email updates"><Arrow /></button></form><small role="status">{signupStatus}</small></div></div><div className="footer-bottom"><span>© 2026 Chillies Restaurant. All rights reserved.</span><span>Made with <b>♥</b> for food lovers</span></div>
  </footer>;
}

function useScrollMotion(heroReady = false) {
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;

    gsap.registerPlugin(ScrollTrigger);

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        autoRaf: false,
        duration: 0.95,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        syncTouch: false,
      });
      lenisRef.current = lenis;
      if (typeof window !== 'undefined') window.__lenis = lenis;
    }

    const onSectionLink = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      let target;
      try { target = hash && document.querySelector(decodeURIComponent(hash)); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const headerOffset = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      if (lenis) {
        lenis.scrollTo(target, { offset: hash === '#top' ? 0 : -headerOffset, duration: 0.9 });
      } else {
        const top = hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      window.history.pushState(null, '', hash);
    };
    document.addEventListener('click', onSectionLink);

    const tick = lenis ? (time) => lenis.raf(time * 1000) : null;
    if (lenis && tick) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(500, 33);
    }

    // ScrollTrigger context runs synchronously before first paint so no element flashes visible prior to reveal
    const context = !prefersReducedMotion ? gsap.context(() => {
      gsap.utils.toArray('[data-draw]').forEach((drawing) => {
        const paths = [...drawing.querySelectorAll('path')];
        if (!paths.length) return;
        gsap.fromTo(paths, {
          strokeDasharray: (_, path) => `${path.getTotalLength()} ${path.getTotalLength()}`,
          strokeDashoffset: (_, path) => path.getTotalLength(),
        }, {
          strokeDashoffset: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: drawing, start: 'top 90%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal]').forEach((item) => {
        const triggerEl = item.closest('.story-bottom, .signature-band, .locations-ribbon') || item;
        gsap.fromTo(item, { autoAlpha: 0, y: 36 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          delay: Number(item.style.getPropertyValue('--reveal-order') || 0) * 0.09,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: triggerEl, start: 'top 90%', once: true },
        });
      });

      gsap.utils.toArray('[data-typewriter]').forEach((target) => {
        if (!target.classList.contains('typewriter-split')) {
          const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
          const textNodes = [];
          while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.length) textNodes.push(walker.currentNode);
          }
          textNodes.forEach((textNode) => {
            const fragment = document.createDocumentFragment();
            [...textNode.nodeValue].forEach((character) => {
              if (/\s/.test(character)) fragment.append(document.createTextNode(character));
              else {
                const letter = document.createElement('span');
                letter.className = 'typing-char';
                letter.textContent = character;
                fragment.append(letter);
              }
            });
            textNode.replaceWith(fragment);
          });
          target.classList.add('typewriter-split');
        }
        gsap.fromTo(target.querySelectorAll('.typing-char'), { autoAlpha: 0 }, {
          autoAlpha: 1,
          duration: 0.02,
          stagger: 0.028,
          ease: 'none',
          scrollTrigger: { trigger: target, start: 'top 94%', once: true },
        });
      });

      gsap.utils.toArray('main h2, .footer-cta h2').forEach((heading) => {
        if (!heading.classList.contains('words-split')) {
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
          const textNodes = [];
          while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.trim()) textNodes.push(walker.currentNode);
          }
          textNodes.forEach((textNode) => {
            const isItalic = textNode.parentElement && (
              textNode.parentElement.tagName === 'EM' ||
              window.getComputedStyle(textNode.parentElement).fontStyle === 'italic'
            );
            const fragment = document.createDocumentFragment();
            textNode.nodeValue.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) fragment.append(document.createTextNode(part));
              else {
                const mask = document.createElement('span');
                mask.className = `line-mask-wrap${isItalic ? ' is-italic' : ''}`;

                const word = document.createElement('span');
                word.className = 'heading-word';
                word.textContent = part;
                mask.appendChild(word);
                fragment.append(mask);
              }
            });
            textNode.replaceWith(fragment);
          });
          heading.classList.add('words-split');
        }
        const words = heading.querySelectorAll('.heading-word');
        gsap.fromTo(words, {
          yPercent: 115,
          autoAlpha: 0,
        }, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            once: true,
          },
          onComplete: () => {
            gsap.set(heading.querySelectorAll('.line-mask-wrap'), { overflow: 'visible' });
          },
        });
      });

      gsap.utils.toArray('.menu-heading > div:first-child > p:not(.eyebrow), .signature-band > div > p:not(.eyebrow), .story-intro > p:not(.eyebrow), .story-bottom-copy > p:not(.eyebrow), .locations-heading > div:first-child > p:not(.eyebrow), .review-intro > p:not(.eyebrow), .instagram-section > div:first-child > p:not(.eyebrow), .footer-cta > div > p').forEach((paragraph) => {
        gsap.fromTo(paragraph, {
          autoAlpha: 0,
          y: 22,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: paragraph,
            start: 'top 92%',
            once: true,
          },
        });
      });

      gsap.utils.toArray('.menu-heading .button, .signature-band .button, .story-bottom-copy .button, .footer-actions').forEach((cta) => {
        gsap.fromTo(cta, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: cta, start: 'top 94%', once: true },
        });
      });

      gsap.utils.toArray('[data-ornament]').forEach((item, index) => {
        const direction = index % 2 === 0 ? '100% 0 0 0' : '0 100% 0 0';
        gsap.fromTo(item, {
          autoAlpha: 0,
          clipPath: `inset(${direction})`,
        }, {
          autoAlpha: 1,
          clipPath: 'inset(0 0 0 0)',
          duration: 1.2,
          delay: (index % 4) * 0.16,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true },
        });
      });

      gsap.fromTo('.menu-art .hand-note', { autoAlpha: 0 }, {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.menu-art', start: 'top 90%', once: true },
      });

      // Value icons in the story section pop in cleanly together without overlap or flicker
      const valueItems = gsap.utils.toArray('.values > span');
      if (valueItems.length) {
        gsap.fromTo(valueItems, { autoAlpha: 0, y: 18, scale: 0.94 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(1.4)',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.values', start: 'top 92%', once: true },
        });
      }

      // Timeline items cascade in from left
      const timelineItems = gsap.utils.toArray('.timeline p');
      if (timelineItems.length) {
        gsap.fromTo(timelineItems, { autoAlpha: 0, x: -24 }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.timeline', start: 'top 91%', once: true },
        });
      }

      // Location constellation & handwritten map note
      gsap.fromTo('.locations-art', { autoAlpha: 0, y: 20 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: '.locations-heading', start: 'top 90%', once: true },
      });
      gsap.fromTo('.map-note', { autoAlpha: 0 }, {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.map-note', start: 'top 90%', once: true },
      });

      // Location cards stagger in cleanly without competing triggers
      const locationCards = gsap.utils.toArray('.location-card');
      if (locationCards.length) {
        gsap.fromTo(locationCards, { autoAlpha: 0, y: 34, scale: 0.98 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.location-grid', start: 'top 91%', once: true },
        });
      }

      // Review cards reveal smoothly together
      const reviewCards = gsap.utils.toArray('.review-card');
      if (reviewCards.length) {
        gsap.fromTo(reviewCards, { autoAlpha: 0, y: 30, scale: 0.97 }, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.review-track', start: 'top 91%', once: true },
        });
      }

      // Signature band elements animate cleanly without fighting scrub transforms
      gsap.fromTo('.signature-band > img', { autoAlpha: 0, x: -36 }, {
        autoAlpha: 1,
        x: 0,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'x',
        scrollTrigger: { trigger: '.signature-band', start: 'top 88%', once: true },
      });
      gsap.fromTo('.signature-art-group .signature-art-image', { autoAlpha: 0, scale: 0.88 }, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.85,
        stagger: 0.14,
        ease: 'back.out(1.3)',
        clearProps: 'scale',
        scrollTrigger: { trigger: '.signature-art', start: 'top 90%', once: true },
      });
      gsap.fromTo('.signature-art > span', { autoAlpha: 0 }, {
        autoAlpha: 1,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.signature-art', start: 'top 90%', once: true },
      });

      // Footer CTA image fades in smoothly while scroll parallax owns vertical movement
      gsap.fromTo('.footer-cta > img', { autoAlpha: 0 }, {
        autoAlpha: 1,
        duration: 0.95,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-cta', start: 'top 92%', once: true },
      });

      // Footer main columns cascade in reliably even on shorter laptop screens
      const footerCols = gsap.utils.toArray('.footer-main > *');
      if (footerCols.length) {
        gsap.fromTo(footerCols, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.footer-main', start: 'top 96%', once: true },
        });
      }

      // Locations ribbon items slide in cleanly
      const ribbonItems = gsap.utils.toArray('.locations-ribbon > *');
      if (ribbonItems.length) {
        gsap.fromTo(ribbonItems, { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: '.locations-ribbon', start: 'top 92%', once: true },
        });
      }

      // 1. Global top scroll progress bar scrub
      const progressBar = document.querySelector('.scroll-progress-bar');
      if (progressBar) {
        ScrollTrigger.create({
          start: 'top top',
          end: 'max',
          onUpdate: (self) => {
            progressBar.style.transform = `scaleX(${self.progress})`;
          },
        });
      }

      // 2. Floating back-to-top button reveal on scroll
      const backToTopPill = document.querySelector('.floating-back-to-top');
      if (backToTopPill) {
        ScrollTrigger.create({
          start: 400,
          end: 'max',
          onToggle: (self) => {
            backToTopPill.classList.toggle('is-visible', self.isActive);
          },
        });
      }

      // 3. Hero multi-layer depth scrub (biryani bucket, brush splash, floating notes)
      gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
        .to('.hero-food', { yPercent: 16, scale: 0.95, rotate: 2.2, ease: 'none' }, 0)
        .to('.hero-brush', { rotate: 24, scale: 1.16, yPercent: 10, ease: 'none' }, 0)
        .to('.hero-brush-rim', { rotate: -45, ease: 'none' }, 0)
        .to('.hero-note-malay', { y: -38, x: 14, rotate: -4, ease: 'none' }, 0)
        .to('.hero-note-taste', { y: -48, x: -16, rotate: 4.5, ease: 'none' }, 0)
        .to('.hero-spice-doodle-wrap', { y: 32, ease: 'none' }, 0)
        .to('.hero-copy', { yPercent: -10, autoAlpha: 0.25, ease: 'none' }, 0);

      // 4. Menu section stamp and hand-note organic float
      gsap.timeline({
        scrollTrigger: {
          trigger: '.menu-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      })
        .to('.menu-art .menu-stamp', { rotate: 28, y: -34, ease: 'none' }, 0)
        .to('.menu-art .hand-note', { rotate: -8, y: 24, ease: 'none' }, 0);

      // 5. Signature Biryani Dish dual-layer scroll parallax
      gsap.timeline({
        scrollTrigger: {
          trigger: '.signature-band',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.85,
        },
      })
        .fromTo('.signature-band > img', { scale: 1.08, yPercent: -8 }, { scale: 0.97, yPercent: 8, ease: 'none' }, 0)
        .to('.signature-art-image.botanical-art', { rotate: 25, y: -34, ease: 'none' }, 0)
        .to('.signature-art-image.leaf-art', { rotate: -20, y: 30, ease: 'none' }, 0)
        .to('.signature-art > span', { y: -14, ease: 'none' }, 0);

      // 6. Our Story photos parallax & timeline active highlights
      gsap.fromTo('.story-photo-wrap > img', { scale: 1.15, yPercent: -9 }, {
        scale: 1.0, yPercent: 9, ease: 'none',
        scrollTrigger: { trigger: '.story-photo-wrap', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
      gsap.fromTo('.story-bottom-photo > img', { scale: 1.12, yPercent: -7 }, {
        scale: 1.0, yPercent: 7, ease: 'none',
        scrollTrigger: { trigger: '.story-bottom-photo', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });

      gsap.utils.toArray('.timeline p').forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 65%',
          end: 'bottom 35%',
          toggleClass: { targets: item, className: 'is-in-view' },
        });
      });

      // 7. Locations Section botanical constellation dispersion
      gsap.timeline({
        scrollTrigger: {
          trigger: '.locations-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
        .to('.locations-sprig', { rotate: -24, y: -28, x: -14, ease: 'none' }, 0)
        .to('.locations-leaf', { rotate: 30, y: 32, x: 16, ease: 'none' }, 0)
        .to('.locations-chilli', { rotate: -38, y: -20, x: 20, ease: 'none' }, 0)
        .to('.locations-spice', { rotate: 50, y: 24, x: -12, ease: 'none' }, 0)
        .to('.map-note', { rotate: -2, y: -20, ease: 'none' }, 0);

      // 8. Locations Ribbon architectural storefront pan
      gsap.timeline({
        scrollTrigger: {
          trigger: '.locations-ribbon',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.9,
        },
      })
        .fromTo('.ribbon-sketch-wrap img', { xPercent: -3, yPercent: -5, scale: 0.98 }, { xPercent: 3, yPercent: 4, scale: 1.02, ease: 'none' }, 0);

      // 9. Reviews Section parallax lift
      gsap.timeline({
        scrollTrigger: {
          trigger: '.reviews-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
        .fromTo('.review-track', { yPercent: 4 }, { yPercent: -4, ease: 'none' }, 0);

      // 10. Footer CTA Big Biryani Parallax
      gsap.fromTo('.footer-cta > img', { yPercent: 14, scale: 1.06 }, {
        yPercent: -9, scale: 0.98, ease: 'none',
        scrollTrigger: { trigger: '.footer-cta', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });
    }) : null;

    let cancelled = false;
    if (!prefersReducedMotion && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelled = true;
      context?.revert();
      document.removeEventListener('click', onSectionLink);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
      if (typeof window !== 'undefined') window.__lenis = null;
    };
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    if (!heroReady) {
      const ctx = gsap.context(() => {
        gsap.set(['.hero .eyebrow', '.hero-description', '.hero-actions', '.hero-line > span', '.hero-food', '.hero-brush', '.hero-bottom-note'], {
          autoAlpha: 0,
        });
      });
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(['.hero .eyebrow', '.hero-description', '.hero-actions'], {
        autoAlpha: 0,
        y: 34,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.15,
        stagger: 0.16,
        clearProps: 'y',
      }, 0.05)
        .fromTo('.hero-line > span', {
          yPercent: 120,
          autoAlpha: 0,
          filter: 'blur(16px)',
        }, {
          yPercent: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.12,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set('.hero-line', { overflow: 'visible' });
            gsap.set('.hero-line > span', { clearProps: 'filter' });
          },
        }, 0.12)
        .fromTo('.hero-food', {
          autoAlpha: 0,
          y: 36,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'back.out(1.4)',
          clearProps: 'y',
        }, 0.22)
        .fromTo('.hero-brush', {
          autoAlpha: 0,
          y: 16,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'y',
        }, 0.1)
        .fromTo('.hero-bottom-note', {
          autoAlpha: 0,
          y: 10,
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'y',
        }, 0.5);
    });
    return () => ctx.revert();
  }, [heroReady]);

  return lenisRef;
}

// ============================================================================
// Scroll Text Reveal — Originkit Component (LineMaskSplit)
// Reusable component supporting words/chars/lines, mask clipping & blur reveal
// ============================================================================
export function LineMaskSplit({
  text = 'ANIMATION ON REVEAL',
  color = 'inherit',
  font = {},
  tag = 'h2',
  className = '',
  style = {},
  transition = {
    duration: 0.85,
    ease: 'power3.out',
    delay: 0,
  },
  reverse = true,
  splitMode = 'words', // 'words' | 'chars' | 'lines'
  blurEnabled = true,
  blurIntensity = 16,
  translateYInitial = 100, // percent
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    el.innerHTML = '';
    const parts = splitMode === 'chars' ? text.split('') : text.split(/(\s+)/);
    const elements = [];

    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part));
      } else {
        const mask = document.createElement('span');
        mask.className = 'line-mask-wrap';

        const inner = document.createElement('span');
        inner.className = 'line-mask-inner';
        inner.textContent = part;
        mask.appendChild(inner);
        el.appendChild(mask);
        elements.push(inner);
      }
    });

    const totalDuration = transition.duration || 0.85;
    const baseDelay = transition.delay || 0;
    const blurVal = blurEnabled ? blurIntensity : 0;

    const anim = gsap.fromTo(elements, {
      yPercent: translateYInitial,
      autoAlpha: 0,
      filter: blurVal ? `blur(${blurVal}px)` : 'none',
    }, {
      yPercent: 0,
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: totalDuration,
      stagger: 0.04,
      delay: baseDelay,
      ease: transition.ease || 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        toggleActions: reverse ? 'play none none reverse' : 'play none none none',
      },
    });

    return () => {
      anim.kill();
    };
  }, [text, splitMode, blurEnabled, blurIntensity, translateYInitial, reverse, transition]);

  const Tag = tag;

  return (
    <div
      ref={containerRef}
      className={`line-mask-split ${className}`}
      style={{
        display: 'flex',
        justifyContent: font.textAlign === 'center' ? 'center' : font.textAlign === 'right' ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent',
        ...style,
      }}
    >
      <Tag
        ref={textRef}
        style={{
          margin: 0,
          color,
          fontSize: font.fontSize,
          fontWeight: font.fontWeight || '700',
          fontFamily: font.fontFamily || 'var(--serif)',
          fontStyle: font.fontStyle,
          textDecoration: font.textDecoration,
          textTransform: font.textTransform,
          letterSpacing: font.letterSpacing,
          lineHeight: font.lineHeight,
          textAlign: font.textAlign || 'inherit',
          width: '100%',
        }}
      >
        {text}
      </Tag>
    </div>
  );
}

// ============================================================================
// Tiles Loader — Originkit (adapted for Chillies Malabar Theme)
// ============================================================================
const ED_FADE_S = 0.35;
const ED_SERIF = '"Cormorant Garamond", Georgia, serif';
const ED_SANS = '"DM Sans", Arial, sans-serif';

function edRand(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Simulated load: seeded asset chunks landing at uneven times; exactly 1 at loadS. */
function edLoadCurve(seed, loadS) {
  const r = edRand(seed);
  const k = Math.min(1, loadS / 4.4);
  const chunks = [];
  let total = 0;
  for (let i = 0; i < 7; i++) {
    const size = 0.4 + r() * 1.2;
    chunks.push({ size, start: r() * 0.78 * loadS, len: (0.25 + r() * 0.9) * k });
    total += size;
  }
  chunks.push({ size: total * 0.12, start: loadS - 0.45 * k, len: 0.45 * k });
  total *= 1.12;
  return (t) => {
    if (t >= loadS) return 1;
    let p = 0;
    for (const c of chunks) {
      const x = Math.min(1, Math.max(0, (t - c.start) / Math.max(1e-3, c.len)));
      p += c.size * x * x * (3 - 2 * x);
    }
    return Math.min(0.999, p / total);
  };
}

/** Real document load, 0..1. Images and fonts pull it up; the window load event finishes it. */
function edRealLoad() {
  if (typeof document === 'undefined') return 1;
  if (document.readyState === 'complete') return 1;
  const imgs = document.images;
  let done = 0;
  for (let i = 0; i < imgs.length; i++) if (imgs[i].complete) done++;
  const frac = imgs.length ? done / imgs.length : 1;
  const fonts = document.fonts && document.fonts.status === 'loaded' ? 1 : 0;
  return Math.min(1, 0.2 + 0.6 * frac + 0.2 * fonts);
}

const edClamp = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const edSeg = (x, a, b) => edClamp((x - a) / Math.max(1e-6, b - a));
const edOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const edInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

function edFont(font, fallbackFamily) {
  const f = font || {};
  return {
    fontFamily: f.fontFamily || fallbackFamily,
    fontWeight: f.fontWeight ?? 600,
    fontStyle: f.fontStyle || 'normal',
    letterSpacing: f.letterSpacing ?? '-0.03em',
    lineHeight: f.lineHeight ?? 1,
  };
}

function edRootStyle(style) {
  return {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999999,
    overflow: 'hidden',
    containerType: 'size',
    isolation: 'isolate',
    pointerEvents: 'auto',
    ...style,
  };
}

const useEdLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function useEditorialLoader(rootRef, sceneRef, optsRef) {
  useEdLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = root.offsetWidth;
    let h = root.offsetHeight;
    let t = 0;
    let progress = 0;
    let revealAt = -1;
    let finished = false;
    let revealTriggered = false;
    let loadS = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime);
    let curve = edLoadCurve(7, loadS);

    const draw = (dt) => {
      const revealS = reduced ? 0.4 : sceneRef.current.revealS;
      const reveal = revealAt < 0 ? 0 : edClamp((t - revealAt) / revealS);
      const phase = revealAt < 0 ? 'loading' : reveal < 1 ? 'reveal' : 'page';
      try {
        sceneRef.current.frame({ t, dt, progress, reveal, phase, w, h });
      } catch (e) {
        console.error(e);
      }
    };

    const restart = () => {
      loadS = reduced ? 0.6 : Math.max(0.5, optsRef.current.minTime);
      curve = edLoadCurve(7, loadS);
      t = 0;
      progress = 0;
      revealAt = -1;
      const s = sceneRef.current;
      if (s.reset) s.reset();
    };
    restart();
    draw(0);

    const ro = new ResizeObserver(() => {
      w = root.offsetWidth;
      h = root.offsetHeight;
      if (!finished) draw(0);
    });
    ro.observe(root);

    let isWindowLoaded = typeof document !== 'undefined' && document.readyState === 'complete';
    const onLoad = () => { isWindowLoaded = true; };
    if (!isWindowLoaded && typeof window !== 'undefined') {
      window.addEventListener('load', onLoad, { once: true });
    }

    let raf = 0;
    let last = -1;
    const tick = (now) => {
      const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      const revealS = reduced ? 0.4 : sceneRef.current.revealS;
      if (revealAt < 0) {
        // Hard safety timeout: loader must NEVER lock up the site on mobile/slow connections
        const maxWait = reduced ? 0.8 : Math.max(2.4, loadS + 0.6);
        const readyRatio = isWindowLoaded || (typeof document !== 'undefined' && document.readyState === 'complete') || t >= loadS ? 1 : edRealLoad();
        const target = Math.min(1, Math.max(curve(t), (t / loadS) * readyRatio));

        if (t >= maxWait) {
          progress = 1;
          revealAt = t;
        } else {
          progress = target >= 0.999 ? 1 : Math.min(target, progress + dt * 2.2);
          if (progress >= 1 && t >= loadS) revealAt = t;
        }
      }

      if (revealAt >= 0 && !revealTriggered) {
        revealTriggered = true;
        optsRef.current.onRevealStart && optsRef.current.onRevealStart();
      }

      draw(dt);

      if (revealAt >= 0 && t - revealAt >= revealS) {
        finished = true;
        root.style.transition = `opacity ${ED_FADE_S}s ease`;
        root.style.opacity = '0';
        root.style.pointerEvents = 'none';
        window.setTimeout(() => {
          root.style.visibility = 'hidden';
        }, ED_FADE_S * 1000);
        optsRef.current.onComplete && optsRef.current.onComplete();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', onLoad);
      }
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);
}

const REVEAL_S = 1.6;
const SHORT_SIDE = 7;
const INK_WINDOW = 0.04;

function TilesLoader({
  minTime = 2.0,
  onRevealStart,
  onComplete,
  style,
}) {
  const [grid, setGrid] = useState({ cols: 11, rows: 7 });
  const { cols, rows } = grid;
  const count = cols * rows;

  const rootRef = useRef(null);
  const tileRefs = useRef([]);
  const paperRefs = useRef([]);
  const countRef = useRef(null);
  const numRef = useRef(null);
  const chromeRef = useRef(null);
  const barRef = useRef(null);
  const phaseRef = useRef(null);
  tileRefs.current.length = paperRefs.current.length = count;

  const order = useRef([]);
  if (order.current.length !== count) {
    const r = edRand(count * 7919 + 13);
    order.current = Array.from({ length: count }, () => r() * (1 - INK_WINDOW));
  }

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const fit = () => {
      const w = root.offsetWidth;
      const h = root.offsetHeight;
      if (!w || !h) return;
      const cell = Math.min(w, h) / SHORT_SIDE;
      const next = { cols: Math.max(1, Math.round(w / cell)), rows: Math.max(1, Math.round(h / cell)) };
      setGrid((g) => (g.cols === next.cols && g.rows === next.rows ? g : next));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const optsRef = useRef({ minTime, onRevealStart, onComplete });
  optsRef.current = { minTime, onRevealStart, onComplete };

  const sceneRef = useRef({ revealS: REVEAL_S, frame() { } });
  sceneRef.current = {
    revealS: REVEAL_S,
    frame({ t, progress, reveal }) {
      const u = order.current;
      for (let i = 0; i < count; i++) {
        const paper = paperRefs.current[i];
        if (paper) paper.style.opacity = String(1 - edSeg(progress, u[i], u[i] + INK_WINDOW));
        const tile = tileRefs.current[i];
        if (!tile) continue;
        const c = i % cols;
        const r = Math.floor(i / cols);
        const d = 0.5 * (cols > 1 ? c / (cols - 1) : 0) + 0.5 * (rows > 1 ? (rows - 1 - r) / (rows - 1) : 0);
        const e = edInOutCubic(edSeg(reveal, d * 0.55, d * 0.55 + 0.45));
        tile.style.transform = `scale(${1 - e})`;
      }
      const pct = Math.round(progress * 100);
      const digits = String(pct);
      const num = numRef.current;
      if (num && num.textContent !== digits) num.textContent = digits;

      // Update liquid gold-red progress bar
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }

      // Update poetic culinary stage note
      if (phaseRef.current) {
        if (pct >= 85) phaseRef.current.textContent = 'മേശയിലേക്ക് സ്വാഗതം · Welcome to Chillies';
        else if (pct >= 60) phaseRef.current.textContent = 'ദം ഇട്ട് കാത്തുവെച്ച ബിരിയാണി · Slow-simmering Kaima dum...';
        else if (pct >= 30) phaseRef.current.textContent = 'കരിങ്കനലിൽ വേവുന്ന വിഭവങ്ങൾ · Wood-fired charcoal grills...';
        else phaseRef.current.textContent = 'സുഗന്ധവ്യഞ്ജനങ്ങളുടെ മാന്ത്രികത · Infusing fresh Malabar spices...';
      }

      // Fade difference percentage and chrome smoothly as the diagonal reveal wave sweeps
      const fadeFactor = edOutCubic(edSeg(t, 0.08, 0.7)) * (1 - edSeg(reveal, 0, 0.16));
      const label = countRef.current;
      if (label) label.style.opacity = String(fadeFactor);
      const chrome = chromeRef.current;
      if (chrome) chrome.style.opacity = String(fadeFactor);
    },
  };

  useEditorialLoader(rootRef, sceneRef, optsRef);

  return (
    <div
      ref={rootRef}
      style={edRootStyle(style)}
      role="status"
      aria-label="Loading Chillies Restaurant website"
    >
      {/* Procedural Inking Grid */}
      {Array.from({ length: count }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (
          <div
            key={`${cols}x${rows}-${i}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            style={{
              position: 'absolute',
              left: `${(c * 100) / cols}%`,
              top: `${(r * 100) / rows}%`,
              width: `calc(${100 / cols}% + 1px)`,
              height: `calc(${100 / rows}% + 1px)`,
              background: '#ffc414', // Website --ink color
            }}
          >
            {/* Paper Face with Website Stippled Dot Texture */}
            <div
              ref={(el) => {
                paperRefs.current[i] = el;
              }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#FAF5E8', // Website --paper color
                backgroundImage: 'radial-gradient(rgba(143, 111, 66, 0.16) 0.55px, transparent 0.7px)',
                backgroundSize: '5px 5px',
              }}
            />
          </div>
        );
      })}

      {/* Center Giant Difference Blend Percentage Counter */}
      <div
        ref={countRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          color: '#ffffff',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          fontFamily: "'Cormorant Garamond', Georgia, serif", // Website --serif
          fontSize: 'min(32cqh, 42cqw)',
          fontWeight: 700,
          letterSpacing: '-0.06em',
          lineHeight: 0.86,
          fontVariantNumeric: 'tabular-nums',
          opacity: 0,
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
          <span ref={numRef}>0</span>
          <span
            style={{
              fontSize: '0.32em',
              fontStyle: 'italic',
              fontWeight: 600,
              marginTop: '0.82em',
              marginLeft: '0.06em',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            %
          </span>
        </span>
      </div>

      {/* Brand Chrome Layer in Exact Chillies Palette (Red, Saffron Yellow, Paper, Ink) */}
      <div
        ref={chromeRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'clamp(24px, 4.5vh, 48px) clamp(20px, 4vw, 40px)',
          pointerEvents: 'none',
          zIndex: 4,
          opacity: 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        {/* Top Eyebrow in Chillies Crimson Red & Personal Cursive Note */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--red, #cf1028)', // Website --red
              fontFamily: "'DM Sans', Arial, sans-serif", // Website --sans
              fontSize: 'clamp(11px, 1.4vw, 13px)',
              fontWeight: 800,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            <span>✦</span>
            <span>CHILLIES RESTAURANT · EST. 2009</span>
            <span>✦</span>
          </div>
          <span
            style={{
              fontFamily: "'Caveat', cursive", // Website handwritten cursive
              fontSize: 'clamp(17px, 2.3vw, 22px)',
              color: '#8a6038',
              letterSpacing: '0.02em',
            }}
          >
            Slow-simmered dum, wood-fired charcoal grills & authentic coastal flavours
          </span>
        </div>

        {/* Center Progress Meter Bar in Turmeric Gold & Crimson Red */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            marginTop: 'min(30cqh, 38cqw)',
          }}
        >
          <div
            style={{
              width: 'clamp(190px, 28vw, 320px)',
              height: '4px',
              borderRadius: '999px',
              background: 'rgba(47, 35, 20, 0.15)',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.12)',
            }}
          >
            <div
              ref={barRef}
              style={{
                width: '0%',
                height: '100%',
                borderRadius: 'inherit',
                background: 'linear-gradient(90deg, #ffc414 0%, #cf1028 100%)', // Website --yellow to --red
                boxShadow: '0 0 10px rgba(207, 16, 40, 0.5)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <div
            ref={phaseRef}
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(16px, 2.2vw, 20px)',
              color: '#5e5a54', // Website --muted
              letterSpacing: '0.02em',
            }}
          >
            സുഗന്ധവ്യഞ്ജനങ്ങളുടെ മാന്ത്രികത · Infusing fresh Malabar spices...
          </div>
        </div>

        {/* Bottom Locations Footer in DM Sans and Chillies Red */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(8px, 1.8vw, 16px)',
            fontFamily: "'DM Sans', Arial, sans-serif", // Website --sans
            fontSize: 'clamp(9.5px, 1.2vw, 11.5px)',
            fontWeight: 800,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8a6038',
          }}
        >
          <span>WANDOOR</span>
          <span style={{ color: 'var(--red, #cf1028)', fontSize: '12px' }}>·</span>
          <span>ANCHACHAVIDI</span>
          <span style={{ color: 'var(--red, #cf1028)', fontSize: '12px' }}>·</span>
          <span>PULLIKALODI</span>
          <span style={{ color: 'var(--red, #cf1028)', fontSize: '12px' }}>·</span>
          <span>THIRUVALLI</span>
        </div>
      </div>
    </div>
  );
}

// Keep CinematicLoader alias for backwards compatibility
const CinematicLoader = TilesLoader;

export default function App() {
  const [loaderMounted, setLoaderMounted] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });
  const [heroReady, setHeroReady] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });
  const lenisRef = useScrollMotion(heroReady);

  useEffect(() => {
    const markImage = (image) => {
      if (!(image instanceof HTMLImageElement)) return;
      if (image.complete) {
        const isReady = image.naturalWidth > 0;
        image.dataset.mediaState = isReady ? 'done' : 'error';
        image.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta')?.classList.toggle('has-loaded-image', isReady);
      } else {
        image.dataset.mediaState = 'loading';
        image.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta')?.classList.add('has-skeleton');
      }
    };
    document.querySelectorAll('img').forEach(markImage);
    const onImageEvent = (event) => {
      if (!(event.target instanceof HTMLImageElement)) return;
      const isReady = event.type === 'load' && event.target.naturalWidth > 0;
      const wasLoading = event.target.dataset.mediaState === 'loading';
      event.target.dataset.mediaState = isReady ? (wasLoading ? 'ready' : 'done') : 'error';
      const parent = event.target.closest('.food-card, .location-card, .story-photo-wrap, .story-bottom-photo, .signature-band, .footer-cta');
      if (parent) {
        parent.classList.toggle('has-loaded-image', isReady);
        parent.classList.remove('has-skeleton');
      }
    };
    document.addEventListener('load', onImageEvent, true);
    document.addEventListener('error', onImageEvent, true);
    return () => {
      document.removeEventListener('load', onImageEvent, true);
      document.removeEventListener('error', onImageEvent, true);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#top') return undefined;

    let target;
    try {
      target = document.querySelector(decodeURIComponent(window.location.hash));
    } catch {
      return undefined;
    }
    if (!target) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const headerOffset = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
      const top = window.location.hash === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lenisRef]);

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return <>
    <div className="scroll-progress-bar" aria-hidden="true" />
    {loaderMounted && (
      <CinematicLoader
        onRevealStart={() => setHeroReady(true)}
        onComplete={() => {
          setLoaderMounted(false);
          ScrollTrigger.refresh();
        }}
      />
    )}
    <Header /><main><Hero /><MenuSection /><StorySection /><LocationsSection /><ReviewsSection /></main><Footer />
    <button className="floating-back-to-top" onClick={scrollToTop} aria-label="Scroll back to top">
      <span aria-hidden="true">↑</span>
    </button>
  </>;
}


