// const axios=require("axios");
async function ex(question,id)
{
    console.log(question)
    if (question) {
        console.log("inside");
        window.location.href=`/exam/${id}`;
    }
}