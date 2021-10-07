import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';

class APP extends React.Component  {
    render() {
        return (<h1>Hello React</h1>)
    }
}

ReactDOM.render(<APP/>, document.getElementById('root'));