
function doGet(e) {
  const { endpoint, fileId } = e.parameter;
  
  if (endpoint === 'staff') {
    return getStaffData();
  } else if (fileId) {
    return serveImage(fileId);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid endpoint' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getStaffData() {
  // Replace YOUR_SPREADSHEET_ID with your actual Google Sheets ID
  const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const staff = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(staff))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}

function serveImage(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    return ContentService.createTextOutput(JSON.stringify({
      url: `https://drive.google.com/uc?export=view&id=${fileId}`
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'File not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
