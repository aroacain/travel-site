import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
    // Collection of page sections
    this.pageSections = document.querySelectorAll(".page-section")
    // Store browser height
    // It will be updated with the event listener in the events methid
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    // Call the events method right away
    this.events()
  }

  events() {
    // Throttle the scrill event listener so the method runOnScroll only loads every 0.2 secs
    window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
    // Event listener to update browser height stored in variable
    window.addEventListener("resize", debounce(() => {
      this.browserHeight = window.innerHeight
    }, 333))
  }

  runOnScroll() {
    this.determineScrollDirection()

    // See if the user has scrolled 60px on the Y axis
    if (window.scrollY > 60) {
      // Add the darker header class
      this.siteHeader.classList.add("site-header--dark")
    } else {
      // Remove the darker class if less than 60px on the Y axis
      this.siteHeader.classList.remove("site-header--dark")
    }

    // Create a section to calculate if each section has been scrolled to
    this.pageSections.forEach(el => this.calcSection(el))
  }

  // Determine current scroll direction
  determineScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }
    this.previousScrollY = window.scrollY
  }

  calcSection(el) {
    // Check if position on Y axis is lower than offset top and higher than bottom (top + element height)
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      // Save percentage scrolled
      let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
      // Check if percentage scrolled is between certain values of the section
      // Different percentages depending on whether we are scrolling up or down
      if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
        // Store the element that saves the related id
        let matchingLink = el.getAttribute("data-matching-link")
        // Select all the elements with these classes and remove the current link class
        // Works when scrolling down
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link"))
        // Add class to the current link
        document.querySelector(matchingLink).classList.add("is-current-link")
      }
    }
  }
}

export default StickyHeader