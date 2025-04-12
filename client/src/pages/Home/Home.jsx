import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>The best 6h maturita work you have ever seen 🥸</h1>

            <div className='flex align-items-center flex-column gap-3'>
                <Link to={"/dogs"}>
                    <Button label='Dogs Pages' />
                </Link>
            </div>
        </div>
    )
}
export default Home