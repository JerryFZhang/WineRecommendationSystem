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
        review: {},
        list: []
      };
  
      componentDidMount() {
        this.state.id = this.props.match.params.id
        this.getData(this.state.id);
        this.getReview(this.state.id);
        this.getRecommendation(this.state.id);

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


      getRecommendation = (number) => {
        fetch('http://localhost:4000/recommendation/'+number, {
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((res) => res.json(),
              (error) => {console.err(`'${error}' happened!`); return {};})
        .then((res) => this.setState({ list: res, isLoaded: true }),
              (error) => this.setState({ isLoaded: true, error}));
      };


      renderWine(){
        const list  = this.state.list;
        console.log(this.state)
        return (

          <div className=''>
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/1">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Wine #{this.state.data.result.id}</li>
              </ol>
            </nav>

          <div className='row pt-3'>
            <h2 className='col-12 pb-3 text-center'>{this.state.data.result.name}</h2>
           <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-3'>
           <Card>
           <CardImg top width='100%' src={"https://www.lcbo.com/content/dam/lcbo/products/"+this.state.id+".jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"} alt='Card image cap' />
            </Card>
            </div>
            <div className='col-xl-8 col-lg- col-md-6 col-sm-12 mb-3'>
            <p className=''><i className="fas fa-wine-glass"></i> {this.state.data.result.style}</p>
            <p className=''><i className="fas fa-compass"></i> {this.state.data.result.origin}</p>
            <p className=''><i className="fas fa-wine-bottle"></i> {this.state.data.result.package}</p>
            <p className=''><i className="fas fa-sun"></i> {this.state.data.result.varietal}</p>
            <p className=''><i className="fas fa-thumbtack"></i> {this.state.data.result.sugar_content}</p>
            <p><Button color="primary" target="_blank" href={"https://www.lcbo.com/webapp/wcs/stores/servlet/SearchDisplay?storeId=10203&langId=-1&sType=SimpleSearch&searchTerm="+this.state.id}><i className="fas fa-shopping-cart"></i> Buy on LCBO ${this.state.data.result.regular_price_in_cents/100}</Button>{' '}</p>
            <Progress className ="w-100" value={this.state.review.points}>Score:{this.state.review.points} </Progress>
          </div>
          <h3 className='col-12 pt-3'>What Reviewers Are Saying</h3>
          <Card className='mt-3 col-12'>
          <CardBody>
            <p>{this.state.data.result.tasting_note}</p>
          </CardBody>
          </Card>
          <Card className='mt-3 col-12'>
          <CardBody>
            <p>{this.state.review.description}</p>
          </CardBody>
          </Card>

          <h3 className='col-12 pt-3 pb-3'>You Might Also Like</h3>
        </div>
               <div className='row'>
               {
                 list.map((wine, index)  => (
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
          </div>
    </div>

       );
      }
    render() {
        return this.state.data.result && this.state.review && this.state.list ? this.renderWine() : (
          <span>Loading Wine Information...</span>
        )

    }
  }
