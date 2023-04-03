/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
const navBar   = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
const navLinks  = document.querySelectorAll("#navbar__list li a");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
// const navFrag = document.createDocumentFragment();
// const t0 = performance.now();
for (const section of sections) {
    const navList        = document.createElement("li");
    const anchorLink     = document.createElement("a");
    anchorLink.innerHTML = section.dataset.nav;
    anchorLink.href      = "#" + section.id;
    anchorLink.classList.add("menu__link");
    navList.appendChild(anchorLink);
    // navFrag.appendChild(navList);
    navBar.appendChild(navList);
}
//--------------- Begin: Try to use Fragment for better performance ---------
// navBar.appendChild(navFrag);
// const t1 = performance.now();
// console.log("This code took " + (t1-t0) + " ms.");
// NOTE: create a DocumentFragment took much time then add NavList to body, need to test more
//--------------- End: Try to use Fragment for better performance ---------

// Add class 'active' to section when near top of viewport
function makeActive() {
    for (const section of sections) {
        const box = section.getBoundingClientRect();
            //Find a value that works best, but 150 seems to be a good start.
        if (box.top <= 150 && box.bottom >= 150) {
            //apply active state on current section and corresponding Nav link
            let navLinks = document.querySelectorAll("#navbar__list a");
            section.classList.add("active-section");
            let sectionId = "#" + section.id;
            for (const navLink of navLinks) {
              if (navLink.hash === sectionId) {
                navLink.classList.add("active");
                //Remove active state from corresponding Nav link
              } else {
                navLink.classList.remove("active");
              }
            }
        } else {
            //Remove active state from other section and corresponding Nav link
            section.classList.remove("active-section");
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click
function onClickedLink(e) {
    e.preventDefault();
    document.querySelector(e.target.hash).scrollIntoView({
        behavior: "smooth",
    });
};

for (const navLink of navLinks) {
    navLink.addEventListener("click", onClickedLink);
}

// Set sections as active
document.addEventListener("scroll", (e) => {
    e.preventDefault();
    makeActive();
});
