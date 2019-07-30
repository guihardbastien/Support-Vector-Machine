import React, {Fragment} from 'react';
import SVM from './logic/SVM';
import My3dPlot from "./components/My3dPlot";
import Log from "./components/Log";
import Header from "./components/Header";
import './assets/styles/App.css';
import GenerateData from "./logic/utils/GenerateData";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            C: 5,
            kernel: "RBF",
            RBFSigma: 15,
            SVM: null,
            dataset: null,
            datasetShape: "CIRCULAR"
        };
    }

    componentWillMount() {
        let generatedData = new GenerateData("CIRCULAR", 50);
        let MySVM = new SVM(generatedData.data, generatedData.labels, this.state.C, this.state.kernel, this.state.RBFSigma);
        this.setState({SVM: MySVM, dataset: generatedData});
    }

    updateSVM(shape, C, kernel, RBFSigma) {

        let generatedData = new GenerateData(shape, 50);

        let newSVM = new SVM(generatedData.data, generatedData.labels, C, kernel, RBFSigma);
        this.setState({
            C: C,
            kernel: kernel,
            RBFSigma: RBFSigma,
            SVM: newSVM,
            dataset: generatedData,
            datasetShape: shape
        })
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className='wrapper'>
                    <Log SVM={this.state.SVM} update={this.updateSVM.bind(this)} info={this.state}/>
                    <My3dPlot SVM={this.state.SVM}/>
                </div>
            </Fragment>
        );
    }
}

export default App;

//TODO architecture
//TODO loading SVG
//TODO transfer to SVM PAGE
