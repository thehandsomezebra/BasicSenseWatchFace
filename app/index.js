import clock from "clock";
import * as document from "document";
import {preferences} from "user-settings";
import * as util from "../common/utils";
import {HeartRateSensor} from "heart-rate";
import {today} from "user-activity";
import {display} from "display";

const heartLabel = document.getElementById("heartLabel");
const timeLabel = document.getElementById("timeLabel");
const hrm = new HeartRateSensor();
const stairsLabel = document.getElementById("stairsLabel");
const stepsLabel = document.getElementById("stepsLabel");


clock.granularity = "seconds";


// Event handler for changes in the display status
function displayChanged() {
    if (display.on) {
        console.log("display on")


        clock.ontick = (evt) => {

            let todaydate = evt.date;
            let hours = todaydate.getHours();
            let ampm = " am"

            if (preferences.clockDisplay === "12h") { // 12h format
                if (hours > 12) {
                    ampm = " pm";
                    hours -= 12;
                } else if (hours == 12) {
                    ampm = " pm"
                } else if (hours == 0 && ampm == " am") {
                    hours += 12;
                }
                hours = hours % 12 || 12;
            } else { // 24h format
                hours = util.zeroPad(hours);
                ampm = ""
            }
            let mins = util.zeroPad(todaydate.getMinutes());


            timeLabel.text = `${hours}:${mins}${ampm}`;


            hrm.onreading = function () {
                heartLabel.text = `❤️ ${hrm.heartRate} `
                console.log("Current heart rate: " + hrm.heartRate);
                hrm.stop();
            }
            hrm.start();


            stepsLabel.text = `steps: ${today.adjusted.steps}`
            stairsLabel.text = `floors: ${today.adjusted.elevationGain}`
            
        }
    } else {
        console.log("display off")
    }
}

// Calls displayChanged() when display changes -- should save battery
display.addEventListener("change", displayChanged);
