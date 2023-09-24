// Read in the json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise to read in the json data
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the data and console log it
d3.json(url).then(function (data) {
    console.log(data);
})


function buildPannel(x) {
    let pannel = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
       let metadata = data.metadata;
       results = metadata.filter(challenge => challenge.id == x);
       result = results[0];
       console.log(result);
       pannel.html("");
    })


    

}
function buildChart(params) {

}
function optionChanged(y) {
    buildPannel(y);
    buildChart(y);
}

function init() {
    dropDown = d3.select('#selDataset');
    d3.json(url).then(function (data) {
        let names = data.names;
        for (let i = 0; i < names.length; i++) {
            dropDown.append("option").text(names[i]).property("value", names[i]);
        }
        buildpannel(names[0]);
        buildchart(names[0]);
    });
}
init();