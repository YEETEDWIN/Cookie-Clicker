//variables
var clicks = 0; //increment this by one every click
var gems = 0;
var auto_clicks = 0; //automatically click once per second
var cost = 1; //the cost of this should increase exponentially
var clicker_speed = 0;
var upgrade_speed = 0; //the level of the speed up upgrade
var click_rate = 1000; //ms between each autoclick
var interval_auto; //storing our interval here so we can update it
var click_increment = 1; //how many clicks per click

//lists


//functions

function Increase_Decrease() {
  var img = document.getElementById("cook");
  var w = img.width;
  var h = img.height;

  if (w <= 70 && h <= 70) {
    img.changeSize = 25;   // At bottom of range. So must now go up
  } else if (w >= 95 && h >= 95) {
    img.changeSize = -25;    // At top of range. So must now go down again
  }

  img.width += 1 * img.changeSize;   // Attributes are strings. Multiply by 1 is one of several ways to quickly convert it to a number
  img.height += 1 * img.changeSize;
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function update_total_clicks() { //updates the number of clicks   
    var e = document.getElementById("total_clicks");
    e.innerHTML = clicks;
}

function buy_something(c, button) {
    if (clicks < c) {
        button.className = 'btn btn-danger';
        setTimeout(function() {
            var e = document.getElementsByClassName("btn-danger")[0];
            e.className = 'btn btn-success';
        }, 1000);
        return false;
    }
    clicks -= c;
    return true;
}

function update_workers() {
    var e2 = document.getElementById("time_period");
    e2.innerHTML = parseFloat(click_rate / 1000.0).toFixed(2);
    clearInterval(interval_auto);
    interval_auto = setInterval(function() {
        clicks += auto_clicks;
        update_total_clicks();
    }, click_rate);
}

//sounds
notkaching = new sound("znotkach.mp3");
kaching = new sound("zkaching.mp3");
jackpot = new sound("zmoney.mp3")
//ding = new sound("zding.mp3"); I didnt put it here as there are problems

//sound functions
function kach() {
    var random = Math.floor(Math.random() * 6501) - 3500;
    if (200 < random) {
      kaching.play();
      clicks += random
    } else if (2000 <= random) {
      jackpot.play()
      alert("🎰 YOU WON THE JACKPOT! 💰")
      clicks += random
    } else {
      notkaching.play();
      clicks += random
    }
}

//click events
document.getElementById("click").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    clicks = parseFloat(clicks) + parseFloat(click_increment);
    update_total_clicks(); //updates the text
    Increase_Decrease()

};
document.getElementById("buy_click").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    if (!buy_something(cost, this)) return;
    auto_clicks++;
    cost = Math.pow(2, auto_clicks); //new cost
    update_total_clicks();
    var e = document.getElementById("clicks_per_second");
    e.innerHTML = auto_clicks;
    var e2 = document.getElementById("buy_click");
    e2.innerHTML = 'Buy for ' + cost  + ' Clicks';
    var e2 = document.getElementById("autoclicker_level");
    e2.innerHTML = 'lvl  ' + auto_clicks;
};
document.getElementById("clicker").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    var upgrade_cost = (Math.pow(2, clicker_speed)) * 200;
    if (!buy_something(upgrade_cost, this)) return;
    click_increment +=1;
    clicker_speed++;
    update_workers();
    var e2 = document.getElementById("clicker");
    e2.innerHTML = 'Buy for ' + (Math.pow(2, clicker_speed)) * 200 + ' Clicks';
    var e2 = document.getElementById("clickerlvl");
    e2.innerHTML = 'lvl  ' + clicker_speed;
    var e = document.getElementById("pclick");
    e.innerHTML = click_increment;
};
document.getElementById("upgrade_speed").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    var upgrade_cost = (Math.pow(2, upgrade_speed)) * 100;
    if (!buy_something(upgrade_cost, this)) return;
    upgrade_speed++;
    click_rate = click_rate * 0.90;
    update_workers();
    var e2 = document.getElementById("upgrade_speed");
    e2.innerHTML = 'Buy for ' + ((Math.pow(2, upgrade_speed)) * 100) + ' Clicks';
    var e2 = document.getElementById("speed_level");
    e2.innerHTML = 'lvl  ' + upgrade_speed;
};
document.getElementById("buy_win").onclick = function() {
    var upgrade_cost = (100000)
    if (!buy_something(upgrade_cost, this)) return;
    win = new sound("zwinner.mp3");
    win.play();
    location.replace("Winner.html");
};
document.getElementById("lotto").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    var upgrade_cost = (200);
    if (!buy_something(upgrade_cost, this)) return;
    kach()
    update_workers();
};
//document.getElementById("buy_gem").onclick = function() {
    //ding = new sound("zding.mp3");
    //ding.play();
    //var upgrade_cost = (1200);
    //if (!buy_something(upgrade_cost, this)) return;
    //gems++;
    //update_workers();
    //var e = document.getElementById("total_gems");
    //e.innerHTML = gems;
    //update_workers();
