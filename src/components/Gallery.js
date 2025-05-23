'use client';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import lightbox styles

const galleryImages = [
  {
    src: '/wp-content/uploads/2025/03/468086312_17959338320837759_5184469718064507362_n.jpg',
    thumbnail: 'https://ravirajsabalepatil.onlinespe.com/wp-content/uploads/2025/03/468086312_17959338320837759_5184469718064507362_n.jpeg',
    alt: 'Gallery Image 1'
  },
  {
    src: '/wp-content/uploads/2025/03/1C8A35611.jpg',
    thumbnail: '/wp-content/uploads/2025/03/1C8A35611.jpg',
    alt: 'Gallery Image 2'
  },
  {
    src: '/wp-content/uploads/2025/03/1731563260_gauva-imge1.jpg',
    thumbnail: '/wp-content/uploads/2025/03/1731563260_gauva-imge1.jpg',
    alt: 'Gallery Image 3'
  },
  {
    src: '/wp-content/uploads/2025/03/1C8A3568-scaled.jpg',
    thumbnail: '/wp-content/uploads/2025/03/1C8A3568-scaled.jpg',
    alt: 'Gallery Image 4'
  },
  {
    src: '/wp-content/uploads/2025/03/1C8A3563-scaled.jpg',
    thumbnail: '/wp-content/uploads/2025/03/1C8A3563-scaled.jpg',
    alt: 'Gallery Image 5'
  },
  {
    src: '/wp-content/uploads/2025/03/468303474_17959338167837759_4503188336723094447_n.jpg',
    thumbnail: 'https://ravirajsabalepatil.onlinespe.com/wp-content/uploads/2025/03/468303474_17959338167837759_4503188336723094447_n.jpeg',
    alt: 'Gallery Image 6'
  },
];

export default function Gallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setPhotoIndex((photoIndex + galleryImages.length - 1) % galleryImages.length);
  };

  const goToNext = () => {
    setPhotoIndex((photoIndex + 1) % galleryImages.length);
  };
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // Only animate once
    });
  }, []);
  return (
   
    <div className="elementor-element e-con-boxed elementor-element-25ed8c2 e-flex e-con e-parent">
      <Container>
        <Row className="mb-4">
          <Col>
            <div className="elementor-widget-container">
              <h2 className="elementor-heading-title elementor-size-default text-center" style={{ color: 'black', fontWeight: 'bold' }}>
                Gallery
              </h2>
            </div>
          </Col>
        </Row>
        <Row className="elementor-gallery__container">
          {galleryImages.map((img, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4"  data-aos="zoom-in">
              <a
                href=""
                className="e-gallery-item elementor-gallery-item elementor-animated-content d-block"
                onClick={(e) => {
                  e.preventDefault();
                  openLightbox(index);
                }}
              >
                <div
                  className="e-gallery-image elementor-gallery-item__image position-relative"
                  style={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '10px',
                  }}
                >
                  <Image
                    src={img.thumbnail}
                    alt={img.alt}
                    fill
                    
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="elementor-gallery-item__overlay position-absolute top-0 start-0 w-100 h-100"></div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Lightbox Modal */}
      {isOpen && (
        <Lightbox
          mainSrc={galleryImages[photoIndex].src}
          nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length].src}
          prevSrc={galleryImages[(photoIndex + galleryImages.length - 1) % galleryImages.length].src}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
          imageTitle={galleryImages[photoIndex].alt} // Image title for the modal
          reactModalStyle={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            content: {
              padding: 0,
            },
          }}
        />
      )}
    </div>
  );
}
