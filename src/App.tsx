import './App.css';
import SideBar from './components/SideBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PageNavContent from './components/PageNavContent';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='App'>
                <header className='App-header'>
                    <div className='d-flex flex-row vw-100 vh-100'>
                        <SideBar />
                        <PageNavContent />
                    </div>
                </header>
            </div>
        </DndProvider>
    );
}

export default App;
