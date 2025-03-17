# Belly Button Biodiversity Dashboard

## Overview

This interactive dashboard explores the **Belly Button Biodiversity dataset**, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (operational taxonomic units, or OTUs) are present in more than 70% of people, while the rest are relatively rare.

Using this dashboard, users can:
- Select different test subjects from a dropdown menu
- Visualize the top 10 bacteria cultures found in each subject's navel
- View comprehensive demographic information for each subject
- Explore the distribution of all bacteria cultures through an interactive bubble chart

## Live Demo

The interactive dashboard is deployed via GitHub Pages and can be accessed at: [Belly Button Biodiversity Dashboard](https://github.com/gbadrain/belly-button-challenge)

## Features

### Interactive Elements
- **Test Subject Dropdown**: Select different test subjects to update all visualizations
- **Hover Information**: Display detailed information about each data point on hover

### Visualizations
1. **Horizontal Bar Chart**
   - Displays the top 10 OTUs found in the selected individual
   - Uses `sample_values` as bar values
   - Uses `otu_ids` as bar labels
   - Provides `otu_labels` as hover text

2. **Bubble Chart**
   - Visualizes all bacteria cultures found in the sample
   - X-axis represents `otu_ids`
   - Y-axis and bubble size represent `sample_values`
   - Bubble colors correspond to `otu_ids`
   - Hover text shows `otu_labels`

3. **Demographic Info Panel**
   - Displays metadata about the selected test subject
   - Shows age, gender, ethnicity, location, belly button type, and washing frequency

## Tech Stack

- **D3.js**: For data loading and manipulation
- **Plotly.js**: For creating interactive visualizations
- **HTML/CSS/JavaScript**: For structure, styling, and interactivity
- **Bootstrap**: For responsive layout design

## Data Source

The data is sourced from the Belly Button Biodiversity dataset, which can be accessed at:
`https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json`

## Repository Structure

```
belly-button-challenge/
├── index.html                  # Main HTML structure
├── static/                     # Static assets
│   ├── js/
│       └── app.js              # JavaScript for interactivity and visualizations 
├──  samples.json               # Values for the bar chart
└── README.md                   # Project documentation
```

## Setup and Deployment

### Local Development
1. Clone this repository: `git clone https://github.com/gbadrain/belly-button-challenge.git`
2. Navigate to project directory: `cd belly-button-challenge`
3. Open `index.html` in your browser

### GitHub Pages Deployment
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch
4. Access at `https://gbadrain.github.io/belly-button-challenge/`

## Implementation Details

1. **Data Loading**:
   - The app uses D3.js to fetch the samples JSON data from the provided URL
   - Upon loading, the dropdown menu is populated with all available test subject IDs

2. **Visualization Creation**:
   - Each visualization is created using Plotly.js based on the selected test subject's data
   - The app initially loads with the first test subject in the dataset

3. **Dynamic Updates**:
   - When a new test subject is selected, the `optionChanged()` function is triggered
   - This function updates all visualizations with the newly selected subject's data

## Credits

- Data provided by the Belly Button Biodiversity dataset
- Javascript Resources 
      emailed by Camille Bolos, Sr Student Success Advisor, University of Oregon Continuing and Professional Education Data Analytics Boot Camp
    Interactive JavaScript Sheet
    Scrimba Intro to JavaScript
    You Don’t Know JS (book series)
    JavaScript Tutorial
- Microsoft Copilot for problem-solving