var browserName=navigator.appName;
var browserVersion=parseInt(navigator.appVersion);

var gNow = new Date();
var gArgDate;


//var IMG_URL = "/imgs/common/";
//var IMG_URL2 = "/imgs/button/";
var IMG_URL = "/ims/docs/imgs/common/";
var IMG_URL2 = "/ims/docs/imgs/button/";

var moz = 1.00;

var weekend = [0,6];
var weekendColor = "skyblue";
var sundayColor = "pink";  // 20011007 kang
var fontface = "돋움체";
var fontsize = -1;
var gMessage = "";
var gitem = "";
var gNow = new Date(); 
var gArgDate;
var isNav = (navigator.appName.indexOf("Netscape") != -1) ? true : false;
var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? true : false;



//Calendar.Months = ["1월", "2월", "3월", "4월", "5월", "6월","7월", "8월", "9월", "10월", "11월", "12월"];
Calendar.Months = ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"];

// Non-Leap year Month days..
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Leap year Month days..
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



// 달력 위치조정 (마우스클릭하는 위치에서 x,y값을주어 위치변경 
function DivAlign(left,top){
        
    document.getElementById('calendar').style.left= left ;
    document.getElementById('calendar').style.top= top ;        

}


//2000, 01, 01 각각input box에 넣는다.
function getSelectDate(formDataNameObj1,formDataNameObj2,formDataNameObj3, isNowDate, e){

  paramNum=3;
  var dateVal;
  if (isNowDate==null || isNowDate=='') isNowDate = get_CurDate(0);

  // 사용자의 브라우저가 NETSCAPE인 경우

  
  //if ((browserName=="Netscape" && browserVersion>=5) ||   ( browserName=="Microsoft Internet Explorer" && browserVersion>=4)) {
   
    displayCal1(formDataNameObj1,formDataNameObj2,formDataNameObj3, isNowDate, e);
    
 // }
  // IE인 경우
  //else
  //{
    
  //  dropdownOn(0, formDataName, null, x, y);
 // }

}





function displayCal1(myTgt1,myTgt2,myTgt3, isNowDate, e){
  //alert("개인displayCal:" + myTgt1.value + "&&" + myTgt2.value + "&&" + myTgt3.value + "&isNowDate:"+ isNowDate );

  var calendar = document.getElementById('calendar');
   
  target1 = myTgt1;
  target2 = myTgt2;
  target3 = myTgt3;

  dateVal1 = target1.value;
  dateVal2 = target2.value;
  dateVal3 = target3.value;
    
 
/*
  if(browserName == 'Netscape'){                
        var x = document.body.clientX;
        var y = document.body.clientY;
  }else{
        var x = (document.layers) ? loc.pageX : event.clientX;
        var y = (document.layers) ? loc.pageY : event.clientY;
  }


  calendar.style.pixelTop = y-15;
  calendar.style.pixelLeft = x-30;
*/
  var browser = navigator.userAgent.toLowerCase();  
    

  if (browser.indexOf('chrome') != -1 || browser.indexOf('safari') != -1 ) {   
    var t_top = e.clientY + document.body.scrollTop + 0;
    var t_left = e.clientX + document.body.scrollLeft + 0;

  }else{
        
    var t_top = e.clientY + document.documentElement.scrollTop - 70;
    var t_left = e.clientX + document.documentElement.scrollLeft + 0;
  } 

    t_top = t_top / moz;
    t_left = t_left / moz;
    

    //calendar.style.top = e.clientY + document.documentElement.scrollTop + 0;
    //calendar.style.left = e.clientX + document.documentElement.scrollLeft + 0;

    $('#calendar').css('top', t_top + 'px');
    $('#calendar').css('left', t_left  + 'px');


  calendar.style.display = (calendar.style.display == "block") ? "none" : "block";

  var newSelectDate;

 
  if (dateVal1 == null || dateVal1 == ""){
  
    if (isNowDate!=null) newSelectDate = isNowDate.substring(0,4)+ "/" + eval(isNowDate.substring(4,6)) +"/"+ eval(isNowDate.substring(6));
    else newSelectDate="";
  }else{
    
    if ( isNumeric(dateVal1) && isNumeric(dateVal2) && isNumeric(dateVal3) ) {
      if ( dateVal1.length != 4 
        || dateVal2.value > 12 || dateVal2.value <= 0
        || dateVal3.value > 31 || dateVal3.value <= 0 
        || dateVal1 =='' || dateVal2 =='' || dateVal2 =='') {
        newSelectDate="";
      } else {
        newSelectDate = dateVal1+ "/" + eval(dateVal2) +"/"+ eval(dateVal3);
      }
    } else {
      newSelectDate="";
    }
  }
 
  show_calendar2(newSelectDate);
}


