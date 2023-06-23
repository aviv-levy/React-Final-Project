import Error from "./Error";

interface Props {
    required?: boolean;
    inputName: string;
    type: 'text' | 'number' | 'email' | 'password';
    setOnChange: Function;
    error?: string;
}


function FormInput({ required, inputName, type, setOnChange, error='' }: Props) {
    return (
        <div className="col-6">
            <div className="form-group">
                <label className="mb-1"><span className="text-danger">{required ? '*' : ''}</span> {inputName}</label>
                <input
                    type={type}
                    className="form-control"
                    placeholder={inputName}
                    onChange={(e) => setOnChange(e.target.value)} />
            </div>
            <Error errorText={error} />
        </div>
    );
}

export default FormInput;