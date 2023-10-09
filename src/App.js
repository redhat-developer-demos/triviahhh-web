import logo from './logo.svg';
import './App.css';
import SingleQuote from './components/SingleQuote';

function App() {
  return (
    <div className='App'>
      <header>
        <h1>
          Welcome to the Triviahhh Quotes System
        </h1>
        <SingleQuote />
      </header>
    </div>
  );
}

export default App;
