import React, {Fragment} from 'react';
import SVM from './logic/SVM';
import My3dPlot from "./components/My3dPlot";
import Log from "./components/Log";
import Header from "./components/Header";
import './assets/styles/App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            C: 5,
            kernel: "RBF",
            RBFSigma: 15,
            SVM: null
        };
    }

    componentWillMount() {
        let MySVM = new SVM(this.state.C, this.state.kernel, this.state.RBFSigma);
        this.setState({SVM: MySVM});
    }

    updateSVM(C, kernel, RBFSigma) {
        let newSVM = new SVM(C, kernel, RBFSigma);
        this.setState({
            C: C,
            kernel: kernel,
            RBFSigma: RBFSigma,
            SVM: newSVM
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
