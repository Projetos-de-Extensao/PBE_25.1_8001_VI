document.addEventListener('DOMContentLoaded', () => {

// Defina a URL base da sua API aqui
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Seleciona os elementos do formulário
const form = document.getElementById('registration-form');
const cpfInput = document.getElementById('cpf');
const cpfFeedback = document.getElementById('cpf-feedback');
const submitButton = document.getElementById('submit-button');

// Estado para controlar a validação do CPF
let isCpfVerifiedAndAvailable = false;

/**

Função para verificar a disponibilidade do CPF em tempo real

Faz uma requisição GET para o endpoint /verificar-cpf/
*/
const checkCpfAvailability = async () => {
const cpf = cpfInput.value.replace(/\D/g, ''); // Remove qualquer formatação
cpfFeedback.textContent = '';
cpfFeedback.className = 'feedback';
isCpfVerifiedAndAvailable = false;
submitButton.disabled = true;

if (cpf.length !== 11) {
cpfFeedback.textContent = 'O CPF precisa ter 11 dígitos.';
cpfFeedback.classList.add('error');
return;
}

try {
cpfFeedback.textContent = 'Verificando CPF...';
const response = await fetch(`${API_BASE_URL}/verificar-cpf/?cpf=${cpf}`);

 if (!response.ok) {
     throw new Error('Falha ao comunicar com o servidor.');
 }

 const data = await response.json();

 if (data.cpf_cadastrado) {
     cpfFeedback.textContent = 'Este CPF já está em uso.';
     cpfFeedback.classList.add('error');
 } else {
     cpfFeedback.textContent = 'CPF disponível para cadastro!';
     cpfFeedback.classList.add('success');
     isCpfVerifiedAndAvailable = true;
     submitButton.disabled = false; // Habilita o botão para submissão
 }
} catch (error) {
console.error('Erro ao verificar CPF:', error);
cpfFeedback.textContent = 'Não foi possível verificar o CPF no momento.';
cpfFeedback.classList.add('error');
}
};

/**

Função para registrar o novo usuário

Faz uma requisição POST para o endpoint /registrar/
*/
const handleRegistration = async (event) => {
event.preventDefault(); // Impede o comportamento padrão de submissão

if (!isCpfVerifiedAndAvailable) {
alert('Por favor, verifique se o CPF está correto e disponível para uso.');
cpfInput.focus();
return;
}

submitButton.disabled = true;
submitButton.textContent = 'Registrando...';

// Coleta os dados do formulário
const formData = new FormData(form);
const userData = {
nome: formData.get('nome'),
cpf: formData.get('cpf').replace(/\D/g, ''),
data_nascimento: formData.get('data_nascimento'),
email: formData.get('email'),
password: formData.get('password'),
};

 try {
            // CORREÇÃO: A URL agora usa crases (`) para funcionar corretamente com a variável.
            const response = await fetch(`${API_BASE_URL}/registrar/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

 const data = await response.json();

 if (!response.ok) {
     // Monta uma mensagem de erro detalhada a partir da resposta da API
     let errorMessage = 'Falha no registro:\n';
     for (const field in data) {
         errorMessage += `\n- ${field}: ${data[field].join ? data[field].join(', ') : data[field]}`;
     }
     throw new Error(errorMessage);
 }

 // Se o registro for bem-sucedido
 alert(data.message || 'Conta criada com sucesso! Você será redirecionado para a página de login.');
 window.location.href = 'login.html'; // Altere para a sua página de login
} catch (error) {
console.error('Erro ao registrar:', error);
alert(error.message);
// Reabilita o botão em caso de erro para que o usuário possa tentar novamente
submitButton.disabled = false;
submitButton.textContent = 'Criar Conta';
}
};

// Adiciona os "escutadores" de eventos aos elementos
cpfInput.addEventListener('blur', checkCpfAvailability); // Verifica o CPF quando o usuário sai do campo
form.addEventListener('submit', handleRegistration);


});
