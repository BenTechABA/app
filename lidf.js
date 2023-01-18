const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const message1 = document.getElementById('message');
const email = document.getElementById('email');

Email.send({
    Host: 'smtp.mailtrap.io',
    Username:'',
    Password:'',
    To: 'benaiah.abolaji@gmail.com',
    From : `${email.value}`,
    Subject: 'message',
    Body: `${message1.value}`
}).then(
    message => alert(message)
);

