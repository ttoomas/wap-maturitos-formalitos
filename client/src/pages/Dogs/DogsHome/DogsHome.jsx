import { useEffect, useState } from 'react'
import { getDogs } from '../../../models/dogs';
import { Link } from "react-router-dom";
import { dogConfig } from '../dogConfig';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


function DogsHome() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const dogsData = await getDogs();
            
            setDogs(dogsData.data);
        }
        
        fetchData();
    }, []);

    const updateButton = (columnData) => {
        return <>
            <Link to={`/dogs/update/${columnData._id}`}>
                <Button label="Update"/>
            </Link>
        </>
    }

    const viewButton = (columnData) => {
        return <>
        <Link to={`/dogs/${columnData._id}`}>
            <Button label="View" severity="success" />
        </Link>
    </>
    }

    return (
        <div className='flex flex-column gap-4 h-full align-items-start overflow-hidden'>
            <div className='flex flex-row align-items-center w-full'>
                <h1 className='ml-auto'>Dogs</h1>

                <div className='ml-auto'>
                    <Link to={"/dogs/create"}>
                        <Button label='Create new Dog' />
                    </Link>
                </div>
            </div>

            <DataTable value={dogs} tableStyle={{ minWidth: '50rem' }} className='overflow-auto'>
                {dogConfig.map(dogConfig => (
                    <Column field={dogConfig.name} header={dogConfig.label}></Column>
                ))}
                <Column header="Update" body={updateButton}></Column>
                <Column header="View" body={viewButton}></Column>
            </DataTable>

            <Link to={"/"} className='mt-auto'>
                <Button label='Go Back' />
            </Link>
        </div>
    )
}

export default DogsHome