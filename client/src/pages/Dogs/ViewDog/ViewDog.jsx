import { useEffect, useState } from 'react'
import { deleteDog, getDogById, getDogs } from '../../../models/dogs';
import { Link, useNavigate, useParams } from "react-router-dom";
import { dogConfig } from '../dogConfig';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';


function ViewDog() {
    const [dogData, setDogData] = useState({});
    const [visibleDialog, setVisibleDialog] = useState(false);
    const [isError, setIsError] = useState(false);
    const [confirmName, setConfirmName] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData(){
            const dogsData = await getDogById(id);
    
            setDogData(dogsData.data);
        }
        
        fetchData();
    }, []);

    const handleDeleteDog = async () => {
        if(dogData.name !== confirmName){
            setIsError(true);
            return;
        }
        
        await deleteDog(id);
        navigate("/dogs");
    }

    const openDialog = () => {
        setVisibleDialog(true);
    }
    const closeDialog = () => {
        setVisibleDialog(false);
    }
    
    return (
        <>
            <div className='flex flex-column gap-4 align-items-center justify-content-center'>
                <h1 className='m-0'>Dog Info</h1>

                <div className='flex flex-column gap-3'>
                    {dogConfig.map(dogProps => (
                        <p className='m-0 text-xl' key={dogProps.name}>{dogProps.label} is {dogData[dogProps.name]}</p>
                    ))}
                </div>

                <div className='flex flex-row gap-2'>
                    <Link to={"/dogs"}>
                        <Button label='Go Back' />
                    </Link>

                    <Button label='Delete' severity="danger" onClick={openDialog} />
                </div>

                <Dialog
                    header="Delete This Dog"
                    visible={visibleDialog}
                    style={{ width: '30vw' }}
                    footer={
                        <div>
                            <Button label="No" icon="pi pi-times" onClick={closeDialog} className="p-button-text" />
                            <Button label="Yes" icon="pi pi-check" onClick={handleDeleteDog} className="p-button-danger" />
                        </div>
                    }
                    onHide={closeDialog}
                >
                    <div className='flex flex-column gap-2'>
                        <label htmlFor="confirmName">Enter dog's name</label>
                        <InputText
                            onInput={(e) => setConfirmName(e.target.value)}
                            placeholder={dogData.name}
                            id='confirmName'
                        />
                        {isError ? (
                            <Message severity="error" text="Wrong name"/>
                        ) : <></>}
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default ViewDog