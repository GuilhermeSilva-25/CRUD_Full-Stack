# 🚀 CRUD Full-Stack - Gestão de Estudantes

Este projeto é uma aplicação Full-Stack completa para gerenciar um cadastro de estudantes (Criar, Ler, Atualizar, Deletar).

Esta é uma evolução do [projeto original](https://github.com/GuilhermeSilva-25/CRUD_API), agora reconstruído com um stack tecnológico moderno, incluindo **React**, **Vite** e **TypeScript** no frontend e no backend. Foi desenvolvido como projeto prático para a disciplina de Desenvolvimento Web II do curso de Desenvolvimento de Software Multiplataforma da Fatec Luigi Papaiz.

**Professor Responsável:** Prof. PhD. Bruno Zolotareff dos Santos.

---

## 💻 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

**Back-end:**
* **Node.js:** Ambiente de execução do JavaScript no servidor.
* **Express:** Framework para criação do servidor e das rotas da API.
* **TypeScript:** Adiciona tipagem estática ao JavaScript.
* **MySQL2 (`mysql2/promise`):** Driver para conexão com o banco de dados MySQL (com Pool de Conexões).
* **Dotenv:** Para gerenciamento de variáveis de ambiente.
* **CORS:** Middleware para permitir que o front-end acesse a API.
* **ts-node:** Para executar o TypeScript diretamente no Node.js.

**Front-end:**
* **React:** Biblioteca para construção de interfaces de usuário.
* **Vite:** Ferramenta de build e servidor de desenvolvimento local.
* **TypeScript:** Para tipagem estática no React.
* **JavaScript (ES6+):** Com `fetch` API para consumir o back-end.
* **CSS3:** Estilização idêntica ao projeto original.

**Banco de Dados:**
* **MySQL:** Banco de dados relacional.

---

## ✨ Funcionalidades (Endpoints da API)

A API (disponível sob o prefixo `/api`) possui os seguintes endpoints:

* `GET /usuarios`: Retorna uma lista com todos os estudantes cadastrados.
* `GET /usuarios/:id`: Retorna os dados de um estudante específico.
* `POST /usuarios`: Cria um novo estudante no banco de dados.
* `PUT /usuarios/:id`: Atualiza os dados (nome e email) de um estudante existente.
* `DELETE /usuarios/:id`: Deleta um estudante do banco de dados.

---

## 🛠️ Como Rodar o Projeto (Localmente)

Para rodar este projeto, você precisará ter o [Node.js](https://nodejs.org/) (v18+) e o [MySQL](https://www.mysql.com/products/community/) instalados.

O projeto é um *monorepo*, dividido em `/backend` e `/frontend`. Você precisará de **dois terminais** abertos para rodar tudo.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/GuilhermeSilva-25/CRUD_Full-Stack.git
    ```

### 1. Configurando o Back-end (Terminal 1)

2.  **Acesse a pasta do backend:**
    ```bash
    cd backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure o Banco de Dados:**
    * Execute o script `banco.sql` (que está na raiz do projeto) no seu MySQL Workbench ou DBeaver para criar o banco `dados` e a tabela `estudante`.

5.  **Configure as Variáveis de Ambiente:**
    * Na pasta `/backend`, crie um arquivo chamado `.env`
    * Copie o conteúdo abaixo e **altere com suas credenciais**:

    ```env
    # Variáveis do Banco de Dados
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha_do_mysql
    DB_DATABASE=dados
    ```

6.  **Inicie o servidor de API:**
    ```bash
    npm run dev
    ```
    * *O backend estará rodando em `http://localhost:3000`*

### 2. Configurando o Front-end (Terminal 2)

7.  **Abra um novo terminal.**

8.  **Acesse a pasta do frontend:**
    ```bash
    # Partindo da raiz 'crud-fullstack-moderno'
    cd frontend
    ```

9.  **Instale as dependências:**
    ```bash
    npm install
    ```

10. **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    * *O Vite informará o endereço de acesso, geralmente `http://localhost:5173`*

11. **Acesse a aplicação:**
    * Abra `http://localhost:5173` (ou a porta informada) no seu navegador.

---

## 👨‍💻 Autor

Este projeto foi desenvolvido por:

**Daniel Felipe Ferreira**

**Gabriel de Moura**

**Guilherme dos Santos Silva**

**Johnny da Silva Franco de Lima**

**Vinicius Lima Carneiro**

**Vitor de Almeida Bernardo**
