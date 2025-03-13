let inputbox=document.querySelector("#input-box")
let listcontainner=document.querySelector(".list")
let button=document.querySelector("#btn")


button.addEventListener("click",()=>{
    
   let value=inputbox.value
   if(value=="")
   {
    alert("you must write something")
   }
   else{
    let el=document.createElement("li")
    el.innerHTML=value
    listcontainner.appendChild(el)
    let del=document.createElement("span")
    del.innerHTML='\u00d7'
    el.appendChild(del)
   }
   inputbox.value=''
   savdata()
})

listcontainner.addEventListener("click",function(e){
    if(e.target.tagName=="LI")
    {
       e.target.classList.toggle("checked")
       savdata()
       
    }
    else if(e.target.tagName=="SPAN"){
        e.target.parentElement.remove()
            savdata()
    }
})
function savdata(){
    localStorage.setItem("Data",listcontainner.innerHTML)
}

function showtask(){
    listcontainner.innerHTML=localStorage.getItem("Data")
}
showtask()