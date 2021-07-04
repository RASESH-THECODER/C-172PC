AFRAME. registerComponent("create-buttons",{
    init:function(){
        var button1=document.createElement("button");
        button1.innerHTML="ORDER SUMMARY"
        button1.setAttribute("id","rating-button")
        button1.setAttribute("class","btn btn-morning")

        var button2=document.createElement("button");
        button2.innerHTML="ORDER NOW"
        button2.setAttribute("id","order-button")
        button2.setAttribute("class","btn btn-morning")
        var buttondiv=document.getElementById("button-div")
        buttondiv.appendChild(button1)
        buttondiv.appendChild(button2)
    }
})