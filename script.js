var timeDisplayEl = $("#currentDay");
var textInputs = $('.description');
renderText(); //do this when page loads to check if anything already saved in local memory

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
    let keys = Object.keys(localStorage);

    for(var i=0; i<keys.length;i++) { //loop through all the keys
        var textValues = window.localStorage.getItem(keys[i]); //get the value for the current key
        var textEl = findText(parseInt(keys[i])); //find the text area that goes with the current key
        textEl.value = textValues; //set the text to display
    }
}

 function findText(key){ //take the key and find the textarea with the matching id
    var textEls = $('.description');
    for(var i=0; i<textEls.length;i++){
        id = parseInt(textEls[i].id);
        if(id === key )
        return textEls[i];
    }
    
}
