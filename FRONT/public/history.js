console.log('yo')

function formatDate(data) {
    const date = new Date(data);
    return date.toLocaleDateString('fr', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    });

}

const dates = document.querySelectorAll('#day_trip')
for(date of dates) {
    date.textContent = formatDate(date.textContent)
}
