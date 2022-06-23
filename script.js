// Write your JavaScript code here!
// const { pickPlanet, addDestinationInfo } = require("./scriptHelper");

// const { myFetch } = require("./scriptHelper");

// const { formSubmissionFunction, myFetchFunction } = require("./scriptHelper");

// const formSubmissionFunction = require("./scriptHelper.js");
window.addEventListener("load", function () {

    let form = this.document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let pilot = pilotNameInput.value;

        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let copilot = copilotNameInput.value;

        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let fuelLevel = fuelLevelInput.value;

        let cargoMassInput = document.querySelector("input[name=cargoMass]");
        let cargoMass = cargoMassInput.value;

        let list = document.getElementById("faultyItems");

        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let selection = pickPlanet(listedPlanets);
        addDestinationInfo(document, selection.name, selection.diameter, selection.star, selection.distance, selection.moons, selection.image);
    })
});
