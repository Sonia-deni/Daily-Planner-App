var timeDisplayEl = $("#currentDay");
var textInputs = $('.description');
renderText();

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
    
$('.saveBtn').on('click', function(){
    var hourSaved = parseInt(this.id);    
    var textToSave = getText(hourSaved);
    var saveObject = {
        time: hourSaved,
        description: textToSave 
    }
    updateLocalMemory(saveObject);
});

function getText(hourClicked){ //finds the text input for the corresponding save button and returns it
    var hour = hourClicked;

    for(var i=0; i<textInputs.length; i++){
        var matchTextHour = parseInt(textInputs[i].id);
        if(matchTextHour === hour){
            return textInputs[i].value;
        }
    }
}


function updateLocalMemory(saveObject){
    localStorage.setItem(saveObject.time, saveObject.description);
    renderText();
}

function renderText(){
    var textBoxes = $('.description');
    let keys = Object.keys(localStorage);
    let values = Object.values(localStorage);

    for(var i=0; i<keys.length;i++) { //loop through and set the text to the correct textbox
        textBoxes[i].value = values[i];
    }
}

