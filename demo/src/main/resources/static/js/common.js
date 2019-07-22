function checkValidDate(inDate) {
    bValidChk = true;

    if (inDate.length != 8) return false;

    nYear = Number(inDate.substring(0, 4));
    nMonth = Number(inDate.substring(4, 6));
    nDate = Number(inDate.substring(6, 8));

    if (isNaN(nYear) || isNaN(nMonth) || isNaN(nDate)) bValidChk = false;
    if (nYear < 1901 || nYear > 2100)   bValidChk = false;
    if (nMonth < 1 || nMonth > 12)      bValidChk = false;
    if (nDate < 1 || nDate > 31)        bValidChk = false;

    // 윤달 체크
    if (nMonth == 2) {
        if (nYear % 4 == 0) {
            if (nDate < 1 || nDate > 29) bValidChk = false;
        } else {
            if (nDate < 1 || nDate > 28) bValidChk = false;
        }
    }

    if (nMonth < 8) {
        if (nMonth % 2 == 0) {
            if (nDate < 1 || nDate > 30) bValidChk = false;
        } else {
            if (nDate < 1 || nDate > 31) bValidChk = false;
        }
    } else {
        if (nMonth % 2 == 0) {
            if (nDate < 1 || nDate > 31) bValidChk = false;
        } else {
            if (nDate < 1 || nDate > 30) bValidChk = false;
        }
    }

    return bValidChk;
}

function keyCheck_num2() {
    if (event.type.indexOf('key') < 0) {
        return;
    }
    var bReturnValue = false;
    var code = event.keyCode ? event.keyCode :
               event.which ? event.which : event.charCode;
    if (code != 13) {
        bReturnValue =
        ( code >= 48 && code <= 57 )//&& !event.shiftKey)     // Number
                || code == 8                    // Backspace
                || code == 9                    // Tab
                || code == 18                   // Alt
                || code == 20                   // Caps Lock
                || code == 16                   // Shift //쉬프트 키를 누른 것 만으로는 정상으로 간주
                || code == 45                   // Insert
                || code == 46                   // Delete
                || ( code >= 35 && code <= 40)  // Home,End 이어서 Cursor Key
                || ( code >= 96 && code <= 105) // Key Pad
        event.returnValue = bReturnValue;
        if (bReturnValue == false) {
            alert("숫자만 입력할 수 있습니다.");
        }
    }
}

function CheckIrregularChar(obj) {
    var rexp = /[^가-힝a-zA-Z0-9]/;
    if (rexp.test(obj.value)) {
        alert("비정상적인 한글, 한자, 특수문자, 스페이스는 입력할 수 없습니다.");
        obj.value = removeChar(obj, rexp);
        obj.focus();
    }
}

function calculate_msglen(message){
  var nbytes = 0;
  for (var i=0; i<message.length; i++) {
    var ch = message.charAt(i);
    if(escape(ch).length > 4) {
      nbytes += 2;
    } else if (ch == '\n') {
      if (message.charAt(i-1) != '\r') {
          nbytes += 1;
      }
    } else if (ch == '<' || ch == '>') {
      nbytes += 4;
    } else {
      nbytes += 1;
    }
  }
  return nbytes;
}

function assert_msglen(message, maximum){
  var inc     = 0;
  var nbytes  = 0;
  var msg     = "";
  var msglen  = message.length;

  for (var i=0; i<msglen; i++) {
    var ch = message.charAt(i);
    if (escape(ch).length > 4) {
      inc = 2;
    } else if (ch == '\n') {
      if (message.charAt(i-1) != '\r') {
        inc = 1;
      }
    } else if (ch == '<' || ch == '>') {
      inc = 4;
    } else {
      inc = 1;
    }
    if ((nbytes + inc) > maximum) {
      break;
    }
    nbytes += inc;
    msg += ch;
  }
  return msg;
}

function updateChar(length_limit, obj){
  var length = calculate_msglen(obj.value);
  if (length > length_limit) {
    alert("한글 " + length_limit/2 + "자, 영문 " + length_limit + "자까지 입력할 수 있습니다.");
    obj.value = obj.value.replace(/\r\n$/, "");
    obj.value = assert_msglen(obj.value, length_limit);
    return false;
  }
    return true;
}

/* 값체크 */
function checkValusNull(str1, title) {
  var str = str1;
  var flag = false;
  var t = title;

  if ( str == "" )                 { flag = false;
  } else if ( str == "undefined" ) { flag = false;
  } else if ( str == null )        { flag = false; 
  } else { flag = true; }

  if ( flag ) {
    return true;
  } else {
    if ( t == "" ) alert("값을 입력해 주세요.");
    else alert("[" + t + "] 값을 입력해 주세요.");
    return false;
  }
}

function xssFilter(inputStr){
	
	inputStr = inputStr.split("\"").join("&quot;");
	inputStr = inputStr.split("<").join("&lt;");
	inputStr = inputStr.split(">").join("&gt;");
	inputStr = inputStr.split("'").join("&#39;");
	inputStr = inputStr.split("eval\\((.*)\\)").join("");
	inputStr = inputStr.split("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']").join("\"\"");
	inputStr = inputStr.split("script").join("");
	
	return inputStr;
}

