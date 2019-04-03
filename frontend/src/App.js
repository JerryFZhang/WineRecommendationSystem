import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardFooter} from 'reactstrap';
class App extends Component {
  // initialize
  state = {
    data: {},
    browserLanguage: null,
    intervalIsSet: false,
    isLoaded:null
  };


  componentDidMount() {
    this.getData();

    // Pull every minute
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getData, 60000);
      this.setState({ intervalIsSet: interval });
    }

    // Detect language for future localization purpose
    if (navigator.language) {
      this.setState({ browserLanguage: navigator.language });
    }
  }

  // never let a process live forever
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // fetch data from backend
  getData = () => {
    fetch('http://localhost:4000/wines', {
        headers: {
            'Accept': 'application/json',
        },
    })
    .then((res) => res.json(),
          (error) => {console.err(`'${error}' happened!`); return {};})
    .then((res) => this.setState({ data: res, isLoaded: true }),
          (error) => this.setState({ isLoaded: true, error}));
  };

  render() {
      const wines  = this.state.data.wines;
      console.log(wines)
      return (
      <div className='row pt-5'>
         {
           wines === undefined || wines.length <= 0  ? 'NO ENTRIES'
            : wines.map((wine, index)  => (
       <div className='col-xl-6 col-lg-6 col-md-12 card-group mb-3' key={index}>
       <Card>
        <CardBody>
       <CardImg top width='100%' src={"https://www.lcbo.com/content/dam/lcbo/products/"+wine.id+".jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"} alt='Card image cap' />
       <CardTitle className='pt-3'><a href={"https://www.lcbo.com/webapp/wcs/stores/servlet/SearchDisplay?storeId=10203&langId=-1&sType=SimpleSearch&searchTerm="+wine.id}>{wine.name}</a>
        <h6>{wine.info.price}</h6>
       </CardTitle>
       <CardText>
        </CardText>
        </CardBody>
        </Card>
        </div>
        ))}
    </div>
   );
  }
}

export default App;
