// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
                 `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if ((validateInput(pilot) === "Empty") || (validateInput(copilot) === "Empty") || (validateInput(fuelLevel) === "Empty") || (validateInput(cargoLevel) === "Empty")) {

        alert("All fields are required!");
        list.style.visibility = "";
        document.getElementById("launchStatus").style.color = "";
        document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`;

    } else if ((validateInput(pilot) === "Is a Number") || (validateInput(copilot) === "Is a Number") || (validateInput(fuelLevel) === "Not a Number") || (validateInput(cargoLevel) === "Not a Number")) {

        alert("Make sure to enter valid information for each field!");
        list.style.visibility = "";
        document.getElementById("launchStatus").style.color = "";
        document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`;

    } else {

        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000) {

            list.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
            document.getElementById("launchStatus").style = "color:red";
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;

        } else {
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
        }

        if (cargoLevel > 10000) {

            list.style.visibility = "visible";
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
            document.getElementById("launchStatus").style = "color:red";
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`;

        } else {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
        }

        if ((fuelLevel >= 10000) && (cargoLevel <= 10000)) {
            document.getElementById("launchStatus").style = "color:green";
            document.getElementById("launchStatus").innerHTML = `Shuttle Ready for Launch`;
        }
    }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    // generate a number from 0-5
    let index = Math.floor(Math.random() * 6);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
