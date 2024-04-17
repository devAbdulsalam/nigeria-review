const tabButtons = document.querySelectorAll('#myTabs .nav-link');
const tabContents = document.querySelectorAll('#myTabsContent .tab-pane');

tabButtons.forEach((btn, index) => {
	btn.addEventListener('click', () => {
		// Remove 'show active' class from all tab contents
		tabContents.forEach((content) => {
			content.classList.remove('show', 'active');
		});

		// Add 'show active' class to the clicked tab content
		tabContents[index].classList.add('show', 'active');
	});
});
