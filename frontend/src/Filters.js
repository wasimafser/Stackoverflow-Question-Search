import React from "react";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.query;

    this.handleInput = this.handleInput.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleCheckBox(event){
    this.setState({
      [event.target.id]: event.target.checked
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setQuery(this.state);
  }

  renderInput(type, key, value) {
    return (
      <div className="">
        <label className="">{key}</label>
        <input
          type={type}
          id={key}
          value={value}
          onChange={this.handleInput}
          className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
        >
        </input>
      </div>
    );
  }

  renderCheckBox(key, value) {
    return (
      <div className="flex flex-col">
        <label>{key}</label>
        <input
          type="checkbox"
          id={key}
          checked={value}
          onChange={this.handleCheckBox}
        ></input>
      </div>
    );
  }

  renderSelect(key, value, values){
    return (
      <div className="flex flex-col">
        <label>{key}</label>
        <select
          id={key}
          value={value}
          onChange={this.handleInput}>
          {
            values.map((element, i) => {
              return (<option value={element}>{element}</option>)
            })
          }
        </select>
      </div>
    )
  }

  render() {
    return (
      <form className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {this.renderInput("text", "q", this.state.id)}
        {this.renderCheckBox("accepted", this.state.accepted)}
        {this.renderInput("number", "answers", this.state.answers)}
        {this.renderInput("text", "body", this.state.body)}
        {this.renderCheckBox("closed", this.state.closed)}
        {this.renderCheckBox("migrated", this.state.migrated)}
        {this.renderCheckBox("notice", this.state.notice)}
        {this.renderInput("text", "nottagged", this.state.nottagged)}
        {this.renderInput("text", "tagged", this.state.tagged)}
        {this.renderInput("text", "title", this.state.title)}
        {this.renderInput("number", "user", this.state.user)}
        {this.renderInput("text", "url", this.state.url)}
        {this.renderInput("number", "views", this.state.views)}
        {this.renderCheckBox("wiki", this.state.wiki)}
        {this.renderInput("date", "fromdate", this.state.fromdate)}
        {this.renderInput("date", "todate", this.state.todate)}
        {this.renderInput("number", "page", this.state.page)}
        {this.renderInput("number", "pagesize", this.state.pagesize)}
        {this.renderSelect("order", this.state.order, ["desc", "asc"])}
        {this.renderSelect("sort", this.state.sort, ["activity", "creation", "votes", "relevance"])}
        {this.renderInput("date", "min", this.state.min)}
        {this.renderInput("date", "max", this.state.max)}
        <input
          type="submit"
          onClick={this.handleSubmit}
          className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 col-span-3"
        />
      </form>
    );
  }
}

export default Filters;
