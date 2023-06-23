import Error from "./Error";

interface Props {
    required?: boolean;
    inputName: string;
    type: 'text' | 'number' | 'email' | 'password';
    setOnChange: Function;
    inputState: string;
    objVal?: string | number;
    error?: string;
}



function FormInput({ required, inputName, type, setOnChange, inputState, objVal, error = '' }: Props) {

    return (
        <div className="col-6">
            <div className="form-group">
                <label className="mb-1"><span className="text-danger">{required ? '*' : ''}</span> {inputName}</label>
                <input
                    type={type}
                    value={objVal ? objVal : ''}
                    className="form-control"
                    placeholder={inputName}
                    onChange={(e) => setOnChange((prevState: any) => ({ ...prevState, [inputState]: e.target.value }))} />
            </div>
            <Error errorText={error} />
        </div>
    );
}

export default FormInput;