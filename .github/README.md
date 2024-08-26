
## 🖥️ Projeto

O projeto "GitFav" é uma aplicação web para favoritar usuários do GitHub, permitindo que os usuários busquem, adicionem e removam perfis da lista de favoritos. A aplicação utiliza a API do GitHub para buscar informações sobre os usuários e armazena os dados dos favoritos no local storage do navegador, garantindo a persistência entre sessões. Este projeto foi solicitado durante o desafio do Stage 06 da trilha Explorer da Rocketseat.

## 🚀 Tecnologias

Esse projeto foi desenvolvido utilizando as seguintes tecnologias:

- HTML
- CSS
- Javascript
- Git e Github

## 💡 Técnicas Utilizadas

- **Manipulação do DOM:** Atualiza dinamicamente o conteúdo da página, adicionando e removendo usuários na tabela.

- **Integração com API do Github:** A aplicação consulta a API do GitHub para obter os detalhes do usuário.

- **Local Storage:** Armazena os usuários favoritos no navegador para manter os dados entre sessões.

- **ES6 Modules:** O código está dividido em módulos (`Favorites.js`, `searchGithubUser.js` e `main.js`), promovendo uma estrutura mais organizada.

- **API Fetch:** Faz requisições à API do GitHub para obter os dados sobre os usuários.

- **Eventos:** Lida com eventos de teclado e cliques para adicionar e remover usuários.

- **SweetAlert2:**: É uma biblioteca para exibir diálogos modais customizados. Utilizado para exibir notificações estilizadas, incluindo mensagens de sucesso, erro e confirmação. Foi totalmente estilizado para se adequar as cores do projeto.