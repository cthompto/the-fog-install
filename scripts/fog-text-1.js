var textBlock = "";
var textBlockA1 = "";
var textBlockA2 = "";
var textBlockA3 = "";
var ariaLabelT = "";
var ariaLabel1 = "";
var ariaLabel2 = "";
var ariaLabel3 = "";

//Intro Text

const fogFiller = [
  "------------------",
  "~~~~~~~~~",
  "~~~-----~~~~~",
  "........... ",
  "+++++",
  "----",
  "________",
  "______------",
  "------______",
  "+++++-------",
  "~~~~~~+++",
  " ",
  " ",
  " ",
  " ",
];

const fogPhraseOne = [
  " As a barrier to military and capitalist progress. ",
  " As an obstacle to military and commercial advancement. ",
  " As disruptive to military and economic projects. ",
];

const fogPhraseTwo = [
  " As a symbol of the fear of the unknown. ",
  " As a figure in horror narratives. ",
  " As an embodiment of uncertainty. ",
];

const fogPhraseThree = [
  " As a positive model for trans embodiment. ",
  " As an aspirational figure for trans visibility. ",
  " As the relatable monster in an allegory of trans liberation. ",
];

const fogWords = [
  " The Fog: ",
  " An artwork in three acts. ",
  " Exploring our relationship to fog: ",
  fogPhraseOne[getRandomInt(fogPhraseOne.length)],
  fogPhraseTwo[getRandomInt(fogPhraseTwo.length)],
  fogPhraseThree[getRandomInt(fogPhraseThree.length)],
];

//Act Text Filler

const fogFiller2 = [
  "----",
  "~~~~",
  "~~~---~~",
  "..... ",
  "+++",
  "--",
  "_____",
  "___----",
  "---_____",
  "++++---",
  "~~~~+++",
  " ",
  " ",
];

//Act 1 Text

const fogWords1A1 = [
  " During WWII, allied forces developed a system called Fog Investigation and Dispersal Operation or FIDO to disperse fog on military runways through the use of walls of flame. ",
  " While technically effective at briefly clearing fog, the system was impractical as it used vast quantities of fuel and was discontinued after the war. ",
];

const fogWords2A1 = [
  " From foghorns to the “fog of war” to military efforts to disperse fog, the phenomenon has long been at odds with militaristic and capitalistic ideas of progress and control. ",
  " In obscuring coasts, roads, and runways, fog denies us the situational awareness upon which so much of contemporary life is built. ",
  " In its denial of ocular sight, fog highlights the value we place on seeing as knowing and opens up space to consider who gets to see and to what ends do they use that sight? ",
];

//Act 2 Text

const fogWords1A2 = [
  " As both trope and figure itself, fog has featured prominently across horror narratives as landscape, harbinger, coconspirator, and monster. ",
  " Whether drifting through tombstones in a graveyard, engulfing a fearful protagonist, or spawning inexplicable horrors, our fear of the unknown is often made manifest by fog. ",
  " This too exposes the value we place on seeing as knowing and offers us the opportunity to relish in the known and unseeable. ",
];

//Act 3 Text

const fogWords1A3 = [
  " As something both visible and obscuring, considering fog as a positive model of being in the world opens up new pathways for being in the world as a trans person. ",
  " Might I, as a trans person, be seen for who I am yet still with the right and power of obscurity? ",
  " As fog resists the logic of seeing as knowing, might being like fog open up a space for feeling as knowing or being as knowing? ",
  " To be in the world as fog is: ephemeral yet seen, visible yet difficult to capture, known yet expanding the possibilities of the unknown. ",
];

//Execute Text Builders on Page Load

window.onload = allText;

function allText() {
  makeTextFog();
  makeTextFogA1();
  makeTextFogA2();
  makeTextFogA3();
  window.scrollTo(0, -100);
}

//Intro Text Functions

function makeTextFog() {
  buildText();
  var fogP = document.createElement("p");
  fogP.style.padding = "10%";
  fogP.style.margin = 0;
  fogP.style.textAlign = "center";
  var fogText = document.createTextNode(textBlock);
  fogP.appendChild(fogText);
  var currentDiv = document.getElementById("div1");
  currentDiv.style.height = "auto";
  currentDiv.role = "img";
  currentDiv.ariaLabel = ariaLabelT;
  currentDiv.appendChild(fogP);
  console.log(textBlock);
  console.log("^^^ Fog Intro Text Done ^^^");
}