/* 날짜를 입력 받아 전체 달력 FORM 보여주기 **********************/
function show_calendar2(selectDate) {

    

//  alert("show calendar2::selectdate::" + selectDate );
  if( selectDate== "" || selectDate == null ){

    p_month = new String(gNow.getMonth());
    p_year = new String(gNow.getFullYear());
    gArgDate = gNow;

  } else {

    var sTmp;
    var sTmpLen = selectDate.indexOf("/");
    var sNowYear  = selectDate.substring(0, sTmpLen);
    sTmp  = selectDate.substring(sTmpLen+1);
    sTmpLen = sTmp.indexOf("/");
    var sNowMonth = sTmp.substring(0, sTmpLen);
    var sNowDay=sTmp.substring(sTmpLen+1);

    gNow.setFullYear(sNowYear);
    gNow.setMonth(parseInt(sNowMonth)-1);
    gNow.setDate(sNowDay);

    gArgDate = new Date(selectDate);//alert("show calendar2::gArgDate::" + gArgDate );
    p_month = new String(gArgDate.getMonth());
    p_year =  new String(gArgDate.getFullYear());
  }

  gMessage = "";
 
 
  gCal = new Calendar( p_month, p_year, "YYYY.MM.DD");


  // Customize your Calendar here..
  gCal.gBGColor="white";
  gCal.gLinkColor="blue";
  gCal.gTextColor="black";
  gCal.gHeaderColor="brown";

  // Choose appropriate show function
  return (gCal.show());

}

function Calendar( p_month, p_year, p_format) 
{ //alert("Calendar" + p_month+ p_year+ p_format);
    if ((p_month == null) && (p_year == null))  return;
    else 
    { //alert("Calendar not null");
        this.gMonthName = Calendar.get_month(p_month);
        this.gMonth = new Number(p_month);
        this.gYearly = false;
    }

    this.gYear = p_year;
    this.gFormat = p_format;
    this.gBGColor = "white";
    this.gFGColor = "black";
    this.gTextColor = "black";
    this.gHeaderColor = "black";
}

Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;

function Calendar_get_month(monthNo) 
{//alert("Calendar_get_month");
    return Calendar.Months[monthNo];
}

function Calendar_get_daysofmonth(monthNo, p_year) 
{//alert("Calendar_get_daysofmonth");
    /* 
    Check for leap year ..
    1.Years divisible by four and 400 are leap years, except for...
    2.Years divisible by 100 are not leap years 
    */
    if ((p_year % 4) == 0) 
    {
        if ((p_year % 100) == 0 && (p_year % 400) != 0)
            return Calendar.DOMonth[monthNo];
    
        return Calendar.lDOMonth[monthNo];
    } 
    else    return Calendar.DOMonth[monthNo];
}

function Calendar_calc_month_year(p_Month, p_Year, incr) 
{ //alert("Calendar_calc_month_year");
    /* 
    Will return an array with 1st element being the calculated month 
    and second being the calculated year 
    after applying the month increment/decrement as specified by 'incr' parameter.
    'incr' will normally have 1/-1 to navigate thru the months.
    */
    var ret_arr = new Array();
    
    if (incr == -1) 
    {
        if (p_Month == 0)       // B A C K W A R D
        {
            ret_arr[0] = 11;
            ret_arr[1] = parseInt(p_Year) - 1;
        }
        else 
        {
            ret_arr[0] = parseInt(p_Month) - 1;
            ret_arr[1] = parseInt(p_Year);
        }
    } 
    else if (incr == 1) 
    {
        if (p_Month == 11)      // F O R W A R D
        {
            ret_arr[0] = 0;
            ret_arr[1] = parseInt(p_Year) + 1;
        }
        else 
        {
            ret_arr[0] = parseInt(p_Month) + 1;
            ret_arr[1] = parseInt(p_Year);
        }
    } 
    
    return ret_arr;
}

