const apiurl = 'api/v1';
const categoriesData = [
	{
		name: 'Dentists',
		icon: 'stethoscope',
	},
	{
		name: 'IT & Banking',
		icon: 'building',
	},
	{
		name: 'Shoppings',
		icon: 'shopping-basket',
	},
	{
		name: 'Home Services',
		icon: 'screwdriver',
	},
	{
		name: 'Active Life',
		icon: 'basketball-ball',
	},
	{
		name: 'Restaurants',
		icon: 'utensils',
	},
	{
		name: 'Education',
		icon: 'book-open',
	},
	{
		name: 'Real Estate',
		icon: 'house-damage',
	},
	{
		name: 'Event Palnning',
		icon: 'wine-glass',
	},
	{
		name: 'Automotive',
		icon: 'car-alt',
	},
	{
		name: 'Art & Design',
		icon: 'pencil-ruler',
	},
	{
		name: 'Hotel & Travel',
		icon: 'plane',
	},
];

const preloader = document.querySelector('.preloader');
const userId = document.querySelector('#userId').value;
const businessId = document.querySelector('#userId').value;
const categorySelect = document.querySelector('#category'); // Assuming you have a <select> element with id="category"
document.addEventListener('DOMContentLoaded', function () {
	let displayCategory = categoriesData.map(
		(item) => `<option value="${item.name}">${item.name}</option>`
	);
	displayCategory = displayCategory.join('');
	categorySelect.innerHTML = displayCategory; // Assign to innerHTML of the select element
});

//process the login and the register
document.querySelector('#submitBtn').addEventListener('click', handleSubmit);
const errorText = document.querySelector('#errorText');

function handleSubmit(ev) {
	ev.preventDefault();
	errorText.innerText = '';
	let title = document.querySelector('#title').value;
	let subtitle = document.querySelector('#subtitle').value;
	let category = document.querySelector('#category').value;
	let subCategory = document.querySelector('#subCategory');
	let description = document.querySelector('#description').value;
	// images
	let featuredImage = document.querySelector('#imageInput1');
	let listOfSocials = document.querySelector('#socials');
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
			const item = { name: input.id, value: value };
			socials.push(item);
		}
	});
	//TODO: Add form validation
	if (!title) {
		errorText.innerText = 'Advert name is required';
		return;
	}
	if (!subtitle) {
		errorText.innerText = 'Sub title is required';
		return;
	}
	if (!category) {
		errorText.innerText = 'Advert category is required';
		return;
	}
	if (!description) {
		errorText.innerText = 'Advert description is required';
		return;
	}
	if (featuredImage.files.length === 0) {
		errorText.innerText = 'Advert featured image is required';
		return;
	}
	let data = {
		businessId,
		userId,
		title: title.toLowerCase(),
		subtitle: subtitle.toLowerCase(),
		category: category.toLowerCase(),
		subCategory: subCategory.toLowerCase(),
		description,
	};
	let formData = new FormData();
	for (let key in data) {
		formData.append(key, data[key]);
	}
	formData.append('featuredImage', featuredImage.files[0]);
	let endpoint = 'adverts';
	preloader.style.display = 'block';
	sendData(formData, endpoint, onSuccess);
}

function sendData(data, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let req = new Request(url, {
		method: 'Post',
		body: data,
	});
	fetch(req)
		.then((res) => {
			if (!res.ok) {
				// Handle non-successful responses
				failure(`Request failed with status ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			console.log(data);
			// Check for errors in the response
			if (data && data.errors) {
				// Handle errors
				return failure(
					data.errors[0] ||
						data.message ||
						error ||
						'Received data is not valid'
				);
			}
			// Successful response, pass data to the callback function
			callback(data);
		})
		.catch((error) => {
			failure(error.message || error || 'An error occurred during the fetch');
		});
}

function onSuccess(data) {
	preloader.style.display = 'none';
	console.log('data.............', data);
	Swal.fire('Success!', `Advert added successfully`, 'success');
	// window.location.href = '/dashboard';
}
function failure(err) {
	if (preloader.style.display === 'block') {
		preloader.style.display = 'none';
	}
	Swal.fire('Oh noes!', `${err.message}`, 'error');
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
// setupDropzone('imageDropzone2');

Dropzone.options.singleLogo = {
	maxFiles: 1,
	accept: function (file, done) {
		console.log('uploaded');
		done();
	},
	init: function () {
		this.on('maxfilesexceeded', function (file) {
			alert('No more files please!');
		});
	},
};
Dropzone.options.featuredImage = {
	maxFiles: 1,
	accept: function (file, done) {
		console.log('uploaded');
		done();
	},
	init: function () {
		this.on('maxfilesexceeded', function (file) {
			alert('No more files please!');
		});
	},
};
Dropzone.options.gallery = {
	accept: function (file, done) {
		console.log('uploaded');
		done();
	},
	init: function () {
		this.on('maxfilesexceeded', function (file) {
			alert('No more files please!');
		});
	},
};
function toggleAdditionalFields() {
	var additionalFields = document.getElementById('additionalFields');
	if (additionalFields.style.display === 'none') {
		additionalFields.style.display = 'block';
	} else {
		additionalFields.style.display = 'none';
	}
}
