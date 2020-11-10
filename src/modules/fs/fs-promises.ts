import fs, { MakeDirectoryOptions, PathLike } from 'fs';

export let exists = (path: PathLike) => {
	return new Promise((res, rej) => {
		fs.stat(path, err => err ? rej : res);
	});
}

export let mkdir = (path: PathLike, options?: string | number | MakeDirectoryOptions) => {
	return new Promise((res, rej) => {
		fs.mkdir(path, options, err => err ? rej : res);
	});
}