// This is for compatibility with Navigator 3, we have to create and discard one object before the prototype object exists.
new Calendar();


function getNowDay(){
    var nowDay = eval(gNow.getDate())<10?"0"+gNow.getDate():gNow.getDate();
    return nowDay;
}
function getNowMonth(){
    var nowMonth = parseInt(gNow.getMonth())+1 < 10 ? "0" + (parseInt(gNow.getMonth())+1) : parseInt(gNow.getMonth())+1;
    return nowMonth;
}
function getNowYear(){
    var nowYear = gNow.getYear();
    return nowYear;
}



Calendar.prototype.show = function() 
{   //alert("show");
    var vCode = "";
    
    var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
    var prevMM = parseInt(prevMMYYYY[0]) + 1;
    var prevYYYY = parseInt(prevMMYYYY[1]);

    var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
    var nextMM = parseInt(nextMMYYYY[0]) + 1;
    var nextYYYY = parseInt(nextMMYYYY[1]);            
            
    /*
    Cal_HTML = "";
    Cal_HTML=Cal_HTML+"<table width=162 border=0 cellspacing=1 cellpadding=0 bgcolor=666666  onmouseover='javascript:doOver()' onmouseout='javascript:doOut()'>";
    Cal_HTML=Cal_HTML+"<tr> ";
    Cal_HTML=Cal_HTML+"<td bgcolor=ffffff> ";
    Cal_HTML=Cal_HTML+"<table width=160 border=0 cellspacing=0 cellpadding=0>";
    Cal_HTML=Cal_HTML+"<tr> ";
    Cal_HTML=Cal_HTML+"<td width=34 colspan=2><img src=" + IMG_URL +  "t_year.gif width=34 height=12></td>";
    Cal_HTML=Cal_HTML+"<td rowspan=2 align=center bgcolor=b9e4d6 class=calender_title>"+ this.gMonthName + "/"+ this.gYear + "</td>";
    Cal_HTML=Cal_HTML+"<td width=34 colspan=2><img src=" + IMG_URL +  "t_mon.gif width=34 height=12></td>";
    Cal_HTML=Cal_HTML+"</tr>";
    
    var giMonth = parseInt(this.gMonth)+1;
    var gMonth=(giMonth.toString().length < 2)?"0"+giMonth:giMonth;
    var giDate = gArgDate.getDate();
    var gDate=(giDate.toString().length < 2)?"0"+giDate:giDate;
    
    Cal_HTML=Cal_HTML+"<tr>"; 
    Cal_HTML=Cal_HTML+"<td width=17 bgcolor=9ccfce> <A HREF=\"#\" style='cursor:hand' onclick=\"javascript:show_calendar2('" + (parseInt(this.gYear)-1) + "/" + gMonth + "/" + gDate + "');\"><img src=" + IMG_URL +  "btn_cprev.gif width=10 height=9 hspace=3 vspace=3 border=0></a></td>";
    
    var nniMonth = parseInt(this.gMonth)+1;
    var nnMonth=(giMonth.toString().length < 2)?"0"+nniMonth:nniMonth;
    var nniDate = gArgDate.getDate();
    var nnDate=(nniDate.toString().length < 2)?"0"+nniDate:nniDate;
    
    
    Cal_HTML=Cal_HTML+"<td width=17 bgcolor=9ccfce><A HREF=\"#\" onclick=\"javascript:show_calendar2('"+(parseInt(this.gYear)+1)+"/"+ nnMonth +"/"+nnDate+"');\"><img src=" + IMG_URL +  "btn_cnext.gif width=10 height=9 hspace=3 vspace=3 border=0></a></td>";
    
    var pMonth=(prevMM.toString().length < 2)?"0"+prevMM:prevMM;
    var piDate = gArgDate.getDate();
    var pDate=(giDate.toString().length < 2)?"0"+giDate:giDate;

    
    Cal_HTML=Cal_HTML+"<td width=17 bgcolor=9ccfce><A HREF=\"#\" onclick=\"javascript:show_calendar2('"+prevYYYY+"/"+pMonth+"/"+pDate+"');\"><img src=" + IMG_URL +  "btn_cprev.gif width=10 height=9 hspace=3 vspace=3 border=0></a></td>";
   
    var nMonth=(nextMM.toString().length < 2)?"0"+nextMM:nextMM;
    var niDate = gArgDate.getDate();
    var nDate=(niDate.toString().length < 2)?"0"+niDate:niDate;
   
    Cal_HTML=Cal_HTML+"<td width=17 bgcolor=9ccfce><A HREF=\"#\" onclick=\"javascript:show_calendar2('"+nextYYYY+"/" + nMonth + "/" + nDate+"');\"><img src=" + IMG_URL +  "btn_cnext.gif width=10 height=9 hspace=3 vspace=3 border=0></a></td>";
    Cal_HTML=Cal_HTML+"</tr>";
    Cal_HTML=Cal_HTML+"</table>";
    */
    
///******수정 시작

    Cal_HTML = "";
    Cal_HTML=Cal_HTML+"<div class='caltop'>";
    Cal_HTML=Cal_HTML+"<div class='cyear fleft'>";
    Cal_HTML=Cal_HTML+"<p class='font_s01'>YEAR</p>";

    var giMonth = parseInt(this.gMonth)+1;
    var gMonth=(giMonth.toString().length < 2)?"0"+giMonth:giMonth;
    var giDate = gArgDate.getDate();
    var gDate=(giDate.toString().length < 2)?"0"+giDate:giDate;

    var nniMonth = parseInt(this.gMonth)+1;
    var nnMonth=(giMonth.toString().length < 2)?"0"+nniMonth:nniMonth;
    var nniDate = gArgDate.getDate();
    var nnDate=(nniDate.toString().length < 2)?"0"+nniDate:nniDate;

    Cal_HTML=Cal_HTML+"<a href='#none' class='direction' onclick=\"javascript:show_calendar2('" + (parseInt(this.gYear)-1) + "/" + gMonth + "/" + gDate + "');\"><img src='" + IMG_URL2 +  "btn_cprev.gif' alt='이전' ></a>&nbsp;";
    Cal_HTML=Cal_HTML+"<a href='#none' class='direction' onclick=\"javascript:show_calendar2('"+(parseInt(this.gYear)+1)+"/"+ nnMonth +"/"+nnDate+"');\"><img src='" + IMG_URL2 +  "btn_cnext.gif' alt='다음' ></a>";
    Cal_HTML=Cal_HTML+"</div>";
    

    Cal_HTML=Cal_HTML+"<div class='cex fleft'>" +  this.gYear + "년" + this.gMonthName + "월" + "</div>"

    
    Cal_HTML=Cal_HTML+"<div class='cyear fleft'>";
    Cal_HTML=Cal_HTML+"<p class='font_s01'>MON</p>";

    var pMonth=(prevMM.toString().length < 2)?"0"+prevMM:prevMM;
    var piDate = gArgDate.getDate();
    var pDate=(giDate.toString().length < 2)?"0"+giDate:giDate;

    var nMonth=(nextMM.toString().length < 2)?"0"+nextMM:nextMM;
    var niDate = gArgDate.getDate();
    var nDate=(niDate.toString().length < 2)?"0"+niDate:niDate;
    
    Cal_HTML=Cal_HTML+"<a href='#none' class='direction' onclick=\"javascript:show_calendar2('"+prevYYYY+"/"+pMonth+"/"+pDate+"');\"><img src='" + IMG_URL2 +  "btn_cprev.gif' alt='이전' ></a>&nbsp;";
    Cal_HTML=Cal_HTML+"<a href='#none' class='direction' onclick=\"javascript:show_calendar2('"+nextYYYY+"/" + nMonth + "/" + nDate+"');\"><img src='" + IMG_URL2 +  "btn_cnext.gif' alt='다음' ></a>";
    Cal_HTML=Cal_HTML+"</div>";
    
    Cal_HTML=Cal_HTML+"</div>";


    
    this.wwrite(Cal_HTML);

    var vHeader_Code = "";
    var vData_Code = "";
    
    
    vHeader_Code = this.cal_header();
    
    
    
    vData_Code = this.cal_data();
    
    vCode = vCode + vHeader_Code + vData_Code;
    
    
    
    //vCode = vCode + "</TABLE></td></tr></table>";
    //document.getElementById('test_cal').innerText = Cal_HTML+vCode;
    
    
    this.wwrite(vCode);


    return gMessage;
}

