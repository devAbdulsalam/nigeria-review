const preloader = document.querySelector('.preloader');
const checkUser = sessionStorage.getItem('myapp-user');
const accessToken = sessionStorage.getItem('myapp-accessToken');
document.addEventListener('DOMContentLoaded', function () {
	if (checkUser) {
		// Hide the preloader if user
		preloader.style.display = 'none';
	}
});
const apiurl = 'api/v1';
//process the login and the register
document.querySelector('#submitBtn').addEventListener('click', handleSubmit);
const errorText = document.getElementById('errorText');

function handleSubmit(ev) {
	ev.preventDefault();
	errorText.innerText = '';
	let name = document.querySelector('#business_name').value;
	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	let location = document.querySelector('#address').value;
	let description = document.querySelector('#description').value;
	let phone = document.querySelector('#phone').value;
	let logo = document.querySelector('#logo');
	//TODO: Add form validation
	if (!name) {
		return (errorText.innerText = 'Business name is required');
	}
	if (!address) {
		return (errorText.innerText = 'Business address is required');
	}
	if (logo.files.length === 0) {
		return (errorText.innerText = 'Business logo is required');
	}
	let data = { name, email, phone, password, location, description };
	let formData = new FormData();
	for (let key in data) {
		formData.append(key, data[key]);
	}
	formData.append('logo', logo.files[0]);
	let endpoint = 'business/register';
	preloader.style.display = 'block';
	sendData(formData, endpoint, onSuccess);
}

function sendData(data, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let req = new Request(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: data,
	});
	fetch(req)
		.then((res) => {
			if (!res.ok) {
				// Handle non-successful responses
				throw new Error(`Request failed with status ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			// Check for errors in the response
			if ((data && data.errors) || data.error) {
				// Handle errors
				failure(data.message || error || 'Received data is not valid');
			}
			// Successful response, pass data to the callback function
			callback(data);
		})
		.catch((error) => {
			// Handle any errors occurred during the fetch
			console.error('Fetch error:', error);
			failure(error.message || 'An error occurred during the fetch');
		});
}

function onSuccess(data) {
	//we have a token so put it in localstorage
	preloader.style.display = 'none';
	// sessionStorage.setItem('myapp-business', data.business);
	Swal.fire('Success', `Business registration successfull`, 'success');
}
function failure(error) {
	preloader.style.display = 'none';
	console.error('Fetch error:', error);
	if (error instanceof Response) {
		if (error.status === 401) {
			// Clear session and redirect to index page
			sessionStorage.removeItem('myapp-accessToken');
			sessionStorage.removeItem('myapp-user');
			window.location.href = '/index';
			Swal.fire('Oh Oops!', `${error}`, 'error');
		} else {
			console.error('Unexpected error:', error.statusText);
		}
	} else {
		Swal.fire('Oh Oops!', `${error}`, 'error');
	}
}
