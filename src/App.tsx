import { useEffect, useRef, useState, useCallback } from 'react';
import './styles.css';

/* ─────── Particles Generator ─────── */
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${6 + Math.random() * 8}s`,
    delay: `${Math.random() * 5}s`,
    tx1: `${-40 + Math.random() * 80}px`,
    ty1: `${-60 + Math.random() * 40}px`,
    tx2: `${-40 + Math.random() * 80}px`,
    ty2: `${-100 + Math.random() * 40}px`,
    tx3: `${-40 + Math.random() * 80}px`,
    ty3: `${-60 + Math.random() * 40}px`,
    size: `${3 + Math.random() * 4}px`,
  }));

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            ['--duration' as string]: p.duration,
            ['--delay' as string]: p.delay,
            ['--tx1' as string]: p.tx1,
            ['--ty1' as string]: p.ty1,
            ['--tx2' as string]: p.tx2,
            ['--ty2' as string]: p.ty2,
            ['--tx3' as string]: p.tx3,
            ['--ty3' as string]: p.ty3,
          }}
        />
      ))}
    </>
  );
}

/* ─────── Progress Bar ─────── */
function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="progress-bar" style={{ width: `${width}%` }} />;
}

/* ─────── Scroll Reveal Hook ─────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe the element itself and all reveal children
    const revealEls = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealEls.forEach((child) => observer.observe(child));
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('reveal-scale')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─────── Hero Section ─────── */
function Hero() {
  const ref = useReveal();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Le Tuto Express pour tout maîtriser';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero" ref={ref}>
      <div className="hero-grid" />
      <Particles />
      <div className="hero-content container">
        <div className="logo-container reveal" style={{ transitionDelay: '0s' }}>
          <div className="logo-icon">
            <i className="fas fa-code" />
          </div>
          <div className="logo-text">
            Level Up Creation <span>Editor</span>
          </div>
        </div>
        <h1 className="reveal" style={{ transitionDelay: '0.15s' }}>
          {typedText}
          <span className="typing-cursor" />
        </h1>
        <p className="reveal" style={{ transitionDelay: '0.3s' }}>
          Ton environnement de dev complet, direct dans le navigateur.
        </p>
        <div className="hero-buttons reveal" style={{ transitionDelay: '0.45s' }}>
          <a
            href="https://lydiags.github.io/Levelupcreationapprendrelecode/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            <i className="fas fa-rocket" /> Ouvrir l'éditeur
          </a>
          <a
            href="https://levelupcreation.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="fas fa-globe" /> Vers le site
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="chevron" />
      </div>
    </header>
  );
}

/* ─────── Interface Section ─────── */
function InterfaceSection() {
  const ref = useReveal();
  const [activeFile, setActiveFile] = useState('index.html');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const files = [
    { name: 'index.html', icon: 'fab fa-html5' },
    { name: 'style.css', icon: 'fab fa-css3-alt' },
    { name: 'script.js', icon: 'fab fa-js' },
  ];

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <h2 className="reveal">
          <i className="fas fa-compass" /> 1. L'Interface (Le Saint Graal)
        </h2>
        <p className="reveal" style={{ transitionDelay: '0.1s' }}>
          C'est simple : 3 colonnes. Fichiers à gauche, Code au milieu, Résultat à droite.
        </p>

        <div className="layout-mockup reveal-scale" style={{ transitionDelay: '0.2s' }}>
          {/* Sidebar */}
          <div className="mock-sidebar">
            <div className="sb-title">EXPLORER</div>
            {files.map((f) => (
              <div
                key={f.name}
                className={`sb-item ${activeFile === f.name ? 'active' : ''}`}
                onClick={() => setActiveFile(f.name)}
              >
                <i className={f.icon} /> {f.name}
              </div>
            ))}
            <div className="sb-btn">
              <i className="fas fa-plus" /> Nouveau
            </div>
          </div>

          {/* Editor */}
          <div className="mock-editor">
            <div className="editor-top">
              <div className="tabs">
                <div className="tab active">{activeFile}</div>
              </div>
              <div className="actions">
                <button title="Formater">
                  <i className="fas fa-broom" />
                </button>
                <button title="Aide">
                  <i className="fas fa-question-circle" />
                </button>
              </div>
            </div>
            <div className="editor-content">
              {activeFile === 'index.html' && (
                <>
                  <span className="c-tag">&lt;!DOCTYPE html&gt;</span>
                  <br />
                  <span className="c-tag">&lt;html&gt;</span>
                  <br />
                  &nbsp;&nbsp;<span className="c-tag">&lt;head&gt;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="c-tag">&lt;link</span>{' '}
                  <span className="c-attr">rel</span>=
                  <span className="c-val">"stylesheet"</span>{' '}
                  <span className="c-attr">href</span>=
                  <span className="c-val">"style.css"</span>&gt;
                  <br />
                  &nbsp;&nbsp;<span className="c-tag">&lt;/head&gt;</span>
                  <br />
                  &nbsp;&nbsp;<span className="c-tag">&lt;body&gt;</span>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="c-comment">&lt;!-- Tape ici ! --&gt;</span>
                  <br />
                  &nbsp;&nbsp;<span className="c-tag">&lt;/body&gt;</span>
                  <br />
                  <span className="c-tag">&lt;/html&gt;</span>
                  <span className="typing-cursor" />
                </>
              )}
              {activeFile === 'style.css' && (
                <>
                  <span className="c-tag">body</span> &#123;
                  <br />
                  &nbsp;&nbsp;<span className="c-attr">background</span>:{' '}
                  <span className="c-val">#0b0b0d</span>;
                  <br />
                  &nbsp;&nbsp;<span className="c-attr">color</span>:{' '}
                  <span className="c-val">#f2f2f4</span>;
                  <br />
                  &nbsp;&nbsp;<span className="c-attr">font-family</span>:{' '}
                  <span className="c-val">sans-serif</span>;
                  <br />
                  &#125;
                  <span className="typing-cursor" />
                </>
              )}
              {activeFile === 'script.js' && (
                <>
                  <span className="c-tag">const</span>{' '}
                  <span className="c-attr">app</span> ={' '}
                  <span className="c-tag">document</span>.
                  <span className="c-attr">querySelector</span>(
                  <span className="c-val">'#app'</span>);
                  <br />
                  <br />
                  <span className="c-tag">console</span>.
                  <span className="c-attr">log</span>(
                  <span className="c-val">'Hello World!'</span>);
                  <span className="typing-cursor" />
                </>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="mock-preview">
            <div className="preview-top">
              <span>
                <i className="fas fa-eye" /> Preview
              </span>
              <button
                className="refresh-btn"
                title="Rafraîchir"
                onClick={handleRefresh}
                style={{
                  transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)',
                  transition: 'transform 0.6s ease',
                }}
              >
                <i className="fas fa-sync-alt" />
              </button>
            </div>
            <div className="preview-content">
              <div style={{ padding: 20, textAlign: 'center' }}>
                <h3>Résultat ici</h3>
                <p>En temps réel !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────── Linker Section ─────── */
function LinkerSection() {
  const ref = useReveal();

  return (
    <section className="section bg-darker" ref={ref}>
      <div className="container">
        <h2 className="reveal">
          <i className="fas fa-link" /> 2. La Règle d'Or : Tout lier !
        </h2>
        <p className="reveal" style={{ transitionDelay: '0.1s' }}>
          Le fichier <code>index.html</code> est le chef d'orchestre. Il doit appeler les autres.
        </p>

        <div className="step-grid">
          <div className="step reveal-left" style={{ transitionDelay: '0.2s' }}>
            <h3>
              <i className="fas fa-file-code" /> Dans index.html
            </h3>
            <pre>
              <code>{`<!-- Mets ça dans le <head> -->
