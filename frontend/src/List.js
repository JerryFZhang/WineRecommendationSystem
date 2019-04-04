import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

// The List class parses all the objects with wikiURL and return component with link.
export default class List extends React.Component {

    state = {
        data: {},
        browserLanguage: null,
        intervalIsSet: false,
        isLoaded:null,
        page: ''
      };
  
      componentDidMount() {
        if (this.state.page){
          console.log()
        }else{
          console.log(this.props.match.params.id)
        }
        this.getData('');
    
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
      getData = (number) => {
        fetch('http://localhost:4000/wines-temp/'+number, {
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
      const wines  = this.state.data.result;
        console.log(wines)
        return (
        <div className='row pt-5'>
         <div className='col-12'>
            <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" tabindex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
        321{this.props.id}123
        </div>
           {
             wines === undefined || wines.length <= 0  ? 'NO ENTRIES'
              : wines.map((wine, index)  => (
         <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 card-group mb-3' key={index}>
         <a href={"https://www.lcbo.com/webapp/wcs/stores/servlet/SearchDisplay?storeId=10203&langId=-1&sType=SimpleSearch&searchTerm="+wine.id}>
         <Card>
          <CardBody>
         <CardImg top width='100%' src={"https://www.lcbo.com/content/dam/lcbo/products/"+wine.id+".jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"} alt='Card image cap' />
         <CardTitle className='pt-3 text-center'>{wine.name}
          <h6 className='text-center'>${wine.regular_price_in_cents/100}</h6>
         </CardTitle>
         <CardText>
          </CardText>
          </CardBody>
          </Card>
          </a>
          </div>
          ))}
      </div>
     );
    }
  }