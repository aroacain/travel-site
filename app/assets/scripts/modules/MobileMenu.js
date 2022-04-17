// Class for the mobile menu
class MobileMenu {
  //Constructor function that will be used to create new instances
  constructor() {
    //Assign variable names to different DOM objects
    this.menuIcon = document.querySelector(".site-header__menu-icon")
    this.menuContent = document.querySelector(".site-header__menu-content")
    this.siteHeader = document.querySelector(".site-header")
    //Start the event listener
    this.events()
  }

  //Events to listen for
  events() {
    //Using an arrow function keeps the event listener from changing the value of the 'this' keyword
    this.menuIcon.addEventListener("click", () => this.toggleTheMenu())
  }

  //Functionality
  toggleTheMenu() {
    this.menuContent.classList.toggle("site-header__menu-content--is-visible")
    this.siteHeader.classList.toggle("site-header--is-expanded")
    // Animate the hamburger menu into an X
    this.menuIcon.classList.toggle("site-header__menu-icon--close-x")
  }
}

//Make the class available to import from other files
export default MobileMenu