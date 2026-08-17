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

// Inicialização

initMenu();
initAnimacoes();
initProjetosCarrossel();