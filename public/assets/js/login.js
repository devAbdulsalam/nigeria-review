// const successMessage = `<%= successMessage %>`;
// if (successMessage) {
// 	Swal.fire('Success', successMessage, 'success');
// }
// const errorMessage = `<%= errorMessage %>`;
// if (errorMessage) {
// 	Swal.fire('Error', errorMessage, 'error');
// }
const preloader = document.querySelector('.preloader');
const checkUser = sessionStorage.getItem('myapp-user');
document.addEventListener('DOMContentLoaded', function () {
	if (checkUser) {
		sessionStorage.removeItem('myapp-user');
		sessionStorage.removeItem('myapp-accessToken');
		sessionStorage.removeItem('myapp-refreshToken');
	}
	preloader.style.display = 'none';
});

// const apiurl = '/';
//process the login
const errorText = document.querySelector('#errorText');
document
	.getElementById('loginForm')
	.addEventListener('submit', function (event) {
		// Show preloader when form is submitted
		event.preventDefault();
		errorText.innerText = '';
		let em = document.querySelector('#email').value;
		let pass = document.querySelector('#password').value;
		//TODO: Add form validation
		if (!em) {
			errorText.innerText = 'Email is required';
			return;
		}
		if (!pass) {
			errorText.innerText = 'Password is required';
			return;
		}
		preloader.style.display = 'block';
		document.getElementById('loginForm').submit();
	});

// function doLogin(ev) {
// 	ev.preventDefault();
// 	errorText.innerText = '';
// 	let em = document.querySelector('#email').value;
// 	let pass = document.querySelector('#password').value;
// 	//TODO: Add form validation
// 	if (!em) {
// 		errorText.innerText = 'Email is required';
// 		return;
// 	}
// 	if (!pass) {
// 		errorText.innerText = 'Password is required';
// 		return;
// 	}
// 	let user = { email: em, password: pass };
// 	preloader.style.display = 'block';
// 	sendData(user, loginSuccess);
// }

// function sendData(user, callback) {
// 	let url = window.location.pathname;
// 	let h = new Headers();
// 	h.append('Content-Type', 'application/json');
// 	let req = new Request(url, {
// 		method: 'POST',
// 		headers: h,
// 		body: JSON.stringify(user),
// 	});
// 	fetch(req)
// 		.then((res) => {
// 			if (!res.ok) {
// 				// Handle non-successful responses
// 				failure(`Request failed with status ${res.status}`);
// 			}
// 			console.log(res);
// 			return res.json();
// 		})
// 		.then((data) => {
// 			console.log(data);
// 			// Check for errors in the response
// 			if (data && data.errors) {
// 				// Handle errors
// 				return failure(
// 					data.errors[0] ||
// 						data.message ||
// 						error ||
// 						'Received data is not valid'
// 				);
// 			}
// 			// Successful response, pass data to the callback function
// 			callback(data);
// 		})
// 		.catch((error) => {
// 			failure(error.message || error || 'An error occurred during the fetch');
// 		});
// }

// function loginSuccess(data) {
// 	//we have a token so put it in localstorage
// 	preloader.style.display = 'none';
// 	Swal.fire('Login success', 'Login successfull', 'success');
// 	sessionStorage.setItem('myapp-user', JSON.stringify(data.user));
// 	sessionStorage.setItem('myapp-accessToken', data.accessToken);
// 	sessionStorage.setItem('myapp-refreshToken', data.refreshToken);
// 	window.location.href = '/dashboard';
// }
// function failure(err) {
// 	preloader.style.display = 'none';
// 	console.log(err);
// 	Swal.fire('Oh Oops!', `${err}`, 'error');
// }
