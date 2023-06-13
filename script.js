class Chatbot{
    constructor(){
        this.chatAnswer = {
            greeting: ["Olá! Eu sou um chatbot de recomendação de filmes. Me chamo CineAmigo. Como posso ajudar você?"],
            farewell: ["Adeus!", "Tchau!", "Até mais!", "Até a próxima!"],
            noUnderstand: ["Desculpe, não entendi. Poderia reformular a pergunta?"],
            movies: {
                action: ["John Wick 4: Baba Yaga", "Kingsman: Serviço Secreto", "Os Mercenários", "Clube da Luta"],
                romance: ["Encontro Marcado", "Como eu era antes de você?", "Close: Perto demais", "O Fantasma da Opera"],
                adventure: ["Alice no País das Maravilhas", "Rango", "Procurando Nemo", "Shrek"],
                horror: ["Pânico", "Telefone Preto", "Rua do Medo", "It: A Coisa"],
                comedy: ["Amor a toda prova", "Todo Mundo em Pânico", "Quero Matar meu chefe", "Se Beber não Case"],
                fiction: ["Mad Max: Estrada da Fúria", "Blade Runner 2049", "Exterminador do Futuro", "Star Wars"],
            }
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
        else if (question.includes("filme") && question.includes("ação")) {
            return this.generateAnswer(this.chatAnswer.movies.action);
        }
        else if (question.includes("filme") && question.includes("romance")) {
            return this.generateAnswer(this.chatAnswer.movies.romance);
        }
        else if (question.includes("filme") && question.includes("aventura")) {
            return this.generateAnswer(this.chatAnswer.movies.adventure);
        }
        else if (question.includes("filme") && question.includes("terror")) {
            return this.generateAnswer(this.chatAnswer.movies.horror);
        }
        else if (question.includes("filme") && question.includes("comédia")) {
            return this.generateAnswer(this.chatAnswer.movies.comedy);
        }
        else if (question.includes("filme") && question.includes("ficção científica")) {
            return this.generateAnswer(this.chatAnswer.movies.fiction);
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

    // Este método serve para interagir com o chat no NodeJs
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
}