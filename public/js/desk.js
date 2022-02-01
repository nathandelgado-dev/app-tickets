const lblNameDesk = document.getElementById('name-desk');
const btn = document.getElementById('btn');
const lblTicketAtended = document.getElementById('ticket-attended');
const lblAlert = document.getElementById('alert');
const lblInWaiting = document.getElementById('lblInWaiting');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('The desk is required');
}

const desk = searchParams.get('desk');
lblNameDesk.innerText = desk;

lblAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btn.disabled = false;

});

socket.on('disconnect', () => {
    btn.disabled = true;
});

socket.on('tickets-in-waiting', (inWaiting) => {
    if (!inWaiting) lblInWaiting.innerText = '0';

    lblInWaiting.innerText = inWaiting;
});

btn.addEventListener('click', () => {
    socket.emit('attend-ticket', { desk }, ({ ok, msg, ticket }) => {
        if (!ok) {
            lblTicketAtended.innerText = 'not avalible';
            lblAlert.style.display = '';
            return lblAlert.innerText = msg;
        }

        lblTicketAtended.innerText = 'Ticket ' + ticket.number;
    });
    // socket.emit('next-ticket', null, (ticket) => {
    //     lblNewTicket.innerText = ticket;
    // });
});