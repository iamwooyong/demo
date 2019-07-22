<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9" /> 

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="/css/style.css">
<script type="text/javascript" src="/js/jquery.min.1.7.2.js"></script>
<script language=javascript >
	
	$("document").ready(function(){
		$("#adminPw").keydown(function(){
			if (event.keyCode == 13) {
				NameCheck();
	        }
		});
		
		// ID 영문,숫자만 입력 가능
		$("#adminId").keyup(function(){
			
			if($(this).val().match(/.*[ㄱ-ㅎㅏ-ㅑ가-힣]+.*/) != null ){
				alert("영문, 숫자만 입력 가능합니다.");
				$(this).val("");
			}
		
		});
	});

    function NameCheck(){
    	var id = $("#adminId").val();
    	var pw = $("#adminPw").val();
    	
    	if(validChk(id, pw)){
    		$.ajax({
				type : "POST",
				url : "/admin/adminLoginChk.do",
				data : $("#frm").serialize(),
				dataType : "json",
				success  : function(data) {
				
			    	if(data.resultCode == "Y"){
			    		$("#frm").attr("action", "/admin/getAdminMain.do");
			    		$("#frm").submit();
			    	}else{
			    		alert("로그인정보가 맞지않습니다.\n 아이디/비밀번호 확인하시고 다시 접속바랍니다.");
			    	}
			    },
			    error : function (error) {
			    	alert("통신 오류.");
				}
			});
    	}
    }
    
    function validChk(id, pw){
    	var result = true;
  
    	if(id == ""){
    		alert("ID를 입력하세요.");
    		result = false;
    	}else if(pw == ""){
    		alert("비밀번호를 입력하세요.");
    		result = false;
    	}
  
    	return result;
    }
   
</script>

<title>ADMIN LOGIN</title>
</head>
<body>
		<div class="login_wrap">
		<div class="login_box">
		<h1 class="login_logo">LOGIN LOGO</h1>
		<form id="frm" method="post" >		
			<label for="adminId" class="blind">ID</label>
			<input type="text" class="login_textbox1" style="IME-MODE: inactive;" id="adminId"  name="adminId"  value="" >
			<label for="adminPw"  class="blind">Password</label>
			<input type="password" class="login_textbox1"  id="adminPw"  name="adminPw"  value="" >
		
		
			<span class="btn_login"><input type="button" value="로그인" class="int_join" onclick="javascript:NameCheck();" onfocus="blur();" style="cursor: pointer;"></span>
		</form>
		</div><!--login_box//-->
		</div><!--login_wrap//-->
	

</body>
</html>