//console.log('Client side javascript has been loaded')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
//messageone.textContent = 'from javas'
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    messageone.textContent='Loading...'
    messagetwo.textContent=''


fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            messageone.textContent = data.error
        }
        else
        {
            messageone.textContent = data.location
            messagetwo.textContent=  data.forecastdata
        }
                
    })
})

})