# Tickets App
An application to manage a queue of tickets. It has been developed with [Socket.io](https://socket.io/).

Don't forget to install the project dependencies ``npm install ``.

Tickets are currently being saved to a .json file but this could be migrated to a database.
This is the format of the .json file:
```
{
    "last": 0,
    "today": 0,
    "tickets": [],
    "lastFour": []
}

```