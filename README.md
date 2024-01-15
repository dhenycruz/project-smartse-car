![Cover_projeto_Github](https://github.com/dhenycruz/project-smartse-car/blob/master/public/capa-github.png)
# Sisteam de Gestão de Frotas
Esse projeto faz parte de um teste prático para a empresa SmartSE onde o principal objetivo é criar um sistema de cadastro de veículos e abastecimentos.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

- Nodejs, docker, docker-compose e git instalados na sua máquina.

### 🔧 Instalação

  - Com o terminal aberto, vamos clonar o repositório
    `git clone git@github.com:dhenycruz/teste-smartSE.git`
    
  - Instalando as dependências
    - Depois de ter clonado o repositório entra na pasta do projeto e instale as dependências rodando o comando:
        `npm run install`
      
    - Arquivo .env no backend
      - Para a nossa aplicação rodar precisamos criar o arquivo .env ou alterar o arquivo .env-example para .env;
  
   - Banco de Dados Postgree
      - O banco de dados da aplicação está rodando em docker com o docker-compose, para subir o banco de dados usamos o comando:
        `docker-compose up -d`
     - Para subit todas as migrates para o banco de dados utilize o comando:
        `npx prisma generate`
      - Para popular o banco de dados utilize o comando:
        `npx prisma db seed`
        
   - Rodando a aplicação
       - Após seguir os passoas a cima é hora de dar o start na nossa aplicação, rode o comando:
         `npm run build && npm run start`
      
   - CPF E senha para poder logar na aplicação:
        - CPF: 01234567890
        - SENHA: 123df
  
  Assim a nossa aplicação estará rodando localmente
  
## 📦 Desenvolvimento
Para realizar o desenvolvimento dessa aplicação, decidi me desaviar, não era pré requisito, pois o foco do projeto é o desenvolvimento frontend, mas para testar meus conhecimentos e colocar em prática resolvi também desenvolver a parte do backend da aplicação.

Como foi solicitado para desenvolver o projeto utilizando NEXT.JS, aprovetei para desenvolver a API da aplicação utilizando o próprio next, além desenvolver a aplicação localmente, coloquei a aplicação em produção, agora é possível acesse-la pelo link: https://project-smartse-car.vercel.app/.

Utilizei as tecnologias que foram solcitadas: NEXT.JS e TypeScript, React-query, react-hook-form, o zod não cheguei a utilizá-lo, fiz as validações utilizando o próprio react-hook-form, não tinha utilizado o react-query antes, mas me apaixonei, o refecth, onSuccess, Mutation, são incríveis e para estilizar a aplicação ultilizei Tailwind.

## Futuras implementações
  * Utilizar animações quando abre os modals e utilizar o filter blur para desfocar o conteúdo atrás do modal;
  * Utilizar máscaras nos inputs de cpf e valores;
  * Adicionar input para pesquisa e filtro de veículos;

A base da aplicação dá margem para grandes implementações e até mesmo melhorar a lógica de negócio do sisteam, futuramente posso dar continuidade no projeto.

## Autor
---

<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/26901028?s=400&u=d99619f0fcc7ff7d8407ff05a0e90a0149f959ee&v=4" width="100px;" alt=""/>
 
 Dheniarley Cruz 🚀

Desenvolvedor Full Stack 
