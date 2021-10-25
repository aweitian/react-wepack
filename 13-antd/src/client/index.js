import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.less';
class APP extends React.Component {

    constructor() {
        super();
    }


    componentDidMount() {

    }


    render() {
        return (<DatePicker />)
    }
}

ReactDOM.render(<APP />, document.getElementById('root'));