
    export function randomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }

    // max excluded
    export function randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) - 1;
        return Math.floor(Math.random() * (max - min)) + min;
    }

