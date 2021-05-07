import React from 'react'
import { db } from './JSON_File.js';
import FirstResults from './FirstResults';

class MainPage extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            search_term: "", 
            first_results: [], // only 5 elements,
            all_results: []
        };
    
        this.onChange = this.onChange.bind(this);

    }

    
    getFirstResults = (search_term) => {

        if (search_term.length < 2) return []


        let first_results = []
        
        for (let i=0; i<db.length; i++) {
            if (JSON.stringify(db[i]).toLowerCase().includes(search_term.toLowerCase())) {
                first_results.push(db[i])
                if (first_results.length === 3) break
            }
        }



        return first_results
        

    }

    



    onChange(event) {
        let search_term = event.target.value

        this.setState({
            search_term
        });

    }

    onSubmit = (e) => {
        e.preventDefault()
        window.location.href = "search?query=" + document.querySelector(".text-form").value 
    }



    render() {

        return (

            <div className="container">
                <div className="tesodev-logo"> </div>
        
                <div className="search-web">Search web app</div>
        
                <form className="form" onSubmit={this.onSubmit}>
                    <input type="text" name="query" className="text-form" placeholder="Search anything" onChange={this.onChange} autoFocus={true} autoComplete="off" spellCheck="false" ></input>
                    <button className="search-button">Search</button>
                </form>

                { this.getFirstResults(this.state.search_term).length > 0 && <FirstResults type="main" eType="eee" first_results={this.getFirstResults(this.state.search_term)} search_term={this.state.search_term}  /> }
    
            </div>

        )
    }




}

export default MainPage;