console.log('client side js is loaded');

const weather_form=document.querySelector('form');
const search =document.querySelector('input')
const msgOne=document.querySelector('#msg-1')
const msgTwo=document.querySelector('#msg-2')

weather_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location =search.value;
    
    msgOne.textContent ='Loading...'
    msgTwo.textContent=''

    fetch('/weather?adress='+ location).then((response) => 
{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error
        }
        else{
           msgOne.textContent =data.location
           msgTwo.textContent =data.forecast
        }
    })

})
})