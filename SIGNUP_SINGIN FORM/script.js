var signUp=document.querySelector("#signup");
let phone=document.querySelector("#phone")
var signIn=document.querySelector(".disable");
var nameField=document.querySelector("#namefield");
var tittle=document.querySelector(".tittle");
var Underline=document.querySelector(".underline");

signIn.addEventListener("click",()=>{
    nameField.style.maxHeight="0px";
    phone.style.maxHeight="0%";
    tittle.innerHTML="Sign In";
    signUp.classList.add("disable");
    signIn.classList.remove("disable");
    Underline.style.transform="translateX(35px)"
});
signUp.addEventListener("click",()=>{
    nameField.style.maxHeight="60px";
    phone.style.maxHeight="60px"
    tittle.innerHTML="Sign Up";
    signUp.classList.remove("disable");
    signIn.classList.add("disable");
    Underline.style.transform="translateX(0px)";
});

document.getElementById("pd").style.color="red"
    function val(x){
        if(isNaN(x.value)){
            document.getElementById("pd").innerHTML=" please enter only a number"
        }
        else{
            document.getElementById("pd").innerHTML=""
            if(x.value.length>10)
            {
                document.getElementById("pd").innerHTML="please enter only 10 digit number"
            }
            else{
            document.getElementById("pd").innerHTML=""
        }
    }
}

var passwords=document.getElementById("pass").value
document.getElementById("cp").style.color="red"

function check(y){
    if(y.value.length>0)
    {
        if(y.value!=passwords.value)
        {
            document.getElementById("cp").innerHTML="confirm password don't match"
        }
        else{
            document.getElementById("cp").innerHTML=""
        }
    }
    else{
          document.getElementById("cp").innerHTML=""
    }
}