


 //pre-fill the current time
 const currentTime = new Date()
 const hours = currentTime.getHours().toString().padStart(2, '0');
 const minutes = currentTime.getMinutes().toString().padStart(2, '0');
 const currentHours = `${hours}:${minutes}`;
 document.getElementById('departure').value = currentHours;


 //display or not the detail reason

 let delay = document.querySelector('#tripform__delay-yes')
 let noDelay = document.querySelector('#tripform__delay-no')

 let reasonLabel = document.querySelector('#tripform_reasonLabel')
 let reasonInput = document.querySelector('#tripform_reasonInput')

 delay.addEventListener('change', () => {
    reasonLabel.style.display = 'block'
    reasonInput.style.display = 'block'
 })

 noDelay.addEventListener('change', () => {
    reasonLabel.style.display = 'none'
    reasonInput.style.display = 'none'
 })