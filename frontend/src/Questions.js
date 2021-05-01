import React from "react";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      page: 1
    }

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.response !== props.response) {
      return {
        response: props.response
      }
    }
    return null
  }

  renderQuestion(data) {
    return (
      <div className="border-2 border-black border-opacity-100 m-2">
        <div className="grid grid-cols-4 p-2">
          <div className="flex flex-col col-span-1">
            <div className="flex flex-col text-center">
              <strong className="">{data.score}</strong>
              votes
            </div>
            <div className="flex flex-col text-center">
              <strong>{data.answer_count}</strong>
              answers
            </div>
            <div className="text-center">
              {data.view_count} views
            </div>
          </div>
          <div className="col-span-2">
            <h3>
              <a href={data.link} className="text-blue-700">
                {data.title}
              </a>
            </h3>
            <div className="subcommunities float-left"></div>
            <div className="flex flex-row flex-wrap">
              {
                data.tags.map((tag, i)=>{
                  return (
                    <a
                      href={`https://stackoverflow.com/questions/tagged/${tag}`}
                      className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1"
                    >
                      {tag}
                    </a>
                  )
                })
              }
            </div>
          </div>
          <div className="">
            <div className="flex flex-row">
              <div className="mr-2">
                <a href={data.owner.link}>
                  <div className="">
                    <img src={data.owner.profile_image} alt="" width="64" height="64" className="bar-sm" />
                  </div>
                </a>
              </div>
              <div className="user-details">
                <a href={data.owner.link} className="text-blue-400">{data.owner.display_name}</a>
                <div className="text-normal">
                  {data.owner.reputation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  prevPage(){
    var _page = this.state.page;
    if (_page > 1){
      _page -= 1;
      this.props.setPage(_page);
      this.setState({page: _page});
    }
  }

  nextPage(){
    var _page = this.state.page;
    _page += 1;
    this.props.setPage(_page);
    this.setState({page: _page});
  }

  render() {
    if (this.state.response != null){
      return (
        <div className="container mx-auto">
          {
            this.state.response.items.map((element, i) => {
              return this.renderQuestion(element)
            })
          }
          {
            this.state.response.has_more ?
            <div className="flex flex-row">
              <button
                className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={this.prevPage}
              >
                Prev
              </button>
              <button
                className="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-pink-500 hover:text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                onClick={this.nextPage}
              >
                Next
              </button>
            </div> : null
          }
        </div>
      )
    }else {
      return null
    }
  }
}

export default Questions;
