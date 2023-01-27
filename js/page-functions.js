
/**
 * ADD a new stat to the UI display (image and text)
 * @param {*} id Unique ID of the text <div>
 * @param {*} src Image src
 * @param {*} val Text to display in <div>
 */
function addUIStat(id, src, val) {

    let uiHolder = document.getElementById('gui-top-left');

    let flexDiv = document.createElement('div');
    flexDiv.classList.add('flex-box');
    flexDiv.classList.add('ui-stat-row');

    let imageDiv = document.createElement('div');
    let image = document.createElement('img');

    imageDiv.classList.add('gui-tl-tbl-col-image');
    image.classList.add('gui-tl-stat-image');
    image.setAttribute('src', src);
    image.setAttribute('alt', 'UI Stat Ranking');

    let textDiv = document.createElement('div');
    textDiv.innerText = val;
    textDiv.classList.add('gui-tl-tbl-col-text');
    textDiv.setAttribute('id', id);

    imageDiv.appendChild(image);
    flexDiv.appendChild(imageDiv);
    flexDiv.appendChild(textDiv);
    uiHolder.appendChild(flexDiv);
}