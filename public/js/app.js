console.log("This is client side window");



const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit',(event) => {
    event.preventDefault();
    const location = search.value;

    msgOne.textContent = "Loading...";
    
 fetch('http://localhost:3000/weather?address='+location)
.then(response => {
    response.json().then(data => {
        if(data.error){
            msgOne.textContent = data.error
        }else{
            msgOne.textContent = data.location
            msgTwo.textContent = data.temp
        }
    })
})

})