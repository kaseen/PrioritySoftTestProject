import axios from 'axios';

function App() {

    const apiCall = () => {
        axios.get('http://localhost:4000/categories').then((data) => {
            console.log(data);
        });
    }

    return (
        <div>
        <button onClick={apiCall}>Make API Call</button>
        </div>
    );
}

export default App;
