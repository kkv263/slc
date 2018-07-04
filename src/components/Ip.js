import React, { Component } from 'react'
import axios from 'axios';

class Ip extends Component {
  constructor(props){
    super(props);

    this.state = { 
      value: '',
      ipObject: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    //grab data and put as initial state of form.
    axios.get('https://ip.nf/me.json')
    .then(response => {
      var ipObject = response.data.ip;

      this.setState({value: ipObject.ip,
                     ipObject: ipObject});
    });
  }

  handleSubmit(event) {
    event.preventDefault()

    //check if valid ip using regex
    var regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

    if (!regex.test(this.state.value)){
      alert("You have entered an invalid IP address!"); 
    }

    else{
      var ip = this.state.value

      axios.get('https://ip.nf/' + ip + '.json')
      .then(response => {
        var ipObject = response.data.ip;
        this.setState({ipObject: ipObject});
      });
    }
  
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    var ipObject = this.state.ipObject;

    var location = Object.entries(ipObject).map(([key,value])=>{
      return (<div key={key} >{key} : {value.toString()}</div>);
    });

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter an IP address:
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    
    <div style={{marginTop:'1%'}}>
    <h1>Here some data from {ipObject.ip}</h1>
      {location}
    </div>
      
    </div>
    )
  }
}

export default Ip;