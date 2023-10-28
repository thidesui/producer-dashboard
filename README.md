## Rodando o projeto

Primeiro, instale as dependências:

```bash
npm i
#ou
npm install
```

Depois, rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Projeto hospedado
Front-end hospedado no firebase: [https://producer-dashboard.web.app/](https://producer-dashboard.web.app/)<br>
(Url alternativa): [https://producer-dashboard.firebaseapp.com/](https://producer-dashboard.firebaseapp.com/)<br>
BFF (jsonServer) hospedado no firebase functions: [https://bffjsonserver-z37l2ehg4q-uc.a.run.app/producers/](https://bffjsonserver-z37l2ehg4q-uc.a.run.app/producers/)

## Detalhamento do projeto

### Página Dashboard
- Lista de produtores 
  - Botões de criar novo, editar e deletar
- Estatísticas 
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
- Gráficos
  - Gráfico de pizza por estado.
  - Gráfico de pizza por cultura.
  - Gráfico de pizza por uso de solo (Área agricultável e vegetação)  

### Página Criar produtor
 Cadastro com os seguintes campos (todos obrigatórios):
  - CPF ou CNPJ
    - Validação de CPF e de CNPJ
    - Formatação de CPF e CNPJ
  - Nome do produtor
  - Nome da Fazenda
  - Cidade
  - Estado
  - Área total em hectares da fazenda
    - Validação de que os dois campos seguintes somados não ultrapassem o valor total
  - Área agricultável em hectares
  - Área de vegetação em hectares
  - Culturas plantadas (multi-select)
    - Soja
    - Milho
    - Algodão
    - Café
    - Cana de Açucar

### Página Editar produtor
Possui os mesmos campos de [criação](#Criar-produtor), porém vêm com o formulário já preenchido.

### [BFF](/functions)
Foi utilizado a biblioteca [JSONServer](https://www.npmjs.com/package/json-server) para a sua criação e hospedado no Firebase Functions de forma gratuita.
