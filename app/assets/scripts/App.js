import '../styles/styles.css';
//Import blueprint for the mobile menu
import MobileMenu from './modules/MobileMenu'

//Creating the mobile menu
let mobileMenu = new MobileMenu();

if (module.hot) {
    module.hot.accept();
}