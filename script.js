// Função Principal

function initMenu() {

// Seletores

const menuHamburguer = document.querySelector('.menu-hamburguer');
const menuFechar = document.querySelector('.menu-fechar');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.menu-overlay');

// Se algum elemento não existir, o script para
if (!menuHamburguer || !menuFechar || !nav || !overlay) return;

// Funções

function fecharMenu() {
    nav.classList.remove('ativo');
    overlay.classList.remove('ativo');
    document.body.classList.remove('menu-aberto');
    menuHamburguer.setAttribute('aria-expanded', 'false');
}

function abrirMenu(event) {
    event.stopPropagation();
    nav.classList.add('ativo');
    overlay.classList.add('ativo');
    document.body.classList.add('menu-aberto');
    menuHamburguer.setAttribute('aria-expanded', 'true');
}

// Abrir Menu

menuHamburguer.addEventListener('click', abrirMenu);

// Fechar Menu

menuFechar.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);

// Fecha ao clicar nos links

const linksDoNav = nav.querySelectorAll('a');
linksDoNav.forEach(link => {
    link.addEventListener('click', fecharMenu);
});

// Fechar com a tecla Escape

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharMenu();
    }
});
}

// Função Animações

function initAnimacoes() {

// Observer — anima ao entrar na tela

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 });

// Observa todos os elementos com a classe .animar

document.querySelectorAll('.animar').forEach(el => observer.observe(el));
}

function initProjetosCarrossel() {
    const lista = document.getElementById('projetos-lista');
    const setaNext = document.getElementById('projetos-next');
    const setaPrev = document.getElementById('projetos-prev');

    if (!lista || !setaNext || !setaPrev) return;

    function obterLarguraScroll() {
        const primeiroItem = lista.querySelector('.projetos-card');
        return primeiroItem ? primeiroItem.getBoundingClientRect().width + 32 : 380;
    }

    function irParaProximo() {
        const largura = obterLarguraScroll();
        const maximo = lista.scrollWidth - lista.clientWidth;

        if (lista.scrollLeft >= maximo - 4) {
            lista.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            lista.scrollBy({ left: largura, behavior: 'smooth' });
        }
    }

    function irParaAnterior() {
        const largura = obterLarguraScroll();

        if (lista.scrollLeft <= 4) {
            lista.scrollTo({ left: lista.scrollWidth, behavior: 'smooth' });
        } else {
            lista.scrollBy({ left: -largura, behavior: 'smooth' });
        }
    }

    setaNext.addEventListener('click', irParaProximo);
    setaPrev.addEventListener('click', irParaAnterior);
}

// Função Tema (segue o tema do sistema)

function initTema() {
    const raiz = document.documentElement;
    const preferencia = window.matchMedia('(prefers-color-scheme: dark)');

    preferencia.addEventListener('change', (event) => {
        raiz.setAttribute('data-tema', event.matches ? 'escuro' : 'claro');
    });
}

// Função Idioma (português/inglês)

