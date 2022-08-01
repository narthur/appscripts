import renderSidebar from './renderSidebar';

export function getSheetData(name: string): unknown[][] {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);

  if (!sheet) {
    throw new Error("No sheet named 'datapoints' found");
  }

  return sheet.getDataRange().getValues();
}

export function appendRow(name: string, row: unknown[]): void {
  const sheet = SpreadsheetApp.getActive().getSheetByName(name);

  if (!sheet) {
    throw new Error("No sheet named 'datapoints' found");
  }

  sheet.appendRow(row);
}

export function addMenuItem(name: string, functionName: string): void {
  const menu = SpreadsheetApp.getUi().createAddonMenu();
  menu.addItem(name, functionName);
  menu.addToUi();
}

export function showSidebar(
  name: string,
  page: string,
  data: Record<string, string>
): void {
  const htmlOutput = renderSidebar(name, page, data);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
