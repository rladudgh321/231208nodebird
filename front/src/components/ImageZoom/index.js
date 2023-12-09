import { Carousel } from 'antd';
import Image from 'next/image';

const ImageZoom = ({images, close}) => {
    const contentStyle = {
        margin:0,
        color: '#fff',
        lieight:'50vw',
        textAlign: 'center',
        background: '#364d79',
      };
      const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
      console.log("Carousel", Carousel);
    return (
        <div style={{ position:'fixed', top:0, bottom:0, left:0, right:0, zIndex:1}}>
            <div>
                <Carousel afterChange={onChange}>
                    <div>
                        {
                            images.map((v) => ({
                                Image
                            }))
                        }
                    </div>
                </Carousel>
            </div>
        </div>
    );
}

export default ImageZoom;

/**
 * import { Carousel } from 'antd';
const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const App = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
 * 
 */