Calendar.prototype.wwrite = function(wtext) { //alert("wwrite");
    gMessage = gMessage + wtext ;
    //document.all.calendar.innerHTML=gMessage;
    $("#calendar").html(gMessage);
}


// 요일을 보여주는 한 줄
Calendar.prototype.cal_header = function() { //alert("cal_header");

    var vCode = "";
    vCode = vCode + "<div class='daytop tbMb05'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_sun.gif' alt='일'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_mon.gif' alt='월'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_tue.gif' alt='화'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_wed.gif' alt='수'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_thu.gif' alt='목'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_fri.gif' alt='금'>";
    vCode = vCode + "<img src='"+IMG_URL+ "c_sat.gif' alt='토'>";
    vCode = vCode + "</div>";

    return vCode;

}


Calendar.prototype.cal_data = function() { //alert("cal_data");
    var vDate = new Date();//alert("cal_data::" + vDate);
    vDate.setDate(1);
    vDate.setMonth(this.gMonth);
    vDate.setFullYear(this.gYear);

    var vFirstDay=vDate.getDay();
    var vDay=1;
    var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
    var vOnLastDay=0;
    var vCode = "";
    var vBackColor = "";

    vCode = vCode + "<table class='tb_calendar' summary='달력 일 표'>";
    //vCode = vCode + "<caption>달력 일 표</caption>";
    vCode = vCode + "<colgroup>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";
    vCode = vCode + "<col width='14%'/>";    
    vCode = vCode + "</colgroup>";
    vCode = vCode + "<tbody>";
    




    // 첫번째 주 시작일 전은 BLANK로 남겨두기.
    vCode = vCode + "<tr align='center'>";
    for (i=0; i<vFirstDay; i++) {
        vCode = vCode + "<td></td>";
    }

    // 첫번째 주의 시작요일을 알 수 없으므로 따로 처리하여 보여주기.
    for (j=vFirstDay; j<7; j++) {
        if( vDay == gNow.getDate() && this.gMonth == gNow.getMonth() && this.gYear == gNow.getFullYear())       vBackColor = " BGCOLOR=navyblue ";
      else vBackColor = "";
        //vCode = vCode + "<td style='cursor:pointer'  onclick=\"doClick('"+vDate.getFullYear()+"-"+(eval(vDate.getMonth())+1)+"-"+vDay+"')\" " + vBackColor + "ALIGN=center><a href='#'>" + vDay+  "</a></TD>";

        vCode = vCode + "<td><a href='#none' onclick=\"doClick('"+vDate.getFullYear()+"-"+(eval(vDate.getMonth())+1)+"-"+vDay+"')\" " + vBackColor + "ALIGN=center>" + vDay+    "</a></TD>";

        vDay=vDay + 1;
    }
    vCode = vCode + "</TR>";
    
    
    
    // 두번째 ~ 마지막주까지 보여주기
    for (k=2; k<7; k++) {
        
        vCode = vCode + " <tr>";

        for (j=0; j<7; j++) {
            if( vDay == gNow.getDate() && this.gMonth == gNow.getMonth() && this.gYear == gNow.getFullYear())       vBackColor = " BGCOLOR=navyblue ";
            else vBackColor = "";
            //vCode = vCode + "<td style='cursor:pointer'  onclick=\"doClick('"+vDate.getFullYear()+"-"+(eval(vDate.getMonth())+1)+"-"+vDay+"')\"  " + vBackColor + "ALIGN=center ><a href='#'>" + vDay+    "</a></TD>";
        
            vCode = vCode + "<td><a href='#none' onclick=\"doClick('"+vDate.getFullYear()+"-"+(eval(vDate.getMonth())+1)+"-"+vDay+"')\"  " + vBackColor + "ALIGN=center >" + vDay+  "</a></TD>";

            vDay=vDay + 1;

            if (vDay > vLastDay) 
            {
                vOnLastDay = 1;
                break;
            }
        
            if(j == 6) vCode = vCode + "</TR>";
        }

        //if(j == 6) vCode = vCode + "</TR>";
        if (vOnLastDay == 1)    break;
    }
    
    // 다음달의 날짜는 보여주되 글씨 색깔을 회색으로 하여 숨겨진 느낌으로 한다.
    for (m=1; m<(7-j); m++) {
        
        if (this.gYearly)
            vCode = vCode + "<td height=19  ALIGN=center><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'> </FONT></TD>";
        else
            vCode = vCode + "<td height=19  ALIGN=center><FONT SIZE='2' FACE='" + fontface + "' COLOR='gray'>" + m + "</FONT></TD>";
    }

    vCode = vCode + "</tr>";
    vCode = vCode + "</tbody>";
    vCode = vCode + "</table>";
    
    return vCode;


}





