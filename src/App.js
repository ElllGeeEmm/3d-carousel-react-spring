import React from 'react';
import './App.css';
import Carousel from './components/Carousel';
import { config } from 'react-spring'

const slides = [
  {
    key: 1,
    content: <img src="https://picsum.photos/800/801/?random" alt="1" />
  },
  {
    key: 2,
    content: <img src="https://picsum.photos/800/802/?random" alt="2" />
  },
  {
    key: 3,
    content: <img src="https://picsum.photos/600/803/?random" alt="3" />
  },
  {
    key: 4,
    content: <img src="https://picsum.photos/800/500/?random" alt="4" />
  },
  {
    key: 5,
    content: <img src="https://picsum.photos/800/804/?random" alt="6" />
  },
  {
    key: 6,
    content: <img src="https://picsum.photos/500/800/?random" alt="7" />
  },
  {
    key: 7,
    content: <img src="https://picsum.photos/800/600/?random" alt="8" />
  },
  {
    key: 8,
    content: <img src="https://picsum.photos/805/800/?random" alt="9" />
  }
];

function App() {

  return (
    <div className="App">
      <div style={{ width: "80%", height: "500px", margin: "0 auto" }}>
        <Carousel
          slides={slides}
          goToSlide={0}
          offsetRadius={2}
          showNavigation={true}
          animationConfig={config.gentle}
        />
      </div>
    </div>
  );
}

export default App;
