import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

// The List class parses all the objects with wikiURL and return component with link.
export default class List extends React.Component {

    state = {
        data: {},
        intervalIsSet: false,
        isLoaded:null,
        page: '1'
      };
  
      componentDidMount() {
        this.state.page = this.props.match.params.page
        this.getData(this.state.page);
        // Pull every minute
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getData, 60000);
          this.setState({ intervalIsSet: interval });
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
      getData = (number) => {
        fetch('http://localhost:4000/wines/'+number, {
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
        return this.state.data.data? this.renderWine() : (
          <span>Loading list...</span>
        )
    };

    renderWine(){
      const wines  = this.state.data.data;
        console.log(wines)
        console.log(this.state)
        return (
        <div className='row pt-5'>
           {
             wines.map((wine, index)  => (
         <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 card-group mb-3' key={index}>
         <a className="col-12" href={"/info/"+wine.id}>
         <Card>
          <CardBody>
         <CardImg top width='100%' src={"https://www.lcbo.com/content/dam/lcbo/products/"+wine.id+".jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"} alt='Card image cap' />
         <CardTitle className='pt-3 text-center'>{wine.winery.charAt(0).toUpperCase() + wine.winery.slice(1)} - {wine.designation}
          <h6 className='text-center'>${wine.price}</h6>
         </CardTitle>
         <CardText>
          </CardText>
          </CardBody>
          </Card>
          </a>
          </div>
          ))}
      </div>)
    };
  }