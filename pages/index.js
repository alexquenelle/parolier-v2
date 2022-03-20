import axios from 'axios';

export default function Home() {
    const get_data = () => {
        axios.get('api/get').then((data) => console.log(data.data));
    };

    return (
        <>
            <button onClick={get_data}>get data</button>
            <>welcome to parolier-V2</>
        </>
    );
}
