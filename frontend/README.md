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

### 1. Backend

Abra o terminal na pasta `backend`:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Depois execute o servidor:

```bash
npm run dev
```

O backend será executado na porta:

```text
http://localhost:5000
```

### 2. Frontend

Abra outro terminal e entre na pasta `frontend`:

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

## Banco de Dados

Para utilizar o sistema, é necessário ter o MySQL instalado e configurar o banco de dados utilizado pelo projeto.

As tabelas principais são:

```text
paciente
funcionario
medico
horario
consulta
```

## Autenticação

O sistema utiliza autenticação com JWT para controlar o acesso às áreas de paciente e funcionário.

As páginas protegidas exigem que o usuário esteja autenticado para serem acessadas.

## Objetivo do Projeto

O projeto busca aplicar na prática conhecimentos estudados no curso de Análise e Desenvolvimento de Sistemas, envolvendo desenvolvimento frontend, backend, banco de dados, autenticação e integração entre diferentes partes de uma aplicação.

## Status do Projeto

Projeto acadêmico concluído e funcional.
