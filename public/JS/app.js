

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

// messageOne.textContent='Hi helo'


weatherForm.addEventListener('submit',(e)=>{    //created an object for the event listener
                                                //preventDefault() blocks all the default properties of the listener 
                                                //such as refreshing the page everytime when submission is clicked.

                                                

    e.preventDefault()

    const loc= search.value
    messageOne.textContent='Loading....'
    messageTwo.textContent=''

    
    fetch('/weather?address='+loc).then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }
        else
        {
            messageOne.textContent=data.Location
            messageTwo.textContent=data.forecast
        }
    })   
})
   
})