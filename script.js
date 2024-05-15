

// apiKey
// 7db1baf9ccbb44a78234fabcb60e7f5f 
let url = "https://api.spoonacular.com/recipes/random?apiKey=7db1baf9ccbb44a78234fabcb60e7f5f";

function fetchRecipe(){
  let ing1 = $(".ing1").val();
  let ing2 = $(".ing2").val();
  let ing3 = $(".ing3").val();
  let temp = Math.floor((Math.random()*3)+1); // Used for showcase - Not needed for original. 

  let url2 = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=7db1baf9ccbb44a78234fabcb60e7f5f&ingredients="+ing1+","+ing2+","+ing3+"&number="+temp;
  console.log(url2);

  let request = new XMLHttpRequest();

  request.open("GET", url2, true);

  request.onload = function() { //Once we recieve the response do this vvvv

    let data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {

      // console.log(data); - Educational Purposes 
      recipe_img = data[0].image;
      resTitle = data[0].title;
      resId = data[0].id;
      console.log(resId);
      console.log(resTitle);
      $(".recipeTitle").html(resTitle)
      $('.recipeImage').attr('src',recipe_img);

      //OPTIONAL EXTENTIAL - BUT SEEMS USEFUL
      let urlN = "https://api.spoonacular.com/recipes/"+resId+"/information?apiKey=7db1baf9ccbb44a78234fabcb60e7f5f";
      let newRequest = new XMLHttpRequest();
      newRequest.open("GET", urlN, true);
      newRequest.onload = function() { //Once we recieve the response do this vvvv

        let newData = JSON.parse(this.response);
        if (newRequest.status >= 200 && newRequest.status < 400) {
          let resIns = newData.instructions;
          console.log(resIns);

          if(resIns == null){
            $(".recipeInstructions").text("No instructions are available at this time");
          }
          else{
            $(".recipeInstructions").html(resIns);
          }  	      
        }
      };
      newRequest.send();
      //$("#advice").text(data.recipes[0].instructions);
    }
  };
  request.send();
}

