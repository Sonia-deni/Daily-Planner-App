var timeDisplayEl = $("#currentDay");
//var today = moment();

setInterval(displayTime, 10000);
function displayTime() {
    var currentTime = moment().format("DD MMM YYYY");
    timeDisplayEl.text(currentTime);

   
    const rows = document.getElementsByClassName("description"); //gets an array of all the textareas
    var currentHour = parseInt(moment().format('H')); //get the current hour to compare with the ids of each textarea

    for(var i=0; i<rows.length; i++){
        var hourToCompare = rows[i].id;
        console.log(hourToCompare);
        if(hourToCompare === currentHour){
            console.log("current hour" + currentHour);
        }
        else if(hourToCompare > currentHour){
           console.log(hourToCompare + " is after " + currentHour);
        }
        else if(hourToCompare < currentHour){
            console.log(hourToCompare + " is before " + currentHour);
        }
    }


}
    
