//Get today date
document.getElementById('day_trip').value = new Date().toISOString().substring(0, 10);

 //pre-fill the current time
 const currentTime = new Date()
 const hours = currentTime.getHours().toString().padStart(2, '0');
 const minutes = currentTime.getMinutes().toString().padStart(2, '0');
 const currentHours = `${hours}:${minutes}`;
 document.getElementById('departure').value = currentHours;
