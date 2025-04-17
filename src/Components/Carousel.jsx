import React from 'react'


const Carousel = () => {
  return (
    <section className="row">
    <div className="col-md-12">
        <div
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000" // Auto-play every 3 seconds
          id="mycarousel"
        >
             <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="images/bananas.jpg" alt="" className="d-block w-100 img"/>
                </div>
                <div className="carousel-item">
                    <img src="images/jars.jpg" alt="" className="d-block w-100 img"/>
                </div>
                <div className="carousel-item">
                    <img src="images/farmhouse.jpg" alt="" className="d-block w-100 img"/>
                </div>
             </div>
              <a href="#mycarousel" data-bs-slide="prev" className="carousel-control-prev">
                <span className="carousel-control-prev-icon bg-danger"></span>
              </a>
          <a href="#mycarousel" data-bs-slide="next" className="carousel-control-next">
            <span className="carousel-control-next-icon bg-danger"></span>
          </a>
        </div>
    </div>
 </section>
  )
}

export default Carousel