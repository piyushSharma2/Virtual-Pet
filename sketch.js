var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feed;
var lastFed
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(650,95);
  feed.mousePressed(feedDog)

}

function draw() {
  background(56,150,53);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    fill(0)
    textSize(5)
    stroke(10)
    text("Last Feed : 5 PM",650,100)
  }else if(lastFed==0){
    fill(0)
    textSize(5)
    stroke(10)
    text("Last Feed : 12 AM",350,30)
  }else {
    fill(0)
    textSize(15)
    stroke(10)
    text("Last Feed : 10 AM",500,80)
  }



  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){

  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
 var food_stock_val=foodObj.getFoodStock();

 if(food_stock_val <=0){
   foodObj.updateFoodStock(food_stock_val *0);

 }else{
   foodObj.updateFoodStock(food_stock_val -1);
 }

}

//function to add food in stock   

function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
