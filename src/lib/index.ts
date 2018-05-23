import child_process from 'child_process';
import { CustomError, ERROR_CODES } from './custom-error';

/**
 * Convert a package with a specified tag and possible '~N' suffix. Where ~N represents N versions back from the specified tag. If
 * there are less than N available version with return the furthest back. Will spawn an npm process to perform the calculation.
 * @param package_version package version string to convert
 * @param include_pre_release if true will include pre release versions when calculating the versions going back
 * @returns promise with the converted package version in the fomrat: package@<version_number>
 */
export function convertNpmVersion(package_version: string, include_pre_release?: boolean) {
  const arr = package_version.split('@');
  if(arr.length !== 2) {
    throw new CustomError(`${package_version} is not in expected fromat of <package>@<tag>~<N>`, ERROR_CODES.INVALID_PACKAGE_PARAM);
  }
  const pkg = arr[0];
  const ver_arr = arr[1].split('~');
  const tag = ver_arr[0];
  let back = 0;
  if(ver_arr.length === 2) {
    back = parseInt(ver_arr[1]);
    if(isNaN(back)) {
      throw new CustomError(`${package_version} is not in expected fromat of <package>@<tag>~<N>. Failed parsing: ${arr[1]}`, ERROR_CODES.INVALID_PACKAGE_PARAM);
    }
  }
  const res = child_process.spawnSync('npm', ['info', pkg, '--json'], {shell: true});
  if(res.status !== 0) {
    const msg  = res.stderr ? res.stderr.toString() : res.error.message;
    throw new CustomError(msg, ERROR_CODES.NPM_SPAWN_ERROR);
  }
  const pkg_info = JSON.parse(res.stdout.toString());
  const tag_version = pkg_info['dist-tags'][tag];
  if(!tag_version) {
    throw new CustomError(`tag [${tag}] did not map to a version`, ERROR_CODES.TAG_NOT_FOUND);
  }
  let indx = pkg_info.versions.indexOf(tag_version);
  while(back > 0 && indx > 0) {
    const back_ver = pkg_info.versions[--indx];
    if(include_pre_release || back_ver.indexOf('-') === -1) {
      back--;
    }
  }  
  return `${pkg}@${pkg_info.versions[indx]}`;
}
