// test for connection
console.log("test")

// ======  homework ===== 
function chart(idInfo){
    // console.log(idInfo)
    var sample_values = idInfo.sample_values;
    console.log(sample_values);
    var otu_ids = idInfo.otu_ids;
    console.log(otu_ids);
    var otu_labels = idInfo.otu_labels;
    var barC = [{
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(y => `OTU ${y}`),
        hovertext: otu_labels,
        type: 'bar',
        orientation: 'h'
    }]
    Plotly.newPlot('bar', barC);

    var bubbleC = [{ 
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids
        },
        text: otu_labels
    }];
    var layout = {
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis: {
          title: {
            text: 'OTU ID',
          },
        },
 
      };
    Plotly.newPlot('bubble',bubbleC,layout);
    
};

function metadata(idInfo){
    d3.select("#sample-metadata").html("");
    Object.entries(idInfo).forEach(function([k,v]){
        d3.select("#sample-metadata")
        .append("ul")
        .text(`${k}: ${v}`)
         });
    var wfreq = idInfo.wfreq
    console.log(wfreq)
    var GaugeC = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [0,9] },
            steps: [
              { range: [0, 1], color: "#4095CB" },
              { range: [1, 2], color: "#4A9FD5" },
              { range: [2, 3], color: "#54A9DF" },
              { range: [3, 4], color: "#5EB3E9" },
              { range: [4, 5], color: "#68BDF3" },
              { range: [5, 6], color: "#72C7FD" },
              { range: [6, 7], color: "#7CD1FF" },
              { range: [7, 8], color: "#86DBFF" },
              { range: [8, 9], color: "#B8FFFF" },
            ]},
    }];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', GaugeC, layout);

};


function init(){
    file = "samples.json";
// 1. Use the D3 library to read in `samples.json`.
    d3.json(file).then(function(data){
        // console.log(data);
        var options = data.names
        options.forEach(x => {
            d3.select("#selDataset")
            .append("option")
            .attr("value",x)
            .text(x)
        });
        // var inputDate = d3.select("#selDataset");
        // // console.log(inputDate)
        // var inputValue = inputDate.property("value");
        // // console.log(inputValue)
        var initChart = data.samples[0];
        console.log(initChart)
        var initData = data.metadata[0];
        // console.log(initData)
        chart(initChart);
        metadata(initData);
        
    }
    )};

function optionChanged(newValue){
    // console.log("new-connection")
    d3.json(file).then(function(data){
    var inputDate = d3.select("#selDataset");
    var inputValue = inputDate.property("value");

    console.log(inputValue);

    var newChart = data.samples.find(d => d.id === inputValue);
// Romand... help me, please....! 
    var newData = data.metadata.find(d => d.id.toString() === inputValue);
    console.log(newChart);
    console.log(newData);

    chart(newChart);
    metadata(newData);


}
)};

init();


// ======== test/ instruction===========
// // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// // * Use `sample_values` as the values for the bar chart.
// // * Use `otu_ids` as the labels for the bar chart.
// // * Use `otu_labels` as the hovertext for the chart.
// // ![bar Chart](Images/hw01.png)

//         // var sample_values = data.samples[0].sample_values;
//         // console.log(sample_values)
//         var sample_values = data.samples.sample_values;
//         var otu_ids = data.samples.otu_ids;
//         var otu_labels = data.samples.otu_labels;
//         var barC = [{
//             x: sample_values.slice(0,10).reverse(),
//             y: otu_ids.slice(0,10).reverse(),
//             hovertext: otu_labels,
//             type: 'bar',
//             orientation: 'h'
//         }]
//         Plotly.newPlot('bar', barC);

// // 3. Create a bubble chart that displays each sample.
// // * Use `otu_ids` for the x values.
// // * Use `sample_values` for the y values.
// // * Use `sample_values` for the marker size.
// // * Use `otu_ids` for the marker colors.
// // * Use `otu_labels` for the text values.
// // ![Bubble Chart](Images/bubble_chart.png)

//         var bubbleC = [{ 
//             x: otu_ids.slice(0,10).reverse(),
//             y: sample_values.slice(0,10).reverse(),
//             mode: "maker",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids},
//             text: otu_labels
//         }];
//         Plotly.newPlot('bubble',bubbleC);

// // 4. Display the sample metadata, i.e., an individual's demographic information.
// // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
// // ![hw](Images/hw03.png)
//         var metadata = data.metadata;
//         console.log(metadata)
//         Object.entries(metadata).forEach(function([k,v]){
//             d3.select("sample-metadata")
//             .append("ul")
//             .text(`${k}:${v}`)
//         });

// // The following task is advanced and therefore optional.
// // * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.
// // * You will need to modify the example gauge code to account for values ranging from 0 through 9.
// // * Update the chart whenever a new sample is selected.
// // ![Weekly Washing Frequency Gauge](Images/gauge.png)
//         var GaugeC = [{
//             domain: { x: [0, 1], y: [0, 1] },
//             value: 270,
//             title: { text: "Speed" },
//             type: "indicator",
//             mode: "gauge+number"
//         }];
//         var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//         Plotly.newPlot('gauge', GaugeC, layout);
//     });
// };

// // 6. Update all of the plots any time that a new sample is selected.

// function updatePlotly(){
//     var selection = d3.select("#selDataset").property("value");

// };


