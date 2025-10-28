// Purpose: Google Apps Script for SK Bebuloh Staff Data API
// BM: Tujuan: Google Apps Script untuk API Data Staf SK Bebuloh

function doGet(e) {
  const { endpoint, fileId } = e.parameter;
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  // Handle preflight OPTIONS request
  if (e.parameter && e.parameter['method'] == 'OPTIONS') {
    return ContentService.createTextOutput(JSON.stringify(headers))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
  
  if (endpoint === 'staff') {
    return getStaffData();
  } else if (fileId) {
    return serveImage(fileId);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 
    error: 'Invalid endpoint', 
    available_endpoints: ['staff', 'image?fileId=FILE_ID'] 
  }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}

function doPost(e) {
  return doGet(e);
}

function getStaffData() {
  try {
    // YOUR ACTUAL SPREADSHEET ID FROM THE URL
    const SPREADSHEET_ID = '1HeXZ5cFdadMGwlX3yNZtIivD953vkOggqkq1FPVmpeg';
    
    // Get data from all relevant sheets
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get staff from all teacher sheets
    const allStaff = [];
    
    // Sheet names that contain staff data
    const staffSheets = [
      'english_department',
      'admin_support_staff', 
      'all_teachers_summary_with_photo',
      'arts_department',
      'bahasa_arab_department',
      'bahasa_melayu_department',
      'ict_innovation_department',
      'islamic_education_department',
      'mathematics_department',
      'music_department',
      'pendidikan_moral_department',
      'pjpk_department',
      'prasekolah_department',
      'rbt_department',
      'science_department',
      'sejarah_department'
    ];
    
    staffSheets.forEach(sheetName => {
      try {
        const sheet = spreadsheet.getSheetByName(sheetName);
        if (sheet) {
          const data = sheet.getDataRange().getValues();
          const headers = data[0];
          
          // Process each row (skip header)
          for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (row[0] && row[0].toString().trim()) { // Check if teacher_id exists
              const staffObj = {};
              headers.forEach((header, index) => {
                if (header && row[index] !== undefined) {
                  staffObj[header] = row[index];
                }
              });
              allStaff.push(staffObj);
            }
          }
        }
      } catch (e) {
        Logger.log('Error processing sheet ' + sheetName + ': ' + e.toString());
      }
    });
    
    // Remove duplicates based on teacher_id
    const uniqueStaff = [];
    const seenIds = new Set();
    
    allStaff.forEach(staff => {
      const teacherId = staff.teacher_id || staff.teacher_Id;
      if (teacherId && !seenIds.has(teacherId)) {
        seenIds.add(teacherId);
        uniqueStaff.push(staff);
      }
    });
    
    const headersResponse = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
    
    return ContentService.createTextOutput(JSON.stringify(uniqueStaff))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headersResponse);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      error: 'Failed to fetch staff data',
      details: error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({'Access-Control-Allow-Origin': '*'});
  }
}

function serveImage(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    
    if (!file) {
      throw new Error('File not found');
    }
    
    const mimeType = file.getMimeType();
    if (!mimeType.startsWith('image/')) {
      throw new Error('File is not an image');
    }
    
    const result = {
      url: `https://drive.google.com/uc?export=view&id=${fileId}`,
      thumbnail: `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`,
      mimeType: mimeType,
      name: file.getName()
    };
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({'Access-Control-Allow-Origin': '*'});
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      error: 'Failed to serve image',
      details: error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({'Access-Control-Allow-Origin': '*'});
  }
}

// Test function to verify data extraction
function testGetStaffData() {
  const result = getStaffData();
  Logger.log('Staff data sample: ' + result.getContent().substring(0, 500));
}
