import * as path from 'path';
import * as fs from 'fs';

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

function extractToken(prefix: string, authHeader: string | undefined) {
  if (authHeader && authHeader.split(' ')[0] === prefix) {
    console.log('passed');
    return authHeader.split(' ')[1];
  }

  return 'invalid-token';
}

export { extractToken, readJsonFile };
