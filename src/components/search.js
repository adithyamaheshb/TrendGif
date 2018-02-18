import React, {Component} from 'react';

const API = 'PSwUTmfT4xUoWJPo5h509P3BY4rr0M4o';

const LIMIT = 10;

const finalURL = `http://api.giphy.com/v1/gifs/search?api_key=${API}&limit=${LIMIT}`;

class Youtube extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result_yt: []
        };
        this.clicked = this.clicked.bind(this);
    }
    clicked = () => {
        fetch(finalURL)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                const result_yt = responseJson.data.map(obj => obj.embed_url);
                this.setState({result_yt: result_yt});

            })
            .catch((error) => {
                console.error(error);
            });
    };


    render(){
        console.log(finalURL);
        console.log(this.state.result_yt);
        return(
            <div>
                <button onClick={this.clicked}>Get Youtube videos</button>
                {
                    this.state.result_yt.map((link,i) => {
                        console.log(link);
                        var frame = <div className="youtube">
                            <img src={link} alt="boohoo" className="img-responsive"/>
                            <span>Hello {this.props.name}</span>
                        </div>;
                        return frame;
                    })
                }
                {this.frame}
            </div>
        );
    }
}

export default Youtube;