const lblTicket1 = document.getElementById('lblTicket1');
const lblDesk1 = document.getElementById('lblDesk1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblDesk2 = document.getElementById('lblDesk2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblDesk3 = document.getElementById('lblDesk3');
const lblTicket4 = document.getElementById('lblTicket4');
const lblDesk4 = document.getElementById('lblDesk4');


const socket = io();

socket.on('state-last-four', (tickets) => {
    const [tick1, tick2, tick3, tick4] = tickets;

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    if (tick1) {
        lblTicket1.innerText = 'Ticket ' + tick1.number;
        lblDesk1.innerText = tick1.desk;
    }
    if (tick2) {
        lblTicket2.innerText = 'Ticket ' + tick2.number;
        lblDesk2.innerText = tick2.desk;
    }
    if (tick3) {
        lblTicket3.innerText = 'Ticket ' + tick3.number;
        lblDesk3.innerText = tick3.desk;
    }
    if (tick4) {
        lblTicket4.innerText = 'Ticket ' + tick4.number;
        lblDesk4.innerText = tick4.desk;
    }
});