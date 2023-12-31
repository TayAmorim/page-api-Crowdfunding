<h1 align="center">
   <p>🔨🚧 API da Página de Crowdfunding - Em construção  🚧🔨</p>
</h1>

## Projeto

Bem-vindo à documentação da API da Página de Crowdfunding! Esta API fornece os endpoints necessários para gerenciar o backend da página de crowdfunding, permitindo o processamento de promessas de financiamento, acompanhamento do progresso do projeto e controle de configurações adicionais.

## Modelagem do banco de Dados

![Modelagem banco de dados](./src/assets/modelagem.png)

## Endpoints

### 1. Listar informações do produto

Retorna uma lista com todos os produtos de financiamento cadastrado no banco de dados.

- **URL:** /produto/:idProduto
- **Método:** GET
- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Exemplo de Corpo:**
  ```json
  {
    "id": 1,
    "nome": "MasterCraft Bamboo Monitor Riser",
    "data_limite": "2024-04-26T15:30:45.000Z",
    "status": true,
    "meta_valor": 10000000,
    "valor_arrecadado": 4000,
    "total_apoios": 2
  }
  ```

### 2. Listar Todas os Planos

Retorna uma lista com todos os planos de financiamento cadastrado no banco de dados.

- **URL:** /planos
- **Método:** GET
- **Resposta de Sucesso:**

  - **Código:** 200 OK
  - **Exemplo de Corpo:**

  ```json
  [
    {
      "id": 1,
      "nome": "Mahogany Special Edition",
      "status": false,
      "quantidade": 0,
      "id_produto": 1,
      "valor_minimo": 20000
    },
    {
      "id": 2,
      "nome": "Black Edition Stand",
      "status": true,
      "quantidade": 229,
      "id_produto": 1,
      "valor_minimo": 7500
    },
    {
      "id": 6,
      "nome": "withoutReward",
      "status": true,
      "quantidade": null,
      "id_produto": 1,
      "valor_minimo": null
    },
    {
      "id": 3,
      "nome": "Bamboo Stand",
      "status": true,
      "quantidade": 297,
      "id_produto": 1,
      "valor_minimo": 2500
    }
  ]
  ```

### 3. Fazer uma Nova Promessa

Permite que um usuário faça uma nova promessa de financiamento.

- **URL:** "/apoio"
- **Método:** POST
- **Corpo da Requisição:**
  - **Exemplo:**
  ```json
  {
    "id_plano": 1,
    "valor": 7500
  }
  ```
  - **Observações:** Os campos id_plano e valor são obrigatórios e o valor precisa ser passado como string em formato de centavos
- **Resposta de Sucesso:**
  - **Código:** 201 Created
  - **Exemplo de Corpo:**
  ```json
  "Apoio realizado com sucesso"
  ```

## Erros Comuns

- Código: 400 Bad Request
  Descrição: Requisição inválida ou parâmetros ausentes.

- Código: 404 Not Found
  Descrição: Recurso não encontrado na API.

- Código: 500 Internal Server Error
  Descrição: Erro interno no servidor.

## Considerações Finais

A API da Página de Crowdfunding foi desenvolvida para fornecer uma comunicação eficiente entre o frontend e o backend da página.
