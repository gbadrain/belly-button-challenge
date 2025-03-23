// Build the metadata pane
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Filter metadata for the selected sample
    let result = data.metadata.filter(obj => obj.id.toString() === sample)[0];

    // Select the metadata panel and clear its content
    let panel = d3.select("#sample-metadata");
    panel.html("");

    // Append each key-value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// Function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Filter samples for the selected sample
    let result = data.samples.filter(obj => obj.id === sample)[0];

    // Extract data for charts
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Bubble Chart
    let bubbleTrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number Of Bacteria" }
    };

    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);

    // Bar Chart
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    let barTrace = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number Of Bacteria" }
    };

    Plotly.newPlot("bar", [barTrace], barLayout);
  });
}

// Function to initialize the dashboard
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Populate the dropdown with sample names
    let selector = d3.select("#selDataset");
    data.names.forEach((name) => {
      selector.append("option").text(name).property("value", name);
    });

    // Use the first sample to build initial charts and metadata
    let firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to handle dropdown change
function optionChanged(newSample) {
  // Rebuild charts and metadata for the new sample
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();