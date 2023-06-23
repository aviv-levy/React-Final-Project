import Title from "../Components/Title";

function RegisterPage() {
    return (
        <>
            <Title title='Register' />
            <div className="container mt-4">
                <form>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="firstName"><span className="text-danger">*</span> First name</label>
                                <input type="text" className="form-control" placeholder="First Name" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="lastName"><span className="text-danger">*</span> Last name</label>
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="phone"><span className="text-danger">*</span> Phone</label>
                                <input type="text" className="form-control" placeholder="Phone" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="email"><span className="text-danger">*</span> Email</label>
                                <input type="email" className="form-control" placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="phone"><span className="text-danger">*</span> Phone</label>
                                <input type="text" className="form-control" placeholder="Phone" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="mb-1" htmlFor="email"><span className="text-danger">*</span> Email</label>
                                <input type="email" className="form-control" placeholder="Email" />
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <label className="mb-1" htmlFor="address">Address</label>
                            <textarea className="form-control" placeholder="Address" style={{ height: "60px" }}></textarea>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <button type="button" className="btn btn-secondary mx-2">Cancel</button>
                        <button type="submit" className="btn btn-primary mx-2">Update</button>
                    </div >

                </form >
            </div >
        </>
    );
}

export default RegisterPage;