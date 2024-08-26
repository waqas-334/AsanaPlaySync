console.log("Asana loaded");

async function fetchTasksFromProject(projectId, accessToken) {
  const url = `https://app.asana.com/api/1.0/projects/${projectId}/tasks?opt_fields=name,completed,due_on,assignee.name,memberships.section.name,custom_fields.text_value`;
  //https://app.asana.com/api/1.0/projects/1208024227265885/tasks?opt_fields=name,completed,assignee.name,memberships.section.name,custom_fields.text_value

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result.data; // Return the tasks data
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return []; // Return an empty array on error
  }
}

// The following script can be used to get the section id and name,
// then you can hard code the ids or dynamically use it, that's up to you
async function fetchSectionsInProject(projectId, personalAccessToken) {
  const url = `https://app.asana.com/api/1.0/projects/${projectId}/sections`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${personalAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("DATA: ", result.data);
    return result.data; // Return the sections data
  } catch (error) {
    console.error("Error fetching sections:", error);
    return []; // Return an empty array on error
  }
}

fetchSectionsInProject(
  "1208024227265885",
  "2/1208024169962817/1208024225646602:0757650d183c739eaaee39b77bb812b2"
);

async function createAsanaTask(taskData) {
  console.log("POSTING: ", taskData);

  try {
    const response = await fetch(`https://app.asana.com/api/1.0/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.personalAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return error;
  }
}
