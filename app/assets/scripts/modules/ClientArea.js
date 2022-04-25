import Axios from 'axios'

class ClientArea {
  constructor() {
    this.injectHTML()
    // DOM elements where the data will be inputted 
    this.form = document.querySelector(".client-area__form")
    this.field = document.querySelector(".client-area__input")
    this.contentArea = document.querySelector(".client-area__content-area")
    this.events()
  }

  events() {
    // Listen for the submit button and capture the element as "e"
    this.form.addEventListener("submit", e => {
      // Prevent the default behavior of refreshing the browser when submitting post request
      e.preventDefault()
      // Method created to handle the request
      this.sendRequest()
    })
  }

  sendRequest() {
    // Promise with then and catch
    Axios.post('https://sage-squirrel-4848a9.netlify.app/.netlify/functions/secret-area', {password: this.field.value}).then(response => {
      // Remove form if password is correct
      this.form.remove()
      // Send response data if password is correct
      this.contentArea.innerHTML = response.data
    }).catch(() => {
      // Display this message and reset the value of input if password fails
      this.contentArea.innerHTML = `<p class="client-area__error">That secret phrase is not correct. Try again.</p>`
      this.field.value = ''
      this.field.focus()
    })
  }

  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="client-area">
      <div class="wrapper wrapper--medium">
        <h2 class="section-title section-title--blue">Secret Client Area</h2>
        <form class="client-area__form" action="">
          <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
          <button class="btn btn--orange">Submit</button>
        </form>
        <div class="client-area__content-area"></div>
      </div>
    </div>
    `)
  }
}

export default ClientArea