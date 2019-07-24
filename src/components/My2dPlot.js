import React from 'react';
import {ScatterChart, Scatter, ZAxis, XAxis, YAxis} from 'recharts';


class My2dPlot extends React.Component {
    render() {

        let dataSet = this.props.SVM.data;
        let labels = this.props.SVM.labels;

        let data_Plus1 = [];
        let data_Min1 = [];

        labels.forEach((label, index) => {
            if (label === 1) {
                data_Plus1.push({x: dataSet[index][0], y: dataSet[index][1], weight: 1});
            } else {
                data_Min1.push({x: dataSet[index][0], y: dataSet[index][1], weight: 1});
            }
        });

        return (
            <div className="data2d">
                <ScatterChart width={250} height={250}>
                    <XAxis dataKey={'x'} type="number" name='x1' />
                    <YAxis dataKey={'y'} type="number" name='x2' />
                    <ZAxis dataKey="weight" range={[1, 10]}/>
                    <Scatter name='+1' data={data_Plus1} fill='red' shape='cross'/>
                    <Scatter name='-1' data={data_Min1} fill='blue' shape='cross'/>
                </ScatterChart>
            </div>
        );
    }
}

export default My2dPlot;
/*
                    <Scatter name='db-1' data={positiveSpace} fill='lightblue' shape='square'/>
                    <Scatter name='db-1' data={negativeSpace} fill='indianred' shape='square'/>
 */



// TODO add decision boundary
