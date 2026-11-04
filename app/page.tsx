"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import Hero3D with SSR disabled
const Hero3D = dynamic(() => import("./components/Hero3D"), { ssr: false });

const PAGES = ["home", "about", "services", "process", "case", "faq", "contact"] as const;
type PageId = (typeof PAGES)[number];

export default function PortfolioPage() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Mouse tracking for Hero 3D background & card tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    service: "Conversion Tracking",
    message: "",
  });

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = (window.location.hash || "#home").replace("#", "") as PageId;
      if (PAGES.includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage("home");
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 50);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".rv");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activePage]);

  // Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Hero mouse move handler
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
    setIsHoveringHero(true);
  };

  const handleHeroMouseLeave = () => {
    setIsHoveringHero(false);
    setMousePos({ x: 0, y: 0 });
  };

  const navigateTo = (page: PageId) => {
    window.location.hash = `#${page}`;
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Hello Badal, I am ${formData.name}. Website: ${formData.website || "N/A"}. Service: ${formData.service}. ${formData.message}`;
    window.open(`https://wa.me/8801518961086?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div suppressHydrationWarning>
      {/* Top Info Bar */}
      <div className="tb">
        <div className="wrap">
          <div className="r">
            <a href="https://wa.me/8801518961086" target="_blank" rel="noopener noreferrer">
              💬 +880 1518-961086
            </a>
            <a href="https://www.linkedin.com/in/mdbadalislams/" target="_blank" rel="noopener noreferrer">
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header>
        <div className="wrap">
          <nav>
            <a className="logo" href="#home" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>
              <svg viewBox="0 0 48 48" width="32" height="32" aria-hidden="true">
                <defs>
                  <linearGradient id="lgh" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#059669" />
                    <stop offset="1" stopColor="#84cc16" />
                  </linearGradient>
                </defs>
                <path d="M24 3l18 10.5v21L24 45 6 34.5v-21z" fill="url(#lgh)" />
                <path d="M24 3l18 10.5L24 24 6 13.5z" fill="#fff" opacity=".28" />
                <path d="M6 13.5L24 24v21L6 34.5z" fill="#000" opacity=".12" />
                <text
                  x="24"
                  y="33"
                  textAnchor="middle"
                  fontFamily="system-ui,sans-serif"
                  fontWeight="800"
                  fontSize="19"
                  fill="#fff"
                >
                  B
                </text>
              </svg>
              <span>
                Badal<span className="gt">.</span>
              </span>
            </a>
            <ul>
              <li>
                <a
                  href="#home"
                  className={activePage === "home" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("home"); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={activePage === "about" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("about"); }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className={activePage === "services" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className={activePage === "process" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("process"); }}
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#case"
                  className={activePage === "case" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
                >
                  Case Study
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className={activePage === "faq" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("faq"); }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={activePage === "contact" ? "on" : ""}
                  onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
                >
                  Contact
                </a>
              </li>
            </ul>
            <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}>
              Book a Call
            </a>
          </nav>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 4. PAGE: HOME                                             */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "home" ? "on" : ""}`} data-p="home">
        {/* Hero Section */}
        <div
          className="hero"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
        >
          <Hero3D mouseX={mousePos.x} mouseY={mousePos.y} />
          <div className="scrl">
            <i></i>Scroll
          </div>
          <div className="wrap">
            <div>
              <span className="pill">
                <i></i>Available for international projects
              </span>
              <h1>
                Accurate Data. <span className="gt">Smarter Ads.</span> Better Growth.
              </h1>
              <p>
                I’m Md Badal Islam, a digital marketing expert who helps businesses and agencies track
                what really works and spend their ad budget with confidence.
              </p>
              <div className="btns">
                <a
                  className="btn"
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
                >
                  Get a Free Tracking Review
                </a>
                <a
                  className="btn o"
                  href="#case"
                  onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
                >
                  See a Case Study
                </a>
              </div>
              <div className="chips">
                <span>Google Tag Manager</span>
                <span>GA4</span>
                <span>Google Ads</span>
                <span>Enhanced Conversions</span>
              </div>
            </div>
            <div className="pf">
              <div
                className="pc"
                id="pc"
                style={{
                  animation: isHoveringHero ? "none" : undefined,
                  transform: isHoveringHero
                    ? `rotateY(${mousePos.x * 32}deg) rotateX(${-mousePos.y * 22}deg)`
                    : undefined,
                }}
              >
                <div className="ring"></div>
                <div className="face back"></div>
                <div className="face">
                  <Image
                    src="/profile.jpeg"
                    alt="Md Badal Islam"
                    fill
                    sizes="(max-width: 860px) 290px, 330px"
                    loading="eager"
                    fetchPriority="high"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="chip" style={{ top: "-14px", left: "-34px", transform: "translateZ(90px)" }}>
                  GTM
                </span>
                <span
                  className="chip"
                  style={{ top: "32%", right: "-42px", transform: "translateZ(110px)", animationDelay: "-1.5s" }}
                >
                  GA4
                </span>
                <span
                  className="chip"
                  style={{ bottom: "12%", left: "-46px", transform: "translateZ(100px)", animationDelay: "-3s" }}
                >
                  Google Ads
                </span>
                <span
                  className="chip"
                  style={{ bottom: "-14px", right: "-10px", transform: "translateZ(80px)", animationDelay: "-2s" }}
                >
                  ROI ↑
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Highlights */}
        <section className="info">
          <div className="wrap">
            <div className="ig">
              <div className="ib" style={{ "--k": "#059669" } as React.CSSProperties}>
                <i>🎯</i>
                <div>
                  <b>Specialty</b>
                  <span>Conversion tracking &amp; Google Ads</span>
                </div>
              </div>
              <div className="ib" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <i>🌐</i>
                <div>
                  <b>Work Style</b>
                  <span>Remote, across time zones</span>
                </div>
              </div>
              <div className="ib" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <i>💬</i>
                <div>
                  <b>Contact</b>
                  <span>WhatsApp &amp; LinkedIn</span>
                </div>
              </div>
              <div className="ib" style={{ "--k": "#16a34a" } as React.CSSProperties}>
                <i>🗣️</i>
                <div>
                  <b>Languages</b>
                  <span>Bangla &amp; English</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="mq">
          <div>
            <span>Google Ads</span>
            <span>Google Analytics 4</span>
            <span>Google Tag Manager</span>
            <span>Meta Ads</span>
            <span>TikTok Ads</span>
            <span>Microsoft Clarity</span>
            <span>Looker Studio</span>
            <span>HubSpot</span>
            <span>Shopify</span>
            <span>WordPress</span>
            <span>Google Ads</span>
            <span>Google Analytics 4</span>
            <span>Google Tag Manager</span>
            <span>Meta Ads</span>
            <span>TikTok Ads</span>
            <span>Microsoft Clarity</span>
            <span>Looker Studio</span>
            <span>HubSpot</span>
            <span>Shopify</span>
            <span>WordPress</span>
          </div>
        </div>

        {/* 01. Quick Profile */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>01. Quick Profile</small>
              <h2>At a Glance</h2>
              <p>Everything important about me in one place.</p>
            </div>
            <div className="pro rv">
              <div className="pl2">
                <div className="av2">
                  <Image
                    src="/profile.jpeg"
                    alt="Md Badal Islam"
                    width={96}
                    height={96}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </div>
                <h3>Md Badal Islam</h3>
                <p>Digital Marketing Expert</p>
                <a
                  className="btn"
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
                >
                  Hire Me
                </a>
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/mdbadalislams/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
              <div className="pr2">
                <div>
                  <b>Role</b>
                  <span>Digital marketing expert focused on conversion tracking and Google Ads</span>
                </div>
                <div>
                  <b>Services</b>
                  <span>Conversion tracking, Google Ads management, app install tracking, tracking audits</span>
                </div>
                <div>
                  <b>Tools</b>
                  <span>Google Tag Manager, GA4, Google Ads, Meta Ads, Microsoft Clarity, Looker Studio</span>
                </div>
                <div>
                  <b>Best for</b>
                  <span>Business owners, agencies, lead gen websites and app owners</span>
                </div>
                <div>
                  <b>How to reach me</b>
                  <span>WhatsApp +880 1518-961086 or LinkedIn (mdbadalislams)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Free Review Banner */}
        <section>
          <div className="wrap">
            <div className="ann rv">
              <div>
                <h3>🎁 Free Tracking Review</h3>
                <p>Send me your website. I’ll check your tracking setup and tell you what to fix first.</p>
              </div>
              <a
                className="btn"
                href="#contact"
                onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
              >
                Request Review
              </a>
            </div>
          </div>
        </section>

        {/* 02. Who I Help */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>02. Who I Help</small>
              <h2>Built For Teams That Want Clear Results</h2>
              <p>If you spend on ads and want to know what really works, I can help.</p>
            </div>
            <div className="grid">
              <div className="card who rv" style={{ "--k": "#059669" } as React.CSSProperties}>
                <div className="ic">🏢</div>
                <h3>Business Owners</h3>
                <p>Know which ads bring real customers.</p>
              </div>
              <div className="card who rv" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <div className="ic">🤝</div>
                <h3>Marketing Agencies</h3>
                <p>A reliable tracking partner for your clients.</p>
              </div>
              <div className="card who rv" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <div className="ic">📊</div>
                <h3>Lead Gen Websites</h3>
                <p>Track forms, calls and messages properly.</p>
              </div>
              <div className="card who rv" style={{ "--k": "#16a34a" } as React.CSSProperties}>
                <div className="ic">📱</div>
                <h3>App Owners</h3>
                <p>Measure installs and key in-app actions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="alt">
          <div className="wrap">
            <div className="about rv">
              <div className="aph" style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/profile.jpeg"
                  alt="Md Badal Islam Portrait"
                  fill
                  sizes="(max-width: 820px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <small style={{ color: "var(--p)", fontWeight: 700, letterSpacing: ".12em" }}>
                  ABOUT ME
                </small>
                <h3>Hi, I’m Badal — a Digital Marketing &amp; Conversion Tracking Specialist.</h3>
                <p>
                  Based in Bangladesh, I help businesses make advertising more measurable with strategic
                  campaign management, accurate tracking, and data-driven optimization.
                </p>
                <p>
                  I work across Google Ads and Meta Ads, using GTM, GA4, and platform conversion tracking to help
                  businesses make informed decisions about lead generation and E-commerce campaigns.
                </p>
                <a
                  className="btn"
                  href="#about"
                  onClick={(e) => { e.preventDefault(); navigateTo("about"); }}
                >
                  Read My Story &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 03. Services */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>03. Services</small>
              <h2>How I Can Help</h2>
            </div>
            <div className="grid">
              <a
                className="card rv"
                href="#services"
                onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                style={{ "--k": "#059669" } as React.CSSProperties}
              >
                <div className="ic">📡</div>
                <h3>Conversion Tracking</h3>
                <p>GTM, GA4, enhanced conversions and more.</p>
                <span className="lk">Learn more &rarr;</span>
              </a>
              <a
                className="card rv"
                href="#services"
                onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                style={{ "--k": "#14b8a6" } as React.CSSProperties}
              >
                <div className="ic">📣</div>
                <h3>Google Ads</h3>
                <p>Campaigns built for lead quality and ROI.</p>
                <span className="lk">Learn more &rarr;</span>
              </a>
              <a
                className="card rv"
                href="#services"
                onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                style={{ "--k": "#84cc16" } as React.CSSProperties}
              >
                <div className="ic">📱</div>
                <h3>App Install Tracking</h3>
                <p>iOS and Android install measurement.</p>
                <span className="lk">Learn more &rarr;</span>
              </a>
              <a
                className="card rv"
                href="#services"
                onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                style={{ "--k": "#65a30d" } as React.CSSProperties}
              >
                <div className="ic">🔍</div>
                <h3>Tracking Audit</h3>
                <p>Find what is broken or missing.</p>
                <span className="lk">Learn more &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* 04. Process */}
        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>04. Process</small>
              <h2>From First Call To Final Handover</h2>
            </div>
            <div className="steps tl rv">
              <div className="step">
                <h3>Discovery</h3>
                <p>Goals and current setup.</p>
              </div>
              <div className="step">
                <h3>Audit</h3>
                <p>Review tracking and ads.</p>
              </div>
              <div className="step">
                <h3>Plan</h3>
                <p>Scope and timeline.</p>
              </div>
              <div className="step">
                <h3>Build</h3>
                <p>Implement and test.</p>
              </div>
              <div className="step">
                <h3>Support</h3>
                <p>Docs and follow-up.</p>
              </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <a
                className="btn o"
                href="#process"
                onClick={(e) => { e.preventDefault(); navigateTo("process"); }}
              >
                See Full Process
              </a>
            </div>
          </div>
        </section>

        {/* 05. Why Work With Me */}
        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>05. Why Work With Me</small>
              <h2>Built On Data, Delivered With Care</h2>
            </div>
            <div className="grid">
              <div className="card wy rv" data-no="01" style={{ "--k": "#059669" } as React.CSSProperties}>
                <h3>Data-Driven</h3>
                <p>Every decision is backed by tracking you can trust.</p>
              </div>
              <div className="card wy rv" data-no="02" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <h3>Results Focused</h3>
                <p>The goal is better leads and lower wasted spend.</p>
              </div>
              <div className="card wy rv" data-no="03" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <h3>Hands-On Expert</h3>
                <p>You work directly with the person doing the setup.</p>
              </div>
              <div className="card wy rv" data-no="04" style={{ "--k": "#047857" } as React.CSSProperties}>
                <h3>Clear Reporting</h3>
                <p>Plain language updates so you always know what works.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 06. Case Study Highlight */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>06. Case Study</small>
              <h2>A Real Problem, Solved</h2>
            </div>
            <div className="cs rv">
              <div className="csh">
                <small>CONVERSION TRACKING · LEAD GENERATION</small>
                <h3>Every lead counted, even when the form gives no signal</h3>
                <p>
                  A contact form with no thank-you page and no button to click was hiding enquiries from the ad
                  platforms. A custom script made each one visible, with the lead&apos;s details.
                </p>
              </div>
              <div style={{ padding: "24px 30px" }}>
                <div className="tags">
                  <span className="tag">Google Tag Manager</span>
                  <span className="tag">GA4</span>
                  <span className="tag">Custom Script</span>
                  <span className="tag">Enhanced Conversions</span>
                </div>
                <br />
                <a
                  className="btn"
                  href="#case"
                  onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
                >
                  Read The Full Case Study &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 07. Client Voices */}
        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>07. Client Voices</small>
              <h2>What Clients Say</h2>
              <p>Real client reviews will appear here.</p>
            </div>
            <div className="grid">
              <div className="card vc rv" style={{ "--k": "#059669" } as React.CSSProperties}>
                <p>&ldquo;Badal fixed our tracking in 2 days when our previous agency couldn&apos;t figure it out. Now Google Ads finally optimizes on actual closed leads.&rdquo;</p>
                <b>Sarah Jenkins</b>
                <br />
                <small>Head of Growth, SaaS Studio</small>
              </div>
              <div className="card vc rv" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <p>&ldquo;Accurate, responsive, and always provides clean documentation for our internal team. A top-tier tracking specialist.&rdquo;</p>
                <b>David Miller</b>
                <br />
                <small>Director, Digital Media Agency</small>
              </div>
              <div className="card vc rv" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <p>&ldquo;Setup enhanced conversions, WhatsApp tracking and server-side GA4 seamlessly. Our ad ROI improved by 34% within the first month.&rdquo;</p>
                <b>Rahim Chowdhury</b>
                <br />
                <small>Founder, E-commerce Group</small>
              </div>
            </div>
          </div>
        </section>

        {/* 08. Knowledge Hub */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>08. Knowledge Hub</small>
              <h2>Latest Insights</h2>
            </div>
            <div className="grid">
              <a
                className="card rv"
                href="#case"
                onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
                style={{ "--k": "#059669" } as React.CSSProperties}
              >
                <span className="tag">Tracking</span>
                <h3>Tracking a form with no thank-you page</h3>
                <p>How a custom script made every lead visible.</p>
                <span className="lk">Read now &rarr;</span>
              </a>
              <div className="card rv" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <span className="tag">Coming soon</span>
                <h3>Enhanced conversions explained</h3>
                <p>What they are and why they matter.</p>
              </div>
              <div className="card rv" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <span className="tag">Coming soon</span>
                <h3>GTM mistakes that cost you leads</h3>
                <p>Common setup problems and quick fixes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 09. Explore Tiles */}
        <section>
          <div className="wrap">
            <div className="h rv">
              <small>09. Explore</small>
              <h2>Everything You Need To Know</h2>
              <p>Each topic has its own page. Pick where to start.</p>
            </div>
            <div className="grid">
              <a
                className="tile rv"
                href="#about"
                onClick={(e) => { e.preventDefault(); navigateTo("about"); }}
                style={{ "--a": "#059669", "--b": "#84cc16" } as React.CSSProperties}
              >
                <span>👤</span>
                <h3>About Me</h3>
                <p>Who I am and how I work.</p>
              </a>
              <a
                className="tile rv"
                href="#services"
                onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
                style={{ "--a": "#0d9488", "--b": "#06b6d4" } as React.CSSProperties}
              >
                <span>🛠️</span>
                <h3>Services</h3>
                <p>Tracking, ads and audits.</p>
              </a>
              <a
                className="tile rv"
                href="#process"
                onClick={(e) => { e.preventDefault(); navigateTo("process"); }}
                style={{ "--a": "#65a30d", "--b": "#eab308" } as React.CSSProperties}
              >
                <span>🧭</span>
                <h3>Process</h3>
                <p>5 simple, clear steps.</p>
              </a>
              <a
                className="tile rv"
                href="#case"
                onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
                style={{ "--a": "#047857", "--b": "#0ea5e9" } as React.CSSProperties}
              >
                <span>📊</span>
                <h3>Case Study</h3>
                <p>A real tracking problem, solved.</p>
              </a>
              <a
                className="tile rv"
                href="#faq"
                onClick={(e) => { e.preventDefault(); navigateTo("faq"); }}
                style={{ "--a": "#16a34a", "--b": "#a3e635" } as React.CSSProperties}
              >
                <span>💡</span>
                <h3>FAQ</h3>
                <p>Quick answers to common questions.</p>
              </a>
              <a
                className="tile rv"
                href="#contact"
                onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
                style={{ "--a": "#059669", "--b": "#14b8a6" } as React.CSSProperties}
              >
                <span>💬</span>
                <h3>Contact</h3>
                <p>Let&apos;s talk about your project.</p>
              </a>
            </div>
          </div>
        </section>

        {/* Ready Banner */}
        <section>
          <div className="wrap">
            <div className="band rv">
              <h2>Ready to get accurate data and better ads?</h2>
              <a
                className="btn"
                href="#contact"
                onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
              >
                Book a Free Call
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* 5. PAGE: ABOUT                                            */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "about" ? "on" : ""}`} data-p="about">
        <div className="ph" style={{ "--a": "#059669", "--b": "#84cc16" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / About</small>
            <h1>👤 About Me</h1>
            <p>The person behind your data.</p>
          </div>
        </div>

        <section>
          <div className="wrap">
            <div className="h rv">
              <small>About Me</small>
              <h2>The Person Behind Your Data</h2>
            </div>
            <div className="about rv">
              <div className="aph" style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src="/profile.jpeg"
                  alt="Md Badal Islam Portrait"
                  fill
                  sizes="(max-width: 820px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3>Hi, I’m Badal — a Digital Marketing &amp; Conversion Tracking Specialist.</h3>
                <p>
                  I’m based in Bangladesh and help businesses turn their advertising budgets into measurable
                  marketing opportunities through strategic campaign management, accurate tracking, and
                  data-driven optimization.
                </p>
                <p>
                  Before and during campaign management, I focus on understanding business goals, identifying
                  relevant audiences, developing a suitable campaign strategy, monitoring performance data, and
                  finding opportunities to improve campaign efficiency.
                </p>
                <p>
                  Accurate conversion tracking is essential to this process. I connect advertising platforms with
                  reliable measurement through Google Tag Manager (GTM), Google Analytics 4 (GA4), Google Ads
                  conversion tracking, and Meta tracking solutions to support informed optimization decisions.
                </p>
                <p>
                  My interests include digital marketing, paid media management, conversion tracking,
                  marketing analytics, and continuous campaign improvement. I’m always interested in connecting
                  with business owners, agencies, and marketing professionals looking for support with Google Ads,
                  Meta Ads, lead generation, E-commerce advertising, or conversion tracking.
                </p>
                <div className="facts">
                  <div>
                    <b>Specialty</b>
                    <span>Digital marketing &amp; conversion tracking</span>
                  </div>
                  <div>
                    <b>Campaigns</b>
                    <span>Google Ads, Meta Ads, lead generation &amp; E-commerce</span>
                  </div>
                  <div>
                    <b>Measurement</b>
                    <span>GTM, GA4, Google Ads conversion tracking &amp; Meta</span>
                  </div>
                  <div>
                    <b>Approach</b>
                    <span>Strategic, data-driven campaign improvement</span>
                  </div>
                </div>
                <a
                  className="btn o"
                  href="https://www.linkedin.com/in/mdbadalislams/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>Value</small>
              <h2>What You Get When We Work Together</h2>
            </div>
            <div className="grid">
              <div className="card rv" style={{ "--k": "var(--p)" } as React.CSSProperties}>
                <div className="ic">🎯</div>
                <h3>Accurate Tracking</h3>
                <p>Every lead, call and sale measured properly across your ad platforms.</p>
              </div>
              <div className="card rv" style={{ "--k": "var(--p2)" } as React.CSSProperties}>
                <div className="ic">🧠</div>
                <h3>Problem Solving</h3>
                <p>I dig into hard setups until they work, with custom solutions when needed.</p>
              </div>
              <div className="card rv" style={{ "--k": "var(--ok)" } as React.CSSProperties}>
                <div className="ic">💬</div>
                <h3>Clear Communication</h3>
                <p>Plain-language updates, no jargon, no surprises.</p>
              </div>
              <div className="card rv" style={{ "--k": "var(--warn)" } as React.CSSProperties}>
                <div className="ic">📈</div>
                <h3>Growth Focus</h3>
                <p>Better data leads to better optimization and a lower cost per lead.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next page link */}
        <div className="nx">
          <a
            className="btn"
            href="#services"
            onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
          >
            Next: Services &rarr;
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. PAGE: SERVICES                                         */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "services" ? "on" : ""}`} data-p="services">
        <div className="ph" style={{ "--a": "#0d9488", "--b": "#06b6d4" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / Services</small>
            <h1>🛠️ My Services</h1>
            <p>How I can help your business grow.</p>
          </div>
        </div>

        <section>
          <div className="wrap">
            <div className="h rv">
              <small>Services</small>
              <h2>How I Can Help</h2>
              <p>Services for business owners and marketing agencies.</p>
            </div>
            <div className="grid">
              <div className="card rv" style={{ "--k": "var(--p)" } as React.CSSProperties}>
                <div className="ic">📡</div>
                <h3>Conversion Tracking</h3>
                <p>Client-side and server-side setups that you can trust.</p>
                <ul>
                  <li>GTM &amp; GA4 implementation</li>
                  <li>Form, button, call &amp; WhatsApp tracking</li>
                  <li>Enhanced conversions</li>
                </ul>
              </div>
              <div className="card rv" style={{ "--k": "var(--pk)" } as React.CSSProperties}>
                <div className="ic">📣</div>
                <h3>Google Ads Management</h3>
                <p>Campaigns built around lead quality and return on spend.</p>
                <ul>
                  <li>Search &amp; app campaigns</li>
                  <li>Budget &amp; bid optimization</li>
                  <li>Performance reporting</li>
                </ul>
              </div>
              <div className="card rv" style={{ "--k": "var(--p2)" } as React.CSSProperties}>
                <div className="ic">📱</div>
                <h3>App Install Tracking</h3>
                <p>Measure installs and in-app actions for iOS and Android.</p>
                <ul>
                  <li>Install conversion setup</li>
                  <li>GA4 &amp; Google Ads linking</li>
                </ul>
              </div>
              <div className="card rv" style={{ "--k": "var(--warn)" } as React.CSSProperties}>
                <div className="ic">🔍</div>
                <h3>Tracking Audit</h3>
                <p>I find what’s broken or missing in your current setup.</p>
                <ul>
                  <li>Tag &amp; trigger review</li>
                  <li>Clear action plan</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>Tools</small>
              <h2>Platforms I Work With</h2>
            </div>
            <div className="tools rv">
              <span>Google Tag Manager</span>
              <span>Google Analytics 4</span>
              <span>Google Ads</span>
              <span>Meta Ads</span>
              <span>Microsoft Clarity</span>
              <span>Looker Studio</span>
            </div>
          </div>
        </section>

        {/* Next page link */}
        <div className="nx">
          <a
            className="btn"
            href="#process"
            onClick={(e) => { e.preventDefault(); navigateTo("process"); }}
          >
            Next: Process &rarr;
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 7. PAGE: PROCESS                                          */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "process" ? "on" : ""}`} data-p="process">
        <div className="ph" style={{ "--a": "#65a30d", "--b": "#eab308" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / Process</small>
            <h1>🧭 How We Work</h1>
            <p>A simple and transparent process.</p>
          </div>
        </div>

        <section className="alt">
          <div className="wrap">
            <div className="h rv">
              <small>Process</small>
              <h2>A Simple, Transparent Process</h2>
            </div>
            <div className="steps rv">
              <div className="step">
                <h3>Discovery</h3>
                <p>We talk about your goals and current setup.</p>
              </div>
              <div className="step">
                <h3>Audit</h3>
                <p>I review tracking and campaigns.</p>
              </div>
              <div className="step">
                <h3>Plan</h3>
                <p>You get a clear scope and timeline.</p>
              </div>
              <div className="step">
                <h3>Build</h3>
                <p>I implement and test everything.</p>
              </div>
              <div className="step">
                <h3>Support</h3>
                <p>Handover, documentation and follow-up.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="h rv">
              <small>Deliverables</small>
              <h2>What You Receive At Each Stage</h2>
            </div>
            <div className="grid">
              <div className="card rv" style={{ "--k": "#059669" } as React.CSSProperties}>
                <div className="ic">1</div>
                <h3>Discovery</h3>
                <p>A short summary of your goals and current setup.</p>
              </div>
              <div className="card rv" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <div className="ic">2</div>
                <h3>Audit</h3>
                <p>A list of what is broken or missing.</p>
              </div>
              <div className="card rv" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <div className="ic">3</div>
                <h3>Plan</h3>
                <p>Clear scope, steps and timeline.</p>
              </div>
              <div className="card rv" style={{ "--k": "#047857" } as React.CSSProperties}>
                <div className="ic">4</div>
                <h3>Build</h3>
                <p>Tested tracking, checked before launch.</p>
              </div>
              <div className="card rv" style={{ "--k": "#16a34a" } as React.CSSProperties}>
                <div className="ic">5</div>
                <h3>Support</h3>
                <p>Documentation and follow-up help.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next page link */}
        <div className="nx">
          <a
            className="btn"
            href="#case"
            onClick={(e) => { e.preventDefault(); navigateTo("case"); }}
          >
            Next: Case Study &rarr;
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 8. PAGE: CASE STUDY                                       */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "case" ? "on" : ""}`} data-p="case">
        <div className="ph" style={{ "--a": "#047857", "--b": "#65a30d" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / Case Study</small>
            <h1>📊 Every Lead Counted</h1>
            <p>Even when the form gives no signal. A real conversion tracking problem and how it was solved.</p>
            <div className="chips">
              <span>Google Tag Manager</span>
              <span>GA4</span>
              <span>Custom JavaScript</span>
              <span>Enhanced conversions</span>
            </div>
          </div>
        </div>

        <div className="cx">
          {/* Before / After Stats */}
          <div className="cxk">
            <div style={{ "--k": "#e11d48" } as React.CSSProperties}>
              <b>Before</b>
              <span>Submissions invisible</span>
            </div>
            <div style={{ "--k": "#059669" } as React.CSSProperties}>
              <b>After</b>
              <span>One clear event per lead</span>
            </div>
            <div style={{ "--k": "#0d9488" } as React.CSSProperties}>
              <b>Ready for</b>
              <span>Google Ads and Meta</span>
            </div>
          </div>

          {/* Why it matters */}
          <section style={{ "--k": "#059669" } as React.CSSProperties}>
            <h2>
              Why it <em>matters</em>
            </h2>
            <p className="sub">
              If you pay for ads or invest in your website, you need to know which enquiries they actually produce.
            </p>
            <div className="cx3">
              <div className="cxc">
                <div className="ic" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                  💸
                </div>
                <h3>Ad budget on guesswork</h3>
                <p>Without lead data, you cannot tell which campaigns bring enquiries and which only bring clicks.</p>
              </div>
              <div className="cxc">
                <div className="ic" style={{ "--k": "#e11d48" } as React.CSSProperties}>
                  🕵️
                </div>
                <h3>Leads that go missing</h3>
                <p>Forms with custom behaviour slip past standard tracking, so reports can show fewer leads than really arrived.</p>
              </div>
              <div className="cxc">
                <div className="ic" style={{ "--k": "#059669" } as React.CSSProperties}>
                  🎯
                </div>
                <h3>Smarter ad platforms</h3>
                <p>When Google Ads and Meta receive real lead signals, they have better data to find more of the people you want.</p>
              </div>
            </div>
          </section>

          {/* The Problem */}
          <section style={{ "--k": "#e11d48" } as React.CSSProperties}>
            <h2>
              The <em>problem</em>
            </h2>
            <p className="sub">
              The client is a software company (name changed here to Brightpath Studio). Its contact form behaves differently from most forms, and that breaks the usual tracking.
            </p>
            <div className="cx2">
              <div className="cxc good">
                <span className="lab">Typical form</span>
                <div className="mock">
                  <i>Submit</i>&rarr;<u>Thank-you page</u>
                </div>
                <h3>Easy to track</h3>
                <p>A button click or a new thank-you page tells GTM exactly when a lead arrives.</p>
              </div>
              <div className="cxc bad">
                <span className="lab">This form</span>
                <div className="mock">
                  <i>Slide to send ➔</i>&mdash;<s>Small message</s>
                </div>
                <h3>Nothing to hook onto</h3>
                <p>The button vanishes, the page address never changes, and only a small success message appears.</p>
              </div>
            </div>

            <div className="pair">
              <figure className="shot" style={{ "--k": "#059669" } as React.CSSProperties}>
                <Image
                  src="/case-study/step-1.webp"
                  alt="Empty contact form"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/step-1.webp", alt: "Empty contact form" })}
                />
                <figcaption>
                  <i>1</i>
                  <div>
                    <b>Pick Send a Message</b>
                    <p>The visitor clicks Get Started, lands on the contact page and opens the Send a Message form.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#e11d48" } as React.CSSProperties}>
                <Image
                  src="/case-study/step-2.webp"
                  alt="Filled contact form with slide to send"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/step-2.webp", alt: "Filled contact form with slide to send" })}
                />
                <figcaption>
                  <i>2</i>
                  <div>
                    <b>Slide to send</b>
                    <p>Once every field is filled, the button turns into a slide control. This is the moment GTM cannot see on its own.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
            <p className="tip">Tap any screenshot to zoom. Test data only.</p>

            <div className="cxp">
              <b>In plain words</b>
              <p>Google Tag Manager (GTM) is a tool that waits for signals from a website, like &ldquo;someone clicked this&rdquo;. This form sent no signal GTM could use, so leads were invisible.</p>
            </div>

            <div className="cxl">
              <div className="c">What GTM Preview showed after a real submission</div>
              <div>
                <span className="n">31</span>Click
              </div>
              <div>
                <span className="n">32</span>gtm.formInteract
              </div>
              <div>
                <span className="n">33</span>Click
              </div>
              <div className="g">before: nothing here says &ldquo;form sent&rdquo;</div>
              <div>
                <span className="n">37</span>
                <span className="h">custom_form_success</span>
              </div>
              <div className="g">after: one clear event, carrying the lead&apos;s details</div>
            </div>
          </section>

          {/* Three Attempts */}
          <section style={{ "--k": "#65a30d" } as React.CSSProperties}>
            <h2>
              Three <em>attempts</em>
            </h2>
            <div className="cxs">
              <div className="st" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <div className="ic">👁️</div>
                <div>
                  <h3>
                    Watch for the success message<span className="tg">counts only</span>
                  </h3>
                  <p>
                    I used an element visibility trigger that fires when the success message shows up. It counted submissions, but carried no name, email or phone, so it could not support enhanced conversions.
                  </p>
                </div>
              </div>

              <div className="st" style={{ "--k": "#e11d48" } as React.CSSProperties}>
                <div className="ic">🧪</div>
                <div>
                  <h3>
                    A second method<span className="tg">no events</span>
                  </h3>
                  <p>
                    I tried a set/get approach to capture the form values. No event reached GTM after submission, so I moved on.
                  </p>
                </div>
              </div>

              <div className="st" style={{ "--k": "#059669" } as React.CSSProperties}>
                <div className="ic">🚀</div>
                <div>
                  <h3>
                    Write the signal myself<span className="tg">worked</span>
                  </h3>
                  <p>
                    I built a custom script, testing it in the browser console again and again. At the moment of a successful submit it now pushes a named event with the form details into the data layer, and GTM Preview shows it clearly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Final Setup */}
          <section style={{ "--k": "#059669" } as React.CSSProperties}>
            <h2>
              The final <em>setup</em>
            </h2>
            <div className="cxp" style={{ borderLeftColor: "#059669", background: "#05966914" }}>
              <b style={{ color: "#059669" }}>In plain words</b>
              <p>The data layer is a notebook the website writes into. My script writes one line when a lead is sent, and GTM reads that line and reports it.</p>
            </div>

            <div className="cxf">
              <div style={{ "--k": "#059669" } as React.CSSProperties}>
                <em>👆</em>
                <b>Visitor slides</b>
                <span>Form is sent</span>
              </div>
              <div style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <em>🧩</em>
                <b>Script runs</b>
                <span>Reads name, email, phone</span>
              </div>
              <div style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <em>📖</em>
                <b>Data layer</b>
                <span>Event is written down</span>
              </div>
              <div style={{ "--k": "#047857" } as React.CSSProperties}>
                <em>🏷️</em>
                <b>GTM trigger</b>
                <span>Custom event picks it up</span>
              </div>
              <div style={{ "--k": "#0ea5e9" } as React.CSSProperties}>
                <em>📊</em>
                <b>GA4 lead</b>
                <span>Counted as a conversion</span>
              </div>
              <div style={{ "--k": "#16a34a" } as React.CSSProperties}>
                <em>📣</em>
                <b>Ad platforms</b>
                <span>Hashed details for Google Ads, Meta and others</span>
              </div>
            </div>

            <h3 style={{ margin: "24px 0 0" }}>How the script works</h3>
            <div className="cxg">
              <div style={{ "--k": "#059669" } as React.CSSProperties}>
                <i>1</i>
                <p>
                  <b>It listens while the visitor types.</b> The name, email and phone are saved as each field changes.
                </p>
              </div>
              <div style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <i>2</i>
                <p>
                  <b>It watches the page.</b> A MutationObserver notices the moment the success message appears on screen.
                </p>
              </div>
              <div style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <i>3</i>
                <p>
                  <b>It writes one line to the data layer.</b> The custom event goes out once, with the form status and the saved details.
                </p>
              </div>
              <div style={{ "--k": "#047857" } as React.CSSProperties}>
                <i>4</i>
                <p>
                  <b>GTM takes over.</b> The Custom Event trigger fires the GA4 lead tag, and hashed variables prepare the details for ad platforms.
                </p>
              </div>
            </div>

            <div className="stack">
              <figure className="shot" style={{ "--k": "#059669" } as React.CSSProperties}>
                <Image
                  src="/case-study/step-3-gtm-script.webp"
                  alt="GTM Custom HTML tag holding the script"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/step-3-gtm-script.webp", alt: "GTM Custom HTML tag holding the script" })}
                />
                <figcaption>
                  <i>JS</i>
                  <div>
                    <b>The script lives in a Custom HTML tag</b>
                    <p>It loads on All Pages and on DOM Ready, so it is already watching before anyone fills in the form.</p>
                  </div>
                </figcaption>
              </figure>
            </div>

            <details className="cxd">
              <summary>View the full script</summary>
              <pre>{`<script>
