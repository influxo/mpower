import './App.css'
import { MButton } from './components/global'

function App() {
  function handleButtonClick() {
    alert('Button clicked!')
  }

  // TODO: For now this is a demo of MButton component
  // Delete everything inside of return function as well as handleButtonClick function and start this page from scratch
  // We need to handle routing of the application in this file with react-router-dom
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-4">
      <h1 className='text-3xl font-bold underline'>Mpower</h1>
      
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-xl">MButton Component Demo</h2>
        <p>This button component can be found at /components/global/MButton.tsx</p>
        <p>Button accepts 2 props: text and onClick (function that will be called when button is clicked)</p>
        <MButton 
          text="Order Now" 
          onClick={() => handleButtonClick()} 
        />
      </div>
    </div>
  )
}

export default App
