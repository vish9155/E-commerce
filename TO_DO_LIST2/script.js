let btn = document.querySelector("#btn-field");
let inputbox = document.querySelector("#inputbox");
let listcontainner=document.querySelector(".list-containner")

btn.addEventListener("click", () => {
    let inputval = inputbox.value;
    if (inputval === "") {
        alert('please enter text in your input field')
    }
    else{
        let ele=document.createElement("li")
        ele.innerHTML=inputval;
        let close=document.createElement("span");
        close.innerHTML='\u00d7'
        ele.appendChild(close)
        listcontainner.appendChild(ele)
    }

    inputval=" "
savedata()
})

listcontainner.addEventListener("click",(event)=>{

    if(event.target.tagName==="LI")
        {
          event.target.classList.toggle("checked")
        }
    else if(event.target.tagName==="SPAN")
        {
            event.target.parentElement.remove()
        }    
     savedata()
})

function savedata()
{
    localStorage.setItem("data",listcontainner.innerHTML)
}

function show()
{
    listcontainner.innerHTML=localStorage.getItem("data")
}
show()