import React, { Component } from 'react';

class App extends Component {

    async componentDidMount() {
        fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}
            &lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}
            &address={addressObject}&description={lorem|32}`)
            .then(response => response.json())
            .then(json => console.log(json))
    }

    render() { 
        return (
            <div className="container">
            
            </div>
        );
    }
}
 
export default App;