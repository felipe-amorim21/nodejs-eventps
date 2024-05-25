# Desenvolvimento de API REST para Gerenciamento de Eventos Culturais com Node.js, Express, PostgreSQL e Prisma ORM
## Desafio back-end | Bootcamp Desenvolvimento Full Stack | Instituto Atlântico Avanti
Desenvolvimento de uma API REST para Gerenciamento de Eventos Culturais, utilizando Node.js, Express, PostgreSQL e Prisma ORM. Inclui modelagem de dados, operações CRUD, implementação de pesquisa e filtros para os usuários encontrarem eventos com base em categorias, locais e datas, além de recursos de autenticação e autorização para segurança e controle de acesso.  
<br>
**Equipe docente:**  
- **Professora:** Jheyele Raquel  
- **Facilitador**: Joeldo Olinda da Silva
<br>

___

## Documentação da API REST
A documentação fornece informações detalhadas sobre a utilização desta API REST, abrangendo suas rotas, métodos e as respostas esperadas.

***

### Guia de Configuração do Ambiente para Uso da API REST

___

#### Passo 01
Clone o repositório:  
```
https://github.com/Avanti-DFS/DFS---Atividade-02---Back-end.git
```
<br>

#### Passo 02
Instale as dependências do projeto:  
```
npm install
```
<br>

#### Passo 03
Atualize o arquivo **`.env`** na raiz do projeto, ajustando os parâmetros da variável de ambiente **`DATABASE_URL`**, que contém a URL de conexão com o banco de dados PostgreSQL, de acordo com as especificações fornecidas. Isso permitirá a correta configuração da conexão com o banco de dados.
```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```
A seguir estão os detalhes dos parâmetros que precisam ser ajustados para que a conexão com o banco de dados ocorra corretamente:  
- **`postgresql://`**: indica o tipo de banco de dados, que é o PostgreSQL.
- **`johndoe:randompassword`**: representa o nome de usuário (**`johndoe`**) e a senha (**`randompassword`**) usados para autenticar no banco de dados. Substitua-os pelo seu nome de usuário e senha do banco de dados PostgreSQL.
- **`@localhost:5432`**: especifica o host (**`localhost`**) e a porta (**`5432`**) em que o banco de dados está sendo executado. Nesse projeto, o banco de dados está sendo executado na máquina local (**`localhost`**) e usando a porta padrão do PostgreSQL (**`5432`**).
- **`mydb`**: é o nome do banco de dados ao qual deseja se conectar. Substitua-o pelo nome do banco de dados utilizado na aplicação.
- **`?schema=public`**: indica o esquema do banco de dados que será usado. Neste projeto, está sendo especificado o esquema público.  
<br>

#### Passo 04
Execute o comando **`generate`** fornecido pela ferramenta Prisma usando o **`npx`**:  
```
npx prisma generate
```
Esse comando cria automaticamente artefatos de código essenciais para o funcionamento do aplicativo, usando o Prisma.  
<br>

#### Passo 05
Execute o comando **`db push`** fornecido pela ferramenta Prisma usando o **`npx`**, para enviar as alterações feitas no esquema do banco de dados com o Prisma para o seu banco de dados real:
```
npx prisma db push
```
Isso garantirá que a estrutura do banco de dados seja atualizada de acordo com as modificações realizadas no esquema do Prisma, mantendo-os sincronizados.  
<br>

#### Passo 06
Como último passo, atualize o arquivo **`.env`** na raiz do projeto, defininindo uma chave secreta  única e forte para autenticação JWT:
```
SECRET_JWT="sua_chave_secreta_aqui"
```
Isso prevenirá ataques de força bruta e salvaguardará a segurança da autenticação JWT em sua aplicação.
<br>

___

### Endpoints da API REST

___

#### Entidade Locais:  
##### GET /locais
- **Exemplo de URL:** http://localhost:3000/locais
- **Descrição:** Retorna todos os locais armazenados no banco de dados.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### GET /locais/:id
- **Exemplo de URL:** http://localhost:3000/locais/:id
- **Descrição:** Retorna as informações de um local específico com base no seu id.
  - **Parâmetro de Requisição:** **`id`** (string): ID do local.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### POST /locais
