class Dom {

    static SetDomIdVisibility(id, visible) {
        const visibility = (visible) ? 'visible' : 'hidden';
        let element = document.getElementById(id);
        element.style.visibility = visibility;
    }
    
    static SetDomIdDisplay(id, visible) {
        const display = (visible) ? 'block' : 'none';
        let element = document.getElementById(id);
        element.style.display = display;
    }

    static AddClassToDomId(id, className) {
        let element = document.getElementById(id);
        element.classList.add(className);
    }

    static RemoveClassFromDomById(id, className) {
        let element = document.getElementById(id);
        element.classList.remove(className);
    }

    static SetDomIdOpacity(id, opacity) {
        document.getElementById(id).style.opacity = opacity;
    }

    static AddClick(elementId, fn) {
        document.getElementById(elementId).addEventListener('click', fn);
        document.getElementById(elementId).clickAction = fn;
    }

    static ResetClick(elementId) {
        let old_element = document.getElementById(elementId);
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

    static ResetClicks(ids) {
        for (let id of ids)
            Dom.ResetClick(id);
    }

    static SetDomText(id, txt) {
        document.getElementById(id).innerText = txt;
    }

    static SetActiveInGroup(groupClass, activeClass, id) {
        document.querySelectorAll(`.${groupClass}`).forEach(function(element) {
            element.classList.remove(activeClass);
        });
        let element = document.getElementById(id);
        element.classList.add(activeClass);
    }
}
export default Dom;