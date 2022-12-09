class DomHandler {

    static SetDomIdDisplay(id, visible) {
        const display = (visible) ? 'block' : 'none';
        document.getElementById(id).style.display = display;
    }

    static SetDomIdOpacity(id, opacity) {
        document.getElementById(id).style.opacity = opacity;
    }

    static AddClick(elementId, fn) {
        document.getElementById(elementId).addEventListener('click', fn);
    }

    static ResetClick(elementId) {
        let old_element = document.getElementById(elementId);
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

    static ResetClicks(ids) {
        for (let id of ids)
            DomHandler.ResetClick(id);
    }

    static SetDomText(id, txt) {
        document.getElementById(id).innerText = txt;
    }
}
export default DomHandler;