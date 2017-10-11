function parseDate (tmpdate, offset){
  var date = new Date (parseInt(tmpdate.substring(0+offset,4+offset),10),
  parseInt(tmpdate.substring(4+offset,6+offset),10)-1,
  parseInt(tmpdate.substring(6+offset,8+offset),10),
  parseInt(tmpdate.substring(9+offset,11+offset),10),
  parseInt(tmpdate.substring(11+offset,13+offset),10),0,0);

  return date;
}



function parseIcal(url) {
  var events = [];
  var x;
  readTextFile(url, function(a){x=a;});

  lines = x.split("\n");

  for (var i=0; i<lines.length; i++){

    var arg_val = lines[i].split(":");

    switch (arg_val[0]) {

      case "BEGIN":
        if (arg_val[1].match(/^VEVENT/)){
          var event = {
            start:null,
            end:null,
            desc:null,
            repeat:0,
            where:null,
            until:0
          }
          var tmp = []
          while (lines[i].split(":")[0]!="END"){
            tmp.push(lines[i]);
            i++;
          }

          for (var c = 0; c<tmp.length; c ++){
            var line = tmp[c];
            if (line.match(/^DTSTART/)){
              var tmpdate = line.split(":")[1];
              event.start = parseDate(tmpdate, 0);
              //console.log(line);
            } else
            if (line.match(/^DTEND/)){
              var tmpdate = line.split(":")[1];
              event.end = parseDate(tmpdate,0);
            } else if (line.match(/^RRULE/)){
              if (line.search(/UNTIL/)>=0){
                var dat = parseDate(line, line.search(/UNTIL/)+6);
                event.until = dat;
              }
              else event.until = 0;

              if (line.match(/WEEKLY/))
                event.repeat = 7;
                else
              if (line.match(/DAILY/))
                event.repeat = 1;
//////////////////////////////////////////
//  change next line to
//  } else if (line.match(/^DESCRIPTION/)){
//  if you prefer (wont work with example, since it has no descriptions)
//////////////////////////////////////////
            } else if (line.match(/^SUMMARY/)){
              event.desc = line.split(":")[1].replace("\\", "");
            }

          }
          if (event.until>new Date() || event.until==0)
            events.push(event);
          console.log(event);
        }


        break;
      default:

    }
  }




  return events;

}


function readTextFile(file, func)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                func(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}
