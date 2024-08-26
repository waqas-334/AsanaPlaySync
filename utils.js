// Method to find the first <a> tag in an element or its descendants

console.log("util.js loaded");

function getUnderlyingHyperlink(selection) {
  //this selection is ess-cell
  //contains child: console-table-main-action-cell
  //which contains: a

  //   console.log(selection);

  let consoleTableMainActionCell = selection.childNodes[0];
  //   console.log(consoleTableMainActionCell);

  var hyperLink = "no hyper link found";

  for (let i = 0; i < consoleTableMainActionCell.childNodes.length; i++) {
    let child = consoleTableMainActionCell.childNodes[i];
    if (child.tagName == "A") {
      hyperLink = child.href;
    }
  }

  return hyperLink;
}

function getFirstName(fullName) {
  // Split the string at the first space
  const parts = fullName.split(" ");

  // Return the first part
  return parts[0];
}

//Applies color to the info tag,
//Can ad more like In Review, Completed etc
function applySectionStyles(sectionName, textElement) {
  if (sectionName === "Todo") {
    textElement.style.backgroundColor = "#b5d6ff";
    textElement.style.color = "#005bcd";
  } else if (sectionName === "Doing") {
    textElement.style.backgroundColor = "#ffe599";
    textElement.style.color = "#bf9000";
  }
}

function showSpinner(cell) {
  // Create a div element for the spinner
  const spinner = document.createElement("div");
  spinner.id = "spinner";

  // Apply styles to the spinner
  spinner.style.border = "4px solid rgba(0, 0, 0, 0.1)";
  spinner.style.borderTop = "4px solid #3498db";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "40px";
  spinner.style.height = "40px";
  spinner.style.animation = "spin 1s linear infinite";
  spinner.style.position = "fixed"; // Fixed position for overlay effect
  spinner.style.top = "50%";
  spinner.style.left = "50%";
  spinner.style.transform = "translate(-50%, -50%)";
  spinner.style.zIndex = "9999"; // Ensure it's on top of other elements
  spinner.style.display = "none"; // Initially hidden

  // Add the spinner to the body
  cell.appendChild(spinner);
}

function hideSpinner(cell) {
  const spinner = cell.getElementById("spinner");
  if (spinner) {
    spinner.style.display = "none";
  }
}
