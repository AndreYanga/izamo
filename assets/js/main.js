/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

    /**
   * Simple i18n for header labels (PT/EN) with localStorage persistence
   */
  const translations = {
    pt: {
      // Navigation
      'nav.home': 'Página Inicial',
      'nav.about': 'Sobre Nós', 
      'nav.services': 'Catálogo de Serviços',
      'nav.contact': 'Contacto',
      
      // Hero Section
      'hero.title': 'Explore as Maravilhas de Cape Town com Izamo',
      'hero.subtitle': 'Descubra a beleza e cultura da África do Sul com nossos passeios exclusivos',
      'hero.cta': 'Reserve seu Passeio',
      'hero.accommodation': 'Acomodação',
      'hero.tourism': 'Turismo',
      'hero.transport': 'Transporte',
      'hero.documentation': 'Documentação',
      
      // About Section
      'about.title': 'Sobre Nós',
      'about.subtitle': 'Conheça a Izamo',
      'about.heading': 'Sua jornada para a África do Sul começa aqui',
      'about.description': 'Nosso objetivo é tornar sua experiência na África do Sul mais fácil e segura, oferecendo acompanhamento especializado em acomodação, turismo, transporte e documentação.',
      'about.bullet1': 'Seja para uma viagem de lazer, estudos ou uma nova oportunidade de vida',
      'about.bullet2': 'Estamos aqui para ajudar você a realizar seu sonho',
      'about.bullet3': 'Serviços personalizados para cada necessidade',
      'about.bullet4': 'Rede de parceiros confiáveis em toda a África do Sul',
      'about.final': 'Com anos de experiência no mercado, a Izamo se consolidou como a melhor opção para quem busca estabelecer-se na África do Sul com tranquilidade e segurança.',
      
      // Features Section
      'features.title': 'Por que escolher a Izamo?',
      'features.experience.title': 'Experiência e Confiabilidade',
      'features.experience.desc': 'Anos de atuação ajudando pessoas a se estabelecerem na África do Sul',
      'features.personal.title': 'Atendimento Personalizado',
      'features.personal.desc': 'Cada cliente é único e merece uma solução sob medida',
      'features.partners.title': 'Rede de Parceiros',
      'features.partners.desc': 'Trabalhamos com as melhores instituições e fornecedores para garantir qualidade e segurança',
      
      // Services Section
      'services.title': 'Nossos Passeios',
      'services.subtitle': 'Descubra as Maravilhas de Cape Town',
      'services.citytour.title': 'CITY TOUR',
      'services.citytour.duration': 'Half Day (7am – 1pm)',
      'services.citytour.price': 'Desde R 3,000',
      'services.citytour.highlight': 'Destaque: Table Mountain',
      'services.citytour.btn': 'Ver Detalhes',
      'services.peninsula.title': 'CAPE PENINSULA TOUR',
      'services.peninsula.duration': 'Full Day (7am – 6pm)',
      'services.peninsula.price': 'Desde R 5,000',
      'services.peninsula.highlight': 'Destaque: Cape of Good Hope & Penguins (Boulders Beach)',
      'services.peninsula.btn': 'Ver Detalhes',
      'services.winery.title': 'WINERY TOUR',
      'services.winery.duration': 'Full Day (8am – 5pm)',
      'services.winery.price': 'Desde R 5,000',
      'services.winery.highlight': 'Destaque: Stellenbosch & Franschhoek',
      'services.winery.btn': 'Ver Detalhes',
      'services.safari.title': 'SAFARI AQUILA',
      'services.safari.duration': 'Full Day (5am – 6pm)',
      'services.safari.price': 'Preço sob consulta (por km)',
      'services.safari.highlight': 'Destaque: Safari de vida selvagem',
      'services.safari.btn': 'Ver Detalhes',
      'services.extra.title': 'EXTRA PACKAGE',
      'services.extra.duration': 'Half Day',
      'services.extra.price': 'Desde R 3,000',
      'services.extra.highlight': 'Destaque: Constantia Winery & Kirstenbosch Garden',
      'services.extra.btn': 'Ver Detalhes',
      'services.vip.title': 'VIP / PRIVATE TOUR',
      'services.vip.duration': 'Full Day',
      'services.vip.price': 'Desde R 5,000',
      'services.vip.highlight': 'Destaque: Experiência exclusiva com guia privado',
      'services.vip.btn': 'Ver Detalhes',
      'services.agulhas.title': 'CAPE AGULHAS TOUR',
      'services.agulhas.duration': 'Full Day',
      'services.agulhas.price': 'Preço sob consulta',
      'services.agulhas.highlight': 'Destaque: Extremo Sul da África – encontro dos oceanos',
      'services.agulhas.btn': 'Ver Detalhes',
      
      // Tour Details Page
      'tour.visited': 'Locais visitados',
      'tour.info': 'Informações',
      'tour.reserve': 'Reservar',
      'tour.back': 'Back Home',
      
      // CTA Section
      'cta.title': 'Pronto para começar sua jornada?',
      'cta.subtitle': 'Entre em contato conosco hoje mesmo e descubra como podemos transformar sua experiência na África do Sul!',
      'cta.btn': 'Fale Conosco',
      
      // Portfolio Section
      'portfolio.title': 'Destinos',
      'portfolio.subtitle': 'Principais Destinos na África do Sul',
      'portfolio.all': 'Todos',
      'portfolio.capetown': 'Cidade do Cabo',
      'portfolio.joburg': 'Joanesburgo',
      'portfolio.durban': 'Durban',
      'portfolio.capetown.desc': 'Table Mountain',
      'portfolio.joburg.desc': 'Centro Financeiro',
      'portfolio.durban.desc': 'Praias Paradisíacas',
      'portfolio.capetown.wineries': 'Vinícolas',
      'portfolio.joburg.soweto': 'Soweto',
      'portfolio.durban.nightlife': 'Vida Noturna',
      'portfolio.more': 'Mais Detalhes',
      
      // Events Section
      'events.title': 'Eventos',
      'events.subtitle': 'Nossos Próximos Eventos',
      'events.study.title': 'Feira de Estudos na África do Sul',
      'events.study.date': 'Sexta-feira, 12 de Novembro de 2023',
      'events.study.desc': 'Venha conhecer as melhores oportunidades de estudo na África do Sul com representantes das principais universidades.',
      'events.workshop.title': 'Workshop de Documentação',
      'events.workshop.date': 'Sábado, 20 de Novembro de 2023',
      'events.workshop.desc': 'Aprenda tudo sobre os documentos necessários para viajar, estudar ou trabalhar na África do Sul.',
      
      // FAQ Section
      'faq.title': 'FAQ',
      'faq.subtitle': 'Perguntas Frequentes',
      'faq.q1': 'Quais documentos são necessários para viajar para a África do Sul?',
      'faq.a1': 'Para viajar à África do Sul como turista, você precisará de passaporte válido por pelo menos 6 meses, visto (quando necessário), comprovante de hospedagem, passagem de volta e comprovante de recursos financeiros. Para estudo ou trabalho, são necessários documentos adicionais específicos.',
      'faq.q2': 'Como posso encontrar acomodação segura na África do Sul?',
      'faq.a2': 'A Izamo oferece um serviço completo de busca de acomodação, considerando sua localização preferencial, orçamento e necessidades específicas. Trabalhamos apenas com imóveis em áreas seguras e com proprietários confiáveis.',
      'faq.q3': 'Quanto tempo leva para obter um visto de estudante?',
      'faq.a3': 'O processo de visto de estudante normalmente leva de 6 a 8 semanas após a entrega de todos os documentos necessários. Recomendamos iniciar o processo com pelo menos 3 meses de antecedência para evitar contratempos.',
      'faq.q4': 'Quais são as melhores cidades para estudantes na África do Sul?',
      'faq.a4': 'As cidades mais populares para estudantes são Cidade do Cabo (UCT, UWC), Joanesburgo (Wits, UJ), Pretória (UP, TUT), Stellenbosch (SU) e Durban (UKZN). Cada uma oferece vantagens específicas em termos de qualidade de vida, custo e especializações acadêmicas.',
      'faq.q5': 'A Izamo oferece suporte após a chegada à África do Sul?',
      'faq.a5': 'Sim, oferecemos suporte completo desde o planejamento da viagem até sua estadia na África do Sul. Nossos serviços incluem transfer do aeroporto, orientação sobre a cidade, ajuda com abertura de contas bancárias, registro na polícia (quando necessário) e suporte contínuo durante toda sua estadia.',
      
      // Contact Section
      'contact.title': 'Contato',
      'contact.subtitle': 'Entre em Contato Conosco',
      'contact.location.title': 'Localização',
      'contact.location': 'Cape Town, África do Sul',
      'contact.email.title': 'Email',
      'contact.phone.title': 'Telefones',
      'contact.cta.title': 'Pronto para começar sua jornada?',
      'contact.cta.subtitle': 'Entre em contato conosco através de qualquer um dos canais acima',
      
      // Footer
      'footer.phones': 'Telefones:',
      'footer.useful': 'Links Úteis',
      'footer.knowmore': 'Saiba Mais',
             'footer.ourtours': 'Nossos Passeios',
       'footer.citytour': 'City Tour',
       'footer.peninsula': 'Cape Peninsula Tour',
       'footer.winery': 'Winery Tour',
       'footer.safari': 'Safari Aquila',
       'footer.extra': 'Extra Package',
       'footer.vip': 'VIP / Private Tour',
       'footer.agulhas': 'Cape Agulhas Tour',
      'footer.newsletter.title': 'Newsletter',
      'footer.newsletter.desc': 'Assine nossa newsletter e receba novidades e promoções exclusivas',
      'footer.newsletter.email': 'Seu Email',
      'footer.newsletter.submit': 'Assinar',
      'footer.privacy.title': 'Política de Privacidade',
      'footer.privacy.link': 'Política de Privacidade',
      'footer.terms.title': 'Termos e Condições',
      'footer.terms.link': 'Termos e Condições',
      'footer.copyright': 'Todos os direitos reservados',
      'footer.developed': 'Desenvolvido por'
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services Catalog',
      'nav.contact': 'Contact',
      
      // Hero Section
      'hero.title': 'Explore the Wonders of Cape Town with Izamo',
      'hero.subtitle': 'Discover the beauty and culture of South Africa with our exclusive tours',
      'hero.cta': 'Book Your Tour',
      'hero.accommodation': 'Accommodation',
      'hero.tourism': 'Tourism',
      'hero.transport': 'Transport',
      'hero.documentation': 'Documentation',
      
      // About Section
      'about.title': 'About Us',
      'about.subtitle': 'Meet Izamo',
      'about.heading': 'Your journey to South Africa starts here',
      'about.description': 'Our goal is to make your experience in South Africa easier and safer, offering specialized support in accommodation, tourism, transport and documentation.',
      'about.bullet1': 'Whether for leisure travel, studies or a new life opportunity',
      'about.bullet2': 'We are here to help you achieve your dream',
      'about.bullet3': 'Personalized services for each need',
      'about.bullet4': 'Reliable partner network throughout South Africa',
      'about.final': 'With years of market experience, Izamo has established itself as the best option for those seeking to settle in South Africa with peace of mind and security.',
      
      // Features Section
      'features.title': 'Why choose Izamo?',
      'features.experience.title': 'Experience and Reliability',
      'features.experience.desc': 'Years of experience helping people establish themselves in South Africa',
      'features.personal.title': 'Personalized Service',
      'features.personal.desc': 'Each client is unique and deserves a tailored solution',
      'features.partners.title': 'Partner Network',
      'features.partners.desc': 'We work with the best institutions and suppliers to ensure quality and security',
      
      // Services Section
      'services.title': 'Our Tours',
      'services.subtitle': 'Discover the Wonders of Cape Town',
      'services.citytour.title': 'CITY TOUR',
      'services.citytour.duration': 'Half Day (7am – 1pm)',
      'services.citytour.price': 'From R 3,000',
      'services.citytour.highlight': 'Highlight: Table Mountain',
      'services.citytour.btn': 'View Details',
      'services.peninsula.title': 'CAPE PENINSULA TOUR',
      'services.peninsula.duration': 'Full Day (7am – 6pm)',
      'services.peninsula.price': 'From R 5,000',
      'services.peninsula.highlight': 'Highlight: Cape of Good Hope & Penguins (Boulders Beach)',
      'services.peninsula.btn': 'View Details',
      'services.winery.title': 'WINERY TOUR',
      'services.winery.duration': 'Full Day (8am – 5pm)',
      'services.winery.price': 'From R 5,000',
      'services.winery.highlight': 'Highlight: Stellenbosch & Franschhoek',
      'services.winery.btn': 'View Details',
      'services.safari.title': 'SAFARI AQUILA',
      'services.safari.duration': 'Full Day (5am – 6pm)',
      'services.safari.price': 'Price on request (per km)',
      'services.safari.highlight': 'Highlight: Wildlife Safari',
      'services.safari.btn': 'View Details',
      'services.extra.title': 'EXTRA PACKAGE',
      'services.extra.duration': 'Half Day',
      'services.extra.price': 'From R 3,000',
      'services.extra.highlight': 'Highlight: Constantia Winery & Kirstenbosch Garden',
      'services.extra.btn': 'View Details',
      'services.vip.title': 'VIP / PRIVATE TOUR',
      'services.vip.duration': 'Full Day',
      'services.vip.price': 'From R 5,000',
      'services.vip.highlight': 'Highlight: Exclusive experience with private guide',
      'services.vip.btn': 'View Details',
      'services.agulhas.title': 'CAPE AGULHAS TOUR',
      'services.agulhas.duration': 'Full Day',
      'services.agulhas.price': 'Price on request',
      'services.agulhas.highlight': 'Highlight: Southernmost point of Africa – meeting of the oceans',
      'services.agulhas.btn': 'View Details',
      
      // Tour Details Page
      'tour.visited': 'Visited places',
      'tour.info': 'Information',
      'tour.reserve': 'Book Now',
      'tour.back': 'Back Home',
      
      // CTA Section
      'cta.title': 'Ready to start your journey?',
      'cta.subtitle': 'Contact us today and discover how we can transform your experience in South Africa!',
      'cta.btn': 'Contact Us',
      
      // Portfolio Section
      'portfolio.title': 'Destinations',
      'portfolio.subtitle': 'Main Destinations in South Africa',
      'portfolio.all': 'All',
      'portfolio.capetown': 'Cape Town',
      'portfolio.joburg': 'Johannesburg',
      'portfolio.durban': 'Durban',
      'portfolio.capetown.desc': 'Table Mountain',
      'portfolio.joburg.desc': 'Financial Center',
      'portfolio.durban.desc': 'Paradise Beaches',
      'portfolio.capetown.wineries': 'Wineries',
      'portfolio.joburg.soweto': 'Soweto',
      'portfolio.durban.nightlife': 'Nightlife',
      'portfolio.more': 'More Details',
      
      // Events Section
      'events.title': 'Events',
      'events.subtitle': 'Our Upcoming Events',
      'events.study.title': 'Study Fair in South Africa',
      'events.study.date': 'Friday, November 12, 2023',
      'events.study.desc': 'Come and discover the best study opportunities in South Africa with representatives from the main universities.',
      'events.workshop.title': 'Documentation Workshop',
      'events.workshop.date': 'Saturday, November 20, 2023',
      'events.workshop.desc': 'Learn everything about the documents needed to travel, study or work in South Africa.',
      
      // FAQ Section
      'faq.title': 'FAQ',
      'faq.subtitle': 'Frequently Asked Questions',
      'faq.q1': 'What documents are needed to travel to South Africa?',
      'faq.a1': 'To travel to South Africa as a tourist, you will need a passport valid for at least 6 months, visa (when required), proof of accommodation, return ticket and proof of financial resources. For study or work, additional specific documents are required.',
      'faq.q2': 'How can I find safe accommodation in South Africa?',
      'faq.a2': 'Izamo offers a complete accommodation search service, considering your preferred location, budget and specific needs. We only work with properties in safe areas and with reliable owners.',
      'faq.q3': 'How long does it take to obtain a student visa?',
      'faq.a3': 'The student visa process normally takes 6 to 8 weeks after submitting all required documents. We recommend starting the process at least 3 months in advance to avoid setbacks.',
      'faq.q4': 'What are the best cities for students in South Africa?',
      'faq.a4': 'The most popular cities for students are Cape Town (UCT, UWC), Johannesburg (Wits, UJ), Pretoria (UP, TUT), Stellenbosch (SU) and Durban (UKZN). Each offers specific advantages in terms of quality of life, cost and academic specializations.',
      'faq.q5': 'Does Izamo offer support after arrival in South Africa?',
      'faq.a5': 'Yes, we offer complete support from trip planning to your stay in South Africa. Our services include airport transfer, city orientation, help with opening bank accounts, police registration (when required) and ongoing support throughout your stay.',
      
      // Contact Section
      'contact.title': 'Contact',
      'contact.subtitle': 'Contact Us',
      'contact.location.title': 'Location',
      'contact.location': 'Cape Town, South Africa',
      'contact.email.title': 'Email',
      'contact.phone.title': 'Phones',
      'contact.cta.title': 'Ready to start your journey?',
      'contact.cta.subtitle': 'Contact us through any of the channels above',
      
      // Footer
      'footer.phones': 'Phones:',
      'footer.useful': 'Useful Links',
      'footer.knowmore': 'Learn More',
             'footer.ourtours': 'Our Tours',
       'footer.citytour': 'City Tour',
       'footer.peninsula': 'Cape Peninsula Tour',
       'footer.winery': 'Winery Tour',
       'footer.safari': 'Safari Aquila',
       'footer.extra': 'Extra Package',
       'footer.vip': 'VIP / Private Tour',
       'footer.agulhas': 'Cape Agulhas Tour',
      'footer.privacy.title': 'Privacy Policy',
      'footer.privacy.link': 'Privacy Policy',
      'footer.terms.title': 'Terms and Conditions',
      'footer.terms.link': 'Terms and Conditions',
      'footer.copyright': 'All rights reserved',
      'footer.developed': 'Developed by'
    }
  };

  const getSavedLang = () => {
    try { return localStorage.getItem('site_lang') || 'en'; } catch(e) { return 'en'; }
  };
  const saveLang = (lang) => { try { localStorage.setItem('site_lang', lang); } catch(e) {} };

  const applyTranslations = (lang) => {
    const dict = translations[lang] || translations.pt;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    const currentLangLabel = document.getElementById('current-lang-label');
    if (currentLangLabel) currentLangLabel.textContent = lang.toUpperCase();
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'pt-br');
  };

  window.addEventListener('load', () => {
    const initialLang = getSavedLang();
    applyTranslations(initialLang);

    document.querySelectorAll('.language-switcher [data-lang]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = item.getAttribute('data-lang');
        saveLang(lang);
        applyTranslations(lang);

        // Close mobile dropdown if open
        const navbar = document.getElementById('navbar');
        if (navbar && navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          const navbarToggle = document.querySelector('.mobile-nav-toggle');
          if (navbarToggle) {
            navbarToggle.classList.toggle('bi-list');
            navbarToggle.classList.toggle('bi-x');
          }
        }
      });
    });

    // Build Portfolio dynamically (first 4 images per tour)
    const portfolioRoot = document.getElementById('portfolio-dynamic');
    if (portfolioRoot) {
      const lang = getSavedLang();
      const TOURS = {
        citytour: {
          titleKey: 'services.citytour.title',
          folder: 'assets/img/CITY_TOUR',
          images: [
            'CASTEL_OF_GOOD_HOPE_1.jpg','DISTRICT_SIX_MUSEUM_1.jpg',
            'TABLE_MOUNTAIN_1.jpg','WATER_FRONT_1.jpg'
          ]
        },
        peninsula: {
          titleKey: 'services.peninsula.title',
          folder: 'assets/img/CAPE_PENINSULA_TOUR',
          images: [
            'BANTRY_BAY_1.jpg','CAMPS_BAY_1.jpg','CAPE_OF_GOOD_HOPE_1.jpg','SEA_POINT_1.jpg'
          ]
        },
        winery: {
          titleKey: 'services.winery.title',
          folder: 'assets/img/WINERY_TOUR',
          images: ['FRANSCHHOEK_1.jpg','FRANSCHHOEK_2.jpg','STELLENBOSCH_1.jpg','STELLENBOSCH_2.jpg']
        },
        safari: {
          titleKey: 'services.safari.title',
          folder: 'assets/img/SAFARI_AQUILA',
          images: ['SAFARI_AQUILA_1.jpg','SAFARI_AQUILA_2.jpg','SAFARI_AQUILA_3.jpg','SAFARI_AQUILA_4.jpg']
        },
        extra: {
          titleKey: 'services.extra.title',
          folder: 'assets/img/EXTRA_PACKAGE',
          images: ['CONSTANTIA_1.jpg','CONSTANTIA_2.jpg','KIRSTENBOSCH_1.jpg','KIRSTENBOSCH_2.jpg']
        },
        vip: {
          titleKey: 'services.vip.title',
          folder: 'assets/img/VIPTOUR_PRIVATETOUR',
          images: ['VIP_1.jpg','VIP_2.jpg','VIP_3.jpg']
        },
        agulhas: {
          titleKey: 'services.agulhas.title',
          folder: 'assets/img/CAPE_AGULHAS_TOUR',
          images: ['CAPE_AGULHAS_1.jpg','CAPE_AGULHAS_2.jpg','CAPE_AGULHAS_3.jpg']
        }
      };

      const dict = translations[lang] || translations.en;
      const buildCard = (key, cfg) => {
        const filterClass = `filter-${key}`;
        return cfg.images.slice(0, 4).map((img) => {
          const title = dict[cfg.titleKey] || key;
          const href = `${cfg.folder}/${img}`;
          return `
          <div class="col-lg-4 col-md-6 portfolio-item ${filterClass}">
            <div class="portfolio-wrap">
              <img src="${href}" class="img-fluid" alt="${title}">
              <div class="portfolio-info">
                <h4>${title}</h4>
                <div class="portfolio-links">
                  <a href="${href}" data-gallery="portfolioGallery" class="portfolio-lightbox" title="${title}"><i class="bx bx-plus"></i></a>
                  <a href="tour-details.html?tour=${key}" title="${title}"><i class="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>`;
        }).join('');
      };

      portfolioRoot.innerHTML = [
        buildCard('citytour', TOURS.citytour),
        buildCard('peninsula', TOURS.peninsula),
        buildCard('winery', TOURS.winery),
        buildCard('safari', TOURS.safari),
        buildCard('extra', TOURS.extra),
        buildCard('vip', TOURS.vip),
        buildCard('agulhas', TOURS.agulhas)
      ].join('');

      // Init Isotope on dynamic content
      let portfolioIsotope = new Isotope(portfolioRoot, { itemSelector: '.portfolio-item' });

      // Bind filters
      const portfolioFilters = select('#portfolio-flters li', true);
      portfolioFilters.forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.preventDefault();
          portfolioFilters.forEach((f) => f.classList.remove('filter-active'));
          this.classList.add('filter-active');
          const filter = this.getAttribute('data-filter');
          portfolioIsotope.arrange({ filter });
          portfolioIsotope.on('arrangeComplete', function() { AOS.refresh(); });
        });
      });

      // Re-init GLightbox and AOS after injecting
      GLightbox({ selector: '.portfolio-lightbox' });
      AOS.refresh();
    }
  });

})()