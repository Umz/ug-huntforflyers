
/**
 * ADD a new stat to the UI display (image and text)
 * @param {*} id Unique ID of the text <div>
 * @param {*} src Image src
 * @param {*} val Text to display in <div>
 */
function addUIStat(id, src, val) {

    let uiHolder = document.getElementById('hud-stats');

    let flexDiv = document.createElement('div');
    flexDiv.classList.add('hud-stat-row');

    let imageDiv = document.createElement('div');
    let image = document.createElement('img');

    imageDiv.classList.add('stat-col-image');
    image.classList.add('stat-image');
    image.setAttribute('src', src);
    image.setAttribute('alt', 'UI Stat Ranking');

    let textDiv = document.createElement('div');
    textDiv.textContent = val;
    textDiv.classList.add('stat-col-text');
    textDiv.setAttribute('id', id);

    imageDiv.appendChild(image);
    flexDiv.appendChild(imageDiv);
    flexDiv.appendChild(textDiv);
    uiHolder.appendChild(flexDiv);
}

function addGameoverStat(label, value) {

    let containerId = 'gameover-stats';
    let rowClass = 'gameover-stat-row';
    let colClass = 'gameover-stat-col';
    let colClassL = 'gameover-stat-col right-align-col';

    let rowTag = 'span';
    let colTag = 'span';

    let row = addElementRowToContainerById(containerId, rowTag, rowClass);
    addTextColumnToRow(row, colTag, colClassL, label);
    addTextColumnToRow(row, colTag, colClass, value);
}

function addElementRowToContainerById(containerId, rowTag, rowClass) {
    
    let row = document.createElement(rowTag);
    row.setAttribute('class', rowClass);

    let container = document.getElementById(containerId);
    container.appendChild(row);

    return row;
}

function addTextColumnToRow(rowElement, columnTag, columnClass, columnValue) {

    let column = document.createElement(columnTag);
    column.setAttribute('class', columnClass);
    column.textContent = columnValue;

    rowElement.appendChild(column);
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

    speakerDiv.textContent = speaker;
    messageDiv.textContent = message;

    chatDiv.appendChild(speakerDiv);
    chatDiv.appendChild(messageDiv);
    box.appendChild(chatDiv);

    box.scrollTop = box.scrollHeight;
}

function clearChat() {
    let box = document.getElementById('chatbox-container');
    box.innerHTML = "";
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
