let cart = document.querySelector(".cart");
let cartclose = document.querySelector("#cart-close");
let carticon = document.querySelector(".cart-icon");

carticon.addEventListener("click", () => {

    cart.style.display = "block";
});

cartclose.addEventListener("click", () => {
    cart.style.display = "none";
});

//how to add item in cart..........


let addcartbutton = document.querySelectorAll(".add-cart");
addcartbutton.forEach((button) => {
    button.addEventListener("click", (ev) => {
        let productbox = ev.target.closest(".product-box");
        addtocart(productbox);
    });

});


let cartcontent = document.querySelector(".cart-content");

function addtocart(productbox) {
    let productimg = productbox.querySelector("img").src;
    let producttitle = productbox.querySelector(".product-tittle").innerText;
    let productprice = productbox.querySelector(".price").innerText;
    let cartitem = cartcontent.querySelectorAll(".cart-product-tittle");
    for (item of cartitem) {
        if (item.innerText === producttitle) {
            alert("This item is already exist in Your cart....")
            return
        }
    }

    let cartbox = document.createElement("div");
    cartbox.classList.add("cart-box");
    cartbox.innerHTML = ` <img src="${productimg}" alt="">

                 <div class="cart-details">
                   <h2 class="cart-product-tittle">${producttitle}</h2>
                    <span class="cart-price">${productprice}</span>
                    <div class="quantity">
                        <button id="decrement">-</button>
                         <span id="number">1</span>
                         <button id="increment">+</button>
                     </div>
                 </div>
                 <i class="fa-solid fa-trash cart-remove" title="Delete item"></i>
             </div>`
    cartcontent.appendChild(cartbox);
    cartbox.querySelector(".cart-remove").addEventListener("click", () => {
        cartbox.remove()
        updatetotalprice()
        updatecartcount(-1)
    })

    cartbox.querySelector(".quantity").addEventListener("click", evt => {
        let numberElement = cartbox.querySelector("#number");
        let decbtn = cartbox.querySelector("#decrement");
        let cartquantity = numberElement.innerText;

        if (evt.target.id === "decrement" && cartquantity > 1) {
            cartquantity--;
            updatetotalprice()

            if (cartquantity === 0) {
                decbtn.style.color = "#999";
            }

        }
        else if (evt.target.id === "increment") {
            cartquantity++
            decbtn.style.color = "#222";
        }
        numberElement.innerText = cartquantity;
        updatetotalprice()

    })
    updatetotalprice()
    updatecartcount(1)
}

function updatetotalprice() {
    let totalpriceelement = document.querySelector(".total-price");
    let cartboxes = cartcontent.querySelectorAll(".cart-box");
    let total = 0;
    cartboxes.forEach((cartbox) => {
        let cartprice = cartbox.querySelector(".cart-price");
        let quantityelement = cartbox.querySelector("#number");
        let price = cartprice.innerText.replace("$", "");
        let quantity = quantityelement.innerText;
        total = total + price * quantity;
    })
    totalpriceelement.innerText = (`$${total}`)
}

let cartitemcount = 0;
function updatecartcount(change) {
    let cartitemcountbadge = document.querySelector(".cart-item-count");
    cartitemcount += change;
    if (cartitemcount > 0) {
        cartitemcountbadge.style.visibility = "visible";
        cartitemcountbadge.innerText = cartitemcount
    }
    else {
        cartitemcountbadge.style.visibility = "none";
        cartitemcountbadge.innerText = cartitemcount
    }

}
let buy=document.querySelector(".btn-buy");
buy.addEventListener("click",()=>{
    let cartboxes=cartcontent.querySelectorAll(".cart-box");
    if(cartboxes.length===0)
    {
        alert("your cart is empty")
        return
    }
    cartboxes.forEach(cartbox=>cartbox.remove());
    cartitemcount=0
    updatecartcount(0)
    updatetotalprice()
    alert("Thank's for purchasing......")
})

