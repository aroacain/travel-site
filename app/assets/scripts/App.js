import '../styles/styles.css';
//Import blueprint for the mobile menu
import MobileMenu from './modules/MobileMenu';
import StickyHeader from './modules/StickyHeader';

//Creating the mobile menu
// No need to live in a variable because only loaded once and not related to other events
new MobileMenu();

//Sticky header changes transparency
// No need to live in a variable because only loaded once and not related to other events
new StickyHeader();

// Using Webpack to only load the modal when the user clicks on the button
// Store it into a variable becasue we'll call it later on, every time they click the button
let modal

        //Select the buttons that would open the modal
        document.querySelectorAll(".open-modal").forEach(el => {
        el.addEventListener("click", e => {
            // Prevent default behavior of A tags
            e.preventDefault()
            // If the modal variable is still empty, load it
            if (typeof modal == "undefined") {
            // "Promise". Then loads if all goes well, catch loads if there's a problem
            // x represents the file we just loaded. We need default because it exports the default
            import(/* webpackChunkName: "modal" */ './modules/Modal').then(x => {
                modal = new x.default()
                // Timeout to give browser a few ms to inject HTML, etc.
                setTimeout(() => modal.openTheModal(), 20)
            }).catch(() => console.log("There was a problem."))
            // Else, if the modal variable is NOT empty, just open it.
            } else {
            modal.openTheModal()
            }
        })
        })


if (module.hot) {
    module.hot.accept();
}