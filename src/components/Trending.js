import React, {Component} from 'react';
import GphApiClient from 'giphy-js-sdk-core';

const API = 'PSwUTmfT4xUoWJPo5h509P3BY4rr0M4o';

class Trending extends Component {

    constructor(props) {
        super(props);
            this.state = {
                trending : [],            // state variable for search bar
                results: []                 // state variable for storing data from the API.
            }
    }

    componentWillMount() {
        //const trending = Object.assign({}, this.state.trending);
        /*trending[field] = event.target.value;*/
        const trending = [];
        const results = [];
        this.setState({
            trending : trending,
            results : results
        });
        console.log(this.state.trending);

        /*if(this.state.trending === null) {
            alert("Please enter the query");
        }*/
    }

    // The updateSearchFilter() is just used to take value from the user input
    // and provide as a parameter to the Giphy API call.

    updateSearchFilter = (field, event)  =>{
        event.preventDefault();
        const trending = Object.assign({}, this.state.trending.trending);
        trending[field] = event.target.value;
        this.setState({
            trending : trending
        });
        console.log(this.state.trending.trending);
        if (this.state.trending.trending === [] ) {
            alert("Please enter query");
        }
    };



    searchQuery = (event) => {
        event.preventDefault();

        let client = GphApiClient(`${API}`);
        client.search('gifs', {"q": this.state.trending.trending})
            .then((response) => {
                console.log(this.state.trending);
                 //let a = this.state.trending.trending;
                 if(this.state.trending.trending === "")
                 {
                     let results = [];
                     this.setState({
                         results: results
                     });
                     alert("Please reenter the query");

                 }
                if (this.state.trending.trending === undefined ) {
                    let results = [];
                    this.setState({
                        results: results
                    });
                        alert("Please enter query!");
                }
                else{
                   /* response.data.forEach((gifObject) => {
                        //console.log(gifObject);

                    });*/
                    //console.log(response.data[0].embed_url);
                    let results = response.data;
                    this.setState({
                        results: results
                    });
                    //console.log(this.state.results);
                }

            })
            .catch((err) => {
                alert(err);
                console.log(err);
            })

    };

    render() {
        const res = this.state.results;
        return (
            <div id="gif">
                <div className="container">
                    <div className="searchbar row">
                        <div className="col-7 col-sm-6 col-md-5 col-lg-5 col-xl-4 offset-1 offset-sm-2 offset-md-3 offset-lg-3 offset-xl-4">
                            <input onChange={this.updateSearchFilter.bind(this, 'trending')} type="text"
                                    placeholder="Enter Query" className="inputRequired"/>
                        </div>
                        <div className="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                            <button className="btn btn-warning mb-2 btn-block" type="submit" onClick={this.searchQuery.bind(this)}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content">
                    {this.state.results.map((tr, i) =>
                            <li key={tr.id}>
                                <iframe src={tr.embed_url} title={tr.title} frameBorder="1" allowFullScreen>
                                </iframe>
                            </li>)
                    }
                </div>
            </div>
        );
    }
}

export default Trending;