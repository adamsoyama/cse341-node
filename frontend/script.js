// helpful link for converting image to base64: https://elmah.io/tools/base64-image-encoder/

// Fetch data from the backend API
async function apiFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    displayError("Unable to load profile data. Please try again later.");
    return null;
  }
}

// Main function to get and display data
const getData = async () => {
  const data = await apiFetch("/professional");
  if (data) displayAllData(data);
};

// Display all profile data
function displayAllData(data) {
  displayProfessionalName(data.professionalName);
  displayImage(data.base64Image);
  displayPrimaryDescription(data);
  displayWorkDescription(data);
  displayLinkTitleText(data);
  displayLinkedInLink(data);
  displayGitHubLink(data);
  displaySummary(data.summaryText);
  displaySkills(data.skills);
}

// Display professional name
function displayProfessionalName(name) {
  const professionalName = document.getElementById("professionalName");
  professionalName.textContent = name;
}

// Display profile image
function displayImage(img) {
  const image = document.getElementById("professionalImage");
  image.src = img;
}

// Display name link and primary description
function displayPrimaryDescription(data) {
  const nameLink = document.getElementById("nameLink");
  nameLink.textContent = data.nameLink.firstName;
  nameLink.href = data.nameLink.url;

  const primaryDescription = document.getElementById("primaryDescription");
  primaryDescription.textContent = data.primaryDescription;
}

// Display work descriptions
function displayWorkDescription(data) {
  const workDescription1 = document.getElementById("workDescription1");
  const workDescription2 = document.getElementById("workDescription2");
  workDescription1.textContent = data.workDescription1;
  workDescription2.textContent = data.workDescription2;
}

// Display link title
function displayLinkTitleText(data) {
  const linkTitle = document.getElementById("linkTitleText");
  linkTitle.textContent = data.linkTitleText;
}

// Display LinkedIn link
function displayLinkedInLink(data) {
  const linkedInLink = document.getElementById("linkedInLink");
  linkedInLink.textContent = data.linkedInLink.text;
  linkedInLink.href = data.linkedInLink.link;
}

// Display GitHub link
function displayGitHubLink(data) {
  const githubLink = document.getElementById("githubLink");
  githubLink.textContent = data.githubLink.text;
  githubLink.href = data.githubLink.link;
}

// Display error message
function displayError(message) {
  const container = document.querySelector(".container");
  const errorMsg = document.createElement("p");
  errorMsg.textContent = message;
  errorMsg.style.color = "#ff4d4d";
  errorMsg.style.textAlign = "center";
  container.appendChild(errorMsg);
}

// Display professional summary
function displaySummary(text) {
  const summarySection = document.createElement("div");
  summarySection.className = "section";

  const heading = document.createElement("h3");
  heading.textContent = "Professional Summary";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  summarySection.appendChild(heading);
  summarySection.appendChild(paragraph);

  document.querySelector(".right-panel").appendChild(summarySection);
}

// Display skills list
function displaySkills(skills) {
  const skillsSection = document.createElement("div");
  skillsSection.className = "section";

  const heading = document.createElement("h3");
  heading.textContent = "Technical Skills";

  const list = document.createElement("ul");
  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    list.appendChild(item);
  });

  skillsSection.appendChild(heading);
  skillsSection.appendChild(list);

  document.querySelector(".right-panel").appendChild(skillsSection);
}
// Theme toggle functionality
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});

// Initialize data fetch
getData();
