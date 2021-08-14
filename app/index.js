import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeLabel = document.getElementById("timeLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  
  let today = evt.date;
  let hours = today.getHours(); 
  let ampm = " am"

 
  if (preferences.clockDisplay === "12h") {
    // 12h format
      if (hours > 12){
    ampm = " pm";
    hours -= 12;
  } else if (hours == 12){
    ampm = " pm"
  } else if (hours == 0 && ampm == " am"){
    hours += 12;
  }
    
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
    ampm = ""
  }
  let mins = util.zeroPad(today.getMinutes());
  

timeLabel.text = `${hours}:${mins}${ampm}`;

}



import { HeartRateSensor } from "heart-rate";


const heartLabel = document.getElementById("heartLabel");
if (HeartRateSensor) {
   // console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     // console.log(`Current heart rate: ${hrm.heartRate}`);
     heartLabel.text = `❤️ ${hrm.heartRate}`
   });
   hrm.start();
// } else {
//    console.log("This device does NOT have a HeartRateSensor!");
}


import { me as appbit } from "appbit";
import { today } from "user-activity";

const stairsLabel = document.getElementById("stairsLabel");
const stepsLabel = document.getElementById("stepsLabel");

if (appbit.permissions.granted("access_activity")) {
   // console.log(`${today.adjusted.steps} Steps`);
   stepsLabel.text = `steps: ${today.adjusted.steps}`
   if (today.local.elevationGain !== undefined) {
     // console.log(`${today.adjusted.elevationGain} Floor(s)`);
      stairsLabel.text = `floors: ${today.adjusted.elevationGain}`
   }
}