//Pass id value to delete the correct user.

deleteUsers = document.querySelectorAll('#user_delete')

for(let i =0;i<deleteUsers.length;i++) {
    deleteUsers[i].addEventListener('click', () => {
        document.querySelector('.user__modal-confirmation').style.display = 'flex'
        id = deleteUsers[i].getAttribute('data-id')
        document.querySelector('#user__delete-form').action = `/delete/user/${id}`
    })
}

//close the modal

modal = document.querySelector('#user_nodelete')
modal.addEventListener('click', () => {
    document.querySelector('#modal').style.display = 'none'
})
