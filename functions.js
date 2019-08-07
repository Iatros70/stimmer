var iArrRing = "x111111111122222221123333321123000321123000321123000321123333321122222221111111111";
var iElementsRing = 
    ["1,2,3,4,5,6,7,8,9,10,18,19,27,28,36,37,45,46,54,55,63,64,72,73,74,75,76,77,78,79,80,81",
    "11,12,13,14,15,16,17,20,26,29,35,38,44,47,53,56,62,65,66,67,68,69,70,71",
    "21,22,23,24,25,30,34,39,43,48,52,57,58,59,60,61"];

var iRing = 1;
var sType = "";
var iCalcCount = 0;
var iFieldCount = 0;
var iQuersumme = 0;
var bYellowClick = false;
var iSwitchFromID = 0;
var iSwitchToID = 0;
var sResult = "";
var bDispQuer = true;
// ---------------------------------------------------------------------------
window.onload = function()
{
//    alert("Zeigt er kein gelb markiertes Feld -> neu starten. Wird beim Start keine Quersumme angezeigt -> neu starten :-)");
  document.getElementById('chkQuer').checked = true;
  sType = "q";  
  for (var i = 1;i<=81;i++){
        var iZufall = Math.round((Math.random() * (9 - 1)) + 1);
        //$but = $('<input type="button" onclick = "btnClick(' & i & ')" >');
        $but = $('<input type="button" >');
        if (!((i >= 31 && i <= 33) || (i >= 40 && i <= 42) || (i >= 49 && i <= 51))) {
            $but.attr("value",iZufall.toString())
        }
        $but.attr("id",i.toString())
        FillColor(i);
          
        $but.addClass("but") //but wird in css unter .but behandelt
        $("#numbers").append($but)
        $but.on ("click",btnClick)   
        $("#"+i.toString())
    }
}
// ---------------------------------------------------------------------------
function btnClick(e) {
  if (!(e.target.style.background == 'yellow') && bYellowClick == false) {
    alert("Erst ein gelbes Feld zum Tausch anklicken.");
    return;
  }
  
  if (bYellowClick == true) {
    if (e.target.id == 31 || e.target.id == 32 || e.target.id == 33 || e.target.id == 40 || e.target.id == 41 || e.target.id == 42 || e.target.id == 49 || e.target.id == 50 || e.target.id == 51) {
        alert("Mit der Mitte darf nicht getauscht werden !");
        return;
    }
  }
	
  if (e.target.style.background == 'yellow' && bYellowClick == false) {
    iSwitchFromID = e.target.id;
    bYellowClick = true;
    return;
  }
  
 
 
  if (bYellowClick == true) {
    document.getElementById(iSwitchFromID).value = e.target.value;
    document.getElementById(e.target.id).style.visibility = "hidden";
    bYellowClick = false;
  }
  iQuersumme = 0; 
  CalcFields();
  //alert(e.target.id + " : " + e.target.value + " : " + GetRing(e.target.id));
  //alert ("BG: " + e.target.style.backgroundColor);
}
// ---------------------------------------------------------------------------
function GetRing(iId) {
  return iArrRing[iId];
}
// ---------------------------------------------------------------------------
function FillColor(i) {
  var a = "100";
  var b = "100";
  var c = "240";

  if (iArrRing[i] == 1) {
    b = "200";
    c= "250";
  }
  else if (iArrRing[i] ==2) {
    b = "250";
    c= "250";
  }
  else if (iArrRing[i] ==3) {
    a = "200";
    b = "250";
    c= "250";
  }
  
  if (sType == "q") {
    $but.css("background-color",'rgb(' + [a,b,c].join(',') + ')');
  }
  else {
    document.getElementById(i.toString()).style.background = "rgb(" + a + "," + b + "," + c + ")";
  }
}
// ---------------------------------------------------------------------------
function Start() {
  /*
  if (iRing == 1) {
    document.getElementById('ToDo').innerHTML  = "1. Ring: addieren";
    var iZufall = Math.round((Math.random() * (32 - 1)) + 1);
    document.getElementById(iZufall.toString()).style.background='yellow';
    //document.getElementById(sArr).style.display="none";
  }
  */

    DispRingTask();
  
    DispMarkedFields();
  
    CalcFields();
}
// ---------------------------------------------------------------------------
function btnOk() {
  if (iQuersumme <= 0) {
    alert("Nur Ergebnisse zwischen 1 und 9 erlaubt !");
    return;
  }

  for (var i = 0; i < sResult.split(",").length; i++) {
    if (iQuersumme == sResult.split(",")[i]) {
      alert("Zahl ist bereits vorhanden !");
      return;
    }
  }

  sResult += "," + iQuersumme;
  
  FillField();
  iCalcCount++;
  if (iCalcCount == 3) {
    DisableRing(iRing);
    iRing++;
    iCalcCount = 0;
    DispRingTask();
    DisableMarked();
    DispMarkedFields();
  }
  else {
      DisableMarked();
      DispMarkedFields();
  }
    iQuersumme = 0;
  CalcFields();
}
// ---------------------------------------------------------------------------
function DisableRing(iValue) {
  var sArr = iElementsRing[iRing - 1];
  for (var i = 0; i < sArr.split(",").length; i++) {
    document.getElementById(iElementsRing[iRing - 1].split(",")[i]).style.visibility = "hidden";
  }
}
// ---------------------------------------------------------------------------
function DisableMarked() {
    sType = "g";
  for (var i = 1; i <= 81; i++) {
    FillColor(i);
  }    
}
// ---------------------------------------------------------------------------
function DispRingTask() {
  if (iRing == 1) {
    document.getElementById('ToDo').innerHTML  = "1. Ring: addieren";
  }
  if (iRing == 2) {
    document.getElementById('ToDo').innerHTML  = "2. Ring: subtrahieren";
  }
  if (iRing == 3) {
    document.getElementById('ToDo').innerHTML  = "3. Ring: multiplizieren";
  }
}
// ---------------------------------------------------------------------------
function DispMarkedFields() {
  var sArrFields = "";
  var iMax = 0;
  var iZufall = 0;

  sArrFields = iElementsRing[iRing - 1];
  iMax =  sArrFields.split(",").length - 1;
  
  
  
  iZufall = Math.round((Math.random() * (3 - 1)) + 1);
  if (iZufall == 1) {
    iZufall++;
  }

  var iArrZuf = [];
    iArrZuf.push(Math.round((Math.random() * (iMax - 1)) + 1));
    for (var i = 1; i < iZufall; i++) {
        var iZW = Math.round((Math.random() * (iMax - 1)) + 1);
        if (iArrZuf.indexOf(iZW) == true) {
          i--;
        }
        else {
          iArrZuf.push(iZW);
        }
    }
  
  for (var i = 0; i < iArrZuf.length; i++) {
    var sArr = sArrFields.split(",")[iArrZuf[i]];
    document.getElementById(sArr).style.background='yellow';
    document.getElementById(sArr).visible = false;
  }
}
// ---------------------------------------------------------------------------
function CalcFields() {
  document.getElementById('Quersumme').innerHTML = "";
  var iArrSummen = [];
  for (var i = 1; i <= 81; i++) {
    if (document.getElementById(i).style.background == 'yellow') {
      if (iRing == 1) {
        iQuersumme += parseInt(document.getElementById(i).value);
      }
      else {
        iArrSummen.push(parseInt(document.getElementById(i).value));
      }
    }
  }

 
  if (iRing == 2) {
    iArrSummen.sort(function(a, b){return b-a});
    iQuersumme = iArrSummen[0];
    for (var j = 1; j < iArrSummen.length; j++) {
      iQuersumme -= iArrSummen[j];
    }
  }
  
  
  if (iRing == 3) {
    if (iArrSummen.length == 2) {
      iQuersumme = iArrSummen[0] * iArrSummen[1];
    }
    else {
      iQuersumme = iArrSummen[0] * iArrSummen[1] * iArrSummen[2];
    }
  }
  
  if (iQuersumme < 10) {
    if (bDispQuer == true) {
      document.getElementById('Quersumme').innerHTML  = "Quersumme: " + iQuersumme.toString();
    }
  }
  else {
    var iSumme2 = 0;
    while (iQuersumme > 9) {
      var sDigits = iQuersumme.toString();
      iSumme2 = 0;
      for (var i = 0; i < sDigits.length; i++) {
        iSumme2 += parseInt(sDigits.substring(i, i + 1));
      }
      iQuersumme = iSumme2;
    }

    if (bDispQuer == true) {
      document.getElementById('Quersumme').innerHTML  = "Quersumme: " + iQuersumme.toString();
    }
  } 
}
// ---------------------------------------------------------------------------
function FillField() {
  var sPositions = "31,32,33,40,41,42,49,50,51";
  var iPosition2 = sPositions.split(",")[iFieldCount];
  document.getElementById(iPosition2).value = iQuersumme; //document.getElementById('Quersumme').innerHTML;
  iFieldCount++;
}
// ---------------------------------------------------------------------------
function Help() {
  var sHelp = "Das Spielfeld besteht aus drei Quadraten und einem innen liegenden 3x3 Feld<br>";
  sHelp += "Es werden 2 bis 3 Felder gelb markiert, auf die sich die durchgeführte Rechenoperation bezieht<br>Im aüßersten Quadrat werden die markierten Zahlen addiert, im 2. subtrahiert (die kleineren von den größeren) und im letzten alle multipliziert.<br>Das Ergebnis wird als einstellige Quersumme berechnet.<br>Per Option(noch nicht implementiert) kann die Anzeige der Quersumme ausgeschaltet werden<br>Das 3x3 Feld muss die Zahlen von 1-9 enthalten, die Reihenfolge spielt dabei keine Rolle.<br>Je Quadrat werden jeweils drei Rechenoperationen durchgeführt<br>Es können Zahlen in den drei umgebenden Quadraten getauscht werden. Hierzu ein gelb markiertes Feld anklicken, danach die Zahl, mit der getauscht werden soll. Das Feld der getauschten Zahl wird gelöscht und steht für den weiteren Ablauf nicht mehr zur Verfügung.<br>Jetzt müssen Sie neu starten, da ich keine Ahnung habe, wie ich hier einen Button einfüge, um zurück zu kommen. Aber ich könnte den Hilfetext über oder unter dem Spielfeld anzeigen lassen. Auch könnte ich beim ersten Klick auf Help den Text anzeigen und beim nächsten Klick wieder löschen. Will ich aber nicht";
  
  document.write(sHelp);
}
// ---------------------------------------------------------------------------
function DisplayQuer() {
  bDispQuer = document.getElementById("chkQuer").checked;
}
// ---------------------------------------------------------------------------
function New() {
		location.reload();
}
// ---------------------------------------------------------------------------
