const open_button = document.querySelector(".nav-open")
const open_close = document.querySelector(".nav-close")
const menu = document.querySelector(".nav-data-conteiner")
open_button.addEventListener("click", ()=> {
    open_button.setAttribute("data-close", "false"); 
    menu.style.transform = "translateX(0)"
    menu.setAttribute("data-close", "false");
})
open_close.addEventListener("click", ()=> {
    open_button.setAttribute("data-close", "true"); 
    menu.style.transform = "translateX(100%)"
})