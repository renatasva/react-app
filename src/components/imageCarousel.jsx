import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class ImageCarousel extends Component {
    render() {
        return (
              <div className="img-slider">
            <Carousel autoPlay showStatus={false} showThumbs={false} infiniteLoop={true} >
                <div>
                    <img src={require ("../images/holiday1.png")}/>
                </div>
                <div>
                    <img src={require ("../images/holiday2.png")} />
                </div>
                <div>
                    <img src={require ("../images/holiday3.png")}/>
                </div>
                <div>
                    <img src={require ("../images/holiday4.png")}/>
                </div>
                <div>
                    <img src={require ("../images/holiday5.png")}/>
                </div>
                <div>
                    <img src={require ("../images/holiday6.png")}/>
                </div>
                <div>
                    <img src={require ("../images/holiday7.png")}/>
                </div>
            </Carousel>
              </div>
        );
    }
};

export default ImageCarousel;
