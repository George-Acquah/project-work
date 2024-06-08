import * as path from 'path';
import * as fs from 'fs';
import { UserType } from '../enums/users.enum';

function readJsonFile(fileName: string) {
  // Get the absolute path to the JSON file in the root directory
  const rootPath = process.cwd(); // Current working directory (root directory)
  const filePath = path.join(rootPath, fileName);

  try {
    // Read the JSON file synchronously
    const data = fs.readFileSync(filePath, 'utf8');

    // Parse the JSON data into a JavaScript object
    const jsonData = JSON.parse(data);

    return jsonData;
  } catch (error) {
    console.error(`Error reading JSON file "${fileName}":`, error);
    return null;
  }
}

function getPath(filename: string) {
  const rootPath = process.cwd(); // Current working directory (root directory)
  const filePath = path.join(rootPath, filename);

  return filePath;
}

function extractToken(prefix: string, authHeader: string | undefined) {
  if (authHeader && authHeader.split(' ')[0] === prefix) {
    console.log('passed');
    return authHeader.split(' ')[1];
  }

  return 'invalid-token';
}

const convertDateToString = (dateString: string, locale = 'en-US') => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

function formatUserType(type: UserType) {
  if (type === UserType.PARK_OWNER) {
    return 'Park Owner';
  }
  return type;
}

export {
  extractToken,
  readJsonFile,
  getPath,
  convertDateToString,
  formatUserType
};
