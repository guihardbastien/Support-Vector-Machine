export function gaussianKernel(Xi, Xj, sigma) {
    let s = 0;
    for (let q = 0; q < Xi.length; q++) {
        s += (Xi[q] - Xj[q]) * (Xi[q] - Xj[q]);
    }
    return Math.exp(-s / (2 * sigma * sigma))
}