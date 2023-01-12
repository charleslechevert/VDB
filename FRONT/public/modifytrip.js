deleteTrip = document.getElementById('delete_trip')

deleteTrip.addEventListener('click', ()=> {
    document.querySelector('.user__modal-confirmation').style.display = 'flex'
    id = deleteTrip.getAttribute('trip-id')
    document.querySelector('#user__delete-form').action = `/delete/trip/${id}`
})

modal = document.querySelector('#user_nodelete')
modal.addEventListener('click', () => {
    document.querySelector('#modal_trip').style.display = 'none'
})

//Make not possible to post a future date
document.getElementById('day_trip').max = new Date().toISOString().substring(0, 10);
