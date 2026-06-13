let player = {
 money:100,
 energy:100,
 aura:0,
 strength:1,
 time:6,
 bike:false,
 apartment:false
};

function update(){
 document.getElementById("money").innerText =
 player.money.toLocaleString();

 document.getElementById("energy").innerText =
 player.energy;

 document.getElementById("aura").innerText =
 player.aura;

 document.getElementById("strength").innerText =
 player.strength;

 let hour = player.time;

 let ampm = hour >= 12 ? "PM" : "AM";

 let displayHour = hour;

 if(displayHour > 12){
   displayHour -= 12;
 }

 if(displayHour === 0){
   displayHour = 12;
 }

 document.getElementById("time").innerText =
 displayHour + ":00 " + ampm;

 saveGame();
}

function advance(hours){
 player.time += hours;

 while(player.time >= 24){
   player.time -= 24;
 }
}

function work(){

 if(player.energy < 20){
  message("Not enough energy");
  return;
 }

 player.energy -= 20;
 player.money += 100;
 advance(4);

 message("+$100");
 update();
}

function gym(){

 if(player.energy < 15){
  message("Not enough energy");
  return;
 }

 player.energy -= 15;
 player.strength += 1;
 player.aura += 5;

 advance(1);

 message("Workout complete");
 update();
}

function club(){

 if(player.money < 100){
  message("Need $100");
  return;
 }

 if(player.energy < 30){
  message("Need energy");
  return;
 }

 player.money -= 100;
 player.energy -= 30;
 player.aura += 10;

 advance(4);

 message("You went clubbing");
 update();
}

function sleepPlayer(){

 player.energy = 100;

 advance(8);

 message("Slept");
 update();
}

function buyBike(){

 if(player.money < 500){
  message("Need $500");
  return;
 }

 player.money -= 500;
 player.bike = true;

 message("Bought Bike");
 update();
}

function buyHouse(){

 if(player.money < 10000){
  message("Need $10,000");
  return;
 }

 player.money -= 10000;
 player.apartment = true;
 player.aura += 10;

 message("Bought Apartment");
 update();
}

function useCheat(){

 let code =
 document.getElementById("cheatInput").value;

 if(code === "111078"){
  player.money += 5000000000;
  message("CHEAT ACTIVATED +$5,000,000,000");
 }

 if(code === "AURA999"){
  player.aura += 500;
 }

 if(code === "ENERGYMAX"){
  player.energy = 100;
 }

 update();
}

function message(text){
 document.getElementById("message").innerText =
 text;
}

function saveGame(){
 localStorage.setItem(
  "riseSave",
  JSON.stringify(player)
 );
}

function loadGame(){

 let save =
 localStorage.getItem("riseSave");

 if(save){
  player = JSON.parse(save);
 }

 update();
}

loadGame();
