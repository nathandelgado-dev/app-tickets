const newTicket = document.getElementById('lblNewTicket');
const btn = document.getElementById('btn');

const socket = io();

socket.on('connect', () => {
    btn.disabled = false;
});

socket.on('disconnect', () => {
    btn.disabled = true;
});

socket.on('last-ticket', (last) => {
    lblNewTicket.innerText = 'Ticket: ' + last;
});

btn.addEventListener('click', () => {

    socket.emit('next-ticket', null, (ticket) => {
        lblNewTicket.innerText = ticket;
    });
});