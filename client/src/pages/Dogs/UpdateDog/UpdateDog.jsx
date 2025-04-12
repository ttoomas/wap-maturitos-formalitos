import { useEffect, useState } from 'react'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dogConfig } from '../dogConfig';
import { getDogById, updateDog } from '../../../models/Dogs';


function UpdateDog() {
    const [formData, setFormData] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    async function handleSubmit(){
        if(!dogConfig.every(inputData => formData[inputData.name])){
            setIsError(true);
            
            return;
        }

        await updateDog(id, formData);
        setIsError(false);
        navigate("/dogs");
    }

    useEffect(() => {
        async function fetchData(){
            const dog = await getDogById(id);

            const newFormData = {};
            dogConfig.map(dogConf => {
                newFormData[dogConf.name] =  dog.data[dogConf.name];
            });

            setFormData(newFormData)
        }
        
        fetchData()
    }, [])

    return (
        <>
            <div className='flex flex-column gap-2 align-items-center justify-content-center'>
                <h1>Update a dog</h1>

                <div className='flex flex-column gap-1'>
                    {dogConfig.map(dogInputProps => (
                        <div className="flex flex-column gap-2" key={dogInputProps.name}>
                            <label htmlFor={dogInputProps.name}>{dogInputProps.label}</label>
                            <InputText defaultValue={formData[dogInputProps.name]} type={dogInputProps.type} placeholder={dogInputProps.label} id={dogInputProps.name} name={dogInputProps.name} onInput={handleChange} />
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

                    <Button label='Update' onClick={handleSubmit} />
                </div>
            </div>
        </>
    )
}

export default UpdateDog