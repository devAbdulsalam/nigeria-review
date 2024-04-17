const apiurl = 'api/v1';
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
document.querySelector('#regBtn').addEventListener('click', doReg);
function doReg(ev) {
	ev.preventDefault();
	let firstName = document.querySelector('#firstName').value;
	let lastName = document.querySelector('#lastName').value;
	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	let address = document.querySelector('#address').value;
	let businessName = document.querySelector('#businessName').value;
	let phone = document.querySelector('#phone').value;
	let description = document.querySelector('#description').value;
	let logo = document.querySelector('#imageInput1');
	//TODO: Add form validation
	if (!firstName) {
		errorText.innerText = 'Email is required';
		return;
	}
	if (!lastName) {
		errorText.innerText = 'Password is required';
		return;
	}
	if (!email) {
		errorText.innerText = 'Email is required';
		return;
	}
	if (!phone) {
		errorText.innerText = 'Phone is required';
		return;
	}
	if (!businessName) {
		errorText.innerText = 'Business Name is required';
		return;
	}
	if (!address) {
		return (errorText.innerText = 'Business address is required');
	}
	if (!password) {
		errorText.innerText = 'Password is required';
		return;
	}
	if (!description) {
		return (errorText.innerText = 'Business description is required');
	}
	if (logo.files.length === 0) {
		return (errorText.innerText = 'Business logo is required');
	}
	let data = {
		firstName,
		lastName,
		businessName,
		email,
		phone,
		password,
		address,
		description,
	};
	let formData = new FormData();
	for (let key in data) {
		formData.append(key, data[key]);
	}
	formData.append('logo', logo.files[0]);

	let endpoint = 'business/register/adveritizer';
	preloader.style.display = 'block';
	sendData(formData, endpoint, registerSuccess);
}

function sendData(formData, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let req = new Request(url, {
		method: 'POST',
		body: formData,
	});
	fetch(req)
		.then((res) => {
			if (!res.ok) {
				failure(res.error || `Request failed with status ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			// Check for errors in the response
			if ((data && data.errors) || data.error) {
				// Handle errors
				return failure(
					data?.errors || data?.error || 'Received data is not valid'
				);
			}
			// Successful response, pass data to the callback function
			callback(data);
		})
		.catch((error) => {
			// Handle any errors occurred during the fetch
			console.log('Fetch error:', error);
			failure(error || 'An error occurred during the fetch');
		});
}

function registerSuccess(data) {
	//user has been registered
	preloader.style.display = 'none';
	Swal.fire('Registration successfull', `Log in to continue`, 'success');
	console.log('new user created', data);
	// window.location.href = '/login';
}

function failure(data) {
	const err =
		data?.errors?.error ||
		data?.errors?.[0] ||
		data?.error?.message ||
		data?.error ||
		data.message ||
		'Something went wrong';
	preloader.style.display = 'none';
	Swal.fire('Oh Oops!', `${err}`, 'error');
	console.warn(err);
}
function setupDropzone(dropzoneId) {
	const dropzone = document.getElementById(dropzoneId);
	const imageInput = dropzone.querySelector('.imageInput');
	const displayImage = dropzone.querySelector('.displayImage');
	const imageName = dropzone.querySelector('.imageName');
	const uploadIcon = dropzone.querySelector('.uploadIcon');

	imageInput.addEventListener('change', function (event) {
		const selectedFile = event.target.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			const imageUrl = event.target.result;
			displayImage.src = imageUrl;
			imageName.innerHTML = selectedFile.name;
			displayImage.style.display = 'block';
			uploadIcon.style.display = 'none';
		};

		reader.readAsDataURL(selectedFile);
	});
}

// Call setupDropzone for each dropzone
setupDropzone('imageDropzone1');
