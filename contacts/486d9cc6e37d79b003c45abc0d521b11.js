const uPar1 = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbQ==');
const uPar2 = atob('L21hY3Jvcw==');
const uPar3 = atob('L3Mv');
const uPar4 = atob('QUtmeWNieldobk9RWERKYmx4dGxHV1c2ZkNRNjI=');
const uPar5 = atob('X1JDdkZZTDZMUEdjLWV3VFk=');
const uPar6 = atob('X0NiTU1kYmVKSlg4TFdEeTQ=');
const uPar7 = atob('X3h0eEFybVlm');
const uPar8 = atob('L2V4ZWM=');

// let uPd = uPar1 + uPar2 + uPar3 + uPar4 + uPar5 + uPar6 + uPar7 + uPar8;

const scriptURL = uPar1 + uPar2 + uPar3 + uPar4 + uPar5 + uPar6 + uPar7 + uPar8;
const form = document.forms['contact-form'];

document.getElementById('date').value = new Date().toLocaleDateString();

const submitBtn = document.getElementById('formButton');

const html = `<p class="formSending"><img draggable="false" width="20" src="../images/loading.gif">Sending...</p>`;

const errorMessage = '<p style="background: red; color: #fff; padding: 10px;">There is an error. <br>Please try to reload page.<br>If the error continues to appear, try sending the message later.</p>';

function errorMsg(error) {
    const formSendingElem = document.querySelector('.formSending');
    formSendingElem.remove();
    form.insertAdjacentHTML('beforeend', errorMessage);
    console.error('Error!', error.message);
}

const elementFormSent = document.createElement('p');
elementFormSent.classList.add("formSent");
let textFormSentEN = "Your message was sent successfully!<br>I'll answer as soon as possible.";
let textFormSentRU = "Ваше сообщение успешно отправлено!<br>Я отвечу как можно скорее.";
let textFormSentUA = "Ваше повідомлення успішно надіслано!<br>Я відповім якомога швидше.";

let currentPath = location.pathname;
let message = textFormSentEN; // default use english

if (currentPath === "/contacts/index.html" || currentPath === "/contacts/" || currentPath === "/") {
    message = textFormSentRU;
} else if (currentPath === "/contacts/ua.html" || currentPath === "/ua.html") {
    message = textFormSentUA;
} else if (currentPath === "/contacts/en.html" || currentPath === "/en.html") {
    message = textFormSentEN;
}

elementFormSent.innerHTML = message;

if (currentPath === "/" || currentPath === "/index.html" || currentPath === "/en.html" || currentPath === "/ua.html") {
    const contactModal = document.getElementById('contactModal');
    contactModal.addEventListener('hidden.bs.modal', function () {
        form.reset();
        elementFormSent.innerText = '';
        elementFormSent.style.background = 'transparent';
    });
}


function successMessage() {
    const formSendingElem = document.querySelector('.formSending');
    formSendingElem.remove();
    elementFormSent.innerHTML = message;
    elementFormSent.style.background = 'darkslateblue';

    return removeSuccessMessage();
}

function removeSuccessMessage() {
    if (elementFormSent) {
        form.append(elementFormSent);
    }
    setTimeout(() => {
        submitBtn.removeAttribute("disabled");
    }, 5000);
}

form.addEventListener('submit', e => {
    e.preventDefault()
    submitBtn.setAttribute("disabled", "");
    if (elementFormSent) {
        elementFormSent.remove();
    }
    form.insertAdjacentHTML('beforeend', html);

    document.getElementById('date').value = new Date().toLocaleDateString();

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
    })
        .then(response => successMessage())
        .catch(error => errorMsg(error))

    // mode: 'no-cors'
    // .then(response => console.log('Success!', response))
    // .catch(error => console.error('Error!', error.message))
});