//};
document.getElementById("search").onclick = function() {
    ding = new sound("zding.mp3");
    ding.play();
    var upgrade_cost = (400)
    if (!buy_something(upgrade_cost, this)) return;
    var resources = [
    { resource: false, chance: 0.380 },
    { resource: 'Golden Ticket', chance: 0.055 },
    { resource: '1000 Cheque', chance: 0.200 },
    { resource: '500 Cheque', chance: 0.300 },
    { resource: 'Infected Cookie', chance: 0.030 },
    { resource: 'Death', chance: 0.015 },
    { resource: 'Cookie', chance: 0.020 }
    ];

    function get_result(resouceList) {
      //get our random from 0 to 1
      var rnd = Math.random();
  
      //initialise our cumulative percentage
      var cumulativeChance = 0;
      //iterate over our resources
      for (var i = 0; i < resouceList.length; i++) {
    
        //include current resource
        cumulativeChance += resouceList[i].chance;
    
        if (rnd < cumulativeChance)
          return resouceList[i].resource;
      }
    return false;
    }
    if (get_result(resources) === "500 Cheque") {
      var found = 500;
      clicks += found;
      //alert("💵 YOU GOT A 500 CLICKS CHEQUE 💵");
    } else if (get_result(resources) === "1000 Cheque") {
      var found = 1000;
      clicks += found;
      //alert("💵 YOU GOT A 1000 CLICKS CHEQUE");
    } else if (get_result(resources) === "Cookie") {
      var found = 5000;
      clicks += found;
      alert("🍪 YOU GOT A COOKIE!!! You got 5000 Clicks 🍪");
    } else if (get_result(resources) === "Infected Cookie") {
      var found = -3500;
      clicks += found;
      alert("🍪 YOU GOT A INFECTED COOKIE!!! You lost 3500 Clicks 🍪");
    } else if (get_result(resources) === "Golden Ticket") {
      var found = 2000;
      clicks += found;
      //alert("🎫 YOU GOT A GOLDEN TICKET!!! You got 2000 Clicks 🎫");
    } else if (get_result(resources) === "Death") {
      var found = -5000;
      clicks += found;
      alert("💀 YOU DIED!!! You lost 5000 Clicks 💀");
    }
    //test WORKS
};
//Start Autoclickers
update_workers();

function set_cookie(cookie_name, value) {
    expiry = new Date();
    expiry.setTime(new Date().getTime() + (10 * 60 * 1000));
    var c_value = escape(btoa(JSON.stringify(value))) + "; expires=" + expiry.toUTCString();
    document.cookie = cookie_name + "=" + c_value;
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + cookie_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(cookie_name + "=");
    }
    if (c_start == -1) return false;
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
        c_end = c_value.length;
    }
    c_value = atob(unescape(c_value.substring(c_start, c_end)));
    return JSON.parse(c_value);
}

