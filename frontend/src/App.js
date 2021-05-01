import React from "react"
import FilterModal from "./FilterModal"
import Questions from "./Questions";
import Alert from "./Alert";

 class App extends React.Component {
   constructor(props){
     super(props);
     this.state = {
       response: null,
       query: {
         q: "",
         accepted: false,
         answers: "",
         body: "",
         closed: false,
         migrated: false,
         notice: false,
         nottagged: "",
         tagged: "",
         title: "",
         user: "",
         url: "",
         views: "",
         wiki: false,
         fromdate: "",
         todate: "",
         page: "",
         pagesize: "",
         order: "desc",
         sort: "activity",
         min: "",
         max: ""
       },
       error: null,
     }

     this.setResponse = this.setResponse.bind(this);
     this.setQuery = this.setQuery.bind(this);
     this.setError = this.setError.bind(this);
     this.setPage = this.setPage.bind(this);
     this.fetchData = this.fetchData.bind(this);
   }

   setResponse(value) {
     this.setState({response: value});
   }

   setQuery(value){
     this.setState(
       {query: value},
       () => {
         this.fetchData()
       }
     );
   }

   setPage(value){
     var _query = this.state.query;
     _query.page = value;
     this.setQuery(_query);
   }

   setError(value){
     this.setState({error: value});
   }

   fetchData(){
     var url = new URL("http://127.0.0.1:8000/search/advanced/");
     var params = this.state.query;
     Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
     fetch(url)
       .then((response)=> {
          if (!response.ok) {
              response.json()
                .then((data)=>{
                  this.setError(data.detail);
                })
              throw Error(response.statusText);
          }
          return response.json()
        })
       .then((result)=>{
         console.log(result);
         this.setResponse(result);
       })
       .catch(error=>{
         console.log(error);
       })
   }

  render() {
    return (
      <div className="mt-4">
        {
          this.state.error !== null ? (<Alert color="red" text={this.state.error} setError={this.setError}/>) : null
        }
        <FilterModal fetchData={this.fetchData} setQuery={this.setQuery} query={this.state.query} />
        <Questions response={this.state.response} setPage={this.setPage} />
      </div>
    );
  }
}

export default App
