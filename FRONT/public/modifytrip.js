deleteTrip = document.getElementById('delete_trip')
console.log(deleteTrip)

deleteTrip.addEventListener('click', ()=> {
    document.querySelector('.user__modal-confirmation').style.display = 'flex'
    id = deleteTrip.getAttribute('trip-id')
    console.log(id)
    document.querySelector('#user__delete-form').action = `/delete/trip/${id}`
})

modal = document.querySelector('#user_nodelete')
modal.addEventListener('click', () => {
    document.querySelector('#modal_trip').style.display = 'none'
})