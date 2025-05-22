// Galeria de imagens
const imagens = [
    { arquivo: "botox-01.png", categoria: "botox", tag: "Botox" },
    { arquivo: "botox-02.png", categoria: "botox", tag: "Botox" },
    { arquivo: "preenchimento-labial-01.png", categoria: "preenchimento-labial", tag: "Preenchimento Labial" },
    { arquivo: "preenchimento-labial-02.png", categoria: "preenchimento-labial", tag: "Preenchimento Labial" },
    { arquivo: "preenchimento-bigode-01.png", categoria: "bigode-chines", tag: "Bigode Chinês" },
    { arquivo: "rinomodelacao-01.png", categoria: "rinomodelacao", tag: "Rinomodelação" },
    // ...adicione mais imagens conforme desejar
];

const galeria = document.getElementById('galeria');

// Renderiza a galeria conforme o filtro
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
    modal.classList.add('show');
    imgModal.src = `resultados/${imagem.arquivo}`;
    imgModal.alt = imagem.tag;
    modalCategoria.textContent = imagem.tag;
}
fecharModal.onclick = function () {
    modal.classList.remove('show');
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// Inicializa a galeria ao carregar a página
document.addEventListener('DOMContentLoaded', () => renderGaleria());

// Formulário de contato com Formspree
document.getElementById('formContato').addEventListener('submit', async function (e) {
    e.preventDefault();

    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var whatsapp = document.getElementById('whatsapp');
    var mensagem = document.getElementById('mensagem');
    var erroForm = document.getElementById('erroForm');
    var sucessoForm = document.getElementById('sucessoForm');

    erroForm.style.display = 'none';
    sucessoForm.style.display = 'none';

    // Validação manual (opcional, pois os campos já são required)
    if (!nome.value) {
        erroForm.innerText = 'Por favor, preencha o nome completo.';
        erroForm.style.display = 'block';
        nome.focus();
        return false;
    }
    if (!email.value) {
        erroForm.innerText = 'Por favor, preencha o e-mail.';
        erroForm.style.display = 'block';
        email.focus();
        return false;
    }
    if (!whatsapp.value) {
        erroForm.innerText = 'Por favor, informe o WhatsApp.';
        erroForm.style.display = 'block';
        whatsapp.focus();
        return false;
    }
    if (!mensagem.value) {
        erroForm.innerText = 'Por favor, escreva sua mensagem.';
        erroForm.style.display = 'block';
        mensagem.focus();
        return false;
    }

    // Monta o objeto de dados
    const data = {
        nome: nome.value,
        email: email.value,
        whatsapp: whatsapp.value,
        mensagem: mensagem.value
    };

    try {
        const response = await fetch('https://formspree.io/f/mqaqoeqb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            sucessoForm.innerText = 'Mensagem enviada com sucesso!';
            sucessoForm.style.display = 'block';
            this.reset();
        } else {
            erroForm.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
            erroForm.style.display = 'block';
        }
    } catch (error) {
        erroForm.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
        erroForm.style.display = 'block';
    }
});
