import '../styles/styles.css';
//Import blueprint for the mobile menu
import MobileMenu from './modules/MobileMenu'
import StickyHeader from './modules/StickyHeader'

//Creating the mobile menu
let mobileMenu = new MobileMenu();

//Sticky header changes transparency
let stickyHeader = new StickyHeader();

if (module.hot) {
    module.hot.accept();
}