const TRADUCOES_EN = {
    titulo: 'Rafael Trajano | Full-Stack Developer',
    descricao: 'Portfolio of Rafael Trajano, a Full-Stack Developer specializing in JavaScript, React, Python, FastAPI, and automated testing (Cucumber, Cypress).',
    logo: 'Rafael Trajano, back to top',
    abrirMenu: 'Open navigation menu',
    menuPrincipal: 'Main menu',
    fecharMenu: 'Close menu',
    navHome: 'Home',
    navSobre: 'About',
    navTec: 'Technologies',
    navProjetos: 'Projects',
    navContato: 'Contact',
    homeDesc: 'I build end-to-end web systems, from data modeling to user interface.',
    ctaCurriculo: 'Download CV',
    curriculo: 'arquivos/curriculo-rafael-trajano-en.pdf',
    ctaProjetos: 'View Projects',
    sobreTitulo: 'My Journey',
    sobre1: "Hi, I'm Rafael Trajano, a <strong>Computer Science</strong> student at UEPB and a Software Engineering Intern at <strong>NUTES</strong>. I also built <strong>Jornada</strong>, a gamified study platform, as my undergraduate thesis.",
    sobre2: "Beyond technical skills, I'm communicative, empathetic, and patient, qualities that help me understand other people's perspectives.",
    bonecoAlt: 'Illustration of Rafael Trajano, Full-Stack Developer',
    tecTitulo: 'My Stack',
    tecAria: 'Technologies I use',
    projTitulo: 'My Portfolio',
    projAnterior: 'Previous project',
    projProximo: 'Next project',
    verGithub: 'View on GitHub',
    jornadaAlt: 'Jornada — Gamified study platform',
    jornadaTitulo: 'Jornada — Study Platform (Thesis)',
    jornadaDesc: 'A gamified study platform with streaks, trophies, and study groups with friend leaderboards.',
    jornadaAria: 'Visit the Jornada project website',
    voltAlt: 'VoltControl — Energy Monitoring Dashboard',
    voltTitulo: 'VoltControl — Energy Dashboard',
    voltDesc: 'A dashboard for tracking electricity usage, with comparison charts, history, and PDF export.',
    voltAria: 'Visit the VoltControl project website',
    juninoAlt: 'Forrobodó Junino — Event Website',
    juninoTitulo: 'Forrobodó Junino — Event Website',
    juninoDesc: 'An event website with the schedule, a photo gallery, and Google Maps integration.',
    juninoAria: 'Visit the Forrobodó Junino project website',
    cachacaAlt: 'Cachaça Forrobodó — Brand Website',
    cachacaTitulo: 'Cachaça Forrobodó — Brand Website',
    cachacaDesc: 'A brand website with the company history, product catalog, visitor information, and contact channels.',
    cachacaAria: 'Visit the Cachaça Forrobodó project website',
    contatoTitulo: "Let's Talk",
    copyright: '© 2026 Rafael Trajano — All rights reserved',
    emailRotulo: 'Email:'
};

function initIdioma() {
    const raiz = document.documentElement;
    const botao = document.querySelector('.idioma-toggle');
    const metaDescricao = document.querySelector('meta[name="description"]');

    // Cada tipo de marcação: [atributo data-*, o que é trocado no elemento]
    const alvos = [
        ['i18n', (el, valor) => { el.innerHTML = valor; }, (el) => el.innerHTML],
        ['i18nAria', (el, valor) => el.setAttribute('aria-label', valor), (el) => el.getAttribute('aria-label')],
        ['i18nAlt', (el, valor) => el.setAttribute('alt', valor), (el) => el.getAttribute('alt')],
        ['i18nHref', (el, valor) => el.setAttribute('href', valor), (el) => el.getAttribute('href')]
    ];

    // Guarda os textos originais em português, que estão no próprio HTML
    const originais = [];
    alvos.forEach(([chave, aplicar, ler]) => {
        const seletor = '[data-' + chave.replace(/[A-Z]/g, (l) => '-' + l.toLowerCase()) + ']';
        document.querySelectorAll(seletor).forEach((el) => {
            originais.push({ el, chave: el.dataset[chave], aplicar, pt: ler(el) });
        });
    });
    const tituloPt = document.title;
    const descricaoPt = metaDescricao ? metaDescricao.getAttribute('content') : '';

    function aplicarIdioma(idioma) {
        const ingles = idioma === 'en';
        raiz.setAttribute('data-idioma', idioma);
        raiz.setAttribute('lang', ingles ? 'en' : 'pt-BR');

        originais.forEach(({ el, chave, aplicar, pt }) => {
            aplicar(el, ingles && TRADUCOES_EN[chave] ? TRADUCOES_EN[chave] : pt);
        });

        document.title = ingles ? TRADUCOES_EN.titulo : tituloPt;
        if (metaDescricao) metaDescricao.setAttribute('content', ingles ? TRADUCOES_EN.descricao : descricaoPt);
        if (botao) botao.setAttribute('aria-label', ingles ? 'Mudar para português' : 'Switch to English');
    }

    aplicarIdioma(raiz.getAttribute('data-idioma') === 'en' ? 'en' : 'pt');

    if (!botao) return;

    botao.addEventListener('click', () => {
        const novoIdioma = raiz.getAttribute('data-idioma') === 'en' ? 'pt' : 'en';
        aplicarIdioma(novoIdioma);
        try { localStorage.setItem('idioma', novoIdioma); } catch (e) {}
    });
}

// Inicialização

initTema();
initIdioma();
initMenu();
initAnimacoes();
initProjetosCarrossel();