const preloader = document.querySelector('.preloader');
const listingId = document.querySelector('#listingId').value;
const userId = document.querySelector('#userId').value;
const checkUser = sessionStorage.getItem('myapp-user');
const errorText = document.querySelector('#errorText');
document
	.getElementById('reviewForm')
	.addEventListener('submit', function (event) {
		// Show preloader when form is submitted
		console.log('djjhdsjkdjd this are happing');
		event.preventDefault();
		errorText.innerText = '';
		let name = document.querySelector('#name').value;
		let em = document.querySelector('#email').value;
		let rating = document.querySelector('#rating').value;
		let content = document.querySelector('#content').value;
		//TODO: Add form validation
		if (!name) {
			errorText.innerText = 'Name is required';
			return;
		}
		if (!em) {
			errorText.innerText = 'Email is required';
			return;
		}
		if (!rating) {
			errorText.innerText = 'Rating is required';
			return;
		}
		if (!content) {
			errorText.innerText = 'content is required';
			return;
		}
		preloader.style.display = 'block';
		document.getElementById('reviewForm').submit();
	});
