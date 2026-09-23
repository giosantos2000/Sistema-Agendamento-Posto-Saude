# Sistema de Agendamento para Posto de Saúde

## Descrição

O Sistema de Agendamento para Posto de Saúde foi desenvolvido como um projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.

O sistema tem como objetivo facilitar o agendamento e o gerenciamento de consultas em um posto de saúde, permitindo que pacientes realizem seus agendamentos e acompanhem suas consultas, enquanto funcionários podem gerenciar médicos, horários e a agenda de atendimentos.

## Funcionalidades

### Paciente

- Cadastro de paciente
- Login
- Agendamento de consultas
- Visualização das consultas agendadas
- Cancelamento de consultas
- Logout

### Funcionário

- Login de funcionário
- Cadastro de médicos
- Cadastro de horários dos médicos
- Visualização da agenda por data
- Cancelamento de consultas
- Logout

## Tecnologias utilizadas

### Frontend

- React
- JavaScript
- HTML
- CSS
- Bootstrap

### Backend

- Node.js
- Express
- JavaScript
- JWT
- Bcrypt

### Banco de dados

- MySQL

## Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas:

- `paciente`
- `funcionario`
- `medico`
- `horario`
- `consulta`

## Estrutura do Projeto

```text
Sistema-Agendamento-Posto-Saude

│
├── backend
├── frontend
├── banco
├── documentacao
├── prototipos
├── .gitignore
└── README.md
```

## Como executar o projeto

### Requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- MySQL
- Git

### 1. Clonar o projeto

Clone o repositório do GitHub:

```bash
git clone https://github.com/giosantos2000/Sistema-Agendamento-Posto-Saude.git
```

Entre na pasta do projeto:

```bash
cd Sistema-Agendamento-Posto-Saude
```

### 2. Configurar o banco de dados

É necessário ter o MySQL instalado e criar o banco de dados utilizado pelo sistema.

Os arquivos relacionados ao banco de dados estão na pasta:

```text
banco
```

O banco utilizado pelo projeto é:

```text
posto_saude
```

As principais tabelas são:

```text
paciente
funcionario
medico
horario
consulta
```

### 3. Configurar o Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo chamado:

```text
.env
```

dentro da pasta `backend`.

O arquivo `.env` deve conter as configurações necessárias para conexão com o banco de dados e autenticação JWT.

Exemplo:

```text
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=posto_saude
DB_PORT=3306
JWT_SECRET=sua_chave_secreta
```

Os valores devem ser configurados de acordo com o ambiente em que o projeto será executado.

Depois, inicie o backend:

```bash
npm start
```

O backend será executado na porta:

```text
http://localhost:5000
```

### 4. Configurar o Frontend

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm start
```

O sistema será aberto no navegador em:

```text
http://localhost:3000
```

## Acesso pela rede local

Quando o frontend e o backend estiverem configurados para acesso pela rede local, outros dispositivos conectados à mesma rede Wi-Fi podem acessar o sistema utilizando o endereço IP do computador que está executando o projeto.

Exemplo:

```text
http://IP_DO_COMPUTADOR:3000
```

O endereço IP pode variar de acordo com a rede utilizada.

## Autenticação

O sistema utiliza autenticação com JWT para controlar o acesso às áreas de paciente e funcionário.

As páginas protegidas exigem que o usuário esteja autenticado para serem acessadas.

As senhas dos pacientes são armazenadas utilizando Bcrypt.

## Objetivo do Projeto

O projeto busca aplicar na prática conhecimentos estudados no curso de Análise e Desenvolvimento de Sistemas, envolvendo desenvolvimento frontend, backend, banco de dados, autenticação e integração entre diferentes partes de uma aplicação.

## Status do Projeto

Projeto acadêmico concluído e funcional.

