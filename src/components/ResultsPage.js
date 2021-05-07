import React from 'react'
import queryString from 'query-string';
import { db } from './JSON_File.js';
import FirstResults from './FirstResults';


class ResultsPage extends React.Component {


    constructor(props) {
        super(props);
    
        this.state = {
            search_term: queryString.parse(this.props.location.search).query,
            all_results: this.getAllResults(queryString.parse(this.props.location.search).query),
            render_results: this.getAllResults(queryString.parse(this.props.location.search).query).slice(0, 6),
            page_numbers: [],
            current_page: 1
        };
    
    }

    
    getAllResults = (search_term) => {

        let all_results = []
        
        for (let i=0; i<db.length; i++) {
            if (JSON.stringify(db[i]).toLowerCase().includes(search_term.toLowerCase())) {
                all_results.push(db[i])
            }
        }


        return all_results
        

    }


    reset_colors = () => {
        document.querySelectorAll(".page-button").forEach((div) => { 
            div.style.backgroundColor = ""    
            div.style.color = "#000"
        })
    }




    setPageNumbers = (results_length, current_page_num) => {

        let last_page = Math.ceil(results_length / 6)
    

        let numbers = []
        let i = -2

        while (true) {
            let pageNum = current_page_num + i
            
            if (pageNum > last_page) {
                break
            }

            if (pageNum < 1) {
                i++
                continue
            }

            numbers.push(pageNum)
            if (numbers.length === 5) break
            i++
        }

        if (numbers.length < 5) {
            let required =  5 - numbers.length
            let first_num = numbers[0]

            for (let j=0; j<required; j++) {
                let new_idx = first_num - (j+1)
                if (new_idx < 1) continue

                numbers = [new_idx].concat(numbers)
            }
        }



        this.setState({
            page_numbers: numbers
        });
    }



   

    navPage = (page) => {

        if (typeof page === "string") {

            switch(page) {
                case "prev":
                  page = this.state.current_page - 1
                  if (page < 1) page = 1
                  break;

                case "next":
                    page = this.state.current_page + 1
                    let lastPage = Math.ceil(this.state.all_results.length / 6)
                    if (page > lastPage) page = lastPage
                    break;
                
                case "last":
                    page = Math.ceil(this.state.all_results.length / 6)
                    break;

                default:
                    pass
              }
        }




        this.setPageNumbers(this.state.all_results.length, page)
        
        this.reset_colors()
  




        // console.log('navigated:' + page);  

        this.setState({
            render_results: this.state.all_results.slice( ((page*6)-6), ((page*6)) ),
            current_page: page
        }, () => {

            document.querySelectorAll(".page-button").forEach((div) => {
            
                if (div.textContent === page.toString()) {
                    // div.style.backgroundColor = "#18a0fb"
                    div.style.backgroundColor = "#204080"
                    div.style.color = "#eee"
                }
            })


        });
      


    }


    orderByNameDesc = () => {
        this.toggle_dropdown()
        this.navPage(1)

        this.setState({
            all_results: this.state.all_results.sort((a, b) => (a.name < b.name) ? 1 : -1)

        }, () => {
            this.setState({
                render_results: this.state.all_results.slice(0,6)

            })
                }
        )
    }

    orderByNameAsc = () => {
        this.toggle_dropdown()
        this.navPage(1)

        this.setState({
            all_results: this.state.all_results.sort((a, b) => (a.name > b.name) ? 1 : -1)

        }, () => {
            this.setState({
                render_results: this.state.all_results.slice(0,6)

            })
                }
        )
    }

    orderByYearAsc = () => {
        this.toggle_dropdown()
        this.navPage(1)

        this.setState({
            all_results: this.state.all_results.sort((a, b) => (a.year > b.year) ? 1 : -1)

        }, () => {
            this.setState({
                render_results: this.state.all_results.slice(0,6)

            })
                }
        )
    }

