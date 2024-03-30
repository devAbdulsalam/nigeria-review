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
		let comment = document.querySelector('#comment').value;
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
		if (!comment) {
			errorText.innerText = 'Comment is required';
			return;
		}
		preloader.style.display = 'block';
		document.getElementById('reviewForm').submit();
	});
document.addEventListener('DOMContentLoaded', function () {
	const elements = document.querySelectorAll('#createdAt'); // Use '.createdAt' to select elements with the class name "createdAt"

	elements.forEach((element) => {
		const createdAt = new Date(element.textContent); // Parse the createdAt date from the element's text content
		const formattedDate = `${createdAt.getDate()} ${getMonthName(
			createdAt.getMonth()
		)} ${createdAt.getFullYear()}`;
		element.textContent = formattedDate; // Update the element's text content with the formatted date
	});
});

function getMonthName(month) {
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	return monthNames[month];
}

const likeBtns = document.querySelectorAll('.likeBtn');
const disLikeBtns = document.querySelectorAll('.disLikeBtn');
const loveBtns = document.querySelectorAll('.loveBtn');

likeBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		const itemId = e.currentTarget.id;
		e.currentTarget.classList.toggle('active');
		handleLike(itemId);
	});
});
disLikeBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		const itemId = e.currentTarget.id;
		e.currentTarget.classList.toggle('active');
		handleDisLike(itemId);
	});
});
loveBtns.forEach((button) => {
	button.addEventListener('click', (e) => {
		const itemId = e.currentTarget.id;
		e.currentTarget.classList.toggle('active');
		handleLove(itemId);
	});
});

const handleLike = (itemId) => {
	console.log(itemId);
};
const handleLove = (itemId) => {
	console.log(itemId);
};
const handleDisLike = (itemId) => {
	console.log(itemId);
};
