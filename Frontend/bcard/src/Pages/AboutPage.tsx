import "../CSS/about.css"
import AboutCard from "../Components/AboutCard";
import Title from "../Components/Title";
import aboutImg from "../images/about.jpg"
import servicesImg from "../images/services.png"
import rateImg from "../images/rate.png"

function AboutPage() {
    return (
        <>
            <Title title='About Page' />

            <div className="container mb-5">
                <div className="row d-flex align-items-center">
                    <div className="col-6">
                        <h1 className="mb-2">We Make Relationship Between Business & Professionals</h1>

                        <span className="about-since">Since 2020</span>

                        <p className="mt-3 fs-5">Always try to provide the best Business Solutions for Clients to grow up their Business very sharply and smoothly. </p>
                    </div>
                    <div className="col-6">
                        <img src={aboutImg} className="img-thumbnail border border-0" alt="" />
                    </div>
                </div>
            </div>

            <div className="container my-4">
                <h1 className="text-center">Check <span className="text-primary">our</span> Services</h1>
                <div className="d-flex justify-content-center fs-5 mb-5">
                    <p className="text-center col-5">Pleasure rationally encounter consequences that are
                        painful. Nor again is there anyone who pursues</p>
                </div>

                <div className="container-fluid h-100 mb-5">
                    <div className="row d-flex align-items-center">
                        <div className="col-4">

                            <AboutCard title="Digital Solution"
                                text="Technology-driven solutions for business challenges."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/1.png" />


                            <AboutCard title="Business Plan"
                                text="Strategic roadmap for business success."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/2.png" />

                            <AboutCard title="Creative Strategy"
                                text=" Innovative approaches to effective communication."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/3.png"
                                noSpace={true} />

                        </div>

                        <div className="col-4">
                            <img src={servicesImg} className="img-thumbnail border border-0" alt="" />
                        </div>

                        <div className="col-4">
                            <AboutCard title="Branding"
                                text="Building unique brand identity and loyalty."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/4.png" />

                            <AboutCard title="Marketing Policy"
                                text="Guidelines for strategic marketing decisions."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/5.png" />

                            <AboutCard title="Campaign & PR"
                                text="Targeted promotion through effective communication."
                                image="https://buznex.jamstacktemplates.dev/images/service/icon/6.png"
                                noSpace={true} />
                        </div>
                    </div>
                </div>
            </div >


            <div className="container my-5">
                <div className="row d-flex align-items-center mt-5">
                    <div className="col-6">
                        <img src={rateImg} className="img-thumbnail border border-0" alt="" />
                    </div>
                    <div className="col-5">
                        <h1 className="mb-2">Don’t Believe us Check <span className="text-primary">Clients</span> word</h1>

                        <span className="about-since">More over 2500 happy customer</span>

                        <div id="carouselExampleIndicators" className="carousel slide border border-1 p-5">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <h1><q></q></h1>
                                    <p>heloo1</p>
                                </div>
                                <div className="carousel-item">
                                    <p>heloo2</p>
                                </div>
                                <div className="carousel-item">
                                    <p>heloo3</p>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>


    );
}

export default AboutPage;