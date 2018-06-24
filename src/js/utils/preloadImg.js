// @flow

/**
* a promise that preloads an image.
*
* @param { string } path The image src.
* @return { promise }
*/

export function preloadImg(path: string): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
        const img = new Image();
        img.onload = () => resolve({ path, error: false });
        img.onerror = () => reject({ path, error: true });
        img.src = path;
    });
}