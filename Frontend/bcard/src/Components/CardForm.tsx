import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { FormEvent, useContext } from "react";
import { CardContext } from "../Pages/EditCardPage";

interface Props {
    type: 'Update' | 'Add'
    errors: Array<string>;
    setCard: Function;
    handleSubmit: Function;
}


function CardForm({ type, errors, setCard, handleSubmit }: Props) {

    const card = useContext(CardContext)?.card;


    const navigate = useNavigate();

    function handleButton(e: FormEvent) {
        e.preventDefault();

        handleSubmit();
    }

    return (
        <div className="container mt-4">
            <form>
                <div className="row">
                    <FormInput objVal={card?.title} required={true} inputName="Title" type="text" inputState='title' setOnChange={setCard} error={errors[0]} />
                    <FormInput objVal={card?.subtitle} required={true} inputName="Subtitle" type="text" inputState='subtitle' setOnChange={setCard} error={errors[1]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.description} required={true} inputName="Description" type="text" inputState='description' setOnChange={setCard} error={errors[2]} />
                    <FormInput objVal={card?.phone} required={true} inputName="Phone" type="text" inputState='phone' setOnChange={setCard} error={errors[3]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.email} required={true} inputName="Email" type="email" inputState='email' setOnChange={setCard} error={errors[4]} />
                    <FormInput objVal={card?.web} inputName="Web" type="text" inputState='web' setOnChange={setCard} error={errors[5]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.imageUrl} inputName="Image Url" type="text" inputState='imageUrl' setOnChange={setCard} error={errors[6]} />
                    <FormInput objVal={card?.imageAlt} inputName="Image alt" type="text" inputState='imageAlt' setOnChange={setCard} error={errors[7]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.state} inputName="State" type="text" inputState='state' setOnChange={setCard} error={errors[8]} />
                    <FormInput objVal={card?.country} required={true} inputName="Country" inputState='country' type="text" setOnChange={setCard} error={errors[9]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.city} required={true} inputName="City" type="text" inputState='city' setOnChange={setCard} error={errors[10]} />
                    <FormInput objVal={card?.street} required={true} inputName="Street" type="text" inputState='street' setOnChange={setCard} error={errors[11]} />
                </div>
                <div className="row mt-3">
                    <FormInput objVal={card?.houseNumber} required={true} inputName="House Number" type="number" inputState='houseNumber' setOnChange={setCard} error={errors[12]} />
                    <FormInput objVal={card?.zip} inputName="Zip" type="number" inputState='zip' setOnChange={setCard} error={errors[13]} />
                </div>
                <div className="my-4 text-center">
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary mx-2">Cancel</button>
                    <button onClick={handleButton} type="submit" className="btn btn-primary mx-2">{type}</button>
                </div >

            </form >
        </div >
    );
}

export default CardForm;