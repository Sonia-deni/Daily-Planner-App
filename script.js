var timeDisplayEl = $("#currentDay");

setInterval(displayTime, 1000); 
function displayTime() {//updates the time and colour codes the timeblocks
    var currentTime = moment().format("DD MMM YYYY");
    timeDisplayEl.text(currentTime);

    const rows = document.getElementsByClassName("description"); //gets an array of all the textareas
    var currentHour = parseInt(moment().format('H')); //get the current hour to compare with the ids of each textarea

    for(var i=0; i<rows.length; i++){
        var hourToCompare = rows[i].id;
        var setColor = rows[i];
        //compare the hours, and set colours accordingly
        if(hourToCompare > currentHour){
           setColor.setAttribute('class','future col-10 description');
        }
        else if(hourToCompare < currentHour){
            setColor.setAttribute('class','past col-10 description');
        }
        else{
            setColor.setAttribute('class','present col-10 description');
        }
    }
}
    
$('.saveBtn').on('click', function(){//get the value of the textbox with the matching id. If no text, alert
    var hourSaved = parseInt(this.id);    
    var textToSave = getText(hourSaved);
    if(textToSave){
        var saveObject = {
            time: hourSaved,
            description: textToSave
        }
        updateLocalMemory(saveObject);
    }
    else{
       alert("no text input");
       updateLocalMemory("");
    } 
});

function getText(hourClicked){ //finds the text input for the corresponding save button and returns it
    var hour = hourClicked;
    var textInputs = $('.description');

    for(var i=0; i<textInputs.length; i++){
        var matchTextHour = parseInt(textInputs[i].id);
        if(matchTextHour === hour){
            return textInputs[i].value;
        }
    }
}

function updateLocalMemory(saveObject){
    var savedItems = JSON.parse(localStorage.getItem("SavedItems")) || [];
    savedItems.push(saveObject);
    localStorage.setItem("SavedItems", JSON.stringify(savedItems));
}


