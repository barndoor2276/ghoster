import fs, { MakeDirectoryOptions, PathLike, WriteFileOptions } from 'fs';

export let exists = (path: PathLike) => {
	return new Promise((res) => {
		fs.stat(path, err => err ? res(false) : res(true));
	});
}

export let mkdir = (path: PathLike, options?: string | number | MakeDirectoryOptions): Promise<void> => {
	return new Promise((res, rej) => {
		fs.mkdir(path, options, err => err ? rej(err) : res());
	});
}

export let writeFile = (path: PathLike, data: any): Promise<void> => {
	return new Promise((res, rej) => {
		fs.writeFile(path, data, err => err ? rej(err) : res());
	});
}

export let stat = (path: PathLike): Promise<fs.Stats> => {
	return new Promise((res, rej) => {
		fs.stat(path, (err, stats) => err ? rej(err) : res(stats));
	});
}