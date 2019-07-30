import React, {Component} from 'react';
import '../assets/styles/SVM/Log.css'
import My2dPlot from "./My2dPlot";

class Log extends Component {

    constructor(props) {
        super(props);
        this.state = {
            C: 1,
            sigma: 15,
            kernel: 'RBF',
            shape: "CIRCULAR"
        };
    }

    updateC(event) {
        this.setState({C: event.target.value});
    }

    updateSigma(event) {
        this.setState({sigma: event.target.value});
    }

    updateShape(event) {
        this.setState({shape: event.target.value});
    }

    handleSubmit() {
        this.props.update(this.state.shape, this.state.C, this.state.kernel, this.state.sigma);
    }

    render() {
        let datasetTypes = ['CIRCULAR','LINEAR'];
        let kernelTypes = ['RBF'];

        return (
            <div className="log">
                <h2>C = {this.props.info.C} | Sigma = {this.props.info.RBFSigma} | Kernel
                    = {this.props.info.kernel}</h2>
                <My2dPlot SVM={this.props.SVM}/>
                <div className='lists'>
                    <div>
                        <p>Dataset</p>
                        <select onChange={this.updateShape.bind(this)} className="data">
                            {datasetTypes.map(type => {
                                return <option>{type}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <p>Kernel</p>
                        <select className="kernels">
                            {kernelTypes.map(type => {
                                return <option>{type}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className='inputs'>
                    <p>C value </p>
                    <input onChange={this.updateC.bind(this)} className='Cvar' required/>
                    <p>RBF SIGMA value </p>
                    <input onChange={this.updateSigma.bind(this)} className='RBFSigma' required/>
                    <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Log;

// TODO handle lists