- **Exemplo de URL:** http://localhost:3000/locais
- **Descrição:** Insere um novo local no banco de dados.
- **Corpo da requisição:** em JSON:
```json
{
    "nome": String,
    "endereco": String
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "nome": "Local A",
    "endereco": "Endereço do Local A"
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 201 (Created).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### PUT /locais/:id

- **Exemplo de URL:** http://localhost:3000/locais/:id
- **Descrição:** Atualiza o registro de um local no banco de dados a partir do seu id.
  - **Parâmetro de Requisição:** **`id`** (string): ID do local a ser atualizado.
- **Corpo da requisição:** em JSON:
```json
{
    "nome": String,
    "endereco": String
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "nome": "Local B",
    "endereco": "Novo endereço do Local B"
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### DELETE /locais/:id
- **Exemplo de URL:** http://localhost:3000/locais/:id
- **Descrição:** Exclui um local pelo seu id.
  - **Parâmetro de Requisição:** **`id`** (string): ID do local a ser excluído.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 204 (No Content).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

___

#### Entidade Categorias:  
##### GET /categorias
- **Exemplo de URL:** http://localhost:3000/categorias
- **Descrição:** Retorna todas as categorias armazenadas no banco de dados.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### GET /categoria/:id
- **Exemplo de URL:** http://localhost:3000/categoria/:id
- **Descrição:** Retorna as informações de uma categoria específica com base no seu id.
   - **Parâmetro de Requisição:** **`id`** (string): ID da categoria.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### POST /categoria
- **Exemplo de URL:** http://localhost:3000/categoria
- **Descrição:** Cria uma nova categoria no banco de dados.
- **Corpo da requisição:** em JSON:
```json
{
    "categoria": String
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "categoria": "Nome da Nova Categoria"
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 201 (Created).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### PUT /categoria/:id

- **Exemplo de URL:** http://localhost:3000/categoria/:id
- **Descrição:** Atualiza o registro de uma categoria no banco de dados a partir do seu id.
    - **Parâmetro de Requisição:** **`id`** (string): ID da categoria a ser atualizada.
- **Corpo da requisição:** em JSON:
```json
{
    "categoria": String
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "categoria": "Nome Atualizado da Categoria"
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### DELETE /categoria/:id
- **Exemplo de URL:** http://localhost:3000/categoria/:id
- **Descrição:** Exclui uma categoria pelo seu id.
  - **Parâmetro de Requisição:** **`id`** (string): ID da categoria a ser excluída.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 204 (No Content).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

___

#### Entidade Eventos:  
##### GET /eventos
- **Exemplo de URL:** http://localhost:3000/eventos
- **Descrição:** Retorna todas os eventos armazenadas no banco de dados.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### GET /evento/:id
- **Exemplo de URL:** http://localhost:3000/evento/:id
- **Descrição:** Retorna as informações de um evento específico com base no seu id.
   - **Parâmetro de Requisição:** **`id`** (string): ID do evento.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### POST /evento
- **Exemplo de URL:** http://localhost:3000/evento
- **Descrição:** Cria um novo evento no banco de dados.
- **Corpo da requisição:** em JSON:
```json
{
    "nome": String,
    "data": DateTime,
    "descricao": String,
    "categoria": String,,
    "categoria_id": String,
    "local": Local String,
    "local_id": String,
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "nome": "Evento A",
    "data": "Data do evento A",
    "descricao": "Descrição do Evento A",
    "categoria": "Categoria do Evento A" ,
    "categoria_id": "e657fd8b-2f5f-4e94-b7cc-d5846d3f0597",
    "local": "Local do Evento A",
    "local_id": "f4d11558-8c37-40e8-9eb1-82781b49e1af" 
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 201 (Created).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### PUT /eventos/:id

- **Exemplo de URL:** http://localhost:3000/evento/:id
- **Descrição:** Atualiza o registro de um evento no banco de dados a partir do seu id.
    -  **Parâmetro de Requisição:** **`id`** (string): ID do evento a ser atualizado.
- **Corpo da requisição:** em JSON:
```json
{
    "nome": String,
    "data": DateTime,
    "descricao": String,
    "categoria": String,,
    "categoria_id": String,
    "local": Local String,
    "local_id": String,
}
```
- **Exemplo de corpo da requisição:**
```json
{
    "nome": "Evento A",
    "data": "Data do evento A",
    "descricao": "Descrição do Evento A",
    "categoria": "Categoria do Evento A",
    "categoria_id": "e657fd8b-2f5f-4e94-b7cc-d5846d3f0597",
    "local": "Local do Evento A",
    "local_id": "f4d11558-8c37-40e8-9eb1-82781b49e1af" 
}
```
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

##### DELETE /eventos/:id
- **Exemplo de URL:** http://localhost:3000/evento/:id
- **Descrição:** Exclui um evento pelo seu id.
  - **Parâmetro de Requisição:** **`id`** (string): ID do evento a ser excluído.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 204 (No Content).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
<br>

___

#### Entidade Login: 
##### POST /login
- **Exemplo de URL:** http://localhost:3000/login
- **Descrição:** Autenticar um cliente e gera um token de acesso.
- **Corpo da requisição:** em JSON:

```json
{
    "email": String,
    "password": String"
}
```

- **Exemplo de corpo da requisição:**

```json
{
    "email": "example@example.com",
    "password": "senha123"
}
```

- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
    - **Corpo da resposta:** ""Client Unauthorized”"
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
- **Em caso de sucesso da solicitação:** Retorna o ID, nome do cliente e um token de acesso.
<br>

___

#### Entidade Clientes:  
##### GET /clientes

- **Exemplo de URL:** http://localhost:3000/clientes
- **Descrição:** Retorna todos os clientes ou um cliente específico, dependendo dos parâmetros fornecidos na requisição.
    - **Parâmetros de Requisição Opcionais: `clientId`** (string): ID do cliente para buscar um cliente específico.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
    - **Em caso de sucesso da solicitação:** Retorna uma lista de clientes ou um cliente específico, incluindo seu ID, nome, e-mail e se é um administrador.
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 404 (Not Found).
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).

#####  POST /cliente

- **Exemplo de URL:** http://localhost:3000/cliente
- **Descrição:** Cria uma nova categoria no banco de dados.
- **Corpo da requisição:** em JSON:

```json
{
    "nome": String,
		"email": String,
		"Password": String,
		"isAdmin": Boolean
}
```

- **Exemplo de corpo da requisição:**

```json
{
    "nome": "Nome do Cliente",
    "email": "cliente@example.com",
    "password": "senha123",
    "isAdmin": false
}
```

- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
    - **Em caso de sucesso da solicitação:** Retorna os dados do cliente recém-criado.
- **Resposta (em caso de falha):** application/json, HTTP Status 409 (Conflict) ou HTTP Status 500 (Internal Server Error).

##### PUT /cliente/:id

- **Exemplo de URL:** http://localhost:3000/cliente/:id
- **Descrição:** Atualiza um cliente existente no banco de dados a partir do seu id.
    - **Parâmetros de Requisição:** **`id`** (string): ID do cliente a ser atualizado.
- **Corpo da requisição:** em JSON:

```json
{
    "nome": String
}
```

- **Exemplo de corpo da requisição:**

```json
{
    "nome": "Novo Nome do Cliente"
}
```

- **Resposta (em caso de sucesso):** application/json, HTTP Status 200 (OK).
    - **Em caso de sucesso da solicitação:** Retorna os dados do cliente atualizado.
- **Resposta (em caso de falha):** application/json, HTTP Status 409 (Conflict) ou HTTP Status 500 (Internal Server Error).

#####  DELETE /cliente/:id

- **Exemplo de URL:** http://localhost:3000/cliente/:id
- **Descrição:** Exclui uma cliente pelo seu id.
    - **Parâmetros de Requisição:** **`id`** (string): ID do cliente a ser excluído.
- **Resposta (em caso de sucesso):** application/json, HTTP Status 204 (No Content).
- **Resposta (em caso de falha):** application/json, HTTP Status 409 (Conflict) ou HTTP Status 500 (Internal Server Error).
<br>

___

### Recurso de Pesquisa de Eventos
___
 
#### GET /eventos/search  

- **Exemplo de URL:** http://localhost:3000/evento/search
- **Descrição:** Permite buscar eventos com base em parâmetros de consulta:
    - **categoria**: ID da categoria do evento.
    - **local**: ID do local onde o evento ocorrerá.
    - **data**: Data do evento no formato YYYY-MM-DD.
- **Exemplo de Uso:** http://localhost:3000/evento/search?categoria=3&local=5&data=2024-07-08
    
    Neste exemplo a URL **`/eventos/search`** é usada para buscar eventos com base nos parâmetros de pesquisa:
    
    - **`categoria=3`**: Este é um parâmetro de consulta na URL. Os parâmetros de consulta são usados para enviar dados para o servidor através da URL. Neste caso, **`categoria=3`** indica que estamos especificando o ID da categoria do evento que queremos buscar. O valor **`3`** é o ID da categoria.
    - **`local=5`**: Este é outro parâmetro de consulta na URL. Aqui, **`local=5`** indica que estamos especificando o ID do local onde o evento ocorrerá. O valor **`2`** é o ID do local.
    - **`data=2024-07-08`**: Mais um parâmetro de consulta na URL. **`data=2024-07-08`** indica que estamos especificando a data do evento que queremos buscar. O formato **`YYYY-MM-DD`** é usado para representar a data, então **`2024-07-08`** representa o dia 10 de maio de 2024.
- **Corpo da requisição:** em JSON:
    
    ```json
    {
        "categoria": "ID da categoria do evento",
        "local": "ID do local onde o evento ocorrerá",
        "data": "Data do evento no formato YYYY-MM-DD"
    }
    ```
    
- **Exemplo de corpo da requisição:**
    
    ```json
   {
    "categoria": 3,
    "local": 5,
    "data": "2024-07-08"
    }
    ```
    
- **Resposta (em caso de sucesso):**
    
    ```json
    [
    {
        "id": 8,
        "nome": "Kill Bill Revival: Uma Dose Dupla de Ação e Vingança",
        "data": "2024-07-08",
        "descricao": "Reexibição dos Filmes Clássicos de Ação Kill Bill: Volume 1 e Kill Bill: Volume 2 de Quentin Tarantino",
        "categoria": {
            "id": 3,
            "nome": "Cinema"
        },
        "local": {
            "id": 5,
            "nome": "Cineclube Independente"
        }
    }
    
    ```
    
- **Resposta (em caso de falha):** application/json, HTTP Status 500 (Internal Server Error).
{
    "error": "Erro ao buscar eventos: <mensagem de erro>"
}
<br>

___

### Segurança e Controle de Acesso

___
 
#### Autenticação JWT Middleware

- **Descrição:** Verifica se o usuário possui um token JWT válido antes de permitir o acesso aos recursos protegidos.
- **Exemplo de Usos:**
    - **Exemplo de Uso do Token JWT -** Este exemplo demonstra como incluir o token JWT no cabeçalho da requisição para acessar recursos protegidos:
        
        Para acessar recursos protegidos, inclua o token JWT no cabeçalho da requisição da seguinte forma:
        
        ```json
        Authorization: Bearer {token}
        ```
        
        Onde **`{token}`** é o token JWT válido obtido após a autenticação.
        
    - **Exemplo de Aplicação do Middleware de Autenticação:** Este exemplo ilustra como aplicar o middleware de autenticação no código-fonte da aplicação:
        
        ```jsx
        app.use(authenticationMiddleware);
        ```

- **Em caso de sucesso da solicitação:** O acesso ao recurso protegido é permitido.
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 401 (Unauthorized).
    - **Corpo da resposta:** "Token missing!"
- **Resposta (em caso de falha):** application/json, HTTP Status 401 (Internal Server Unauthorized).
    - **Corpo da resposta:** "Invalid Token"
<br>

___

#### Autorização de Administrador Middleware

- **Descrição:** Verifica se o cliente autenticado é um administrador antes de permitir o acesso aos recursos protegidos. ****
- **Exemplo de Usos:**
    - **Exemplo de Uso do Token JWT -** Este exemplo demonstra como incluir o token JWT no cabeçalho da requisição para acessar recursos protegidos:
        
        Para acessar recursos protegidos, inclua o token JWT no cabeçalho da requisição da seguinte forma:
        
        ```json
        Authorization: Bearer {token}
        ```
        
        Onde **`{token}`** é o token JWT válido obtido após a autenticação.
        
    - **Exemplo de Aplicação do Middleware de Autenticação:** Este exemplo ilustra como aplicar o middleware de autenticação no código-fonte da aplicação:
        
        ```jsx
        app.use(adminAuthorizationMiddleware);
        ```

- **Em caso de sucesso da solicitação:** O acesso ao recurso protegido é permitido.
- **Resposta (em caso de recurso não encontrado):** application/json, HTTP Status 403 (Forbidden).
    - **Corpo da resposta:** "Forbidden”
- **Resposta (em caso de falha):** application/json, HTTP Status 401 (Internal Server Unauthorized).
    - **Corpo da resposta:** "Invalid Token"
<br>

___
