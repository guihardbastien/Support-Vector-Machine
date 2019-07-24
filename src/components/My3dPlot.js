import React from 'react';
import Plot from '../../node_modules/react-plotly.js/react-plotly';

class My3dPlot extends React.Component {

    drawDecisionSurface() {

        let positiveX = [], positiveY = [], positiveZ = [];
        let negativeX = [], negativeY = [], negativeZ = [];

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                if (this.props.SVM.predict([i, j]) === 1) {
                    positiveX.push(i);
                    positiveY.push(j);
                    positiveZ.push(this.props.SVM.dualClassification([i, j]));
                } else {
                    negativeX.push(i);
                    negativeY.push(j);
                    negativeZ.push(this.props.SVM.dualClassification([i, j]));
                }
            }
        }

        return {positiveX, positiveY, positiveZ, negativeX, negativeY, negativeZ}
    }

    render() {

        let myData = this.drawDecisionSurface();

        let positiveResults = {
            x: myData.positiveX,
            y: myData.positiveY,
            z: myData.positiveZ,
            mode: 'markers',
            marker: {
                size: 1,
                opacity: 0.2,
                color: 'red'
            },
            type: 'scatter3d'
        };

        let negativeResults = {
            x: myData.negativeX,
            y: myData.negativeY,
            z: myData.negativeZ,
            mode: 'markers',
            marker: {
                size: 1,
                opacity: 0.2,
                color: 'blue'
            },
            type: 'scatter3d'
        };


        let data = [positiveResults, negativeResults];
        let layout = {
            margin: {
                l: 0, r: 0, b: 0, t: 0
            }
        };

        return (
            <Plot
                className='plot'
                data={data}
                layout={layout}
            />
        );
    }
}

export default My3dPlot;
