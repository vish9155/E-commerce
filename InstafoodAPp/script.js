

let carticon = document.querySelector(".cart-icon");
let cartclose = document.querySelector(".cart-close");
let cart = document.querySelector(".cart")

// carticon.addEventListener("click", () => {
//     cart.style.visibility = 'visible';

// })

// cartclose.addEventListener("click", () => {
//     cart.style.visibility = 'hidden'
// })

carticon.addEventListener("click", () => cart.classList.add("active"))
cartclose.addEventListener("click", () => cart.classList.remove("active"))


let cartbutton = document.querySelectorAll(".addcart")
cartbutton.forEach(button => {

    button.addEventListener("click", (event) => {
        let productbox = event.target.closest(".product-box")
        addtocart(productbox)
    })
});


let cartcontent = document.querySelector(".cart-content")
let addtocart = (productbox) => {
    let producttittle = productbox.querySelector("#food-tittle").innerText;
    let productimage = productbox.querySelector("img").src
    let productPrice = productbox.querySelector(".price").innerText;
    console.log(productPrice, productimage, producttittle)

    let cartproducttittle = cartcontent.querySelectorAll(".cart-product-tittle")

    for (let item of cartproducttittle) {
        if (item.innerText === producttittle) {
            alert("item is already exist in cart")
            return
        }
    }

    let cartbox = document.createElement("div")
    cartbox.classList.add(".cart-box");
    cartbox.innerHTML =
        `
   <div class="cart-box">
                    <img src="${productimage}" alt="">
                    <div class="cart-details">
                        <h2 class="cart-product-tittle">${producttittle}</h2>
                        <span class="cart-price">${productPrice}</span>
                        <div class="cart-quantity">
                            <button id="decrement">-</button>
                            <span class="number">1</span>
                            <button id="increment">+</button>
                        </div>
                    </div>
                    <i class="fa-solid fa-trash cart-remove"></i>
                </div>
   `
    cartcontent.appendChild(cartbox)
    cartbox.querySelector(".cart-remove").addEventListener("click", () => {

        cartbox.remove()
        updatetotalprice()
        updatecartitemcount(-1)
    })

    cartbox.querySelector(".cart-quantity").addEventListener("click", (event) => {
        let dec = cartbox.querySelector("#decrement");
        let quantityelement = cartbox.querySelector(".number");
        let quantity = quantityelement.innerText;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--
            updatetotalprice()
            if (quantity === 1) {
                dec.style.color = "#999"
            }
        }
        else if (event.target.id === "increment") {
            quantity++
            dec.style.color = "#333"

        }

        quantityelement.innerText = quantity

        updatetotalprice()

    })

    updatetotalprice()
    updatecartitemcount(1)
}

let updatetotalprice = () => {
    let totalpriceelement = document.querySelector(".total-price")
    let cartboxes = cartcontent.querySelectorAll(".cart-box")
    let total = 0
    cartboxes.forEach((cartbox) => {

        let quantityelement = cartbox.querySelector(".number");
        let quantity = quantityelement.innerText;
        let cartprice = cartbox.querySelector(".cart-price")
        let Price = cartprice.innerText.replace("$", "")
        console.log(Price, cartprice)
        total = total + quantity * Price
    })

    totalpriceelement.innerText = `$${total}`


}

let cartitemcount = 0

let updatecartitemcount = (change) => {
    let cartitemcountbadge = document.querySelector(".cart-item-count")
    cartitemcount += change
    if (cartitemcount > 0) {
        cartitemcountbadge.style.visibility = "visible"
        cartitemcountbadge.innerText = cartitemcount

    }
    else {
        cartitemcountbadge.style.visibility = "hidden"
        cartitemcountbadge.innerText = ''
    }

}
let buy = document.querySelector(".buy")
buy.addEventListener("click", () => {
    let cartboxes = cartcontent.querySelectorAll(".cart-box")

    if (cartboxes.length === 0) {
        alert("your cart is empty please add item in your cart")
        return
    }
    cartboxes.forEach((cartbox) => {
        cartbox.remove()
    })
    cartitemcount = 0
    updatecartitemcount(0)
    updatetotalprice()
    alert(`thanks for purchasing`)
})

//1.open close cart
//2.store all button or product box
//3.add item through addtocart function with parameter product box
//4.increase and decrease item
//5.Add and update total amount
//6.show in cart cart-item-count
//7.perform any on buy btn


let images = document.querySelectorAll(".slider .center .images img");
let index = 0;
let bottom = document.querySelector(".bottom")
let dots = []
console.log(images)


for (let i = 0; i < images.length; i++) {
    let elem = document.createElement("div");
    elem.classList.add("dot")
    bottom.appendChild(elem)

    console.log(dots)

    elem.addEventListener("click", () => {
        showimage(i)
    })

    dots.push(elem)
    console.log(dots)
}

function showimage(i) {

    images.forEach((img) => img.style.display = 'none')  // it take all img in images
    dots.forEach((dot) => dot.style.background = 'transparent')
    images[i].style.display = "block";
    dots[i].style.background = 'coral'

    index = i

}


function next() {
    images[index].style.display = 'none';

    if (index === images.length - 1) {
        index = 0
    }
    else {
        index++
    }

    images[index].style.display = 'block';
    showimage(index)

}
function prev() {
    images[index].style.display = 'none';

    if (index === 0) {
        index = images.length - 1
    }
    else {
        index--
    }

    images[index].style.display = 'block';
    showimage(index)

}

let settime = setInterval(next, 2000)

function playpause(option) {
    if (option === 'pause') {
        clearInterval(settime)
    }
    else {
        settime = setInterval(next, 2000)
    }
}

showimage(0)
let center = document.querySelector(".timercenter")
let second = document.querySelector(".second")
let first = document.querySelector(".first")
let days = document.querySelector(".days")
let hours = document.querySelector(".hours")
let minutes = document.querySelector(".minutes")
let seconds = document.querySelector(".seconds")

let targetdate = new Date(2025, 9, 17);
console.log(targetdate)
setInterval(() => {

    let curretdate = new Date();
    let diff = targetdate - curretdate;


    if (diff > 0) {

        let num = parseInt(diff / (1000 * 60 * 60 * 24))
        console.log(num)
        days.innerHTML = num < 10 ? "0" + num : num
        num = parseInt(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
        hours.innerHTML = num < 10 ? "0" + num : num
        num = parseInt(diff % (1000 * 60 * 60) / (1000 * 60))
        minutes.innerHTML = num < 10 ? "0" + num : num
        num = parseInt(diff % (1000 * 60) / (1000))
        seconds.innerHTML = num < 10 ? "0" + num : num
        console.log(days, hours, minutes, seconds)
    }
    else {
        center.removeChild(second)
        first.innerHTML = "Big Billion Day Start..... Happy Diwali"
    }

}, 1000)
