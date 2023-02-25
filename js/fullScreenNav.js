//query selectors
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links');
const navBtns = document.querySelectorAll('.navbutton');
let activeSection;


//helper functions
const activeSectionHandler = (currentSectionId) => {
	navLinks.forEach(link => {
		if(link.dataset.section === currentSectionId) {
			link.classList.add('active');
			return
		};
		link.classList.remove('active');
	})
	navBtns.forEach(btn => {
		if(btn.dataset.section === currentSectionId) {
			btn.classList.add('active');
			return
		};
		btn.classList.remove('active');
	})
}

// set active section
const setActiveSection = (section) => {activeSection = section;}

const showPreviousSection = () => {
	const previousSection = activeSection.previousElementSibling;
	if(previousSection == null){return};
	previousSection.scrollIntoView();
}

const showNextSection = () => {
	const nextSection = activeSection.nextElementSibling;
	if(nextSection == null){return};
	nextSection.scrollIntoView();
}

const keyEventHandler = (keycode) => {
	switch (keycode) {
		case 'ArrowUp': 
		showPreviousSection();
		break;
		case 'ArrowDown':
		showNextSection();
		break;
		default: console.log('')
	}
}

//intersection observer
const sectionWatcherCallback = (section, sectionWatcher) => {
	section.forEach(section => {
		if(!section.isIntersecting){return};
		activeSectionHandler(section.target.id);
		setActiveSection(section.target);
	})
}

const sectionWatcherOptions = {
	threshold: .6
}

const sectionWatcher = new IntersectionObserver(sectionWatcherCallback, sectionWatcherOptions)

sections.forEach(section => {
	sectionWatcher.observe(section);
})

//event handler for keyboard
window.addEventListener('keydown', (key) => {
	if(key.code === 'ArrowUp') {
		key.preventDefault();
		keyEventHandler(key.code);
	}
	if(key.code === 'ArrowDown') {
		key.preventDefault();
		keyEventHandler(key.code);
	}
	return;
})