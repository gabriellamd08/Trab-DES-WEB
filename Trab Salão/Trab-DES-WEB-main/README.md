# Salão da Netinha

Projeto desenvolvido para a disciplina de Desenvolvimento Web — aplicação front-end em HTML, CSS e JavaScript que simula um site de salão com catálogo de serviços e sistema de agendamento local.

## Visão geral
- Front-end puro (HTML/CSS/JS) + JSON estático
- Layout responsivo com CSS customizado.
- Ícones com Font Awesome e fontes do Google Fonts.

## Funcionalidades
- Catálogo de Serviços
  - Lista dinâmica carregada via `servicos.json`.
  - Cards com preço, imagem, categoria e duração.
  - Botão "Agendar" em cada card.
- Busca e Filtros
  - Busca instantânea por nome do serviço.
  - Filtros por categorias: cabelos, unhas, estética, maquiagem.
  - Botões que aplicam filtro automaticamente.
- Sistema de Agendamento
  - Formulário com validação básica.
  - Salva agendamentos localmente em `localStorage`.
  - Exibição da lista de agendamentos na tela.
  - Botão para limpar todos os agendamentos.
- Sistema simples de Login
  - Usuário precisa estar logado para acessar o site; caso não esteja é redirecionado para `Login.html`.
  - Cadastro e login simples armazenados em `localStorage`.
- Navegação
  - Botões navegáveis e rolagem suave para áreas internas.
  - Redirecionamento automático para seções internas (ex.: `#agendamento`).

## Bootstrap
- O projeto usa Bootstrap (via CDN) nas páginas:
  - `Index.html` e `Login.html` (CSS e `bootstrap.bundle.min.js`).
- Utilização principal:
  - Modais (markup + API JS) e utilitários básicos (`.btn`, `.btn-primary`, `.btn-close`, etc.).
- Observação:
  - Grande parte do visual/responsividade é implementada com CSS próprio

## Google Sign-In
- O projeto inclui o script do Google Identity Services, mas o campo `data-client_id` em `Login.html` está vazio.
- Pretendemos habilitar a autenticação via Google OAuth posteriormente, quando o site estiver público. Nesse momento criaremos um OAuth Client ID no Google Cloud Console

## Estrutura de arquivos (resumo)
- `Index.html` — página principal (carrega `script.js`)  
- `Login.html` — página de login  
- `servicos.html`, `contato.html`, `Sobrenos.html` — páginas informativas  
- `style.css`, `Stylesobrenos.css`, `contato.css`, `StyleLogin.css` — estilos do projeto  
- `script.js` — lógica principal (fetch serviços, agendamentos, modais)  
- `login.js` — lógica de login/cadastro local  
- `servicos.json` — dados dos serviços
