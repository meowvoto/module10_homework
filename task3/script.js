const socket = new WebSocket('wss://javascript.info/article/websocket/demo/hello');
function pageLoaded() {

    const sendBtn = document.querySelector(".send-btn");
    const geolocationBtn = document.querySelector(".geolocation-btn");
    const chat = document.querySelector(".chat-window");
    const info = document.querySelector(".info");
    const input = document.querySelector(".input");

    socket.onopen = () => {
        info.innerText = "Соединение установлено"
    }
    socket.onclose = () => {
        info.innerText = "Соединение прервано"
    }

    sendBtn.addEventListener("click", sendMessage)
    geolocationBtn.addEventListener("click", showLocation)

    function sendMessage() {
        if (!input.value) return;
        socket.send(input.value);
        writeToChat(input.value, false);
        socket.onmessage = (event) => {
            writeToChat(event.data, true);
        }
        input.value === "";
    }

    function writeToChat(message, isReceived) {
        let messageHTML = `<div class="message ${isReceived? "received" : "sent"}">${message}</div>`;
        chat.innerHTML += messageHTML;
    }

    const error = () => {
        writeToChat("Произошла ошибка при определении местоположения")
    }

    const success = (data) => {
        let link = `https://www.openstreetmap.org/#map=7/${data.coords.latitude}/${data.coords.longitude}`;
        socket.send(link);
        let output = `<a href="${link}" target="_blank">Ваше местоположение</a>`
        writeToChat(output);
        console.log(link);
    }

    function showLocation() {
        if (!navigator.geolocation) {
            writeToChat("Определение местоположения не поддерживается Вашим браузером")
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }
}


document.addEventListener("DOMContentLoaded", pageLoaded);