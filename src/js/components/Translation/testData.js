// @flow

/**
 * Dummy language data to be used in tests.
 */
window.app = {
  translations: {
    EN: {
      "App": {
        "Name": "Github Issues:",
        "Placeholder": "This is the placeholder: %PH%"
      },
      "NotFound": {
        "Back": "Back to Github Issues",
        "Message": "Page or resource not found",
        "Placeholder": "This is the placeholder: %PH%"
      }
    },
    DE: {
      "App": {
        "Name": "DE Github Issues:",
        "Placeholder": "DE This is the placeholder: %PH%"
      },
      "NotFound": {
        "Back": "DE Back to Github Issues",
        "Message": "DE Page or resource not found",
        "Placeholder": "DE This is the placeholder: %PH%"
      }
    }
  },
  languages: ['EN', 'DE'],
  curLang: 'EN',
  defLang: 'EN'
};
