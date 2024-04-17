const apiurl = 'api/v1';
const preloader = document.querySelector('.preloader');
const checkUser = sessionStorage.getItem('myapp-user');
const accessToken = sessionStorage.getItem('myapp-accessToken');
document.addEventListener('DOMContentLoaded', function () {
	if (checkUser) {
		// Hide the preloader if user
		preloader.style.display = 'none';
	}
});
//process profile update
document.querySelector('#submitBtn').addEventListener('click', handleSubmit);

function handleSubmit(ev) {
	ev.preventDefault();
	let firstName = document.querySelector('#firstName').value;
	let lastName = document.querySelector('#lastName').value;
	let email = document.querySelector('#email').value;
	let phone = document.querySelector('#phone').value;
	let address = document.querySelector('#address').value;
	let city = document.querySelector('#city').value;
	let state = document.querySelector('#state').value;
	let zipCode = document.querySelector('#zipCode').value;
	let bio = document.querySelector('#bio').value;
	let avatar = document.querySelector('#avatar').value;
	let listOfSocials = document.querySelector('#socials');
	// Get all the <input> elements within the <div> as a NodeList
	let socialInputs = listOfSocials.querySelectorAll('input[type="text"]');

	// get id and value of filled social input type of text as array of socials
	let socials = [];
	// Iterate over each input element
	socialInputs.forEach((input) => {
		// Get the value of the input field
		let value = input.value.trim(); // Trim whitespace from the value

		// Check if the input field is not empty
		if (value !== '') {
			// If not empty, push an object containing the id and value into the socials array
			socials.push({ id: input.id, value: value });
		}
	});
	//TODO: Add form validation
	let data = {
		firstName,
		lastName,
		phone,
		zipCode,
		email,
		address,
		state,
		city,
		bio,
		socials,
	};

	let formData = new FormData();
	for (let key in data) {
		formData.append(key, data[key]);
	}
	formData.append('avatar', avatar.files[0]);
	let endpoint = 'users/profile';
	preloader.style.display = 'block';
	sendData(formData, endpoint, onSuccess);
}

function sendData(formData, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let req = new Request(url, {
		method: 'PATCH',
		body: formData,
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
			if (data && data.errors) {
				// Handle errors
				throw new Error(data.message || 'Received data is not valid');
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
	console.log('res data', data);
	Swal.fire('Success', `Profile updated successfull`, 'success');
}
function failure(error) {
	preloader.style.display = 'none';
	console.error('Fetch error:', error);
	if (error instanceof Response) {
		if (error.status === 401) {
			// Clear session and redirect to index page
			sessionStorage.removeItem('myapp-accessToken');
			sessionStorage.removeItem('myapp-user');
			window.location.href = '/login';
			Swal.fire('Oh Oops!', `${error}`, 'error');
		} else {
			console.error('Unexpected error:', error.statusText);
		}
	} else {
		Swal.fire('Oh Oops!', `${error}`, 'error');
	}
}
// Select the file input element
const avatarInput = document.getElementById('avatar');

// Add event listener to listen for changes in the file input
avatarInput.addEventListener('change', function (event) {
	// Get the selected file
	const selectedFile = event.target.files[0];

	// Create a FileReader object to read the file
	const reader = new FileReader();

	// Set up event listener for when FileReader has loaded the file
	reader.onload = function (event) {
		// Get the URL of the loaded file
		const imageUrl = event.target.result;

		// Select the image element
		const userImage = document.getElementById('userImage');

		// Update the src attribute of the image element to display the selected image
		userImage.src = imageUrl;
	};

	// Read the selected file as a data URL
	reader.readAsDataURL(selectedFile);
});
