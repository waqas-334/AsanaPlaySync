## ASANA + PLAY CONSOLE

This extnesion will show the status of crash in Google Play Console,

So there is a list of crashes,
In each row, you will see a tag that will show the current status of task in Asana.
If it is in Review, Added, Doing etc.

### How

When a page is loaded in Google Play Console,

- It will read the DOM and fetch title of each crash,
- Then it will use Asana API to search task with that title
- After getting the task, it will read it's status and show it there

### Test Page:

https://play.google.com/console/u/0/developers/6026600562723209564/app/4975509921293914672/vitals/crashes?errorType=CRASH
