var tableNumber = null;

AFRAME.registerComponent("markerhandler", {
  init: async function() {

    if (tableNumber === null) {
      this.askTableNumber();
    }

    var dishes = await this.getDishes();

    this.el.addEventListener("markerFound", () => {
      if(tableNumber!==null){
      var markerId = this.el.id;
      this.handleMarkerFound(dishes, markerId);}
    });

    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
  },

  askTableNumber: function() {
    var iconUrl = "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png";
    
    
    swal({
      title:"welcome to toy shop!",
      icon:iconUrl,
      content:{
        element:"input",
        attributes:{
          placeholder:"type your toy name",
          type:"string",
          min:1
        }
      },
      closeOnClickOutside:false,
    })
    .then(inputValue=>{
      tableNumber=inputValue
    })
      
      
      
    
    
  },

  handleMarkerFound: function(dishes, markerId) {
    // Getting today's day
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDay();
    // Sunday - Saturday : 0 - 6
    var days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    var dish = dishes.filter(dish => dish.id === markerId)[0];

    var model=document.querySelector(`#model-${dish.id}`)
    model.setAttribute("visible",true)
    
    var ingredientsContainer =document.querySelector(`#main-plane-${dish.id}`)
    ingredientsContainer.setAttribute("visible",true)

    var pricePlane=document.querySelector(`#price-plane-${dish.id}`)
    pricePlane.setAttribute("visible",true)

    if (dish.unavailable_days.includes(days[todaysDay])) {
      swal({
        icon: "warning",
        title: dish.dish_name.toUpperCase(),
        text: "This toy is not in stock today!!!",
        timer: 2500,
        buttons: false
      });
    } else {
       // Changing Model scale to initial scale
      var model = document.querySelector(`#model-${dish.id}`);
      model.setAttribute("position", dish.model_geometry.position);
      model.setAttribute("rotation", dish.model_geometry.rotation);
      model.setAttribute("scale", dish.model_geometry.scale);

      // Changing button div visibility
      var buttonDiv = document.getElementById("button-div");
      buttonDiv.style.display = "flex";

      var ratingButton = document.getElementById("rating-button");
      var orderButtton = document.getElementById("order-button");

      // Handling Click Events
      ratingButton.addEventListener("click", function() {
        swal({
          icon: "warning",
          title: "Rate toy",
          text: "Work In Progress"
        });
      });

      orderButtton.addEventListener("click", () => {
        /*REPLACE COMMENTS TO ADD CODE HERE TO CALL handleOrder()
        
        
        
        */

        swal({
          icon: "https://i.imgur.com/4NZ6uLY.jpg",
          title: "Thanks For Order !",
          text: "Your order will deliver at your doorstep!",
          timer: 2000,
          buttons: false
        });
      });
    }
  },
  handleOrder: function(tNumber, dish) {
    /* REPLACE COMMENTS TO ADD CODE HERE
    
    
      
      
      */
  },

  getDishes: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },
  handleMarkerLost: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
