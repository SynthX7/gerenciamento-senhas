se# Documentação do Projeto: Sistema de Gerenciamento de Senhas
## Descrição do Projeto
### Este projeto é um sistema simples de gerenciamento de senhas desenvolvido em Node.js. Ele permite aos usuários realizar três operações principais:

- Entrar no programa após inserir a senha correta.
- Apagar a senha existente (ação irreversível).
- Mudar a senha, mediante a inserção da senha antiga para validação.
- O sistema utiliza criptografia AES-256-CBC para proteger a senha armazenada no arquivo senha.txt.

## Estrutura do Projeto
- senha.js: Arquivo principal que contém toda a lógica do programa.
- senha.txt: Arquivo onde a senha criptografada é armazenada.

## Pré-requisitos
- Node.js instalado (versão 22 ou superior).
- Módulo prompt-sync instalado para entrada de dados no terminal.
- Módulo crypto nativo do Node.js para operações de criptografia.
  
# Instalação
- Certifique-se de ter o Node.js instalado em sua máquina. Se não tiver, baixe e instale do site oficial do Node.js.

- Clone este repositório ou copie os arquivos necessários para um diretório de sua escolha.

- Navegue até o diretório do projeto no terminal:

```
cd /caminho/para/o/diretorio/do/projeto
```

Instale o módulo prompt-sync:

```
npm install prompt-sync
```

## Uso
Abra o terminal e navegue até o diretório onde o projeto está localizado.

Execute o arquivo principal senha.js usando Node.js:

```
node senha.js
```

Você verá o menu principal com as seguintes opções:

```
Bem vindo ao programa
Digite o que quer fazer:
1. Entrar
2. Apagar senha
3. Mudar senha
```

Digite a opção desejada e siga as instruções exibidas no terminal.

## Notas
- Segurança: A chave de criptografia é gerada aleatoriamente a cada execução. Em um ambiente de produção, você deve usar uma chave fixa segura, armazenada de maneira segura (por exemplo, em variáveis de ambiente).
- Testes: Teste o programa para garantir que a criptografia e a descriptografia estão funcionando corretamente. Se necessário, ajuste a chave e o IV para garantir a compatibilidade.
- Aviso: Não use esse programa para guardar informações sensíveis e importantes, pois ele é apenas um teste. Não me responsabilizo por quaisquer danos causados.
