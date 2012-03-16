$(document).ready(function () {

	
	var passStrength = 0;
	var cityWeird = 0;

//	AJAX in the provinces
	
	$(".ajax-in1").on("click", function (ev) {
	$(".fill-me").load("ajax-in1.html");
	});
	
	$(".ajax-in2").on("click", function (ev) {
	$(".fill-me").load("ajax-in2.html");
	});

//	CHECK the username with database
	
	$('#username').on('change', function (ev) {
		
		var username = $(this).val();
		
		if (username.length >= 3) {
			var ajax = $.post('check-username.php', {
				'username' : username
			});
			
			ajax.done(function (data) {
				$('.status').removeClass('available unavailable');
				
				if (data == 'available') {
					$('.status').html(' ✔').addClass(data);
				} else {
					$('.status').html(' ✖').addClass(data);
				}
			});
		} else {
			$('.status').html('✖').removeClass('available').addClass('unavailable');
		}
	});

//	CHECK the email in database

	$('#email').on('change', function (ev) {
		var email = $(this).val();
		
		if (email.length >= 3) {
			var ajax = $.post('check-email.php', {
				'email' : email
			});
			
			ajax.done(function (data) {
				$('.emailstatus').removeClass('emailavailable emailunavailable');
				
				if (data == 'emailavailable') {
					$('.emailstatus').html(' ✔').addClass(data);
				} else {
					$('.emailstatus').html(' ✖').addClass(data);
				}
			});
		} else {
			$('.emailstatus').html('✖').removeClass('emailavailable').addClass('emailunavailable');
		}
			
	});

//CHECK the password for acceptable
	
	$('#password').on('keyup', function (ev) {
		var pass = $(this).val();
		
		passStrength = 0;
		
		if (pass.length > 5) {
			passStrength++;
			$('.req-length').addClass('met');
		} else {
			$('.req-length').removeClass('met');
		}
		
		if (pass.match(/[a-z]/)) {
			passStrength++;
			$('.req-low').addClass('met');
		} else {
			$('.req-low').removeClass('met');
		}
		
		if (pass.match(/[A-Z]/)) {
			passStrength++;
			$('.req-up').addClass('met');
		} else {
			$('.req-up').removeClass('met');
		}
		
		if (pass.match(/[0-9]/)) {
			passStrength++;
			$('.req-num').addClass('met');
		} else {
			$('.req-num').removeClass('met');
		}
		
		if (pass.match(/[^a-zA-Z0-9]/)) {
			passStrength++;
			$('.req-spec').addClass('met');
		} else {
			$('.req-spec').removeClass('met');
		}
	});	
	
// check the city name for weird	
	
	$('#city').on('keyup', function (ev) {
		var pass = $(this).val();
		
		cityWeird = 0;
		
		if (pass.match(/[a-zA-Z]$/)) {		// the $ at the end means ONLY that defined within
			passStrength++;
			$('.req-city').addClass('met');
		} else {
			$('.req-city').removeClass('met');
		}
	});
	
	$('form').on('submit', function (ev) {
		
		if (passStrength < 5 || cityWeird < 1 || $('.status').hasClass('unavailable')) {
			ev.preventDefault();
		}
		
	});

	
	
});























