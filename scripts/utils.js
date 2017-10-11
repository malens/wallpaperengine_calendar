function isToday (date, interval){
  if (interval == 0) return false;
  var today = new Date();
  today.setHours(23);
  for (var tmp = date; tmp <= today; tmp.setDate(tmp.getDate() + interval)){
    if (tmp.getDate()==today.getDate() && tmp.getMonth()==today.getMonth()) return true;
  }
  return false;
}
function isNextDay (date, interval){
  if (interval == 0) return false;
  var today = new Date();
  today.setDate(today.getDate()+1);
  today.setHours(23);
  for (var tmp = date; tmp <= today; tmp.setDate(tmp.getDate() + interval)){
    if (tmp.getDate()==today.getDate() && tmp.getMonth()==today.getMonth()) return true;
  }
  return false;
}


function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}


function arr_to_string (arr){
  var str = "";
  for (var x = 0; x<arr.length; x++){
    str += "<li>" + arr[x].desc + " " + arr[x].start.getHours()
    + ":" + str_pad_left(arr[x].start.getMinutes(),'0',2) + " - " + arr[x].end.getHours()
    + ":" + str_pad_left(arr[x].end.getMinutes(),'0',2) + "</li>";
  }
  return str;
}
