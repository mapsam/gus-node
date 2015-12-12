var Points = React.createClass({
  pointSubmit: function(point) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: point,
      success: function(data) {
        console.log('successfully posted data', data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="points">
        These are points.
        <PointsForm onPointSubmit={this.pointSubmit} />
      </div>
    );
  }
});

var PointsForm = React.createClass({
  formSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var description = this.state.description.trim();
    var lat = this.state.lat.trim();
    var lng = this.state.lng.trim();
    
    this.props.onPointSubmit({lat: lat, lng: lng, title: title, description: description});
    this.setState({lat: '', lng: '', title: '', description: ''});
  },
  handleLatChange: function(e) {
    this.setState({lat: e.target.value});
  },
  handleLngChange: function(e) {
    this.setState({lng: e.target.value});
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  render: function() {
    return (
      <form className="points-form" onSubmit={this.formSubmit}>
        <input 
          type="text" 
          onChange={this.handleTitleChange}
          placeholder="title" />
        <input 
          type="text" 
          onChange={this.handleDescriptionChange}
          placeholder="description" />
        <input 
          type="text" 
          onChange={this.handleLatChange}
          placeholder="latitude" />
        <input 
          type="text" 
          onChange={this.handleLngChange}
          placeholder="longitude" />
        <input type="submit" />
      </form>
    );
  }
});

ReactDOM.render(
  <Points url="/api/points" />,
  document.getElementById('app')
);