// 주말은 글씨 색깔을 다르게 ( 현재 navyblue로 setting ) 
Calendar.prototype.write_weekend_string = function(vday) { //alert("write_weekend_string and vday::" + vday + "::weekend.len::" + weekend.length);
    var i;

    for (i=0; i<weekend.length; i++) {
        if (vday == weekend[i]) //|| vday == weekend[i + 1])            
            return (" BGCOLOR=\"" + sundayColor + "\"");
        else if (vday == weekend[i + 1])        
            return (" BGCOLOR=\"" + weekendColor + "\"");
    }
    return "";
}

var stime
function doOver() {//alert("doOver");
    var el = window.event.srcElement;
    cal_Day = el.title;

    if (cal_Day.length > 7) {
        el.style.borderTopColor = el.style.borderLeftColor = "buttonhighlight";
        el.style.borderRightColor = el.style.borderBottomColor = "buttonshadow";
    }
    window.clearTimeout(stime);
}

function doOut() {//alert("doOut");
    var el = window.event.fromElement;
    cal_Day = el.title;

    if (cal_Day.length > 7) {
        el.style.borderColor = "white";
    }
    stime=window.setTimeout("calendar.style.display='none';", 200);
}


function doClick(selectDate) {//alert("doClick");
    
    if (selectDate.length > 5) {

        // 한자리수로 넘어온 월/일은 앞에 0을 붙여 나타내주기 위해서 다시 잘라 처리한다.
        calDay = selectDate.split("-");
        
        cal_yy = calDay[0];
        cal_mm = calDay[1];
        cal_dd = calDay[2];
        
        // 한자리수에 "0" 더하기
        cal_mm = eval(cal_mm)<10? "0"+cal_mm : cal_mm;
        cal_dd   = eval(cal_dd)<10? "0"+cal_dd : cal_dd;

        if(paramNum == '1'){
            val = cal_yy+"-"+cal_mm+"-"+cal_dd;
            target.value = val;
        }else if(paramNum == '3'){
            target1.value = cal_yy;
            target2.value = cal_mm;
            target3.value = cal_dd;
        }
//      document.getElementById("calendar").style.visibility = "hidden";        
    }

    jQuery('#calendar').hide();

}

