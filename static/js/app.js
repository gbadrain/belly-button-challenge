// Build the metadata pane
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => { // Load the data
    // Get the metadata field
    let metadata = data.metadata; // metadata is an array of objects

    // Filter the metadata for the object with the desired sample number
    let result = metadata.filter(obj => obj.id.toString() === sample)[0]; // filter returns an array, so we need to select the first element

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata"); // select the panel

    // Use `.html("") to clear any existing metadata
    panel.html(""); 

    // Inside a loop, append new tags for each key-value pair in the filtered metadata
    Object.entries(result).forEach(([key, value]) => { // Object.entries returns an array of a given object's own enumerable string-keyed property [key, value] pairs
      panel.append("h6").text(`${key}: ${value}`); // append a new tag for each key-value pair
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => { // Load the data
    // Get the samples field
    let samples = data.samples; // samples is an array of objects

    // Filter the samples for the object with the desired sample number
    let result = samples.filter(obj => obj.id === sample)[0]; // filter returns an array, so we need to select the first

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;   // otu_ids is an array of integers
    let otu_labels = result.otu_labels; // otu_labels is an array of strings
    let sample_values = result.sample_values; // sample_values is an array of integers


    
    // Build a Bubble Chart
    let bubbleTrace = { // Bubble chart is a scatter plot with a third dimension: the size of the markers
      x: otu_ids, // x-axis is the OTU IDs
      y: sample_values, // y-axis is the sample values
      text: otu_labels, // text is the OTU labels
      mode: "markers", // mode is markers for a scatter plot  
      marker: { // marker is an object that sets the size and color of the markers
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    };

    let bubbleLayout = { // Bubble chart layout
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number Of Bacteria" }
    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout); // Plotly.newPlot is a function that creates a new plot
    // The first argument is the id of the div where the plot will be rendered
    // The second argument is an array of traces (data) to
    // The third argument is the layout
    // The layout is an object that sets the title and axis labels



    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(); // map the otu_ids to a list of strings for the yticks
    let barTrace = { // Bar chart is a bar plot
      x: sample_values.slice(0, 10).reverse(), // x-axis is the sample values
      y: yticks, // y-axis is the OTU IDs
      text: otu_labels.slice(0, 10).reverse(), // text is the OTU labels
      type: "bar",
      orientation: "h" // orientation is horizontal
    };

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number Of Bacteria" }

    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [barTrace], barLayout); // Plotly.newPlot is a function that creates a new plot
    // The first argument is the id of the div where the plot will be rendered
    // The second argument is an array of traces (data) to
    // The third argument is the layout
    // The layout is an object that sets the title and axis labels
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => { // Load the data
    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    names.forEach((name) => { // forEach is a method that executes a provided function once for each array element
      selector.append("option").text(name).property("value", name); // append an option tag for each name
    });

    // Get the first sample from the list
    let firstSample = names[0]; 

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample); // call the buildCharts function
    buildMetadata(firstSample); // call the buildMetadata function
  });
}


// Function for event listener
function optionChanged(newSample) { // optionChanged function is called when a new sample is selected
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}


// Initialize the dashboard
init(); // call the init function