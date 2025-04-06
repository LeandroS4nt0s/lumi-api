
# Lumi API – Teste Técnico (Full Stack Pleno)

Este repositório contém a solução backend para o teste técnico da Lumi, desenvolvida com foco em **boas práticas, Clean Architecture, SOLID, injeção de dependência com tsyringe**, e extração inteligente de dados a partir de PDFs de faturas de energia no **Google Drive**.

- OBS: Eu poderia ter feito com NEST JS, mas achei interessante eu mesmo me desafiar a seguir uma arquitetura modular, limpa, com uma pitada de DDD e singleton.

## 🧠 Diferenciais do Projeto

- 🔍 **Extração inteligente de dados** diretamente dos PDFs.
- 🧱 **Arquitetura limpa (Clean Architecture)**: divisão clara entre camadas de domínio, aplicação e infraestrutura.
- 💉 **Injeção de dependência com tsyringe**: código desacoplado e fácil de testar.
- ✅ **Testes unitários e de integração** com Jest.
- 🌐 **Integração com Google Drive API** para leitura automática dos arquivos.
- 🛠️ **Dockerizado**: facilmente executável em qualquer ambiente.
- 📄 **TypeORM + MySQL** para persistência eficiente.
- 📦 **Facil fazer mudança de implementações**  Deixei duas implementações de banco de dados para testar (DIP), basta entrar no src/container.ts e importar o PostgresImplementation no registro de Databaseservice.

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LeandroS4nt0s/lumi-api.git
cd lumi-api
npm install
```

### 2. Configure o ambiente

> 🔐 credenciais da conta de serviço do Google  e `.env` **não está versionado** por segurança.  enviarei as credenciais e o arquivo de ambiente temporárias internamente via email.

### 3. Rode o Docker compose para subir os banco de dados

```bash
docker compose up
```

### 4. Rode o servidor

```bash
npm run start
```


## 🧪 Testes

```bash
npm  run test
```

Cobertura para:

- Extração de dados do PDF
- Repositórios e casos de uso
- Integração com Google Drive (mockada)
- Integração com o banco de dados

---

## 🔎 Endpoints disponíveis

- `GET /invoices`  
  ➤ Lista todas as faturas

- `GET /invoices?customerNumber=12345&month=2024-01`  
  ➤ Filtra faturas por cliente e mês

---

## 🗂️ Estrutura de pastas

```
src/
├── application/         ← Casos de uso
├── domain/              ← Entidades e interfaces
├── infrastructure/      ← Banco de dados e serviços externos e internos
├── presentation/        ← Rotas, Controllers e middlewares onde há um errorMiddleware que trata o erro da aplicação
├── tests/               ← Testes unitários e de integração
├── utils/               ← Pasta de funçoes ou classes uteis na aplicação, coloquei o asyncHandler.ts nela. Ele é responsavél por pegar os erros da chamada http e enivar para o middlware de erros.
├── container.ts         ← Container onde é registrado os serviços e caso de usos da aplicação.
├── server.ts            ← O servidor ;/ .
├── main.ts              ← O meu Starter da aplicação ou bootstrap como a galera chama .

```

---

## 📌 Observações finais

- O projeto foi pensado com **escalabilidade e manutenção** em mente.
- Toda a lógica de extração foi desenvolvida para funcionar em qualquer fatura dentro do padrão fornecido.
- Código organizado, padronizado e pronto para evolução.
- Dado o prazo limite de 6 dias, Pensando em uma metodologia agil como o SCRUM seria um pouco menos de uma sprint de uma semana. então, achei mais víavel não subir a API para o Render ou algum serviço de hospedagem :/
- Também achei mais viavél nao criar um .devcontainer  onde melhoraria o fluxo de desenvolvimento, assim evitando o "roda na minha maquina" rs.

---

Caso precisem de qualquer explicação adicional sobre decisões de arquitetura, estratégias adotadas ou execução do código, fico à disposição.

---

**Desenvolvido por José Leandro Santos Martins**  
👨‍💻 [LinkedIn](https://www.linkedin.com/in/leandro-santos-a23064192/) | ✉️ programadorleandrosantos@gmail.com  
