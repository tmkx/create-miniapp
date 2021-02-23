import fs from 'fs';
import child_process from 'child_process';
import { isGitInstalled } from './utils';

const REPO_URL = 'https://github.com/tmkx/miniapp-typescript-starter-template.git';

// Start a new line.
console.log(``);

if (!isGitInstalled()) {
  console.log(`Please install git first.`);
  process.exit();
}

const projectName = process.argv.slice(-1)[0];

if (!/^[\w-]+$/.test(projectName)) {
  if (projectName === __filename) {
    console.log(`Please input project name`);
  } else {
    console.log(`Invalid project name: ${projectName}`);
  }
  process.exit();
}

const cloneProc = child_process.exec(['git', 'clone', REPO_URL, '--depth=1', projectName].join(' '), {});

cloneProc.stderr?.pipe(process.stderr);
cloneProc.stdin?.pipe(process.stdin);
cloneProc.stdout?.pipe(process.stdout);

cloneProc.on('close', () => {
  const gitDirPath = `./${projectName}/.git`;
  if (fs.existsSync(gitDirPath) && fs.statSync(gitDirPath).isDirectory()) {
    child_process.execSync(`rm -rf ${gitDirPath}`);
    console.log(`🎉 Done`);
  }
});
