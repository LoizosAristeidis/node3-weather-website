/* Fetch data from the URL, then execute the below response */
// fetch('/weather?address=boston').then((response) => {
    /* Run this function when the JSON data has been fetched */
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

/* Select the Form and its elements on the index.hbs file */
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()   // Prevent the form's default behaviour which refreshes the page
    const location = search.value   // Retrieve the value of the search input field
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    /* Fetch data from the URL, then execute the below response */
    fetch('/weather?address=' + location).then((response) => {
        // Run this function when the JSON data has been fetched
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})