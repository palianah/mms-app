// @flow

/**
 * Dummy language data to be used in tests.
 */
window.app = {
  translations: {
    EN: {
      "App": {
        "Name": "Github Issues:"
      },
      "NotFound": {
        "Back": "Back to Github Issues",
        "Message": "Page or resource not found"
      }
    },
    DE: {
      "App": {
        "Name": "DE Github Issues:"
      },
      "NotFound": {
        "Back": "DE Back to Github Issues",
        "Message": "DE Page or resource not found"
      }
    }
  },
  languages: ['EN', 'DE'],
  curLang: 'EN',
  defLang: 'EN'
};
