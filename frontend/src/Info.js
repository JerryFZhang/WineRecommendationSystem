import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Progress, Button} from 'reactstrap';

// The List class parses all the objects with wikiURL and return component with link.
export default class List extends React.Component {

    state = {
        data: {},
        browserLanguage: null,
        intervalIsSet: false,
        isLoaded:null,
        id: '1',
        review: {}
      };
  
      componentDidMount() {
        this.state.id = this.props.match.params.id
        this.getData(this.state.id);
        this.getReview(this.state.id);
  
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
      getData = (number) => {
        fetch('http://localhost:4000/wine/'+number, {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((res) => res.json(),
              (error) => {console.err(`'${error}' happened!`); return {};})
        .then((res) => this.setState({ data: res, isLoaded: true }),
              (error) => this.setState({ isLoaded: true, error}));
      };

      getReview = (number) => {
        fetch('http://localhost:4000/review/'+number, {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((res) => res.json(),
              (error) => {console.err(`'${error}' happened!`); return {};})
        .then((res) => this.setState({ review: res, isLoaded: true }),
              (error) => this.setState({ isLoaded: true, error}));
      };
 
      renderWine(){
        console.log(this.state)
        return (
          <div className='row pt-5'>
            <h2 className='pt-3 text-center'>{this.state.data.result.name}</h2>
           <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3'>
           <Card>
           <CardImg top width='100%' src={"https://www.lcbo.com/content/dam/lcbo/products/"+this.state.id+".jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"} alt='Card image cap' />
            </Card>
            </div>
            <div className='col-xl-8 col-lg- col-md-6 col-sm-12 mb-3'>
            <p className=''>{this.state.data.result.style}</p>
            <p className=''>{this.state.data.result.origin}</p>
            <p className=''>{this.state.data.result.package}</p>
            <p className=''>{this.state.data.result.varietal}</p>
            <p><Button color="primary" href={"https://www.lcbo.com/webapp/wcs/stores/servlet/SearchDisplay?storeId=10203&langId=-1&sType=SimpleSearch&searchTerm="+this.state.id}>Buy on LCBO ${this.state.data.result.regular_price_in_cents/100}</Button>{' '}</p>
            <Progress className ="w-100" value={this.state.review.points}>Score:{this.state.review.points} </Progress>
          </div>
            <p>{this.state.data.result.tasting_note}</p>
        </div>
       );
      }
    render() {     
        return this.state.data.result &&  this.state.review ? this.renderWine() : (
          <span>Loading Wine Information...</span>
        )

    }
  }