import { addMenuItem } from './lib/sheets';
import { createTimeDrivenTrigger } from './lib/app';
import { onOpen } from './onOpen';

jest.mock('./lib/sheets');
jest.mock('./lib/app');

describe('onOpen', () => {
  it('adds a menu item to open the sidebar', () => {
    onOpen();

    expect(addMenuItem).toBeCalledWith('Settings', 'sidebar');
  });

  it('registers trigger', () => {
    onOpen();

    expect(createTimeDrivenTrigger).toBeCalledWith('cron', 1);
  });
});
