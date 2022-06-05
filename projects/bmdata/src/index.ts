import { syncDatapoints as _syncDatapoints } from './syncDatapoints';
import { updateDocumentProperties } from './lib/properties';
import { syncUser as _syncUser } from './syncUser';
import { cron as _cron } from './cron';
import { UNIX_TO_DATE as _UNIX_TO_DATE } from './unixToDate';
import { onOpen as _onOpen } from './onOpen';
import { sidebar as _sidebar } from './sidebar';

/**
 * @returns {Promise<void>}
 */
function syncDatapoints(): Promise<void> {
  return _syncDatapoints();
}

/**
 *
 * @returns {Promise<void>}
 */
function syncUser(): Promise<void> {
  return _syncUser();
}

/**
 * @returns {void}
 */
function onOpen(): void {
  return _onOpen();
}

/**
 * @returns {void}
 */
function sidebar(): void {
  return _sidebar();
}

/**
 * Saves the settings to the document properties.
 *
 * @param {{user: string, token: string}} data - user and token
 * @param {string} data.user - Beeminder username
 * @param {string} data.token - API auth token
 */
function processForm(data: { user: string; token: string }): void {
  updateDocumentProperties(data);
}

/**
 * @returns {Promise<void>}
 */
function cron(): Promise<void> {
  return _cron();
}

/**
 * Converts a unix timestamp to a date object
 *
 * @param {number} input - Unix timestamp
 * @returns {Date} - Date
 * @customfunction
 */
function UNIX_TO_DATE(input: unknown): ValueOrArray<Date | ''> {
  return _UNIX_TO_DATE(input);
}
