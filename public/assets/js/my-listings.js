const apiurl = 'api/v1';
const preloader = document.querySelector('.preloader');
const businessName = document.querySelectorAll('.businessName');
const authHref = document.querySelectorAll('.authHref');
const businessImage = document.querySelectorAll('#businessImage');
const businessLocation = document.querySelectorAll('#businessLocation');
const listings = document.querySelector('#listings');
const checkUser = sessionStorage.getItem('myapp-user');
const userId = document.querySelector('#userId').value;
const checkBusiness = sessionStorage.getItem('myapp-business');
const business = JSON.parse(checkBusiness);
const detailsBtn = document.querySelectorAll('.detailsBtn');
detailsBtn.forEach((button) => {
	button.addEventListener('click', (e) => {
		const itemId = e.currentTarget.id;
		handleDetails(itemId);
	});
});
const deleteBtn = document.querySelectorAll('.deleteBtn');
deleteBtn.forEach((button) => {
	button.addEventListener('click', (e) => {
		const itemId = e.currentTarget.id;
		handleDelete(itemId);
	});
});

document.addEventListener('DOMContentLoaded', function () {
	if (userId) {
		authHref.forEach(function (element) {
			element.style.display = 'none';
		});
		user = JSON.parse(checkUser);

		let endpoint = `listings/${userId}`;
		preloader.style.display = 'block';
		getData(user, endpoint, listingSuccess);
	}
});

let listingsData;
//process the login and the register

const errorText = document.querySelector('#errorText');
function handleDetails(id) {
	const item = listingsData.find((item) => item._id === id);
	Swal.fire({
		title: `${ item?.businessName || item.productName}`,
		text: `${item.description}`,
		imageUrl: `${item?.featuredImage?.url}`,
		imageWidth: 400,
		imageHeight: 200,
		imageAlt: `${item.productName}`,
	});
}

function handleDelete(id) {
	if (!id) {
		return Swal.fire('Oh Oops!', 'Item Id is required', 'error');
	}
	Swal.fire({
		title: 'Delete Item',
		text: `Listing will be Deleted`,
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: 'Delete',
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3085d6',
	}).then((result) => {
		if (result.isConfirmed) {
			let endpoint = 'listings';
			preloader.style.display = 'block';
			deleteData(id, endpoint, deleteSuccess);
		}
	});
}

function sendData(user, endpoint, callback) {
	let url = `${apiurl}/${endpoint}`;
	let h = new Headers();
	h.append('Content-Type', 'application/json');
	let req = new Request(url, {
		method: 'POST',
		headers: h,
		body: JSON.stringify(user),
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

function deleteData(id, endpoint, callback) {
	let url = `${apiurl}/${endpoint}/${id}`;
	let req = new Request(url, {
		method: 'Delete',
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

function getData(user, endpoint, callback) {
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

function deleteSuccess(data) {
	// const listing = document.getElementById(`${data._id}`);
	const newData = listingsData.filter((item) => item._id !== data._id);
	// listing.style.display = 'none';
	console.log(newData);
	updateListing(newData);
	preloader.style.display = 'none';
	Swal.fire('Deleted', 'Listing deleted successfully', 'success');
}

function listingSuccess(data) {
	preloader.style.display = 'none';
	console.log(data);
	listingsData = data;
	// updateListing(data);
}

function updateListing(data) {
	listingsData = data;
	let displayListings = data?.map(
		(item) =>
			`<div class="dsd-single-listing-wraps" id='${item._id}'>
												<div class="dsd-single-lst-thumb">
													<img
														src="${item?.featuredImage?.url}"
														class="img-fluid"
														alt=""
													/>
												</div>
												<div class="dsd-single-lst-caption">
													<div class="dsd-single-lst-title">
														<h5>${item?.productName}</h5>
													</div>
													<span class="agd-location"
														><i class="lni lni-map-marker me-1"></i>${item?.address}</span
													>
													<div class="ico-content">
														<div class="Goodup-ft-first">
															<div class="Goodup-rating">
																<div class="Goodup-rates">
																	<i class="fas fa-star"></i>
																	<i class="fas fa-star"></i>
																	<i class="fas fa-star"></i>
																	<i class="fas fa-star"></i>
																	<i class="fas fa-star"></i>
																</div>
															</div>
															<div class="Goodup-price-range">
																<span class="ft-medium">${item?.totalReviews || '34'} Reviews</span>
															</div>
														</div>
													</div>
													<div class="dsd-single-lst-footer">
														<a
															href="javascript:void(0);"
															class="btn btn-edit mr-1"
															><i class="fas fa-edit me-1"></i>Edit</a
														>
														<button 
															type="button"
															id='${item._id}"
															class="btn btn-view mr-1 detailsButton"
															><i class="fas fa-eye me-1"></i>View</button
														>
														<button
															type="button"
															id='${item._id}"
															class="btn btn-delete deleteBtn"
														>
															<i class="fas fa-trash me-1"></i>Delete
														</button>
													</div>
												</div>
											</div>`
	);
	displayListings = displayListings.join('');
	listings.innerHTML = displayListings;
}

function failure(err) {
	console.warn(err);
	if (preloader.style.display === 'block') {
		preloader.style.display = 'none';
	}
	Swal.fire('Oh Oops!', `${err}`, 'error');
}
