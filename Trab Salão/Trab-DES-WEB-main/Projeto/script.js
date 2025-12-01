// LOGIN OBRIGATÓRIO
let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
if (!usuarioLogado) {
  window.location.href = 'Login.html';
}

// CARREGAR SERVIÇOS (servicos.json)
fetch('servicos.json')
  .then(res => res.json())
  .then(servicos => {
    renderServicos(servicos);
    configurarBuscaECategorias(servicos);
  })
  .catch(err => console.error('Erro ao carregar serviços:', err));

// Moeda REAL
const R$ = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });



// RENDERIZAÇÃO DOS SERVIÇOS
const grid = document.getElementById('prod-grid');

function cardServico(s) {
  const el = document.createElement('article');
  el.className = 'card col-3 fade-in';
  el.dataset.nome = s.nome.toLowerCase();
  el.dataset.categoria = s.categoria;

  el.innerHTML = `
    <div class="card-content">

      ${s.imagem ? `<img src="${s.imagem}" class="servico-img">` : ''}

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
        <strong>${s.nome}</strong>
        ${s.duracao ? `<span class="pill">${s.duracao}</span>` : ''}
      </div>

      ${s.descricao ? `<p class="note">${s.descricao}</p>` : ''}

      <div style="margin:10px 0;font-size:14px;color:#555;">
        Categoria: ${s.categoria}
      </div>

      <div class="price">${R$(s.preco)}</div>

      <div class="actions">
        <button class="btn" style="background:#ec4899;color:white;" onclick='scheduleService("${s.id}")'>
          Agendar
        </button>
      </div>
    </div>
  `;
  return el;
}

function renderServicos(list) {
  grid.innerHTML = '';
  list.forEach(s => grid.appendChild(cardServico(s)));
}

// BUSCA + FILTROS DE CATEGORIA
function configurarBuscaECategorias(servicos) {
  const busca = document.getElementById('busca');
  const botoesCategorias = document.getElementById('botoes-categorias');
  let filtroCategoria = 'todos';

  function aplicarFiltros() {
    const q = (busca.value || '').toLowerCase();
    const filtrados = servicos.filter(s => {
      const nome = (s.nome || '').toLowerCase();
      const categoria = (s.categoria || '').toLowerCase();
      const matchTexto = nome.includes(q);
      const matchCat = filtroCategoria === 'todos' || categoria === filtroCategoria;
      return matchTexto && matchCat;
    });
    renderServicos(filtrados);
  }

  busca.addEventListener('input', aplicarFiltros);

  botoesCategorias.addEventListener('click', e => {
    if (e.target.matches('[data-cat]')) {
      filtroCategoria = (e.target.dataset.cat || '').toLowerCase();
      aplicarFiltros();
    }
  });
}

// BOTÃO "AGENDAR" DO CARD → SCROLL PARA FORM
function scheduleService(serviceId) {
  const path = window.location.pathname.toLowerCase();
  const onIndex =
    path.endsWith('/index.html') ||
    path.endsWith('/index.htm') ||
    path === '/' ||
    path === '' ||
    path.includes('/index');

  if (!onIndex) {
    window.location.href = `Index.html#agendamento?servico=${encodeURIComponent(serviceId)}`;
    return;
  }

  document.getElementById('agendamento').scrollIntoView({ behavior: 'smooth' });
  const select = document.getElementById('tipo-servico');
  if (select) select.value = serviceId;
}

// HEADER → NAVEGAÇÃO
document.getElementById('btn-servicos')?.addEventListener('click', () => {
  window.location.href = 'servicos.html';
});

document.getElementById('btn-agendamento')?.addEventListener('click', () => {
  window.location.href = 'Index.html#agendamento';
});

document.getElementById('btn-inicio')?.addEventListener('click', () => {
  window.location.href = 'Index.html';
});



// Pré-seleção quando vem do card
document.addEventListener('DOMContentLoaded', function () {
  const hash = window.location.hash;

  if (hash && hash.startsWith('#agendamento?servico=')) {
    const servicoId = decodeURIComponent(hash.split('=')[1] || '');
    const select = document.getElementById('tipo-servico');

    if (select && servicoId) {
      select.value = servicoId;
      document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
});


// LOCALSTORAGE: AGENDAMENTOS
const agendaKey = 'agendamentos';
let agendamentos = JSON.parse(localStorage.getItem(agendaKey) || '[]');

function salvarAgendamentos() {
  localStorage.setItem(agendaKey, JSON.stringify(agendamentos));
}

// FORMULÁRIO DE AGENDAMENTO
const form = document.getElementById('form-agendamento');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const servico = document.getElementById('tipo-servico').value;
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;
    const telefone = document.getElementById('telefone').value.trim();
    const detalhes = document.getElementById('detalhes').value.trim();

    if (!servico || !nome || !email || !data || !hora) {
      mostrarMensagem("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const novo = {
      id: crypto.randomUUID(),
      servico,
      nome,
      email,
      telefone,
      data,
      hora,
      detalhes
    };

    agendamentos.push(novo);
    salvarAgendamentos();
    renderAgendamentos();
    form.reset();

    mostrarMensagem("Agendamento realizado com sucesso!");
  });
}

// RENDERIZAR LISTA DE AGENDAMENTOS
function renderAgendamentos() {
  const lista = document.getElementById('lista-agendamentos');
  if (!lista) return;

  if (!agendamentos.length) {
    lista.textContent = 'Nenhum agendamento ainda.';
    return;
  }

  lista.innerHTML = agendamentos.map(a => `
    <div class="pill" style="display:block;margin-bottom:8px;">
      <strong>${a.data}</strong> • ${a.hora} — ${a.servico}<br>
      <span class="note">${a.nome} — ${a.email}</span>
    </div>
  `).join('');
}

renderAgendamentos();



// MODAL → MENSAGEM & CONFIRMAÇÃO
document.addEventListener('DOMContentLoaded', function () {
  const btnLimpar = document.getElementById('btn-limpar-ag');

  const modalMensagem = new bootstrap.Modal(document.getElementById('modalMensagem'));
  const modalConfirmar = new bootstrap.Modal(document.getElementById('modalConfirmar'));

  const modalTexto = document.getElementById('modalTexto');
  const modalConfirmarTexto = document.getElementById('modalConfirmarTexto');
  const btnConfirmarSim = document.getElementById('btnConfirmarSim');

  // Função de exibir modal de mensagem
  function mostrarMensagem(msg) {
    modalTexto.innerText = msg;
    modalMensagem.show();
  }

  if (btnLimpar) {
    btnLimpar.addEventListener('click', function (e) {
      e.preventDefault();

      if (!agendamentos.length) {
        mostrarMensagem("Não há agendamentos para limpar.");
        return;
      }

      modalConfirmarTexto.innerText = "Deseja realmente limpar todos os agendamentos?";
      modalConfirmar.show();

      btnConfirmarSim.onclick = function () {
        agendamentos = [];
        salvarAgendamentos();
        renderAgendamentos();
        modalConfirmar.hide();
        mostrarMensagem("Agendamentos foram limpos com sucesso!");
      };
    });
  }
});

// LOGOUT
document.getElementById('btn-sair')?.addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'Login.html';
});

// BOTÃO INÍCIO
document.getElementById('btn-inicio')?.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// MENU HAMBÚRGUER MOBILE
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navActions = document.getElementById('nav-actions');
  
  if (mobileMenuToggle && navActions) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenuToggle.classList.toggle('active');
      navActions.classList.toggle('show');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = navActions.querySelectorAll('.btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navActions.classList.remove('show');
      });
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        navActions.classList.remove('show');
      }
    });
  }
});
