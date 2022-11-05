class DomHandler {

    static HideMainMenu() {

        document.getElementById('game-logo').style.visibility = "hidden";
        document.getElementById('game-title-menu').style.visibility = "hidden";
        
        let old_element = document.getElementById("menu-play");
        let new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
    }

    static ShowGameUI() {
        document.getElementById('game-ui').style.visibility = "visible";
    }
}
export default DomHandler;