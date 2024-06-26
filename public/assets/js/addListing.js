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
// Assuming you have a <select> element with id="category"
const categorySelect = document.querySelector('#category');
document.addEventListener('DOMContentLoaded', function () {
	let displayCategory = categoriesData.map(
		(item) => `<option value="${item.name}">${item.name}</option>`
	);
	displayCategory = displayCategory.join('');
	categorySelect.innerHTML = displayCategory; // Assign to innerHTML of the select element
});

const handleCategoryChange = () => {
	let category = document.querySelector('#category').value;
	let menu = document.querySelector('#menu');
	// let workingHours = document.querySelector('#workingHours');
	// let product = document.querySelector('#product');
	if (category.toLowerCase() === 'restaurants') {
		menu.style.display = 'block';
	} else {
		menu.style.display = 'none';
	}
	// let subCategories = document.querySelector('#subCategories');
	// subCategories.innerHTML = '';
	// if (category === 'All') {
	//     subCategories.innerHTML = categoriesData.map(
	//         (item) => `<option value="${item.name}">${item.name}</option>`
	//     );
	// } else {
	//     subCategories.innerHTML = categoriesData.filter(
	//         (item) => item.name === category
	//     ).map((item) => `<option value="${item.name}">${item.name}</option>`);
	// }
};
document
	.querySelector('#category')
	.addEventListener('click', handleCategoryChange);

let amenities = [];
let listOfAmenities = document.querySelector('#amenities');

listOfAmenities.addEventListener('change', function (event) {
	// Check if the changed element is an input element of type checkbox
	if (event.target.matches('input[type="checkbox"]')) {
		// Get the label associated with the checkbox
		let label = event.target.nextElementSibling;
		// Get the text content of the label
		let amenity = label.textContent.trim();

		// Check if the checkbox is checked
		if (event.target.checked) {
			// If checked, add the amenity to the amenities array
			amenities.push(amenity);
		} else {
			// If unchecked, remove the amenity from the amenities array
			let index = amenities.indexOf(amenity);
			if (index !== -1) {
				amenities.splice(index, 1);
			}
		}
	}
});

//process the login and the register
document.querySelector('#submitBtn').addEventListener('click', handleSubmit);
const errorText = document.querySelector('#errorText');

function handleSubmit(ev) {
	ev.preventDefault();
	errorText.innerText = '';
	let businessName = document.querySelector('#bname').value;
	let description = document.querySelector('#description').value;
	let keywords = document.querySelector('#keywords').value;
	let category = document.querySelector('#category').value;
	let subCategories = document.querySelector('#subCategories').value;
	let productName = document.querySelector('#productName').value;
	let productDescription = document.querySelector('#productDescription').value;
	let latitude = document.querySelector('#latitude').value;
	let longitude = document.querySelector('#longitude').value;
	let state = document.querySelector('#state').value;
	let city = document.querySelector('#city').value;
	let address = document.querySelector('#address').value;
	let zipCode = document.querySelector('#zipCode').value;
	let mobile = document.querySelector('#mobile').value;
	let email = document.querySelector('#email').value;
	let website = document.querySelector('#website').value;
	let otherLocation = document.querySelector('#otherLocation').value;
	let lga = document.querySelector('#lga').value;
	let itemName = document.querySelector('#itemName').value;
	let itemPrice = document.querySelector('#itemPrice').value;
	let itemCategory = document.querySelector('#itemCategory').value;
	let ItemDescription = document.querySelector('#ItemDescription').value;
	// let facebook = document.querySelector('#facebook').value;
	// let twitter = document.querySelector('#twitter').value;
	// let instagram = document.querySelector('#instagram').value;
	// let linkedin = document.querySelector('#linkedin').value;
	// images
	let featuredImage = document.querySelector('#imageInput1');
	let itemImage = document.querySelector('#formFileLg');

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
	if (!businessName) {
		errorText.innerText = 'Business name is required';
		return;
	}
	if (!description) {
		errorText.innerText = 'business description is required';
		return;
	}
	if (!category) {
		errorText.innerText = 'Business category is required';
		return;
	}
	if (!productName) {
		errorText.innerText = 'productName is required';
		return;
	}
	if (!productDescription) {
		errorText.innerText = 'productDescription is required';
		return;
	}
	if (!featuredImage.files.length === 0) {
		errorText.innerText = 'product featured image is required';
		return;
	}
	// split keywords into array
	const Arraykeywords = keywords?.split(', ');
	// keywords = "cloth, dress, outfit" to ["cloth", "dress", "outfit"]
	let data = {
		businessId,
		userId,
		businessName: businessName.toLowerCase(),
		keywords: Arraykeywords,
		category: category.toLowerCase(),
		subCategories: subCategories.toLowerCase(),
		description,
		productName: productName.toLowerCase(),
		productDescription,
		longitude,
		latitude,
		state: state.toLowerCase(),
		city: city.toLowerCase(),
		address: address.toLowerCase(),
		zipCode,
		mobile,
		email,
		website: website.toLowerCase(),
		otherLocation,
		lga,
		itemName,
		itemPrice,
		itemCategory,
		ItemDescription,
		socials: JSON.stringify(socials),
	};
	let formData = new FormData();
	for (let key in data) {
		formData.append(key, data[key]);
	}
	formData.append('amenities', JSON.stringify(amenities));
	formData.append('featuredImage', featuredImage.files[0]);
	formData.append('itemImage', itemImage.files[0]);
	let endpoint = 'listings';
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
	Swal.fire('Success!', `Listing added successfully`, 'success');
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
