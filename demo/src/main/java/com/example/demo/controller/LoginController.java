package com.example.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
	
	@RequestMapping("/") // URL 주소 = root
	public String login() {		
		return "login"; // JSP 파일명
	}
	
	@RequestMapping("admin/adminLogin.do")
	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public String adminLogin(HttpServletRequest request,HttpServletResponse response, Model model) throws Exception{
		
		return "/admin/login/adminLogin";
	}
}
