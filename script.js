// DOM elements
const projectList = document.getElementById("project-list");

// Create project button click event
document.getElementById("create-button").addEventListener("click", createProject);

// Create project function
function createProject() {
  // Get input values
  const projectName = document.getElementById("project-name").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  // Validate input values
  if (projectName === "" || startDate === "" || endDate === "") {
    alert("Please enter all the fields");
    return;
  }

  // Create project object
  const project = {
    name: projectName,
    startDate: startDate,
    endDate: endDate,
  };

  // Save project to local storage or send to server
  // Add your code here

  // Reset form
  document.getElementById("project-name").value = "";
  document.getElementById("start-date").value = "";
  document.getElementById("end-date").value = "";

  // Display project
  displayProject(project);
}

// Display project function
function displayProject(project) {
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-item");

  const projectName = document.createElement("h3");
  projectName.textContent = project.name;

  const countdown = document.createElement("p");
  countdown.textContent = `Start Date: ${project.startDate} | End Date: ${project.endDate}`;

  projectItem.appendChild(projectName);
  projectItem.appendChild(countdown);

  projectList.appendChild(projectItem);
}
