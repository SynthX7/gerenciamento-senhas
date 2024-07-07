// Importa os módulos necessários
const input = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const crypto = require('crypto');

// Chave secreta para criptografia (substitua por uma chave mais segura em produção)
const chaveCriptografia = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); // Vetor de inicialização (IV) para criptografia

// Nome do arquivo que contém a senha
const arquivo = 'senha.txt';

// Função para limpar o terminal
function clear() {
    process.stdout.write('\x1Bc');
}

// Função para criptografar o texto
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', chaveCriptografia, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Função para descriptografar o texto
function decrypt(encryptedText) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', chaveCriptografia, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Função para exibir o menu inicial e obter a ação do usuário
function inicio() {
    clear();
    console.log("Bem vindo ao programa");
    console.log("Digite o que quer fazer:");
    console.log("1. Entrar");
    console.log("2. Apagar senha");
    console.log("3. Mudar senha\n");

    let acao = parseInt(input("Digite: "));
    while (![1, 2, 3].includes(acao)) {
        console.error(`Opção inválida: ${acao}`);
        console.log("Tente novamente");
        acao = parseInt(input("Digite: "));
    }

    return acao;
}

// Função para apagar a senha do arquivo
function apagarSenha() {
    console.log("Deseja realmente apagar a senha? Esta ação é irreversível (s/n)");
    let escolha = input("Digite: ");
    if (escolha.toLowerCase() === "s") {
        console.log("Apagando...");
        fs.writeFile(arquivo, "", "utf-8", (err) => {
            if (err) {
                console.error(`Erro ao apagar a senha: ${err}`);
            } else {
                console.log("Senha apagada com sucesso.");
                reiniciarPrograma();
            }
        });
    } else {
        console.log("Operação cancelada. Voltando ao menu principal.");
        iniciarPrograma();
    }
}

// Função para mudar a senha no arquivo
function mudarSenha(data) {
    if (data === "") {
        let novaSenha = input("Digite a nova senha: ");
        fs.writeFileSync(arquivo, encrypt(novaSenha), "utf-8");
        console.log("Nova senha salva com sucesso.");
        reiniciarPrograma();
    } else {
        let senhaAntiga = input("Digite a senha antiga: ");
        while (decrypt(data) !== senhaAntiga) {
            console.error("Senha incorreta, tente novamente");
            senhaAntiga = input("Digite a senha antiga: ");
        }
        let novaSenha = input("Digite a nova senha: ");
        fs.writeFileSync(arquivo, encrypt(novaSenha), "utf-8");
        console.log("Nova senha salva com sucesso.");
        reiniciarPrograma();
    }
}

// Função para autenticar o usuário no programa
function entrarPrograma(data) {
    if (data === "") {
        console.log("Bem vindo ao programa.");
    } else {
        let senha = input("Digite a senha: ");
        while (decrypt(data) !== senha) {
            console.error("Senha incorreta, tente novamente");
            senha = input("Digite a senha: ");
        }
        console.log("Bem vindo ao programa.");
    }
}

// Função principal que chama outras funções com base na ação do usuário
function programa(acao, data) {
    switch (acao) {
        case 1:
            entrarPrograma(data);
            break;
        case 2:
            apagarSenha();
            break;
        case 3:
            mudarSenha(data);
            break;
        default:
            console.error(`Ação ${acao} não reconhecida.`);
            break;
    }
}

// Função para iniciar o programa
function iniciarPrograma() {
    fs.readFile(arquivo, 'utf-8', (err, data) => {
        if (err) {
            console.error(`Erro ao ler o arquivo ${arquivo}: ${err}`);
            data = "";
        }
        let acao = inicio();
        programa(acao, data);
    });
}

// Função para reiniciar o programa
function reiniciarPrograma() {
    console.log('Deseja reiniciar o programa? (s/n)');
    let rspst = input('Digite: ');
    if (rspst.toLowerCase() === 's') {
        iniciarPrograma();
    } else {
        console.log('Programa encerrado.');
        process.exit(0);
    }
}

// Inicia o programa pela primeira vez
iniciarPrograma();
