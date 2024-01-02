import Header from "./Header";
import MessageBox from "./MessageBox";
import 'bootstrap/dist/css/bootstrap.min.css';

function Chatbox() {
    return ( 
        
        <div className="card">
            <Header />
            <MessageBox />
        </div>
                
     );
}

export default Chatbox;