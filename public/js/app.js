console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // do not reload
    const location = search.value

    // text while waiting for fetch
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // run in browser, not node
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent =data.forcast
        })
    })
})