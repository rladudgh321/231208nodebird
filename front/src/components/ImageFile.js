import { Image } from 'antd'
import { useCallback, useState } from 'react';
import ImageZoom from './ImageZoom';

const ImageFile = ({images}) => {
    const [showZoom, setShowZoom] = useState(false);
    const onZoom = useCallback(() => {
        setShowZoom(true);
    },[]);
    const closeZoom = useCallback(() => {
        setShowZoom(false);
    },[]);
    if(images.length === 1) {
        return (
            <>
             <Image.PreviewGroup
             items={images[0].src}
            >
                <Image width={200} src={images[0].src} alt={images[0].src} />
            </Image.PreviewGroup>
            </>
        )
    }
    if(images.length === 2) {
        return (
            <div>
                <Image style={{ cursor:'pointer' }} key={images[0].src} src={images[0].src} alt={images[0].src} width={200} height={200} onClick={onZoom} />
                <Image style={{ cursor:'pointer' }} key={images[1].src} src={images[1].src} alt={images[1].src} width={200} height={200} onClick={onZoom} />
            </div>
        )
    }
    return (
        <div style={{ margin: 'auto' }}>
            <Image.PreviewGroup
                items={images.map((v) => v.src)}
            >
                <Image width='100%' src={images[0].src} alt={images[0].src} />
            </Image.PreviewGroup>
        </div>
    );
}

export default ImageFile;