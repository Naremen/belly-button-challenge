// Read in the json data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Promise to read in the json data
const dataPromise = d3.json(url);
console.log("Data Promise:", dataPromise);

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
       for (let key in result) {
           pannel.append("p").text(key + ": " + result[key]);
       }
       console.log(result); 
       //pannel.html("");   
    })


    

}
function buildChart(params) {
    d3.json(url).then(function (data) {
        let samples = data.samples;
        results = samples.filter(sample => sample.id == params);
        result = results[0];
        let ids = result.otu_ids;
        let labels = result.otu_labels;
        let values = result.sample_values;
        console.log(result);
        // create the bar chart
         Plotly.newPlot('bar', [{
             x: result.otu_ids.slice(0, 10),
             y: result.sample_values.slice(0, 10),
             text: result.otu_labels.slice(0, 10),
             type: "bar",
             labels: "otu_ids",
             orientation: "h"
        }]) 
        Plotly.newPlot('bubble', [{
            x: ids,
            y: values,
            text: labels,
            marker: {
                size: values,
                color: ids
            }
        }])
     })
     console.log(params);
}

function optionChanged(params) {
    buildPannel(params);
    buildChart(params);
}

function init() {
    dropDown = d3.select('#selDataset');
    d3.json(url).then(function (data) {
        let names = data.names;
        for (let i = 0; i < names.length; i++) {
            dropDown.append("option").text(names[i]).property("value", names[i]);
        }
        buildPannel(names[0]);
        buildChart(names[0]);
    });
}
init();