var setTime;
function hideCalendar() {
  setTime = window.setTimeout("document.getElementById('calendar').style.display='none';", 200);
}

function setCalendar() {
  window.clearTimeout(setTime);
}

//날자를 체크한다
//
//
function checkdate(str,f) {
  var frm=f;
  todate=str;

  toYear  =todate.substring(0,4);
  toMonth =todate.substring(4,6);
  toDay   =todate.substring(6,8);

  if(frm.StaYer.value.length != 4)return '4';
  if(frm.StaMon.value > 12)return '5';
  if(frm.StaDay.value > 31)return '6';
  if(frm.StaMon.value <= 0)return '5';
  if(frm.StaDay.value <= 0)return '6';
  if(frm.EndYer.value.length != 4)return '7';
  if(frm.EndMon.value > 12)return '8';
  if(frm.EndDay.value > 31)return '9';
  if(frm.EndMon.value <= 0)return '8';
  if(frm.EndDay.value <= 0)return '9';
  year1=frm.EndYer.value;
  year2=frm.StaYer.value;


  if(year1 != year2){
    //if(parseInt(toYear) != parseInt(year2) +1)return '1';
  }
  if (year1 == '0000')return '4';

  if((frm.StaYer.value!='')&&(frm.StaMon.value!='')&&(frm.StaDay.value!='')&&(frm.EndYer.value!='')&&(frm.EndMon.value!='')&&(frm.EndDay.value!='')) {
    var temp1="";
    var temp2="";
    temp1=toYear+""+toMonth+""+toDay;
    temp2=frm.EndYer.value+frm.EndMon.value+frm.EndDay.value;
    temp3=Number(temp1) - Number(temp2);

    var temp11="";
    var temp22="";
    temp11=frm.StaYer.value+frm.StaMon.value+frm.StaDay.value;
    temp22=frm.EndYer.value+frm.EndMon.value+frm.EndDay.value;
    temp33=Number(temp22) - Number(temp11);
    if(temp33>=0){
        return '0';
    }else{
        return '2';
    }

    if(temp3>=0) {
      //
    } else {
      return '10';
    }
  } else {

    return '3';
  }

}

