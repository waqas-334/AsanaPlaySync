const Asana = require("asana");

const asana = require("asana");

// Replace with your project ID
//project id for: https://app.asana.com/0/1207993029062851/1207993088880030
//new account: https://app.asana.com/0/1208024227265885/1208024311218795
const projectId = "1208024227265885";

//gid is the organization id, that can be obtained by visiting:
//https://app.asana.com/api/1.0/workspaces?opt_pretty
const gid = "1208024169962829";

let client = Asana.ApiClient.instance;

let token = client.authentications["token"];

//access Token can be generated from
//https://app.asana.com/0/my-apps
token.accessToken =
  "2/1208024169962817/1208024225646602:0757650d183c739eaaee39b77bb812b2";

let tasksApiInstance = new Asana.TasksApi();
let body = {
  data: {
    workspace: gid,
    name: "Sample task 20",
    assignee: "me",
    projects: [projectId],
    notes: "This is the description of the new note by https://waqasyounis.com",
    gpc: "https://waqasyounis.com",
  },
};
let opts = {};

tasksApiInstance.createTask(body, opts).then(
  (result) => {
    console.log(JSON.stringify(result.data, null, 2));
  },
  (error) => {
    console.error(error.response.body);
  }
);
