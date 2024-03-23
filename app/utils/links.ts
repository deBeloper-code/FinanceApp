import { Linking } from "react-native"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
export const openLinkInBrowser = (url: string) => {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}
