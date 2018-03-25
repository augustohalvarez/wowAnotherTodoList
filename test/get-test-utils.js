/**
* Script for copying in common test files from assessments-archive to this repo.
* Allows each assessment to share common grading utilities, linting rules, and
* reporting methods.
*/

const fs = require('fs');
const async = require('async');
const GithubApi = require('./util/GithubApi');
const org = 'CodesmithLLC';
const github = new GithubApi({ org, token: process.env.GITHUB_ACCESS_TOKEN });

// Files to copy over from assessments-archive repo into the test/ dir locally
const filesToCopyFromArchive = [
  'test/util/remote-test.js',
  'test/util/report.js',
  'test/util/dynamodbDoc.js',
  'test/util/lint.js',
  'test/util/report.js',
  'test/util/remote-test.js',
  'test/util/hookStdOut.js',
  '.eslintrc',
  'test/app-assessment-mod-0.js',
];

/**
* Copy a file from assessments-archive GitHub repo for use locally
*/
function copyFileFromArchive(path, next) {
  github.fileContents({ path, repo: 'assessments-archive' }, (err, res, body) => {
    if (err) console.log('Error in github.fileContents:', err);
    const buf = new Buffer(body.content, 'base64');

    const filepath = `${__dirname}/${body.name}`;

    fs.writeFile(filepath, buf, next);
  });
}

// Limit to 1 request concurrently
async.eachSeries(filesToCopyFromArchive, copyFileFromArchive, (err) => {
  if (err) throw err;
});
