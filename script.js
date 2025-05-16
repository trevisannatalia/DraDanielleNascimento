const imagens = [
    { arquivo: "botox-01.png", categoria: "botox", tag: "Botox" },
    { arquivo: "botox-02.png", categoria: "botox", tag: "Botox" },
    { arquivo: "preenchimento-labial-01.png", categoria: "preenchimento-labial", tag: "Preenchimento Labial" },
    { arquivo: "preenchimento-labial-02.png", categoria: "preenchimento-labial", tag: "Preenchimento Labial" },
    { arquivo: "preenchimento-bigode-01.png", categoria: "bigode-chines", tag: "Bigode Chinês" },
    { arquivo: "rinomodelacao-01.png", categoria: "rinomodelacao", tag: "Rinomodelação" },
    // ...adicione mais imagens
];

const galeria = document.getElementById('galeria');

// Função para renderizar a galeria
function renderGaleria(categoria = 'todos') {
    galeria.innerHTML = '';
    imagens.forEach(imagem => {
        if (categoria === 'todos' || imagem.categoria === categoria) {
            const div = document.createElement('div');
            div.className = 'galeria-item';
            div.dataset.categoria = imagem.categoria;
            div.innerHTML = `
        <img src="resultados/${imagem.arquivo}" alt="${imagem.tag}">
        <div class="categoria-tag">${imagem.tag}</div>
      `;
            div.onclick = () => abrirModal(imagem);
            galeria.appendChild(div);
        }
    });
}

// Filtros
document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderGaleria(this.dataset.categoria);
    });
});

// Modal
const modal = document.getElementById('modal');
const imgModal = document.getElementById('imgModal');
const modalCategoria = document.getElementById('modalCategoria');
const fecharModal = document.getElementById('fecharModal');

function abrirModal(imagem) {
    modal.style.display = "block";
    imgModal.src = `resultados/${imagem.arquivo}`;
    imgModal.alt = imagem.tag;
    modalCategoria.textContent = imagem.tag;
}
fecharModal.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Inicializa a galeria
document.addEventListener('DOMContentLoaded', () => renderGaleria());

document.getElementById('formContato').addEventListener('submit', function (e) {
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var whatsapp = document.getElementById('whatsapp');
    var mensagem = document.getElementById('mensagem');
    var erroForm = document.getElementById('erroForm');
    erroForm.style.display = 'none';

    if (!nome.value) {
        erroForm.innerText = 'Por favor, preencha o nome completo.';
        erroForm.style.display = 'block';
        nome.focus();
        e.preventDefault();
        return false;
    }
    if (!email.value) {
        erroForm.innerText = 'Por favor, preencha o e-mail.';
        erroForm.style.display = 'block';
        email.focus();
        e.preventDefault();
        return false;
    }
    if (!whatsapp.value) {
        erroForm.innerText = 'Por favor, informe o WhatsApp.';
        erroForm.style.display = 'block';
        whatsapp.focus();
        e.preventDefault();
        return false;
    }
    if (!mensagem.value) {
        erroForm.innerText = 'Por favor, escreva sua mensagem.';
        erroForm.style.display = 'block';
        mensagem.focus();
        e.preventDefault();
        return false;
    }
});