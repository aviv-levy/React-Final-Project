import { FormEvent, useState } from "react";
import FormInput from "../Components/FormInput";
import Title from "../Components/Title";
import { useNavigate } from "react-router-dom";
import { Cards } from "../Services/Interfaces"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { validateCard } from "../Services/Validations";
import { addNewCard } from "../Services/ApiService";

function AddCardPage() {

    const [title, setTitle] = useState('');
    const [subtitle, setSubTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState<number>(0);
    const [zip, setZip] = useState<number>();

    const [errors, setError] = useState<string[]>([]);

    const navigate = useNavigate();

    const MySwal = withReactContent(Swal)

    const card: Cards = { title, subtitle, description, phone, email, web, imageUrl, imageAlt, state, country, city, street, houseNumber, zip };

    function validate(): boolean {
        const errArray: Array<string> = [];
        validateCard(card, errArray)

        setError(errArray)

        let flag: boolean = true;
        errArray.forEach((err) => {
            if (err !== '') {
                flag = false;
                return;
            }
        })
        return flag;
    }

    //Handle Add card button
    async function handleAddButton(e: FormEvent) {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        //api request
        await addNewCard(card)
            .then(() =>
                MySwal.fire({
                    title: <strong>Good job!</strong>,
                    html: <i>Your card has been added</i>,
                    icon: 'success'
                })
            ).catch(err => {
                if (err) {
                    MySwal.fire({
                        title: <strong>Error accured!</strong>,
                        html: <i>Please try again</i>,
                        icon: 'error'
                    })
                    return;
                }
            })

    }

    return (
        <>
            <Title title='Add new Card' />

            <div className="container mt-4">
                <form>
                    <div className="row">
                        <FormInput required={true} inputName="Title" type="text" setOnChange={setTitle} error={errors[0]} />
                        <FormInput required={true} inputName="Subtitle" type="text" setOnChange={setSubTitle} error={errors[1]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput required={true} inputName="Description" type="text" setOnChange={setDescription} error={errors[2]} />
                        <FormInput required={true} inputName="Phone" type="text" setOnChange={setPhone} error={errors[3]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput required={true} inputName="Email" type="email" setOnChange={setEmail} error={errors[4]} />
                        <FormInput inputName="Web" type="text" setOnChange={setWeb} error={errors[5]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput inputName="Image Url" type="text" setOnChange={setImageUrl} error={errors[6]} />
                        <FormInput inputName="Image alt" type="text" setOnChange={setImageAlt} error={errors[7]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput inputName="State" type="text" setOnChange={setState} error={errors[8]} />
                        <FormInput required={true} inputName="Country" type="text" setOnChange={setCountry} error={errors[9]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput required={true} inputName="City" type="text" setOnChange={setCity} error={errors[10]} />
                        <FormInput required={true} inputName="Street" type="text" setOnChange={setStreet} error={errors[11]} />
                    </div>
                    <div className="row mt-3">
                        <FormInput required={true} inputName="House Number" type="number" setOnChange={setHouseNumber} error={errors[12]} />
                        <FormInput inputName="Zip" type="number" setOnChange={setZip} error={errors[13]} />
                    </div>
                    <div className="my-4 text-center">
                        <button onClick={() => navigate(-1)} type="button" className="btn btn-secondary mx-2">Cancel</button>
                        <button onClick={handleAddButton} type="submit" className="btn btn-primary mx-2">Add</button>
                    </div >

                </form >
            </div >

        </>
    );
}

export default AddCardPage;