let cartIcon=document.querySelector("#cart-icon")
let Cart=document.querySelector(".cart")
let cartClose=document.querySelector("#cart-close")

cartIcon.addEventListener("click",()=> Cart.classList.add("active"))
cartClose.addEventListener("click",()=> Cart.classList.remove("active"))

