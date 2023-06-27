interface Props {
    title: string;
    text: string;
    image: string;
    noSpace?: boolean
}


function AboutCard({ title, text, image, noSpace }: Props) {
    return (

        <div className="card mb-3 border border-0 ">
            <div className="row g-0 d-flex align-items-center">
                <div className="col-md-3 text-center">
                    <img src={image} className="img-fluid rounded-start" alt={title} />
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{text}</p>
                    </div>
                </div>
                {!noSpace && <hr className="mt-5 mb-3" />}
            </div>
        </div>
    );
}

export default AboutCard;