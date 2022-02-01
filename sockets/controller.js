const TicketControl = require('../models/TicketControl');

const ticketControl = new TicketControl();


const socketController = (socket) => {
    socket.emit('state-last-four', ticketControl.lastFour);
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('tickets-in-waiting', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callbackResp) => {

        const next = ticketControl.nextTicket();
        callbackResp(next);
        socket.broadcast.emit('tickets-in-waiting', ticketControl.tickets.length);

    });

    socket.on('attend-ticket', ({ desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: 'The desk is requiered'
            });
        }

        const ticket = ticketControl.attendTicket(desk);

        socket.broadcast.emit('state-last-four', ticketControl.lastFour);
        socket.emit('tickets-in-waiting', ticketControl.tickets.length);
        socket.broadcast.emit('tickets-in-waiting', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'Not pending tickets'
            })
        }
        callback({
            ok: true,
            ticket
        })
    });
}

module.exports = {
    socketController
}