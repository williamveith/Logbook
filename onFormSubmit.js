
/**
 * Configurations and customization to send an email, through Gmail, so a mobile phone will receive it as a MSM
 * @global
 * @namespace {object} message - Configurations and customizations for the message
 * @property {string} displayName - Will not appear in the MMS message but will be the sender name in the email copy located in the sender's gmail
 * @property {string} sendAs - Email address that the receiver will see as the sender. Must be the Gmail accounts main email address OR and alias
 * @property {string} sendTo - Receiver's mobile phone number followed by their carrier's MMS gateway address
 * @property {string} subject - Subject displayed at the top of the message
 * @property {string} bodyTemplateName - File name of the HTML template used to structure the message body
 */
const message = Object.freeze({
  displayName: "AFM Logbook",
  sendAs: "william.veith@austin.utexas.edu",
  sendTo: "9787980710@mms.att.net",
  subject: "AFM Error",
  bodyTemplateName: "bodyTemplate"
});

/**
 * Processes information from a form, structures it with an HTML template, and sends it to the receipts as an email MMS
 * @function onFormSubmit
 * @param {object} e - Google Apps Script form submit event object https://developers.google.com/apps-script/guides/triggers/events#form-submit_1
 */
function onFormSubmit(e) {
  /**
   * @class
   * @alias handleFormResponse
   * @return {Array} textInfo - form responses structured as an array
   */
  const textInfo = (() => {
    const itemResponses = e.response.getItemResponses();
    return itemResponses.map(itemResponse => itemResponse.getResponse());
  })();
  if (textInfo[2] === "Yes") {
    /**
     * @class
     * @alias makeHtmlBody
     * @return {string} - HTML string of an HTML template revaluated with form responses
     */
    const messageBody = (() => {
      let template = HtmlService.createTemplateFromFile(message.bodyTemplateName);
      template.dynamicData = textInfo;
      return template.evaluate().getContent();
    })();
    GmailApp.sendEmail(message.sendTo, message.subject, "", {
      from: message.sendAs,
      htmlBody: messageBody,
      name: message.displayName
    });
  };
}