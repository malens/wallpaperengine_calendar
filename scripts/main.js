
var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));
var s = parseIcal(dir + "/basic.ics");
var str ="";
var nextstr="";
var arr = [];
var nextday = [];
  for (var x = 0; x< s.length; x++){
    if (isToday(s[x].start, s[x].repeat)){
      arr.push(s[x]);
    } else if (isNextDay(s[x].start, s[x].repeat)){
      nextday.push(s[x]);
    }
  }
  //console.log(arr);
  arr.sort(function (a,b){
    return (a.start.getHours() * 60 + a.start.getMinutes()) - (b.start.getHours() * 60 + b.start.getMinutes());
  });
  nextday.sort(function (a,b){
    return (a.start.getHours() * 60 + a.start.getMinutes()) - (b.start.getHours() * 60 + b.start.getMinutes());
  });

  str = arr_to_string(arr);
  nextstr = arr_to_string(nextday);



  if (nextday.length==0) {
    nextstr += "<li> WOLNE </li>";
    document.getElementById('listnext').style.fontSize = "150%";
  }
  if (arr.length==0) {
    str += "<li> WOLNE </li>";
    document.getElementById('list').style.fontSize = "150%";
  }
  //console.log(nextstr);
  //console.log(str);

  var flag = false;
  document.getElementById('trigger').onmouseover = function(){
    document.getElementById('list').style.display = 'none';
    document.getElementById('listnext').style.display = 'block';
  }

  document.getElementById('trigger').onmouseout = function(){
    document.getElementById('list').style.display = 'block';
    document.getElementById('listnext').style.display = 'none';
  }



  document.getElementById('list').style.display = 'block';
  document.getElementById('listnext').style.display = 'none';
  document.getElementById('list').innerHTML = str;
  document.getElementById('listnext').innerHTML = nextstr;
