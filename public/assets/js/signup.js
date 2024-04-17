// const apiurl = 'api/v1/users';
const preloader = document.querySelector('.preloader');
const checkUser = sessionStorage.getItem('myapp-user');
document.addEventListener('DOMContentLoaded', function () {
	if (checkUser) {
		// != 'undefined' || null
		window.location.href = '/index';
	} else {
		// Hide the preloader if user is not redirected
		preloader.style.display = 'none';
	}
});
const errorText = document.querySelector('#errorText');
document
	.getElementById('signupForm')
	.addEventListener('submit', function (event) {
		event.preventDefault();

		errorText.innerText = '';
		let firstName = document.querySelector('#firstName').value;
		let lastName = document.querySelector('#lastName').value;
		let em = document.querySelector('#email').value;
		let pass = document.querySelector('#password').value;
		if (!firstName) {
			errorText.innerText = 'Email is required!';
			return;
		}
		if (!lastName) {
			errorText.innerText = 'Email is required!';
			return;
		}
		if (!em) {
			errorText.innerText = 'Email is required!';
			return;
		}
		if (!pass) {
			errorText.innerText = 'Password is required!';
			return;
		}
		// let user = { firstName, lastName, email: em, password: pass };
		preloader.style.display = 'block';
		document.getElementById('signupForm').submit();
	});

// function sendData(user, endpoint, callback) {
// 	let url = `${apiurl}/${endpoint}`;
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
// 				throw new Error(`Request failed with status ${res.status}`);
// 			}
// 			return res.json();
// 		})
// 		.then((data) => {
// 			// Check for errors in the response
// 			if (data && data.errors) {
// 				// Handle errors
// 				throw new Error(data.message || 'Received data is not valid');
// 			}
// 			// Successful response, pass data to the callback function
// 			callback(data);
// 		})
// 		.catch((error) => {
// 			// Handle any errors occurred during the fetch
// 			console.error('Fetch error:', error);
// 			failure(
// 				error?.error ||
// 					error?.message ||
// 					error ||
// 					'An error occurred during the fetch'
// 			);
// 		});
// }

// function registerSuccess(data) {
// 	//user has been registered
// 	preloader.style.display = 'none';
// 	Swal.fire('Registration successfull', `Log in to continue`, 'success');
// 	console.log('new user created', data);
// 	// window.location.href = '/index';
// }

// function failure(err) {
// 	preloader.style.display = 'none';
// 	Swal.fire('Oh Oops!', `${err}`, 'error');
// 	console.warn(err);
// }
