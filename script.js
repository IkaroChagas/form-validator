let ICvalidator = {
    handleSubmit:(event)=>{
        event.preventDefault(); // Aqui utilizei a função handleSubmit para pararmos o evento de "submit" através da função preventDefault()
    
        let send = true;  
        
        let inputs = form.querySelectorAll('input');

        ICvalidator.clearErrors();

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = ICvalidator.checkInput(input); // Criei uma função checkInput() para receber o input do formulário

            if(check !== true) { // Se a checagem das informações não forem satisfeitas irá exibir um erro
                send = false; // Aqui é um bloqueio para o não envio do formulário
                ICvalidator.showError(input, check) // Aqui será exibuda a mensagem de erro
            }
        
        }

        if(send) {  // Aqui temos uma condição, se (if) eu vou enviar o formulário então dentro do meu 'if' terá o submit
            form.submit();
        }

    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
    
        if(rules !== null) { // Se o resultado de rules for diferente de null, ele irá receber o rules com o split de dois caracteres mínimos
            rules = rules.split('|')
            for(let k in rules) {
                let rDetails = rules[k].split('='); // Se o rulesDetails não achar o separador "|" ele retornará um array com uma string
                switch(rDetails[0]) { // Como inserimos a quantidade mpinima de caracteres. no switch iremos exibir a partir do número zero, pois é um indice correspondente ao nome da regra.
                    case 'required':
                        if(input.value == ''){ // Se no input de preencher as informações estiver vazio irá aparecer o erro colocando na string abaixo.
                            return 'Campo não pode está vazio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                    break;
                    case 'email':
                        if(input.value != '') { // Se o imput estiver diferente '!=' de vazio, não verificamos nada.
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) { // Em !regex.test é utilizado para verificar se o campo preenchido realmente é um e-mail, em seguida irá colocar o input totalmente em letras minusculas.
                                return 'E-mail digitado não é válido!'; // Caso não seja um e-mail de acordo com a regra, irá ser exibida essa mensagem
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#FF0000'; // cor da borda do campo de exibição do erro.

        let errorElement = document.createElement('div'); // Criei um novo elemento "div"
        errorElement.classList.add('error'); // Adicionei a class na div para a exibição do erro.
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:()=>{
        let inputs = form.querySelectorAll('input')
            for(let i=0;i<inputs.length;i++) {
                inputs[i].style= '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i=0;i<errorElements.length;i++) {
            errorElements[i].remove();
        }
        
    }

};

let form = document.querySelector('.icvalidator');

form.addEventListener('submit', ICvalidator.handleSubmit); // Aqui adicionamos o AddEventListenner que será responsável por monitorar uma ação dentro do botão 'submit'
// Em seguida adicionamos o evento de previnir a ação padrão de enviar os dados, que é a função handleSubmit()