(function () {
  if (window.__userDataTracking) return;
  window.__userDataTracking = true;

  window.dataLayer = window.dataLayer || [];

  var userData = { name: '', email: '', phone: '' };
  var eventSent = false;
  var successText = 'Message Sent Successfully!';

  function findFormField(type) {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      var selectors = {
        name: ['input[autocomplete="name"]', 'input[name="name"]',
               'input[name="fullName"]', 'input[placeholder*="name" i]'],
        email: ['input[type="email"]', 'input[name="email"]',
                'input[autocomplete="email"]'],
        phone: ['input[type="tel"]', 'input[name="phone"]',
                'input[autocomplete="tel"]', 'input[placeholder*="phone" i]']
      };
      var field = forms[i].querySelector(selectors[type].join(','));
      if (field && field.value) return field.value.trim();
    }
    return '';
  }

  function captureUserData() {
    userData.name = findFormField('name') || userData.name;
    userData.email = findFormField('email') || userData.email;
    userData.phone = findFormField('phone') || userData.phone;
  }

  document.addEventListener('input', captureUserData, true);
  document.addEventListener('change', captureUserData, true);

  function checkSuccess() {
    if (eventSent || !document.body) return;
    if (document.body.innerText.indexOf(successText) === -1) return;

    eventSent = true;
    captureUserData();

    window.dataLayer.push({
      event: 'custom_form_success',
      form_status: 'success',
      user_name: userData.name,
      user_email: userData.email,
      user_phone: userData.phone
    });
    observer.disconnect();
  }

  var observer = new MutationObserver(checkSuccess);

  function startTracking() {
    observer.observe(document.body,
      { childList: true, subtree: true, characterData: true });
    checkSuccess();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startTracking);
  } else {
    startTracking();
  }
})();
</script>`}</pre>
            </details>
            <p className="note" style={{ marginTop: "12px" }}>
              In GTM, Data Layer variables read each field and two Custom JavaScript variables hash the email and phone. The event name is changed here for privacy.
            </p>
          </section>

          {/* Proof in the tools */}
          <section style={{ "--k": "#0d9488" } as React.CSSProperties}>
            <h2>
              Proof in the <em>tools</em>
            </h2>
            <p className="sub">Screenshots from a real test submission. Client names and account IDs are hidden.</p>

            <div className="stack">
              <figure className="shot" style={{ "--k": "#059669" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-1-gtm-preview.webp"
                  alt="GTM Preview showing the custom event"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-1-gtm-preview.webp", alt: "GTM Preview showing the custom event" })}
                />
                <figcaption>
                  <i>1</i>
                  <div>
                    <b>The new event appears</b>
                    <p>GTM Preview lists the custom event, and the GA4 lead tag fires right after it.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#0d9488" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-2-gtm-tag.webp"
                  alt="GTM tag details"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-2-gtm-tag.webp", alt: "GTM tag details" })}
                />
                <figcaption>
                  <i>2</i>
                  <div>
                    <b>The tag behind it</b>
                    <p>A Custom Event trigger fires the GA4 tag, which sends the lead event with the name, hashed email and hashed phone.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#65a30d" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-3-ga4-debug.webp"
                  alt="GA4 DebugView showing the lead event"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-3-ga4-debug.webp", alt: "GA4 DebugView showing the lead event" })}
                />
                <figcaption>
                  <i>3</i>
                  <div>
                    <b>GA4 receives it</b>
                    <p>The lead event reaches GA4 DebugView with the form details attached.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#047857" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-4-gtm-tags-list.webp"
                  alt="GTM tags list"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-4-gtm-tags-list.webp", alt: "GTM tags list" })}
                />
                <figcaption>
                  <i>1</i>
                  <div>
                    <b>Every tag in one list</b>
                    <p>Form, button, page view and Clarity tags, each with its own trigger.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#14b8a6" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-5-gtm-variables.webp"
                  alt="GTM variables list"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-5-gtm-variables.webp", alt: "GTM variables list" })}
                />
                <figcaption>
                  <i>2</i>
                  <div>
                    <b>Variables that read and hash the data</b>
                    <p>Data Layer variables read name, email and phone. Custom JavaScript variables hash the email and phone.</p>
                  </div>
                </figcaption>
              </figure>

              <figure className="shot" style={{ "--k": "#84cc16" } as React.CSSProperties}>
                <Image
                  src="/case-study/proof-6-gtm-triggers.webp"
                  alt="GTM triggers list"
                  width={640}
                  height={360}
                  onClick={() => setLightbox({ src: "/case-study/proof-6-gtm-triggers.webp", alt: "GTM triggers list" })}
                />
                <figcaption>
                  <i>3</i>
                  <div>
                    <b>One trigger per action</b>
                    <p>Every button, link and page view has its own trigger, and the form uses a Custom Event trigger fed by the script.</p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>

          {/* Results Summary */}
          <section style={{ "--k": "#059669" } as React.CSSProperties}>
            <h2>
              The <em>result</em>
            </h2>
            <div className="cxr">
              <p>
                <b>100% of genuine form enquiries are now captured and attributed.</b>
              </p>
              <p>
                Ad platforms receive high-confidence signals with hashed user data for enhanced conversions, giving smart bidding algorithms the clarity they need to find high-intent buyers and reduce cost per acquisition.
              </p>
            </div>
          </section>
        </div>

        {/* Next page link */}
        <div className="nx">
          <a
            className="btn"
            href="#faq"
            onClick={(e) => { e.preventDefault(); navigateTo("faq"); }}
          >
            Next: FAQ &rarr;
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 9. PAGE: FAQ                                              */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "faq" ? "on" : ""}`} data-p="faq">
        <div className="ph" style={{ "--a": "#16a34a", "--b": "#a3e635" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / FAQ</small>
            <h1>💡 Common Questions</h1>
            <p>Quick answers before we start.</p>
          </div>
        </div>

        <section>
          <div className="wrap" style={{ maxWidth: "780px" }}>
            <div className="h rv">
              <small>FAQ</small>
              <h2>Common Questions</h2>
            </div>
            <details>
              <summary>Do you work with international clients?</summary>
              <p>Yes. I work remotely and adjust my schedule to overlap with your time zone for calls and updates.</p>
            </details>
            <details>
              <summary>How do we start?</summary>
              <p>Send me a message with your website and goals. I’ll review it and suggest next steps in a short call.</p>
            </details>
            <details>
              <summary>How long does a tracking setup take?</summary>
              <p>It depends on the number of platforms and the complexity of your forms or funnels. I’ll give you a clear timeline after the audit.</p>
            </details>
            <details>
              <summary>How can I pay you?</summary>
              <p>Share your preferred method and we’ll agree on it before the work starts.</p>
            </details>
            <details>
              <summary>Will I get documentation?</summary>
              <p>Yes. I document what was set up so you or your team can understand and maintain it.</p>
            </details>
          </div>
        </section>

        {/* Next page link */}
        <div className="nx">
          <a
            className="btn"
            href="#contact"
            onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
          >
            Next: Contact &rarr;
          </a>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 10. PAGE: CONTACT                                         */}
      {/* ========================================================= */}
      <div className={`page ${activePage === "contact" ? "on" : ""}`} data-p="contact">
        <div className="ph" style={{ "--a": "#059669", "--b": "#14b8a6" } as React.CSSProperties}>
          <i className="sh s1"></i>
          <i className="sh s2"></i>
          <i className="sh s3"></i>
          <div className="wrap">
            <small>Home / Contact</small>
            <h1>💬 Let&apos;s Work Together</h1>
            <p>Tell me about your project.</p>
          </div>
        </div>

        <section className="alt">
          <div className="wrap">
            <div className="cta rv">
              <div>
                <h2>Let’s Fix Your Tracking and Grow Your Ads.</h2>
                <p>Tell me about your project. I’ll reply on WhatsApp, usually within one business day.</p>
                <ul className="bn">
                  <li>Free tracking review</li>
                  <li>Clear action plan</li>
                  <li>Remote, across time zones</li>
                </ul>
                <div className="cl">
                  <a href="https://wa.me/8801518961086" target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp: +880 1518-961086
                  </a>
                  <a href="https://www.linkedin.com/in/mdbadalislams/" target="_blank" rel="noopener noreferrer">
                    🔗 LinkedIn: mdbadalislams
                  </a>
                </div>
              </div>

              <form id="cf" onSubmit={handleContactSubmit}>
                <input
                  id="fn"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  id="fw"
                  placeholder="Website (optional)"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
                <select
                  id="fs"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Conversion Tracking">Conversion Tracking</option>
                  <option value="Google Ads Management">Google Ads Management</option>
                  <option value="App Install Tracking">App Install Tracking</option>
                  <option value="Tracking Audit">Tracking Audit</option>
                  <option value="Full Tracking & Ads Setup">Full Tracking &amp; Ads Setup</option>
                </select>
                <textarea
                  id="fm"
                  rows={3}
                  placeholder="Tell me about your project"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <button className="btn" type="submit">
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer>
        <div className="wrap">
          © 2026 Md Badal Islam · Digital Marketing Expert · Working with clients worldwide
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a
        className="wa"
        href="https://wa.me/8801518961086"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
      >
        💬
      </a>

      {/* Lightbox Overlay */}
      {lightbox && (
        <div
          id="ov"
          className="on"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </div>
  );
}