function buildText() {
  var textCounter = 0;
  while (textBlock.length <= 2500) {
    var cloudOrText = getRandomInt(20);
    if (cloudOrText <= 18) {
      textBlock = textBlock + fogFiller[getRandomInt(fogFiller.length)];
    } else {
      if (textCounter < fogWords.length && textBlock.length > 500) {
        textBlock = textBlock + fogWords[textCounter];
        ariaLabelT = ariaLabelT + fogWords[textCounter];
        textCounter++;
      }
    }
  }
}

//Act 1 Text Functions

function makeTextFogA1() {
  buildTextA1();
  var fogPA1 = document.createElement("p");
  fogPA1.style.padding = "5%";
  fogPA1.style.margin = 0;
  fogPA1.style.textAlign = "center";
  var fogTextA1 = document.createTextNode(textBlockA1);
  fogPA1.appendChild(fogTextA1);
  var currentDivA1 = document.getElementById("a1-th");
  currentDivA1.style.height = "auto";
  currentDivA1.role = "img";
  currentDivA1.ariaLabel = ariaLabel1;
  currentDivA1.appendChild(fogPA1);
  console.log(textBlockA1);
  console.log("^^^ Act 1 Text Done ^^^");
}

function buildTextA1() {
  var textCounterA1 = 0;
  while (textBlockA1.length <= 750) {
    var cloudOrTextA1 = getRandomInt(20);
    if (cloudOrTextA1 <= 14) {
      textBlockA1 = textBlockA1 + fogFiller2[getRandomInt(fogFiller2.length)];
    } else {
      if (textCounterA1 < fogWords2A1.length && textBlockA1.length > 100) {
        textBlockA1 = textBlockA1 + fogWords2A1[textCounterA1];
        ariaLabel1 = ariaLabel1 + fogWords2A1[textCounterA1];
        textCounterA1++;
      }
    }
  }
}

//Act 2 Functions

function makeTextFogA2() {
  buildTextA2();
  var fogPA2 = document.createElement("p");
  fogPA2.style.padding = "5%";
  fogPA2.style.margin = 0;
  fogPA2.style.textAlign = "center";
  var fogTextA2 = document.createTextNode(textBlockA2);
  fogPA2.appendChild(fogTextA2);
  var currentDivA2 = document.getElementById("a2-th");
  currentDivA2.style.height = "auto";
  currentDivA2.role = "img";
  currentDivA2.ariaLabel = ariaLabel2;
  currentDivA2.appendChild(fogPA2);
  console.log(textBlockA2);
  console.log("^^^ Act 2 Text Done ^^^");
}

function buildTextA2() {
  var textCounterA2 = 0;
  while (textBlockA2.length <= 750) {
    var cloudOrTextA2 = getRandomInt(20);
    if (cloudOrTextA2 <= 14) {
      textBlockA2 = textBlockA2 + fogFiller2[getRandomInt(fogFiller2.length)];
    } else {
      if (textCounterA2 < fogWords1A2.length && textBlockA2.length > 100) {
        textBlockA2 = textBlockA2 + fogWords1A2[textCounterA2];
        ariaLabel2 = ariaLabel2 + fogWords1A2[textCounterA2];
        textCounterA2++;
      }
    }
  }
}

//Act 3 Functions

function makeTextFogA3() {
  buildTextA3();
  var fogPA3 = document.createElement("p");
  fogPA3.style.padding = "5%";
  fogPA3.style.margin = 0;
  fogPA3.style.textAlign = "center";
  var fogTextA3 = document.createTextNode(textBlockA3);
  fogPA3.appendChild(fogTextA3);
  var currentDivA3 = document.getElementById("a3-th");
  currentDivA3.style.height = "auto";
  currentDivA3.role = "img";
  currentDivA3.ariaLabel = ariaLabel3;
  currentDivA3.appendChild(fogPA3);
  console.log(textBlockA3);
  console.log("^^^ Act 3 Text Done ^^^");
}

function buildTextA3() {
  var textCounterA3 = 0;
  while (textBlockA3.length <= 850) {
    var cloudOrTextA3 = getRandomInt(20);
    if (cloudOrTextA3 <= 14) {
      textBlockA3 = textBlockA3 + fogFiller2[getRandomInt(fogFiller2.length)];
    } else {
      if (textCounterA3 < fogWords1A3.length && textBlockA3.length > 100) {
        textBlockA3 = textBlockA3 + fogWords1A3[textCounterA3];
        ariaLabel3 = ariaLabel3 + fogWords1A3[textCounterA3];
        textCounterA3++;
      }
    }
  }
}

//General Functions

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