    orderByYearDesc = () => {
        this.toggle_dropdown()
        this.navPage(1)

        this.setState({
            all_results: this.state.all_results.sort((a, b) => (a.year < b.year) ? 1 : -1)
          

        }, () => {
            this.setState({
                render_results: this.state.all_results.slice(0,6)

            })
                }
        )
    }


    order_results = () => {

        // let order_type = document.getElementById("orderBy").value;
        let order_type = "year-asc"
        switch(order_type) {
            case "name-desc":
                this.setState({
                    all_results: this.state.all_results.sort((a, b) => (a.name < b.name) ? 1 : -1)

                }, () => {
                    this.setState({
                        render_results: this.state.all_results.slice(0,6)
    
                    })
                        }
                )

              break;

                        
            case "name-asc":
            this.setState({
                all_results: this.state.all_results.sort((a, b) => (a.name > b.name) ? 1 : -1)

            }, () => {
                this.setState({
                    render_results: this.state.all_results.slice(0,6)

                })
                    }
            )
    
            break;
            

            case "year-desc":
                this.setState({
                    all_results: this.state.all_results.sort((a, b) => (a.year < b.year) ? 1 : -1)
                  

                }, () => {
                    this.setState({
                        render_results: this.state.all_results.slice(0,6)
    
                    })
                        }
                )

              break;


            case "year-asc":
                this.setState({
                    all_results: this.state.all_results.sort((a, b) => (a.year > b.year) ? 1 : -1)

                }, () => {
                    this.setState({
                        render_results: this.state.all_results.slice(0,6)

                    })
                        }
                )

            break;

            default:
                pass
        }

        this.navPage(1)


    }

    toggle_dropdown = () => {

        let visibility = document.querySelector(".dropdown-box").style.visibility

        if (visibility === "hidden" || visibility === "") document.querySelector(".dropdown-box").style.visibility = "visible"
        else document.querySelector(".dropdown-box").style.visibility = "hidden"
    }




    componentDidMount() {
        this.navPage(1) // initial render
    }


    render() {

        return (

            <div className="container">

                <div className="banner">
                    <a className="tesodev-logo2" href="/"> </a>
                    <form className="form2">
                        <input type="text" name="query" className="text-form" placeholder="Search anything" onChange={this.onChange} autoFocus={true} autoComplete="off" ></input>
                        <button className="search-button">Search</button>
                    </form>

                </div>


                 
                <div className="dropdown-container">

                
                    <div className="dropdown-title-container" onClick={this.toggle_dropdown}>
                        <img className="sort-svg" src="/img/sort.svg"/>    
                        <div className="dropdown-title">Order By</div>
                    </div>
                    
                    <div className="dropdown-box">
                        <div className="dropdown-option" onClick={this.orderByNameAsc}>Name ascending</div>
                        <div className="dropdown-option" onClick={this.orderByNameDesc}>Name descending</div>
                        <div className="dropdown-option" onClick={this.orderByYearAsc}>Year ascending</div>
                        <div className="dropdown-option" onClick={this.orderByYearDesc}>Year descending</div>
                    </div>

                </div>


                { this.state.render_results.length > 0 && <FirstResults eType="eee2" first_results={this.state.render_results}  /> }
                { this.state.render_results.length > 0 && 
     
                <div className="pagination">

                    <div className="first-page page-btn" onClick={() => this.navPage(1)}> {"<<"} </div> 
                    <div className="prev-page page-btn" onClick={() => this.navPage("prev")}>{"<"}</div> 
                
            

                   { this.state.page_numbers.length > 0 && this.state.page_numbers.map((number) => (
                       <div className="page-button page-btn" key={number} onClick={() => this.navPage(number)}>{number}</div> )
                   )}


                    <div className="next-page page-btn" onClick={() => this.navPage("next")}> {">"} </div> 
                    <div className="last-page page-btn" onClick={() => this.navPage("last")}>{">>"} </div> 
                   

                </div>}
                

                
                

                
            </div>

        )
    }



}

export default ResultsPage;