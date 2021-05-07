import React from 'react'
import { NavLink } from 'react-router-dom';

class FirstResults extends React.Component {

    render() {
        return (
            <div className={this.props.eType}>                
                {this.props.first_results.map((first_result) =>  (
                    
                    <div className="result-box" key={first_result.name}> 
                    
                        <div className="title"> {first_result.title} </div>
                        <div className="name-year"> {first_result.name} - {first_result.year} </div>
                        
                    </div> )
                
                
                )}

                {this.props.type === "main" && <NavLink className="show-more" to={"/search?query=" + this.props.search_term}> Show more... </NavLink> }
                
            </div>
        )
    }

}

export default FirstResults;