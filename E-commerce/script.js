let cartIcon = document.querySelector("#cart-icon")
let Cart = document.querySelector(".cart")
let cartClose = document.querySelector("#cart-close")

cartIcon.addEventListener("click", () => Cart.classList.add("active"))
cartClose.addEventListener("click", () => Cart.classList.remove("active"))


//this field can click on shoping bag to add items in cart
const addcartbuttons = document.querySelectorAll(".add-cart");
addcartbuttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const productbox = event.target.closest(".product-box")
        addtocart(productbox)
    })
})


//to add item in cart

const cartcontent = document.querySelector(".cart-content")
const addtocart = productbox => {
    const productimg = productbox.querySelector("img").src;
    const producttitle = productbox.querySelector(".product-tittle").innerText;
    // producttitle
    const productprice = productbox.querySelector(".price").innerText;


    // ifb item is already exist
    const cartitem = cartcontent.querySelectorAll(".cart-product-tittle")
    for (let item of cartitem) {
        if (item.innerText === producttitle) {
            alert("This item is already exist in your cart !")
            return
        }

    }

// add items

    const cartbox = document.createElement("div")
    cartbox.classList.add("cart-box");
    cartbox.innerHTML = `  <img src="${productimg}" class="cart-img">
            <div class="cart-details">
                <h2 class="cart-product-tittle">${producttitle}</h2>
                <span class="cart-price">${productprice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash cart-remove"></i>`
    cartcontent.appendChild(cartbox)

    //to remove item

    cartbox.querySelector(".cart-remove").addEventListener("click", () => {
        cartbox.remove()
          updatecartcount(-1)
        updatetotalprice()
    })
//to increase decrease item in cart

    cartbox.querySelector(".cart-quantity").addEventListener("click", (event) => {
        const numberElement = cartbox.querySelector(".number");
        const decbtn = document.querySelector("#decrement");
        //   const incbtn = document.querySelector("#increment");
        let quantity = numberElement.innerText;
        
        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            updatetotalprice()

            if (quantity === 1) {
                decbtn.style.color = "#999"
            }
        }

        else if (event.target.id === "increment") {
            quantity++;
            decbtn.style.color = "#333";

        }


        numberElement.innerText = quantity;
        updatetotalprice()

    })
    updatecartcount(1)
    updatetotalprice()
}

//update price in cart

const updatetotalprice = () => {
    const totalpriceelement = document.querySelector(".total-price");
    const cartboxes = cartcontent.querySelectorAll(".cart-box");
    let total = 0;
    cartboxes.forEach((cartbox) => {
        const priceelement = cartbox.querySelector(".cart-price");
        const quantityelement = cartbox.querySelector(".number");
        const price = priceelement.innerText.replace("$", "");
        const quantity = quantityelement.innerText;
        total = total + price * quantity
    })
    totalpriceelement.innerText = (`$${total}`);
}

let cartitemcount=0;
const updatecartcount=change=>{
    const cartitemcountbadge=document.querySelector(".cart-item-count");
    cartitemcount+=change;
    if(cartitemcount>0)
    {
        cartitemcountbadge.style.visibility="visible"
        cartitemcountbadge.innerText=cartitemcount;
    }
    else{
         cartitemcountbadge.style.visibility="hidden"
        cartitemcountbadge.innerText="";
    }
}

const buynow=document.querySelector(".btn-buy")
buynow.addEventListener("click",()=>{
    const cartboxes=document.querySelectorAll(".cart-box");
    if(cartboxes.length===0)
    {
        alert("your cart is empty! Please add item in cart")
        return
    }
    cartboxes.forEach(cartbox=>cartbox.remove())
    cartitemcount=0;
    updatecartcount(0)
    updatetotalprice()
    alert("Thank's for purchasing");
})