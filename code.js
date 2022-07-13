function main() {

  var dice = [];
  dice[0] = [1, 2, 3]; // <-- dice is: one 0, two 1s, three 2s
  dice[1] = [2, 2, 2]; // <-- dice is: two 0s, two 1s, two 2s
  dice[2] = [3, 3]; // <-- dice is: three 0s, three 1s

  var simulroll = [4, 5, 1]; // what you want to simultaneously roll and find out the probability distribution for (e.g. [4, 5, 1] = four of dice[0], five of dice[1], 1 of dice[2])

  var urlcode = window.location.search.substring(1);

  if (urlcode != "") {
    var simulroll = [0, 0, 0]; 
    for(i=0; i<urlcode.length; i++){
      if(urlcode[i]=="A"){simulroll[0]++}
      if(urlcode[i]=="B"){simulroll[1]++}
      if(urlcode[i]=="C"){simulroll[2]++}
    }
  }

  var indvsimulroll = []; // array which splits the dice rolls individually;

  for (i = 0; i < simulroll.length; i++) {
    for (j = 0; j < simulroll[i]; j++) {
      indvsimulroll[indvsimulroll.length] = i;
    }
  }

  // the following function generates a new dice in the "dice" array that is equivalent to rolling two known dice simultaneously. "d1" and "d2" are the INDEXES (from the "dice" array) of the two dice you are rolling to create the new dice

  function combineroll(d1, d2) {
    dice[dice.length] = [];
    for (i = 0; i < dice[d1].length + dice[d2].length - 1; i++) {
      dice[dice.length - 1][i] = 0;
    }
    for (i = 0; i < dice[d1].length; i++) {
      for (j = 0; j < dice[d2].length; j++) {
        dice[dice.length - 1][i + j] += dice[d1][i] * dice[d2][j];
      }
    }
  }

  // the following function generates a new dice in the "dice" array that is equivalent to rolling multiples simultaneously. It uses the previous function iteratively to accomplish this. The input, "multidice", is an array that refers to which dice you are rolling. So, for example, an input of [1, 1, 1, 2, 2, 3] would be rolling AAABBC (where A = dice[0], B = dice[1], C= dice[2]). The outputted "dice" equivalent to rolling AAABBC will be the final element of the "dice" array (it is the final element rather than simply the next element because, along the way, the "combineroll" function has generated some intermediate dice to lead up to this final result).

  function massroll(multidice) {
    if (multidice.length == 2) {
      combineroll(multidice[0], multidice[1])
    }
    else {
      combineroll(multidice[0], multidice[1])
      var tempmultidice = [];
      tempmultidice[0] = dice.length - 1;
      for (i = 1; i < multidice.length - 1; i++) {
        tempmultidice[i] = multidice[i + 1];
      }
      massroll(tempmultidice);
    }
  }

  // "Part 1" outputs the initial dice conditions just to clarify that you've got it right for what you want!

  document.getElementById("bongo").innerHTML = "Your starting dice are:<br>";
  for (i = 0; i < dice.length; i++) {
    document.getElementById("bongo").innerHTML += "Dice &#" + (i + 65) + "; :";
    for (j = 0; j < dice[i].length; j++) {
      for (k = 0; k < dice[i][j]; k++) {
        document.getElementById("bongo").innerHTML += "|" + j;
      }
    }
    document.getElementById("bongo").innerHTML += "|<br>";
  }

  massroll(indvsimulroll);

  // "Part 2" tells you the probabilities that you get from rolling combinations of dice!

  document.getElementById("drum").innerHTML = "When you roll ";
  for (i = 0; i < simulroll.length; i++) {
    for (j = 0; j < simulroll[i]; j++) {
      document.getElementById("drum").innerHTML += "&#" + (i + 65);
    }
  }
  document.getElementById("drum").innerHTML += " your outcome distribution is:<br>";

  var totalsides = 0;
  for (i = 0; i < dice[dice.length - 1].length; i++) {
    totalsides += dice[dice.length - 1][i];
  }
  for (i = 0; i < dice[dice.length - 1].length; i++) {
    document.getElementById("drum").innerHTML += "" + i + ": " + Math.floor(1000000 * dice[dice.length - 1][i] / totalsides) / 10000 + "%<br>";
  }
}

main();