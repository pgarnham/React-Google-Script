const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();


function columnToLetter(column)
{
  var temp, letter = '';
  while (column > 0)
  {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = sheetTitle => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = sheetIndex => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = sheetName => {
  SpreadsheetApp.getActive()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

export const getSheetHeader = sheetName => {
  let sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  let lastColumn = columnToLetter(sheet.getLastColumn());
  let columnsRange = 'A1:' + lastColumn + "1";
  const columns = sheet.getRange(columnsRange).getValues()[0];
  return columns
}

export const getSheetRows = sheetName => {
  let sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  let lastRow = sheet.getLastRow();
  let dataRange = 'A2:D' + lastRow.toString();
  const data = sheet.getRange(dataRange).getValues();
  return data
}
