var timeDisplayEl = $("#currentDay");
var textInputs = $('.description');

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
    var savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    var overwrite = parseInt(saveObject.time);//gets time trying to save into
    var overwriteText = saveObject.description;
    var updated = false;

    if(savedItems.length > 0 ){ //something already stored
        for(var i=0; i<savedItems.length; i++){ //loop through existing saved items
            var timeCheck = parseInt(savedItems[i].time); //get time of each item
                if(!updated && timeCheck === overwrite) { //if the times match and there's already a description
                    savedItems[i].description = overwriteText; //update the description to the new description
                    localStorage.setItem("savedItems", JSON.stringify(savedItems)); 
                    updated = true;  
                }
                else {
                    savedItems.push(saveObject);
                    localStorage.setItem("savedItems", JSON.stringify(savedItems)); 
                }
            }
    }
    else {
        savedItems.push(saveObject);
        localStorage.setItem("savedItems", JSON.stringify(savedItems)); 
    }
}
    

    /*var setText;
    for(var i=0; i<textInputs.length; i++){
        for(var j=0; j<savedItems.length; j++){
            if(textInputs[i].id == savedItems[j].time){
                setText = savedItems[j].description;
                textInputs[i].value = setText;
            }
        }
       
       
    }*/



  












//updateLocalMemory();
