import { useState } from 'react'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Link, useNavigate } from 'react-router-dom';
import { createDog } from '../../../models/dogs';
import { dogConfig } from '../dogConfig';


function CreateDog() {
    const [formData, setFormData] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(){
        if(!dogConfig.every(inputData => formData[inputData.name])){
            setIsError(true);
            
            return;
        }
        
        await createDog(formData);
        setIsError(false);
        navigate("/dogs");
    }

    return (
        <>
            <div className='flex flex-column gap-2 align-items-center justify-content-center'>
                <h1>Create a new Dog</h1>

                <div className='flex flex-column gap-1'>
                    {dogConfig.map(dogInputProps => (
                        <div className="flex flex-column gap-2" key={dogInputProps.name}>
                            <label htmlFor={dogInputProps.name}>{dogInputProps.label}</label>
                            <InputText type={dogInputProps.type} placeholder={dogInputProps.label} id={dogInputProps.name} name={dogInputProps.name} onInput={handleChange} />
                        </div>
                    ))}

                    {isError ? (
                        <Message severity="error" text="Fill every input"/>
                    ) : <></>}
                </div>

                <div className='flex flex-row gap-2'>
                    <Link to={"/dogs"}>
                        <Button label='Go Back' />
                    </Link>

                    <Button label='Create' onClick={handleSubmit} />
                </div>
            </div>
        </>
    )
}

export default CreateDog