/**
 * Creates an event trigger for the form submission
 * @param {string} [triggeredFunction = "onFormSubmit"] - The name of the function to be called by the form submission event listener
 */
function triggerBuilderOnFormSubmit(triggeredFunction = "onFormSubmit") {
  ScriptApp.newTrigger(triggeredFunction)
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}