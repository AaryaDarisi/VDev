

function hi()
{
    console.log("sadfasdfasfdasdfasdf");
    console.log("woerking");
    let html=document.querySelector(".txt");
    let result=document.querySelector(".result");
    let css=document.querySelector(".css");
    let js=document.querySelector(".js");
    let op=document.querySelector(".inactive");
    let h=html.value;
    let c=css.value;
    let j=js.value;
    result.contentDocument.head.innerHTML=`<style>${c}</style>`;
    result.contentDocument.body.innerHTML=`${h}`;
    result.contentWindow.eval(j);
    op.style.display="block";
}