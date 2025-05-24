# 🛠️ Backend de Sistema de Chamados – Resumo Completo
## 📁 Organização de Pastas (Estrutura Sugerida)

```plaintext
src/
├── controllers/     # Funções que processam as requisições e respostas
├── middlewares/     # Funções intermediárias (ex: autenticação, validação)
├── prisma/          # Configuração e schema do Prisma (ex: client.ts, schema.prisma)
├── routes/          # Definição das rotas da API
├── services/        # Lógica de negócio reutilizável
└── utils/           # Funções auxiliares (ex: gerar token, hash de senha)
```

## 🔐 JWT (JSON Web Token)
JWT é um token que o backend gera após o login. O token serve como “crachá” digital que o frontend envia nas requisições para acessar rotas protegidas.

### Como funciona:
1. Usuário faz login → backend valida → gera JWT.
2. Frontend armazena esse token (ex: localStorage).
3. Em toda requisição protegida, o token vai no **header**:  
   `Authorization: Bearer <seu_token>`.
4. Middleware valida esse token antes de liberar o acesso.

## 🧠 Middleware
Middlewares são funções intermediárias que atuam antes do controller.  
Servem para:
- Verificar se o token JWT é válido
- Validar inputs
- Proteger rotas por tipo de usuário (admin, técnico)

## ⚙️ Controllers
Controllers são responsáveis por:
- Receber a requisição
- Validar os dados
- Chamar um service se necessário
- Retornar uma resposta

Cada rota geralmente aponta para uma função controller.

## 📦 Services
Services armazenam a **lógica de negócio**.  
Exemplos:
- Criar um chamado
- Atualizar o status
- Enviar notificação
- Atribuir técnico

## 🔁 Rotas da Aplicação

### 🔒 Autenticação
- `POST /register` → Criar usuário
- `POST /login` → Autenticar e gerar JWT

### 🙋‍♂️ Usuário Comum
- `POST /chamados` → Criar chamado
- `GET /chamados` → Listar seus chamados
- `GET /chamados/:id` → Ver detalhes

### 🧰 Técnico/Admin
- `GET /todos-chamados` → Listar todos-
- `PATCH /chamados/:id/status` → Atualizar status
- `POST /chamados/:id/comentarios` → Adicionar comentário

### 🧾 Serviços (Admin)
- `POST /servicos` → Criar serviço
- `GET /servicos` → Listar serviços
- `DELETE /servicos/:id` → Remover serviço

## 🧱 Models no Prisma (MongoDB)

### Modelos
```ts
//usuario
model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  tickets   Ticket[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

//chamados
model Ticket {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  status      Status    @relation(fields: [statusId], references: [id])
  statusId    Int
  category    Category  @relation(fields: [categoryId], references: [id])
  categoryId  Int
  user        User      @relation(fields: [userId], references: [id])
  userId      Int
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

//categoria de chamado
model Category {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  tickets Ticket[]
}

//status chamado
model Status {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  tickets Ticket[]
}

