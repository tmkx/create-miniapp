import child_process from 'child_process';

export function isGitInstalled(): boolean {
  try {
    child_process.execSync(`which git`);
    return true;
  } catch {
    return false;
  }
}
