# Salão da Netinha

Projeto desenvolvido para a disciplina de **Desenvolvimento Web** — aplicação front-end desenvolvida com **HTML, CSS e JavaScript** que simula um site de salão de beleza, oferecendo catálogo de serviços e sistema de agendamento local.

---

## Visão Geral

- **Stack:** Front-end puro *(HTML/CSS/JS)* + JSON estático
- **Layout:** 100% responsivo com CSS customizado
- **Ícones & Fontes:** Font Awesome; Google Fonts
- **Sem back-end** — dados e autenticação persistidos via `localStorage`

---

## Funcionalidades

### Catálogo de Serviços
- Lista dinâmica (carregada de `servicos.json`)
- Cards com: **preço**, **imagem**, **categoria** e **duração**
- Botão *Agendar* em cada card

### Busca e Filtros
- Busca instantânea por nome do serviço
- Filtros por categorias: cabelos, unhas, estética, maquiagem
- Botões de filtro dinâmico

### Sistema de Agendamento
- Formulário com validação de campos
- Salva novos agendamentos no `localStorage`
- Exibe lista dos agendamentos realizados
- Botão para limpar agendamentos

### Sistema Simples de Login
- Usuário precisa estar **logado** para acessar o site
- Redirecionamento automático para `Login.html` caso não esteja autenticado
- Cadastro e autenticação simples via `localStorage` (usuário/senha)

### Navegação
- Botões para rolar suavemente até áreas internas do site
- Redirecionamentos automáticos usando âncoras (ex: `#agendamento`)

### Bootstrap
- Utilização via CDN nas páginas `index.html` e `Login.html`
- Uso principal: modais (markup + API JS) e utilitários básicos (.btn, .btn-primary, .btn-close, etc.)
- **Obs.:** Responsividade e visual têm predominância de CSS próprio

### Google Sign-In *(Futuro)*
- Script do Google Identity Services incluso
- [`data-client_id`](https://developers.google.com/identity) vazio por enquanto
- Autenticação pelo Google OAuth será habilitada no futuro (quando site estiver público)
