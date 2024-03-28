const preloader = document.querySelector('.preloader');
const listingId = document.querySelector('#listingId').value;
const userId = document.querySelector('#userId').value;
const checkUser = sessionStorage.getItem('myapp-user');
const errorText = document.querySelector('#errorText');
document
	.getElementById('reviewForm')
	.addEventListener('submit', function (event) {
		// Show preloader when form is submitted
		event.preventDefault();
		errorText.innerText = '';
		let name = document.querySelector('#name').value;
		let em = document.querySelector('#email').value;
		let pass = document.querySelector('#password').value;
		let content = document.querySelector('#content').value;
		//TODO: Add form validation
		if (!name) {
			errorText.innerText = 'Email is required';
			return;
		}
		if (!em) {
			errorText.innerText = 'Email is required';
			return;
		}
		if (!pass) {
			errorText.innerText = 'Password is required';
			return;
		}
		if (!content) {
			errorText.innerText = 'Password is required';
			return;
		}
		preloader.style.display = 'block';
		document.getElementById('reviewForm').submit();
	});
