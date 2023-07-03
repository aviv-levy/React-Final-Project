interface Props {
    title?: string;
    text?: string;
    image?: string;
    location?: string;
    noSpace?: boolean
}


function AboutCard({ title, text, image, location, noSpace }: Props) {
    return (

        <div className="card mb-3 border border-0 ">
            <div className="row g-0 d-flex align-items-center">
                <div className="col-md-3 text-center">
                    <img src={image} className="img-fluid rounded-start" alt={title} />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h3 className="card-title">{title}</h3>
                        <p className="card-text">{text}</p>
                        {location && <p className="card-text">{location}</p>}
                    </div>
                </div>
                {!noSpace && <hr className="mt-5 mb-3" />}
            </div>
        </div>
    );
}

export default AboutCard;