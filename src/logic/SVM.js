class SVM {

    _data = [];
    _labels = [];
    _kernel = "RBF";
    _RBFSigma = 15;
    _b = 0;
    _N = 0;
    _alpha = [];
    _maxPasses = 20;
    _tol = 0.0001;
    _C = 5;

    constructor(C, kernel, RBFSigma) {
        this.generateNonLinData(100);
        this._kernel = kernel;
        this._C = C;
        this._RBFSigma = RBFSigma;
        this._N = this._data.length;
        for (let i = 0; i < this._N; i++) {
            this._alpha.push(0);
        }
        this.sequentialMinimalOptimization();
    }

    static randomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min) + min;
    }

    // max excluded
    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max) - 1;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // generates data by pairs
    // TODO switch cases for datatypes
    generateNonLinData(total) {

        //radius
        let circle_r = 10;
        //coordinates of the center of the circle
        let circle_x = 50;
        let circle_y = 50;

        for (let i = 0; i < total; i++) {
            //even data distribution inside circles
	    //TODO use factory design pattern & use immutable variables

            let alpha = 2 * Math.PI * Math.random();

            let r = circle_r * Math.sqrt(SVM.randomFloat(6, 20));
            let x1 = r * Math.cos(alpha) + circle_x;
            let x2 = r * Math.sin(alpha) + circle_y;

            this._data.push([x1, x2]);
            this._labels.push(-1);

            r = circle_r * Math.sqrt(SVM.randomFloat(0, 3));
            x1 = r * Math.cos(alpha) + circle_x;
            x2 = r * Math.sin(alpha) + circle_y;

            this._data.push([x1, x2]);
            this._labels.push(1);
        }
    }

    sequentialMinimalOptimization() {

        let passes = 0;
        while (passes < this._maxPasses) {
            let didAlphaChanged = 0;
            for (let i = 0; i < this._N; i++) {
                let Ei = this.dualClassification(this._data[i]) - this._labels[i];
                if ((this._labels[i] * Ei < -this._tol && this._alpha[i] < this._C)
                    || (this._labels[i] * Ei > this._tol && this._alpha[i] > 0)) {
                    let j = i;
                    while (j === i) {
                        j = SVM.randomInt(0, this._N);
                    }
                    let Ej = this.dualClassification(this._data[j]) - this._labels[j];
                    let ai = this._alpha[i], aj = this._alpha[j];
                    let L = 0, H = this._C;
                    if (this._labels[i] === this._labels[j]) {
                        L = Math.max(0, ai + aj - this._C);
                        H = Math.min(this._C, ai + aj);
                    } else {
                        L = Math.max(0, aj - ai);
                        H = Math.min(this._C, this._C + aj - ai);
                    }
                    if (Math.abs(L - H) < 1e-4) {
                        continue
                    }
                    let eta = 2 * this.kernel(this._data[i], this._data[j])
                        - this.kernel(this._data[i], this._data[i])
                        - this.kernel(this._data[j], this._data[j]);
                    if (eta >= 0) {
                        continue
                    }
                    let newaj = aj - this._labels[j] * (Ei - Ej) / eta;
                    if (newaj > H) {
                        newaj = H
                    } else if (newaj < L) {
                        newaj = L
                    }
                    if (Math.abs(aj - newaj) < 0.00001) {
                        continue
                    }
                    this._alpha[j] = newaj;
                    let newai = ai + this._labels[i] * this._labels[j] * (aj - newaj);
                    this._alpha[i] = newai;

                    let b1 = this._b - Ei - this._labels[i] * (newai - ai) * this.kernel(this._data[i], this._data[i])
                        - this._labels[j] * (newaj - aj) * this.kernel(this._data[i], this._data[j]);
                    let b2 = this._b - Ej - this._labels[i] * (newai - ai) * this.kernel(this._data[i], this._data[j])
                        - this._labels[j] * (newaj - aj) * this.kernel(this._data[j], this._data[j]);

                    if (newai > 0 && newai < this._C) {
                        this._b = b1;
                    } else if (newaj > 0 && newaj < this._C) {
                        this._b = b2;
                    } else {
                        this._b = 0.5 * (b1 + b2);
                    }
                    didAlphaChanged += 1;
                }//end of for-loop related to j
                if (didAlphaChanged === 0) {
                    passes += 1;
                } else {
                    passes = 0;
                }
            }//end of for-loop related to i
        }//end while
    }//end of function

    kernel(Xi, Xj) {

        if (this._kernel === "RBF") {
            return this.gaussianKernel(Xi, Xj)
        } else if (this._kernel === "LINEAR") {
            return this.linearKernel(Xi, Xj)
        } else {
            return "ILLEGAL KERNEL"
        }
    }

    gaussianKernel(Xi, Xj) {

        let s = 0;
        //w transpose x
        for (let q = 0; q < Xi.length; q++) {
            s += (Xi[q] - Xj[q]) * (Xi[q] - Xj[q]);
        }
        return Math.exp(-s / (2 * this._RBFSigma * this._RBFSigma))
    }

    linearKernel(Xi, Xj) {
        //TODO later
    }

    dualClassification(input) {
        let f = this._b;
        for (let i = 0; i < this._N; i++) {
            f += this._alpha[i] * this._labels[i] * this.kernel(input, this._data[i]);
        }
        return f
    }

    predict(input) {
        return this.dualClassification(input) > 0 ? 1 : -1;
    }

    get data() {
        return this._data;
    }

    get labels() {
        return this._labels;
    }

    get alpha() {
        return this._alpha;
    }
}

export default SVM;

//TODO add input parameters (dataset type or data )
//TODO refactor design patterns
//TODO separate data generation in utils and plug it in constructor 
