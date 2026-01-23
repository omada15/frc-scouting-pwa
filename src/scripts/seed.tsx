const emptyList = '{"eventname" : "", "team": 0, "match": 0, "name": "seed", "scoutingTeam": 0, "autoFuel": 0, "autoClimbed": false, "transitionFuel": 0, "shift1HubActive": false, "shift1Fuel": 0, "shift1Defense": false, "shift2HubActive": false, "shift2Fuel": 0, "shift2Defense": false, "shift3HubActive": false, "shift3Fuel": 0, "shift3Defense": false, "shift4HubActive": false, "shift4Fuel": 0, "shift4Defense": false, "endgameFuel": 0, "endgameClimbLevel": "Level 1", "crossedBump": false, "underTrench": false, "robotError": [], "note": ""}';

    // Setup values
    let scoutingTeam = 0;
    let eventName = "";
    let teamNumber = 0;
    let matchNumber = 0;

    // Auto values
    let autoFuel = 0;
    let autoClimbed = false;

    // Teleop values
    let transitionFuel = 0;
    let shift1HubActive = false;
    let shift2HubActive = false;
    let shift3HubActive = false;
    let shift4HubActive = false;

    let shift1Fuel = 0;
    let shift2Fuel = 0;
    let shift3Fuel = 0;
    let shift4Fuel = 0;

    let shift1Defense = false;
    let shift2Defense = false;
    let shift3Defense = false;
    let shift4Defense = false;

    // Endgame values
    let endgameFuel = 0;
    let endgameClimbLevel = "0";

    // finale  values
    let crossedBump = false;
    let underTrench = false;
 let notes: Record<string, boolean> = {
        "Intake issues": false,
        "Climb Failed": false,
        "Robot unresponsive": false,
        "Robot part fell off": false,
        "Did not participate": false,
        "Auto Stop": false,
        "Robot could not get off after climb": false,
        Other: false,
    };
    let otherRobotNotes = "";


let randNum = 0;


const robotErrorList: string[] = ['Intake issues', 'Climb Failed', 'Robot Unresponsive', 'Robot part fell off', 'Did not participate', 'Auto stop', 'Robot did not get off after climb', 'other'];

// Select the items at the chosen indices



function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}


/**
 * Returns an example scouting as a JSON.
 */
function seedDataBase(){

let emptyJsonList = JSON.parse(emptyList);


    // EventName
    if (getRandomInt(0, 1) == 0){
        eventName = "NE District Minuteman Event";
    } else {
        eventName = "Ne District URI Event";
    }

    // Scouting Team
    scoutingTeam = getRandomInt(0,9998)

    // teamNumber
    teamNumber = 9999;

    // matchNumber
    matchNumber = getRandomInt(1,70);

    // autoFuel
    autoFuel = getRandomInt(10,50);

    // autoClimbLevel
    if (getRandomInt(0, 1) == 0){
        autoClimbed = false;
    } else {
        autoClimbed = true;
    }



    // shift1HubActive
    if (getRandomInt(0, 1) == 0){
        shift1HubActive = true;
    } else {
        shift1HubActive = false;
    }

    // shift1Fuel & shift1Defense
    if (shift1HubActive) {
        shift1Fuel = 0;
        if (getRandomInt(0,1) == 0){
            shift1Defense = false;
        } else {
            shift1Defense = true;
        }
    } else {
        shift1Fuel = getRandomInt(10,60);
    }



    // shift2HubActive
    if (shift1HubActive){
        shift2HubActive = false;
    } else {
        shift2HubActive = true;
    }

    // shift2Fuel & shift2Defense
    if (shift1HubActive) {
        shift2Fuel = 0;
        if (getRandomInt(0,1) == 0){
            shift2Defense = false;
        } else {
            shift2Defense = true;
        }
    } else {
        shift2Fuel = getRandomInt(10,60);
        shift2Defense = false;
    }



    // shift3HubActive
    if (shift1HubActive){
        shift3HubActive = true;
    } else {
        shift3HubActive = false;
    }

    // shift3Fuel & shift3Defense
    if (!shift1HubActive) {
        shift3Fuel = 0;
        if (getRandomInt(0,1) == 0){
            shift3Defense = false;
        } else {
            shift3Defense = true;
        }
    } else {
        shift3Fuel = getRandomInt(10,60);
        shift3Defense = false;
    }



    // shift4HubActive
    if (shift1HubActive){
        shift4HubActive = false;
    } else {
        shift4HubActive = true;
    }

    // shift4Fuel & shift4Defense
    if (shift4HubActive) {
        shift4Fuel = 0;
        if (getRandomInt(0,1) == 0){
            shift4Defense = false;
        } else {
            shift4Defense = true;
        }
    } else {
        shift4Fuel = getRandomInt(10,60);
        shift4Defense = false;
    }



    // endgameFuel
    endgameFuel = getRandomInt(5,40);

    // endgameClimbLevel
    endgameClimbLevel = getRandomInt(0,3).toString();

    // crossedBump
    if (getRandomInt(0, 1) == 0){
        crossedBump = false;
    } else {
        crossedBump = true;
    }

    // underTrench
    if (getRandomInt(0, 1) == 0){
        underTrench = false;
    } else {
        underTrench = true;
    }

    // notes
    const selectedErrors: number[] = [getRandomInt(0,2), getRandomInt(3,4), getRandomInt(5,7)];
    for (let i = 0; i<3; i++){
        notes[selectedErrors[i]] = true;
    }

    // otherRobotNotes
    otherRobotNotes = "thank you sam";

    // setup
    emptyJsonList["eventName"] = eventName;
    emptyJsonList["teamNumber"] = teamNumber;
    emptyJsonList["matchNumber"] = matchNumber;

    // auto
    emptyJsonList["autoFuel"] = autoFuel;
    emptyJsonList["autoClimbed"] = autoClimbed;

    // teleop
    emptyJsonList["transitionFuel"] = transitionFuel;

    emptyJsonList["shift1HubActive"] = shift1HubActive;
    emptyJsonList["shift2HubActive"] = shift2HubActive;
    emptyJsonList["shift3HubActive"] = shift3HubActive;
    emptyJsonList["shift4HubActive"] = shift4HubActive;

    emptyJsonList["shift1Fuel"] = shift1Fuel;
    emptyJsonList["shift2Fuel"] = shift2Fuel;
    emptyJsonList["shift3Fuel"] = shift3Fuel;
    emptyJsonList["shift4Fuel"] = shift4Fuel;

    emptyJsonList["shift1Defense"] = shift1Defense;
    emptyJsonList["shift2Defense"] = shift2Defense;
    emptyJsonList["shift3Defense"] = shift3Defense;
    emptyJsonList["shift4Defense"] = shift4Defense;

    // endgame
    emptyJsonList["endgameFuel"] = endgameFuel;
    emptyJsonList["endgameClimbLevel"] = endgameClimbLevel;

    // finale
    emptyJsonList["crossedBump"] = crossedBump;
    emptyJsonList["underTrench"] = underTrench;
    emptyJsonList["robotErrorsCheck"] = notes;
    emptyJsonList["otherRobotNotes"] = otherRobotNotes;


    return emptyJsonList;
}

const seedFunction = seedDataBase();
export default seedFunction;