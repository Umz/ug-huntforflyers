
/**
 * ADD a new stat to the UI display (image and text)
 * @param {*} id Unique ID of the text <div>
 * @param {*} src Image src
 * @param {*} val Text to display in <div>
 */
function addUIStat(id, src, val) {

    let uiHolder = document.getElementById('hud-stats');

    let flexDiv = document.createElement('div');
    //flexDiv.classList.add('flex-box');
    flexDiv.classList.add('hud-stat-row');

    let imageDiv = document.createElement('div');
    let image = document.createElement('img');

    imageDiv.classList.add('stat-col-image');
    image.classList.add('stat-image');
    image.setAttribute('src', src);
    image.setAttribute('alt', 'UI Stat Ranking');

    let textDiv = document.createElement('div');
    textDiv.innerText = val;
    textDiv.classList.add('stat-col-text');
    textDiv.setAttribute('id', id);

    imageDiv.appendChild(image);
    flexDiv.appendChild(imageDiv);
    flexDiv.appendChild(textDiv);
    uiHolder.appendChild(flexDiv);
}

function addChatMessage(speaker, message, cssClass) {

    const box = document.getElementById('chatbox-container');

    let chatDiv = document.createElement('div');
    let speakerDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    chatDiv.setAttribute('class', 'chat-row fade-in');
    chatDiv.classList.add(cssClass);

    speakerDiv.setAttribute('class', 'chat-col-speaker');
    messageDiv.setAttribute('class', 'chat-col-message');

    speakerDiv.innerText = speaker;
    messageDiv.innerText = message;

    chatDiv.appendChild(speakerDiv);
    chatDiv.appendChild(messageDiv);
    box.appendChild(chatDiv);

    box.scrollTop = box.scrollHeight;
}

function selectedMenuElementAction(className) {
    let active = document.getElementsByClassName(className)[0];
    active.clickAction();
}

function selectMenuElement(event) {
    let className = "title-menu-selected";
    let active = document.getElementsByClassName(className)[0];
    active.classList.remove(className);
    this.classList.add(className);
}

function moveMenuElement(className, dir = 1) {

    let activeElement = document.getElementsByClassName(className)[0];
    activeElement.classList.remove(className);
    
    let left = activeElement.previousElementSibling || activeElement.parentElement.lastElementChild;
    let right = activeElement.nextElementSibling || activeElement.parentElement.firstElementChild;

    let nextElement = (dir > 0) ? right : left;
    nextElement.classList.add(className);
}
