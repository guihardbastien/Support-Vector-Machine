import {randomFloat} from "./Random";

class GenerateData {

    //format: [[x1,x2],...,[x1,x2]]
    _data = [];
    //format: [1,-1,...,1]
    _labels = [];
    _shape = 'CIRCULAR';
    _total = 50;

    constructor(shape, total) {
        this._shape = shape;
        this._total = total;
        this.generate();
    }

    generate() {
        switch (this._shape) {

            case 'CIRCULAR':
                this.generateCircularData(this._total);
                break;

            case 'LINEAR':
                this.generateLinearData(this._total);
                break;

            default:
                return "ILLEGAL SHAPE";
        }
    }

    generateCircularData(total) {

        //circle radius
        let circle_r = 10;
        //coordinates of the center of the circle
        let circle_x = 50;
        let circle_y = 50;

        for (let i = 0; i < total; i++) {
            //even data distribution inside circles
            let alpha = 2 * Math.PI * Math.random();

            let positiveR = circle_r * Math.sqrt(randomFloat(6, 20));
            let positive_x1 = positiveR * Math.cos(alpha) + circle_x;
            let positive_x2 = positiveR * Math.sin(alpha) + circle_y;

            this.updateData(positive_x1, positive_x2, -1);

            let negativeR = circle_r * Math.sqrt(randomFloat(0, 3));
            let negative_x1 = negativeR * Math.cos(alpha) + circle_x;
            let negative_x2 = negativeR * Math.sin(alpha) + circle_y;

            this.updateData(negative_x1, negative_x2, 1);
        }
    }

    generateLinearData(total) {

        for (let i = 0; i < total; i++) {

            let positive_x1 = randomFloat(0, 100);
            let positive_x2 = randomFloat(positive_x1, 100);
            this.updateData(positive_x1, positive_x2, -1);

            let negative_x1 = randomFloat(0, 100);
            let negative_x2 = randomFloat(0, negative_x1);
            this.updateData(negative_x1, negative_x2, 1);

        }
    }

    updateData(x1, x2, label) {
        this._data.push([x1, x2]);
        this._labels.push(label);
    }

    get data() {
        return this._data;
    }

    get labels() {
        return this._labels;
    }
}

export default GenerateData;

