module.exports=function SettingsBill() {

    var  callCost;
    var theSmsCost;
    var theWarningLevel;
    var theCriticalLevel;
   var callCostTotal = 0;
    var smsCostTotal = 0;
    var  actList =[];

    function setCallCost(cost) {
        callCost = Number(cost);
    }

    function getCallCost() {
        return callCost
    }
    function setSmsCost(smsCost) {
        theSmsCost = Number(smsCost);
    }
    function getSmsCost() {
        return theSmsCost;
    }
    function setWarningLevel(level) {
        console.log(level);
        theWarningLevel = Number(level);

    }
    function getWarningLevel() {
        return theWarningLevel;
    }
    function setCriticalLevel(criticalLevel) {
        theCriticalLevel = Number(criticalLevel);
    }
    function getCriticalLevel() {
        return theCriticalLevel;
    }
    function makeCall() {
        if (!hasReachedCriticalLevel()) {
            callCostTotal += callCost;
        }

    }
    function getTotalCost() {
        return callCostTotal + smsCostTotal;

    }
     function getTotalCallCost() {
         return callCostTotal;

    }
     function getTotalSmsCost() {
    return smsCostTotal;

    }
    function sendSms() {
        if (!hasReachedCriticalLevel()) {
            smsCostTotal += theSmsCost;
        }
    }
    function billType(billType) {

        

        if (!hasReachedCriticalLevel()){
        var  cost = 0;
        if (billType === "call") {
            callCostTotal += callCost;
            cost = callCost;
        }
        else if (billType === "sms") {
            smsCostTotal += theSmsCost;
            cost = theSmsCost
        }
        actList.push({
            type: billType,
            cost,
            timestamp :new Date()
            
        })
    }

 }
function actionsFor(type){
    
    const filteredActions = [];

     //loop through all the entries in the action list 
    for (let index = 0; index < actList.length; index++) {
        const action = actList[index];
        // check this is the type we are doing the total for 
        if (action.type === type) {
             // add the action to the list
             filteredActions.push(action);
         }
     }

     return filteredActions;

     // return actionList.filter((action) => action.type === type);
 }

    function action(){
        return actList;
    }   

    function hasReachedCriticalLevel() {
        return getTotalCost() >= getCriticalLevel();

    }
    function totalClassName() {

        console.log(getTotalCost());
        console.log(getCriticalLevel());
        
        
        if (getTotalCost() >= getCriticalLevel()) {
            return "danger"

        }

        if (getTotalCost() >= getWarningLevel()) {
            return "warning"
           


        }
    }









    return {
        setCallCost,
        getCallCost,
        setSmsCost,
        getSmsCost,
        setWarningLevel,
        getWarningLevel,
        setCriticalLevel,
        getCriticalLevel,
        makeCall,
        getTotalCost,
        getTotalCallCost,
       getTotalSmsCost,
        sendSms,
        totalClassName,
        hasReachedCriticalLevel,
        billType,
        action,
        
        actionsFor
        
        
    }
}