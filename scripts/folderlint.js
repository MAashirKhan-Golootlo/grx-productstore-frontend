#!/usr/bin/env node

/**
 * Simple folder structure linter
 * Validates that files are in their expected locations
 */

const fs = require('fs');
const path = require('path');

const config = require('../.folderlintrc.js');

function checkFolderStructure(dir, rules, errors = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(process.cwd(), fullPath);

    // Check against rules
    for (const [pattern, rule] of Object.entries(rules)) {
      if (relativePath.match(new RegExp(pattern.replace(/\*\*/g, '.*')))) {
        if (entry.isDirectory()) {
          checkFolderStructure(fullPath, rules, errors);
        } else {
          const allowed = rule.allowed || [];
          const disallowed = rule.disallowed || [];
          const fileName = entry.name;

          // Check if file matches allowed patterns
          const isAllowed = allowed.some((pattern) => {
            if (pattern.includes('**')) {
              return relativePath.match(new RegExp(pattern.replace(/\*\*/g, '.*')));
            }
            return fileName.match(new RegExp(pattern.replace(/\*/g, '.*')));
          });

          // Check if file matches disallowed patterns
          const isDisallowed = disallowed.some((pattern) => {
            return fileName.match(new RegExp(pattern.replace(/\*/g, '.*')));
          });

          if (!isAllowed && allowed.length > 0) {
            errors.push(`File ${relativePath} is not allowed in this location`);
          }

          if (isDisallowed) {
            errors.push(`File ${relativePath} is disallowed in this location`);
          }
        }
      }
    }
  }

  return errors;
}

function main() {
  const errors = checkFolderStructure('.', config.rules);

  if (errors.length > 0) {
    console.error('Folder structure validation failed:');
    errors.forEach((error) => console.error(`  - ${error}`));
    process.exit(1);
  } else {
    console.log('✓ Folder structure is valid');
  }
}

main();

