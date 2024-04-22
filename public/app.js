let html=document.querySelector(".txt");
let body=document.querySelector("body");
let result=document.querySelector(".result");
let css=document.querySelector(".css");
let js=document.querySelector(".js");
let op=document.querySelector(".inactive");
console.dir(op);
function work()
{
   
}

function vanish()
{
    op.style.display="none";
    console.log(" clear called");
    html.value="";
    css.value="";
    js.value="";
    console.dir(html);
}

function preview()
{
    try
    {
        console.log("heheh");
        let h=html.value;
        let c=css.value;
        let j=js.value;
        result.contentDocument.head.innerHTML=`<style>${c}</style>`;
        result.contentDocument.body.innerHTML=`${h}`;
        result.contentWindow.eval(j);
        op.style.display="block";
    }
    catch(e)
    {
        alert(e);
    }
    
}

let fr=document.querySelector(".result")
console.log(fr.contentDocument);
