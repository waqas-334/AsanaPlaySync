console.log("content.js loaded");
let asanaData = null;
fetchTasksFromProject(config.projectId, config.personalAccessToken)
  .then((data) => {
    asanaData = data;
    // console.log(data);
  })
  .catch((error) => {
    console.log("Asana Data Error: ", error);
  });

function pollForRows() {
  const rows = document.querySelectorAll('div.particle-table-row[role="row"]');
  console.log(rows);
  if (rows.length > 0) {
    console.log("Found", rows.length);

    rows.forEach((row, index) => {
      // console.log(`Processing row at index ${index}`);
      if (row) {
        // row.style.backgroundColor = "#f8d7da";

        const cells = row.querySelectorAll("ess-cell");
        var lastCell;
        var arrowCell;
        cells.forEach((cell, cellIndex) => {
          // console.log(
          // `Processing cell ${cellIndex + 1} in row ${index + 1}: `,
          // typeof cell
          // );
          if (cellIndex == 2) {
            lastCell = cell;
          }

          //because the last cell is the arrow cell
          arrowCell = cell;
          // Perform your operation on each cell here
          // For example, you could change the text or style of each cell
          // cell.style.border = "1px solid #ccc"; // Example operation: Adding a border to each cell
        });

        const hyperLink = getUnderlyingHyperlink(arrowCell);
        var isTaskAlreadCreated = false;

        //this will contain the current data cell from asana presenting the current task
        //can be used to create the info section there
        var currentAsanaDataCell = null;

        for (const cell of asanaData) {
          let gpcValue = cell.custom_fields[0].text_value;
          if (gpcValue === hyperLink) {
            currentAsanaDataCell = cell;
            isTaskAlreadCreated = true;
            break;
          }
        }

        // asanaData.forEach((cell, cellIndex) => {

        // });

        if (!isTaskAlreadCreated) {
          createButton(row, lastCell, hyperLink);
        } else {
          createInfoTag(lastCell, currentAsanaDataCell);
        }
        // if (index % 2 !== 0) {
        //   console.log(`Hiding row at index ${index}`);

        // }
      } else {
        // console.warn(`Row at index ${index} is undefined`);
      }
    });

    rows.forEach((row) => {
      const titleSpan = row.querySelector("span.main-text");
      if (titleSpan) {
        title = titleSpan.textContent.trim();
        subtitle = extractAfterSecondLastDot(title);
        console.log("Title:", subtitle);
      } else {
        console.log("Title not found in this row.");
      }
    });

    //   const button = document.createElement("button");
    //   button.textContent = "Create task";

    //   // Centering the button in the row
    //   button.style.display = "block";
    //   button.style.margin = "0 auto";

    //   row.appendChild(button);

    //   row.style.display = "none";

    //   // Ensure the row's content is centered
    //   row.style.display = "flex";
    //   row.style.justifyContent = "center";
    //   row.style.alignItems = "center";
    // });
  } else {
    console.log("TRY AGAIN");
    setTimeout(pollForRows, 1000); // Check every second
  }
}

function createInfoTag(lastCell, currentAsanaDataCell) {
  console.log("Current Task: ", currentAsanaDataCell);
  let assigneeName = currentAsanaDataCell.assignee.name;
  let assigneeFirstName = getFirstName(assigneeName);

  let sectionName = currentAsanaDataCell.memberships[0].section.name;

  const textElement = document.createElement("span");
  textElement.tagName = "asana-gpc";

  // Add text content
  textElement.textContent = assigneeFirstName + " | " + sectionName;

  // Add the CSS class to style it
  textElement.className = "clickable-text";

  applySectionStyles(sectionName, textElement);

  let taskUrl =
    "https://app.asana.com/0/" +
    config.projectId +
    "/" +
    currentAsanaDataCell.gid +
    "/f"; //f means full-screen
  // Attach a click event listener
  textElement.addEventListener("click", function () {
    window.open(taskUrl, "_blank");
  });

  // Append the text element to the body or any specific element in the webpage
  lastCell.appendChild(textElement);
}

function createButton(row, lastCell, hyperLink) {
  const button = document.createElement("button");
  button.textContent = "Create Task";
  button.tagName = "asana-gpc";
  // Centering the button in the row
  button.style.display = "block";
  button.style.margin = "0 auto";

  lastCell.appendChild(button);

  let titleSpan = row.querySelector("span.main-text");
  if (titleSpan) {
    title = titleSpan.textContent.trim();
    titleSpan = extractAfterSecondLastDot(title);
    console.log("Title:", titleSpan);
  } else {
    titleSpan = "not defined";
  }

  const taskData = {
    data: {
      workspace: config.gid,
      name: "" + titleSpan,
      projects: [config.projectId],
      notes: "There is a bug at " + hyperLink,
      assignee: "me",
      custom_fields: {
        [config.customFieldId.gpc]: hyperLink,
      },
    },
  };

  button.addEventListener("click", function () {
    // alert("Button was clicked!");
    button.style.display = "none";

    createAsanaTask(taskData)
      .then((data) => {
        console.log("DATA POSTED: ", data.data);
        createInfoTag(lastCell, data.data);
      })
      .catch((error) => {
        console.log("Asana Data Error: ", error);
        alert("Something went wrong: ", error);
        button.style.display = "block";
      });

    // You can add any other actions you want to perform on click here
  });
}

function extractAfterSecondLastDot(text) {
  //   const afterSpaceText = getTextAfterSpace(text);
  const parts = text.split(".");
  if (parts.length < 3) {
    return null; // Return null if there are less than three parts
  }
  return parts.slice(-2).join(".");
}

//this will provide the last part of the text after space
//input: Waqas Younis
//output: Younis
function getTextAfterSpace(text) {
  const parts = text.split(" ");
  return parts[parts.length - 1];
}

pollForRows();