<link rel="stylesheet" href="style.css">

<!-- Mets ça juste avant </body> -->
<script src="script.js"></script>`}</code>
            </pre>
          </div>
          <div className="step reveal-right" style={{ transitionDelay: '0.3s' }}>
            <h3>
              <i className="fas fa-folder-tree" /> Dans l'explorateur
            </h3>
            <p>Les noms doivent correspondre EXACTEMENT :</p>
            <div className="file-tree-viz">
              <div>📁 mon-projet</div>
              <div className="indent">📄 index.html 👈</div>
              <div className="indent">📄 style.css 👈</div>
              <div className="indent">📄 script.js 👈</div>
            </div>
          </div>
        </div>

        <div className="pro-tip reveal" style={{ transitionDelay: '0.4s' }}>
          <i className="fas fa-exclamation-triangle" />
          <div>
            <strong>Erreur n°1 :</strong> Si ça marche pas, vérifie que tu as bien écrit{' '}
            <code>href="style.css"</code> et pas <code>href="style.css.txt"</code>.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────── Super Powers Section ─────── */
function SuperPowersSection() {
  const ref = useReveal();

  const cards = [
    {
      icon: '⚡',
      title: 'Preview Live',
      desc: "Pas besoin de sauvegarder. Tu tapes, ça s'affiche à droite instantanément.",
    },
    {
      icon: '🤖',
      title: 'Auto-complétion',
      desc: (
        <>
          Tape <code>&lt;div</code> et appuie sur <kbd>Tab</kbd>. Magique ! Ça ferme la balise pour toi.
        </>
      ),
    },
    {
      icon: '🧹',
      title: 'Formater le Code',
      desc: (
        <>
          Ton code est mal formaté ?<br />
          Clique sur Format dans le menu du haut pour le nettoyer automatiquement.
        </>
      ),
    },
    {
      icon: '🔄',
      title: 'Bouton Refresh',
      desc: 'Si la preview bug, clique sur l\'icône 🔄 en haut à droite de la preview.',
    },
    {
      icon: <i className="fab fa-npm" />,
      title: 'Packages NPM',
      desc: 'Installe des librairies (GSAP, Three.js) via le bouton NPM.',
    },
    {
      icon: <i className="fas fa-file-archive" />,
      title: 'Export ZIP',
      desc: 'Télécharge tout ton projet en un clic pour le mettre en ligne.',
    },
    {
      icon: <i className="fas fa-file-import" />,
      title: 'Import ZIP',
      desc: 'Importe tout ton projet en un clic pour le modifier ici.',
    },
    {
      icon: <i className="fas fa-search" />,
      title: 'Barre de recherche',
      desc: 'Utilise la barre de recherche pour trouver rapidement des fichiers ou des dossiers dans ton projet.',
    },
  ];

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <h2 className="reveal">
          <i className="fas fa-bolt" /> 3. Les Super-Pouvoirs (pour coder vite)
        </h2>
        <div className="cards-grid stagger-children">
          {cards.map((card, i) => (
            <div
              key={i}
              className="card reveal"
              style={{ ['--i' as string]: i, transitionDelay: `${0.05 * i}s` }}
            >
              <div className="card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────── Code Section ─────── */
function CodeSection() {
  const ref = useReveal();

  const features = [
    { emoji: '🌐', text: 'Créer des pages web avec', highlight: 'HTML' },
    { emoji: '🎨', text: 'Styliser vos pages avec', highlight: 'CSS' },
    { emoji: '⚡', text: 'Ajouter des interactions avec', highlight: 'JavaScript' },
    { emoji: '📁', text: 'Organiser vos projets avec des fichiers et dossiers', highlight: '' },
    { emoji: '👀', text: 'Prévisualiser votre site instantanément', highlight: '' },
  ];

  return (
    <section className="section-code" ref={ref}>
      <div className="container">
        <h2 className="reveal">
          <i className="fas fa-code" /> 4. Alors, qu'est-ce qu'on peut coder avec l'éditeur ?
        </h2>
        <p className="reveal" style={{ transitionDelay: '0.1s' }}>
          Avec l'éditeur Level Up Creation, vous pouvez créer facilement des projets web
          directement dans votre navigateur. Il permet d'écrire et tester du code en temps réel.
        </p>

        <ul className="feature-list">
          {features.map((f, i) => (
            <li
              key={i}
              className="reveal"
              style={{ transitionDelay: `${0.15 + i * 0.08}s` }}
            >
              <span className="emoji">{f.emoji}</span>
              <span>
                {f.text} {f.highlight && <strong>{f.highlight}</strong>}
              </span>
            </li>
          ))}
        </ul>

        <p className="reveal" style={{ transitionDelay: '0.6s' }}>
          C'est l'outil idéal pour apprendre le développement web, tester des idées rapidement ou
          créer vos premiers projets.
        </p>
      </div>
    </section>
  );
}

/* ─────── Footer ─────── */
function Footer() {
  const ref = useReveal();

  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-cta reveal">
            <p>Prêt à passer au niveau supérieur ?</p>
            <a
              href="http://editor.levelupcreation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-coder"
            >
              Clique ici pour coder <span>→</span>
            </a>
          </div>
          <div className="footer-contact reveal" style={{ transitionDelay: '0.15s' }}>
            <h3>Contactez-nous</h3>
            <a href="mailto:contact@levelupcreation.com">contact@levelupcreation.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Level Up Creation. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

/* ─────── Main App ─────── */
export default function App() {
  // Initialize scroll reveal observer globally
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Smooth mouse parallax on hero
  useEffect(() => {
    const heroEl = document.querySelector('.hero') as HTMLElement;
    if (!heroEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const grid = heroEl.querySelector('.hero-grid') as HTMLElement;
      if (grid) {
        grid.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
      }
    };

    heroEl.addEventListener('mousemove', handleMouseMove);
    return () => heroEl.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ProgressBar />
      <Hero />
      <div className="section-divider" />
      <InterfaceSection />
      <div className="section-divider" />
      <LinkerSection />
      <div className="section-divider" />
      <SuperPowersSection />
      <div className="section-divider" />
      <CodeSection />
      <Footer />
    </>
  );
}
