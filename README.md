# Skins Marketplace API

API para gerenciamento de um marketplace de skins de jogos com integração Steam.

## Descrição

Este projeto implementa uma API RESTful para um marketplace de skins com as seguintes funcionalidades:
- CRUD completo para usuários
- CRUD completo para skins
- Sistema de compra de skins
- Integração com o inventário Steam

## Tecnologias utilizadas

- NestJS (Framework Node.js)
- TypeORM
- MySQL (via Docker)
- Axios (para integração com a API da Steam)

## Configuração do projeto

```bash
# Instalar dependências
$ npm install

# Iniciar o banco de dados MySQL com Docker
$ docker-compose up -d
```

## Executar o projeto

```bash
# Modo de desenvolvimento
$ npm run start:dev

# Modo de produção
$ npm run start:prod
```

A API estará disponível em: http://localhost:3000/api

## Endpoints da API

### Usuários

- `POST /api/users` - Criar um usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter um usuário específico
- `PATCH /api/users/:id/adicionar-saldo` - Adicionar saldo a um usuário
- `PUT /api/users/:id` - Atualizar um usuário
- `DELETE /api/users/:id` - Excluir um usuário

### Skins

- `POST /api/skins` - Criar uma skin
- `GET /api/skins` - Listar todas as skins
- `GET /api/skins/:id` - Obter uma skin específica
- `POST /api/skins/:id/comprar` - Comprar uma skin
- `PUT /api/skins/:id` - Atualizar uma skin
- `DELETE /api/skins/:id` - Excluir uma skin

### Steam

- `GET /api/steam/inventory/value/:steamId` - Obter o valor do inventário Steam

## Exemplos de uso

### Criar um usuário

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"nick": "jogador1", "saldo": 1000, "steamId": "76561198123456789"}'
```

### Comprar uma skin

```bash
curl -X POST http://localhost:3000/api/skins/1/comprar \
  -H "Content-Type: application/json" \
  -d '{"userId": 1}'
```

## Modelos de dados

### User (Usuário)

```typescript
{
  id: number;
  nick: string;
  saldo: number;
  steamId: string;
  skins: Skin[];
  createdAt: Date;
}
```

### Skin

```typescript
{
  id: number;
  nome: string;
  tipo: string;
  valor: number;
  dono: User;
  createdAt: Date;
}
```
