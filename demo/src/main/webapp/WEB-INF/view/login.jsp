
<%@ page language="java" contentType="text/html; charset=EUC-KR"
		pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>NeMew Blog :: Login</title>
	<link rel="stylesheet" href="/webjars/bootstrap/4.1.0/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/css/login.css">
</head>
<body class="my-login-page">
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="brand">
						<img src="/img/logo.png">
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title text-center text-dark">
							Welcome to NeMew Blog
							
							<span class="badge badge-secondary">
							v1.0
							</span>
							
							</h4>
							<form method="POST">
							 
								<div class="form-group">
									<label for="id" class="text-secondary">Account</label>
									<input id="account" class="form-control" name="account" value="" required autofocus>
								</div>

								<div class="form-group">
									<label for="id" class="text-secondary">Password</label>
									<input id="password" type="password" class="form-control" name="password" required>
								</div>

								<div class="form-group no-margin">
									<button type="submit" class="btn btn-info btn-block">
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
					<div class="footer">
						Copyright © <a href="http://nemew.tistory.com" class="badge badge-info">NeMew</a> 2018
					</div>
				</div>
			</div>
		</div>
	</section>

	<script src="/webjars/jquery/3.3.1/jquery.min.js"></script>
	<script src="/webjars/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</body>
</html>