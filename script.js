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

// Função Tema (claro/escuro)

function initTema() {
    const botao = document.querySelector('.tema-toggle');
    const raiz = document.documentElement;

    if (!botao) return;

    function aplicarTema(tema) {
        raiz.setAttribute('data-tema', tema);
        botao.setAttribute('aria-checked', tema === 'escuro' ? 'true' : 'false');
    }

    // O tema inicial já foi aplicado no <head>; aqui só sincroniza o rótulo do botão
    aplicarTema(raiz.getAttribute('data-tema') || 'claro');

    botao.addEventListener('click', () => {
        const novoTema = raiz.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
        aplicarTema(novoTema);
        try { localStorage.setItem('tema', novoTema); } catch (e) {}
    });

    // Se a pessoa não escolheu um tema, acompanha o tema do sistema
    const preferencia = window.matchMedia('(prefers-color-scheme: dark)');
    preferencia.addEventListener('change', (event) => {
        let salvo = null;
        try { salvo = localStorage.getItem('tema'); } catch (e) {}
        if (!salvo) aplicarTema(event.matches ? 'escuro' : 'claro');
    });
}

// Inicialização

initTema();
initMenu();
initAnimacoes();
initProjetosCarrossel();