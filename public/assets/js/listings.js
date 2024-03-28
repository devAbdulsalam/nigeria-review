const filterForm = document.querySelector('form');
const categoryCheckboxes = document.querySelectorAll(
	'input[type="checkbox"][name="category"]'
);
const sortSelect = document.getElementById('sort');

// Update URL on form submission to reflect applied filters and sorting
filterForm.addEventListener('submit', (event) => {
	// Prevent default form submission behavior
	event.preventDefault();

	// Build the query string with selected filters and sorting
	let queryString = '';
	const searchTerm = document.getElementById('search').value.trim();
	if (searchTerm) {
		queryString += `q=${searchTerm}&`;
	}

	// Handle category filters (consider selecting all categories if none are checked)
	let selectedCategories = [];
	categoryCheckboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			selectedCategories.push(checkbox.value);
		}
	});
	if (selectedCategories.length === 0) {
		selectedCategories.push(''); // Select all if none are checked
	}
	queryString += `category=${selectedCategories.join(',')}&`;

	queryString += `sort=${sortSelect.value}`;

	// Update URL with the built query string
	window.location.href = `/listings?${queryString}`;
});

// Dynamic filtering based on checkbox selections
categoryCheckboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', () => {
		// Build updated query string with selected filters and sorting
		const queryString = buildQueryString();

		// Update URL with the updated query string
		window.location.href = `/listings?${queryString}`;
	});
});

// Function to build the query string with current form values
function buildQueryString() {
	let queryString = '';
	const searchTerm = document.getElementById('search').value.trim();
	if (searchTerm) {
		queryString += `q=${searchTerm}&`;
	}

	let selectedCategories = [];
	categoryCheckboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			selectedCategories.push(checkbox.value);
		}
	});
	if (selectedCategories.length === 0) {
		selectedCategories.push(''); // Select all if none are checked
	}
	queryString += `category=${selectedCategories.join(',')}&`;

	queryString += `sort=${sortSelect.value}`;

	return queryString;
}

// Pagination interactions
const paginationLinks = document.querySelectorAll('#pagination a');
paginationLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();

		// Get the desired page number from the link's href
		const desiredPage = parseInt(link.href.split('?')[1].split('=')[1]);

		// Build updated query string with current filters, sorting, and desired page
		const currentPage =
			parseInt(window.location.href.split('?')[1].split('=')[1]) || 1; // Get current page from URL
		const queryString = buildQueryString() + `&page=${desiredPage}`;

		// Update URL with the updated query string
		window.location.href = `/listings?${queryString}`;
	});
});