function checkdate2(str,f) {
  var frm=f;
  todate=str;

  toYear  =todate.substring(0,4);
  toMonth =todate.substring(4,6);
  toDay   =todate.substring(6,8);

  if(frm.StaYer.value.length != 4)return '4';
  if(frm.StaMon.value > 12)return '5';
  if(frm.StaDay.value > 31)return '6';
  if(frm.StaMon.value <= 0)return '5';
  if(frm.StaDay.value <= 0)return '6';
  //if(frm.EndYer.value.length != 4)return '7';
  //if(frm.EndMon.value > 12)return '8';
  //if(frm.EndDay.value > 31)return '9';
  //if(frm.EndMon.value <= 0)return '8';
  //if(frm.EndDay.value <= 0)return '9';
  //year1=frm.EndYer.value;
  year2=frm.StaYer.value;

  /*
  if(year1 != year2){
    if(parseInt(toYear) != parseInt(year2) +1)return '1';
  }
  if (year1 == '0000')return '4';

  if((frm.StaYer.value!='')&&(frm.StaMon.value!='')&&(frm.StaDay.value!='')&&(frm.EndYer.value!='')&&(frm.EndMon.value!='')&&(frm.EndDay.value!='')) {
    var temp1="";
    var temp2="";
    temp1=toYear+""+toMonth+""+toDay;
    temp2=frm.EndYer.value+frm.EndMon.value+frm.EndDay.value;
    temp3=Number(temp1) - Number(temp2);

    if(temp3>=0) {
      var temp11="";
      var temp22="";
      temp11=frm.StaYer.value+frm.StaMon.value+frm.StaDay.value;
      temp22=frm.EndYer.value+frm.EndMon.value+frm.EndDay.value;
      temp33=Number(temp22) - Number(temp11);
      if(temp33>=0){
          return '0';
      }else{
          return '2';
      }
    } else {
      return '10';
    }
  } else {

    return '3';
  }
  */

}
//날자부를 리셋처리
function reset(frm) {
  frm.StaYer.value="";
  frm.StaMon.value="";
  frm.StaDay.value="";
  frm.EndYer.value="";
  frm.EndMon.value="";
  frm.EndDay.value="";
}

function dateAdd(arg){
  var dvalue;
  var fvalue = arg.value;

  if(fvalue==""){
    dvalue = "";
  }else{
    if(fvalue.length < 2) dvalue = "0"+fvalue;
    else dvalue = fvalue;
  }

  arg.value = dvalue;
}
