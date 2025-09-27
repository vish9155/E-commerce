let carticon = document.querySelector(".cart-icon")
let cartclose = document.querySelector("#cart-close")
let cart = document.querySelector(".cart")


//how to open a cart
carticon.addEventListener("click", () => {
    cart.style.visibility = "visible"
})

//how to close a cart
cartclose.addEventListener("click", () => {
    cart.style.visibility = "hidden"
})

//to store all shoping button
let cartbutton = document.querySelectorAll(".add-cart")

//to store all product box nearest to cartbutton
cartbutton.forEach((button) => {
    // console.log(button)
    button.addEventListener("click", (event) => {
        let productbox = event.target.closest(".product-box")
        //console.log(productbox)
        addtocart(productbox)
    })
})


//to add item in cart

let cartcontent = document.querySelector(".cart-content")
let addtocart = productbox => {

    let productimg = productbox.querySelector("img").src;
    let producttitle = productbox.querySelector(".product-tittle").innerText;
    let productprice = productbox.querySelector(".price").innerText;

    //if item is already exist

    let cartitem = cartcontent.querySelectorAll(".cart-product-tittle");

    for (let item of cartitem) {
        if (item.innerText === producttitle) {
            alert("item is already exist")
            return
        }
    }

    let cartbox = document.createElement("div");
    cartbox.classList.add(".cart-box");
    cartbox.innerHTML = ` <div class="cart-box">
                            <img src="${productimg}" alt="">
                            <div class="cart-details">
                                <h2 class="cart-product-tittle">${producttitle}</h2>
                                <span class="cart-price">${productprice}</span>
                                <div class="cart-quantity">
                                    <button id="decrement">-</button>
                                    <span class="number">1</span>
                                    <button id="increment">+</button>
                                </div>
                            </div>
                              <i class="fa-solid fa-trash cart-remove"></i>
                        </div>`

    cartcontent.appendChild(cartbox)


    //to remove the item in cart 

    let remove = cartbox.querySelector(".cart-remove");
    remove.addEventListener("click", () => {
        cartbox.remove()
        cartitemcountbadge(-1)
        updatetotalprice()

    })


    //to increment the item in cart 

    cartbox.querySelector(".cart-quantity").addEventListener("click", (event) => {

        let decrement = cartbox.querySelector("#decrement")
        let numberelement = cartbox.querySelector(".number")
        let quantity = numberelement.innerText;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;

            updatetotalprice()
            if (quantity === 1) {
                decrement.style.color = "#999"
            }
        }
        else if (event.target.id === "increment") {
            quantity++;
        }

        numberelement.innerText = quantity
        updatetotalprice()

    })
    cartitemcountbadge(1)
    updatetotalprice()

}

//to update the price of cart

let updatetotalprice = () => {
    let totalpriceelement = document.querySelector(".total-price");
    let cartboxes = cartcontent.querySelectorAll(".cart-box");
    let total = 0
    cartboxes.forEach((cartbox) => {

        let quantity = cartbox.querySelector(".number").innerText;
        let cartprice = cartbox.querySelector(".cart-price");
        // let quantity=quantityelement.innerText;
        let price = cartprice.innerText.replace("$", "");
        //  console.log(price)
        total = total + price * quantity;
    })
    totalpriceelement.innerText = (`$${total}`)
}


//count no item add in cart

let cartitemcount = 0;
let cartitemcountbadge = (change) => {

    let updatecartcount = document.querySelector(".cart-item-count")
    cartitemcount += change
    if (cartitemcount > 0) {
        updatecartcount.style.visibility = "visible";
        updatecartcount.innerText = cartitemcount;
    }
    else {
        updatecartcount.style.visibility = "hidden";
        updatecartcount.innerText = "";
    }

}

//successfully purchase the item;

let buy = document.querySelector("#btn-buy");

buy.addEventListener("click", () => {
    let cartboxes = cartcontent.querySelectorAll(".cart-box");

    if(cartboxes.length===0)
    {
        alert("please add item in cart")
        return
    }
   cartboxes.forEach(cartbox=>cartbox.remove())//alternate 
   
   cartitemcount=0
   cartitemcountbadge(0)
   updatetotalprice()
   alert("thank for purchasing")
   
})