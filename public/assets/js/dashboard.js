const apiurl = 'api/v1';
const preloader = document.querySelector('.preloader');
const checkUser = sessionStorage.getItem('myapp-user');
const accessToken = sessionStorage.getItem('myapp-accessToken');
const refreshToken = sessionStorage.getItem('myapp-refreshToken');
const authHref = document.querySelectorAll('.authHref');
const businessName = document.querySelectorAll('.businessName');
const businessImage = document.querySelectorAll('#businessImage');
const businessLocation = document.querySelectorAll('#businessLocation');
const addBusinessLink = document.querySelectorAll('#addBusinessLink');
const totalReviews = document.querySelector('#totalReviews');
const activeListings = document.querySelector('#activeListings');
const activities = document.querySelector('#activities');
const followers = document.querySelector('#followers');
const transactions = document.querySelector('#transactions');
const reviews = document.querySelector('#reviews');
const userStatus = document.querySelector('#status');
function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function updateDashboardData(data) {
	console.log('updateDashboard', data);
}
function updateDashboard(data) {
	// console.log('updateDashboard', data);
	totalReviews.innerHTML = data.totalReviews;
	activeListings.innerHTML = data.totalListing;
	reviews.innerHTML = data.newUsers?.length;
	userStatus.innerHTML = data.user.status;
	if (data.business) {
		sessionStorage.setItem('myapp-business', JSON.stringify(data.business));
		businessName.forEach(function (element) {
			element.innerHTML = data.business.name;
		});
		businessLocation.innerHTML = data.business.location;
		businessImage.src = data.business.logo.url;
	}
	if (!data.business) {
		addBusinessLink.style.display = 'block';
	}
	if (data?.newUsers?.length > 0) {
		let displayUsers = data.newUsers.map(
			(item) =>
				`<div class="ground ground-list-single">
								<a href="#">
									<img
										class="ground-avatar"
										src="assets/img/t-1.png"
										alt="..."
									/>
									<span
										class="profile-status bg-online pull-right"
									></span>
								</a>

								<div class="ground-content">
									<h6><a href="#">${capitalizeFirstLetter(item.firstName)}</a></h6>
									<small class="text-fade"
										><i class="fas fa-map-marker-alt me-1"></i>New York,
										USA</small
									>
								</div>
							</div>`
		);
		displayUsers = displayUsers.join('');
		followers.innerHTML = displayUsers;
	}
	if (data?.notifications?.length > 0) {
		let displayActivities = data.notifications.map(
			(item) =>
				`<li>
								<i
									class="dsd-icon-uiyo ti-layers text-purple bg-light-purple"
								></i>
								Your listing
								<strong><a href="#">Hotel The Lalit</a></strong> has been
								approved!
								<a href="#" class="close-list-item"
									><i class="fa fa-close"></i
								></a>
							</li>`
		);
		displayActivities = displayActivities.join('');
		followers.innerHTML = displayActivities;
	}

	if (data?.transactions?.length > 0) {
		let displayTransactions = data.transactions.map(
			(item) =>
				`<li>
								<i
									class="dsd-icon-uiyo ti-files text-warning bg-light-warning"
								></i>
								<strong>Starter Plan</strong>
								<ul>
									<li class="unpaid">${item.name}</li>
									<li>Order: #${item._id}</li>
									<li>Date: ${item.createdAt}</li>
								</ul>
								<div class="buttons-to-right">
									<a href="${item._id}" class="button gray"
										>View Invoice</a
									>
								</div>
							</li>`
		);
		displayTransactions = displayTransactions.join('');
		transactions.innerHTML = displayTransactions;
	}

	preloader.style.display = 'none';
}

function getData(endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let req = new Request(url, {
		method: 'Get',
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

const fetchDashboard = () => {
	fetch(apiurl)
		.then((response) => response.json())
		.then((data) => {
			updateDashboardData(data);
		})
		.catch((error) => {
			console.error('Error updating access token:', error);
		});
};

const checkToken = () => {
	fetch(apiurl)
		.then((response) => response.json())
		.then((data) => {
			updateAccessToken(data);
		})
		.catch((error) => {
			console.error('Error updating access token:', error);
		});
};

const updateAccessToken = (data) => {
	sessionStorage.setItem('myapp-accessToken', data.accessToken);
	sessionStorage.setItem('myapp-refreshToken', data.refreshToken);
};
function failure(err) {
	console.log(err);
	if (preloader.style.display === 'block') {
		preloader.style.display = 'none';
	}
	Swal.fire('Oh Oops!', `${err}`, 'error');
}
// const isUser = `<%= user %>`;
const isUser = document.getElementById('userToken').value;
const user = JSON.parse(sessionStorage.getItem('user'));
console.log('user......................', user);
document.addEventListener('DOMContentLoaded', function () {
	if (isUser) {
		console.log(isUser);
	}
	if (checkUser) {
		authHref.forEach(function (element) {
			element.style.display = 'none';
		});
		user = JSON.parse(checkUser);
		// console.log(user.firstName);
		businessName.forEach(function (element) {
			element.innerHTML = user.firstName;
		});
		let endpoint = 'general/dashboard';
		getData(endpoint, updateDashboardData);
		// Hide the preloader if user
		preloader.style.display = 'block';
	}
});

const hanlelLogOut = () => {
	Swal.fire({
		title: 'Logout',
		text: `You will be log out`,
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: 'Logout',
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
	}).then((result) => {
		if (result.isConfirmed) {
			sessionStorage.removeItem('myapp-accessToken');
			sessionStorage.removeItem('myapp-refreshToken');
			sessionStorage.removeItem('myapp-business');
			sessionStorage.removeItem('myapp-user');
			window.location.href = '/index';
		}
	});
};
document.querySelector('#logoutBtn').addEventListener('click', hanlelLogOut);
