const serviceFunction = {
        timeModulo5(time) {
        let minutes = time.substring(3,5);
        console.log(minutes)
        let hours = time.substring(0,2);
        console.log(hours)
        //Core function
        if(minutes % 5 == 0) {
            return time;
        } else if(minutes % 5 == 1 || minutes % 5 == 2) {
            while (minutes % 5 != 0) {
                minutes--;
            }
        } else {
            while (minutes % 5 != 0) {
                minutes++;
            }
        }
        //Manage specific cases
        if(minutes == 60) {
            minutes = '00';
            hours = (parseInt(hours) + 1).toString();
            console.log(hours)
        }

        if(hours == 24) {
            hours = '00'
        }


            time = `${hours}:${minutes}`;
            return time;
        } 
    }


module.exports = serviceFunction
