
let cart = document.querySelector(".cart");
let carticon = document.querySelector(".carticon");
let cartclose = document.querySelector(".cart-close");

carticon.addEventListener("click", () =>  cart.classList.add("active") )
cartclose.addEventListener("click", () => cart.classList.remove("active") )

let addcartbutton = document.querySelectorAll(".add-cart");

addcartbutton.forEach((button) => {
    button.addEventListener("click", (event => {
        let productbox = event.target.closest(".product-box");
        console.log(productbox)
        additemtocart(productbox)
    }))
})

let cartcontent = document.querySelector(".cart-content")

let additemtocart = (productbox) => {

    let productimage = productbox.querySelector("img").src;
    let producttittle = productbox.querySelector(".Product-tittle").innerText;
    let productprice = productbox.querySelector(".product-price").innerText;
    console.log(producttittle, productimage, productprice)

    let cartitem = cartcontent.querySelectorAll(".cart-product-tittle");

    for (let item of cartitem) {
        if (item.innerText === producttittle) {
            alert("this item is already exist");
            return
        }
    }

    let cartbox = document.createElement("div")
    cartbox.classList.add("cart-box");
    cartbox.innerHTML = `
    
    
                        <img src="${productimage}" height="100px" width="100px" alt="">
                        <div class="cart-details">
                            <h2 class="cart-product-tittle">${producttittle}</h2>
                            <span class="cart-price">${productprice}</span>
                            <div class="cart-quantity">
                                <button id="decrement">-</button>
                                <span class="number">1</span>
                                <button id="increment">+</button>
                            </div>
                        </div>
                        <i class="fa-solid fa-trash remove-item" ></i>
                   

    `
    cartcontent.appendChild(cartbox)

    cartbox.querySelector(".remove-item").addEventListener("click", () => 
        { 
            cartbox.remove()
            updatetotalprice()
            cartitemcount(-1)
          
         })

    let cartquantity = cartbox.querySelector(".cart-quantity");
    cartquantity.addEventListener("click", (event) => {
        let decrement = cartbox.querySelector("#decrement");
        let quantityelement = cartbox.querySelector(".number");
        let quantity = quantityelement.innerText;
        if (event.target.id === "decrement" && quantity > 1) {
            quantity--
            updatetotalprice()
            if (quantity === 1) {
                decrement.style.color = "#999"
            }
        }
        else if (event.target.id === "increment") {
            quantity++
            decrement.style.color = "#333"
        }
        quantityelement.innerText = quantity
        updatetotalprice()
    })
  updatetotalprice()
  cartitemcount(1)
  saved()
  
}

let updatetotalprice=()=>{
    let totalpriceelement=document.querySelector(".total-price");
    let cartboxes=cartcontent.querySelectorAll(".cart-box")
    let total=0;

    cartboxes.forEach((cartbox)=>{
        let quantityelement=cartbox.querySelector(".number");
        let quantity=quantityelement.innerText;
        let cartprice=cartbox.querySelector(".cart-price")
        let toprice=cartprice.innerText.replace("$","")
        total=total+quantity*toprice
        console.log(quantity,toprice,total)
    })
    totalpriceelement.innerText=`$${total}`
    console.log(totalpriceelement)
}

let itemcount=0

let cartitemcount=(count)=>{
    let cartitemcountbadge=document.querySelector(".cart-item-count");
    itemcount+=count
   if(itemcount>0)
   {
     cartitemcountbadge.style.visibility="visible"
     cartitemcountbadge.innerText=itemcount
   }
   else{
     cartitemcountbadge.style.visibility="hidden"
     cartitemcountbadge.innerText=" "
   }
}

let buybtn=document.querySelector(".buy-btn");

buybtn.addEventListener("click",()=>{
    let cartboxes=cartcontent.querySelectorAll(".cart-box");
    if(cartboxes.length===0)
    {
        alert("please add item in cart")
        return
    }
    cartboxes.forEach((cartbox)=>{
       
        cartbox.remove()
    })
    itemcount=0
     updatetotalprice(0)
        cartitemcount(0)
        alert("thanks for purchasing.....")
})

let images=document.querySelectorAll(".center .images img")
let index=0;

function next()
{
    images[index].style.display="none";
    if(index===images.length-1)
    {
        index=0
    }
    else{
        index++
    }
        images[index].style.display="block";
}
function prev()
{
    images[index].style.display="none";
    if(index===0)
    {
        index=images.length-1
    }
    else{
        index--
    }
        images[index].style.display="block";
}

let time=setInterval(next,3000)

function playpause(option)
{
    if(option==="pause")
    {
        clearInterval(time)
    }
    else{
        time=setInterval(next,3000)
    }
}

function saved()
{
    localStorage.setItem("cartbox",cartcontent)
}
function getdata()
{
    cartcontent=localStorage.getItem("cartbox")
}
