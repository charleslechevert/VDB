const elms =['boat','type_trip','harbour']

for(elm of elms) {

    dataSelected  = document.getElementById(elm).getAttribute(`data-${elm}`)
    options = document.querySelector(`[data-${elm}]`)
    for(option of options) {
        if(option.value == dataSelected) {
            option.selected = 'selected'
        }
    }

}

//Get today date
document.getElementById('day_trip').value = new Date().toISOString().substring(0, 10);