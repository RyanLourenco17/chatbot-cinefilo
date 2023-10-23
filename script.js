class Chatbot{
    constructor(){
        this.chatAnswer = {
            greeting: ["Olá! Eu sou um chatbot de recomendação de filmes. Me chamo CineAmigo. Como posso ajudar você?"],
            farewell: ["Adeus!", "Tchau!", "Até mais!", "Até a próxima!"],
            noUnderstand: ["Desculpe, não entendi. Meus comandos são limitados. Tente formular uma frase que contenha a palavra 'filme' e/ou 'gênero'."],
            preference: ["Qual gênero de filme você prefere?", "Escolha um gênero", "Gostaria de saber que gênero te agrada?"], 
            movies: {
                action: ["John Wick 4: Baba Yaga", "Kingsman: Serviço Secreto", "Os Mercenários", "Agente Oculto", "Kick Ass 2", "The Batman", "Blade - O Caçador de Vampiros"],
                romance: ["Encontro Marcado", "Como eu era antes de você?", "Close: Perto demais", "O Fantasma da Opera", "Uma Segunda Chance para Amar", "Cidade dos Anjos", "Ghost - Do Outro Lado da Vida"],
                adventure: ["Alice no País das Maravilhas", "Rango", "Procurando Nemo", "Shrek", "Dungeons & Dragons: Honra Entre Rebeldes", "Gato de Botas 2: O Último Pedido", "Avatar: O Caminho da Água"],
                horror: ["Pânico", "Telefone Preto", "Rua do Medo", "It: A Coisa", "Hereditário", "Cemitério Maldito", "Terror em Silent Hill"],
                comedy: ["Amor a toda prova", "Todo Mundo em Pânico", "Quero Matar meu chefe", "Se Beber não Case", "Máldita Sorte", "A Verdade Nua e Crua", "Sombras da Noite"],
                fiction: ["Mad Max: Estrada da Fúria", "Blade Runner 2049", "Exterminador do Futuro", "Duna", "Matrix", "o Preço do Amanhã", "Tron - O Legado"],
                drama: ["O Poderoso Chefão", "Cidadão Kane", "Clube da Luta", "Interestelar", "A Forma da Água", "Drácula de Bram Stoker", "Parasita"],
                documentary: ["Professor Polvo", "A 13ª Emenda", "O Golpista do Tinder", "O Dilema das Redes", "O Mistério de Marilyn Monroe", "The Deepest Breath"],
                thriller: ["A Garota da Capa Vermelha", "Efeito borboleta", "Corra", "Cisne Negro", "A Lenda do Cavaleiro sem cabeça", "O Silêncio dos Inocentes", "Pulp Fiction: Tempo de Violência"]
            }
        }
    }

    enter(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    generateAnswer(chatAnswer) {
        const indice = Math.floor(Math.random() * chatAnswer.length);
        return chatAnswer[indice];
    }
      
    processQuestion(question){
        const lowerCaseQuestion = question.toLowerCase();

        if(lowerCaseQuestion.match(/^(olá|oi|bom dia|boa tarde|boa noite)/)){
            return this.generateAnswer(this.chatAnswer.greeting);
        }
        
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("ação") || lowerCaseQuestion.match("ação")) {
            return this.generateAnswer(this.chatAnswer.movies.action);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("romance") || lowerCaseQuestion.match("romance")) {
            return this.generateAnswer(this.chatAnswer.movies.romance);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("aventura") || lowerCaseQuestion.match("aventura")) {
            return this.generateAnswer(this.chatAnswer.movies.adventure);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("terror") || lowerCaseQuestion.match("terror")) {
            return this.generateAnswer(this.chatAnswer.movies.horror);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("comédia") || lowerCaseQuestion.match("comédia")) {
            return this.generateAnswer(this.chatAnswer.movies.comedy);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("ficção científica") || lowerCaseQuestion.match("ficção científica")) {
            return this.generateAnswer(this.chatAnswer.movies.fiction);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("drama") || lowerCaseQuestion.match("drama")) {
            return this.generateAnswer(this.chatAnswer.movies.drama);
        }
        else if (lowerCaseQuestion.match("filme") && lowerCaseQuestion.match("documentário") || lowerCaseQuestion.match("documentário")) {
            return this.generateAnswer(this.chatAnswer.movies.documentary);
        }
        else if (lowerCaseQuestion.match("filme")) {
            return this.generateAnswer(this.chatAnswer.preference);
        }
        else if(lowerCaseQuestion.match(/^(adeus|tchau)/)){
            return this.generateAnswer(this.chatAnswer.farewell);
        }
        else{
            return this.generateAnswer(this.chatAnswer.noUnderstand);
        }
    }

    // Este método serve para interagir com o chat no navegador
    sendMessage(){
        const chat = document.querySelector(".outputChat");
        const userInput = document.getElementById("userInput").value;
        const userQuestion = document.createElement("p");
        userQuestion.textContent = userInput;
        userQuestion.className = "userQuestion"
        document.getElementById("userInput").value = "";
        chat.appendChild(userQuestion);

        setTimeout(() => {
            const botResponse = document.createElement("p");
            botResponse.textContent = this.processQuestion(userInput);
            botResponse.className = "bot";
            chat.appendChild(botResponse);
        }, 800);
    }

    // Este método serve para interagir com o chat no terminal
    terminalNodeJs(){
        const readline = require("readline");
        const readingInterface = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        readingInterface.question("Digite sua pergunta: ", (question) =>{
            const answer = chatbot.processQuestion(question)
            console.log(answer);
            if(!chatbot.chatAnswer.farewell.includes(answer)){
                this.terminalNodeJs();
            }else{
                readingInterface.close()
            }
        })
    };
}

const chatbot = new Chatbot();
if (typeof window === 'undefined') {
    chatbot.terminalNodeJs();
}else {
    document.getElementById("btnSend").addEventListener('click', () => {
        chatbot.sendMessage();
    });

    document.getElementById("userInput").addEventListener('keyup', (event) => {
        chatbot.enter(event);
    });

}