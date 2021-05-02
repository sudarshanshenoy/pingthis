
import React, { useEffect, useState } from 'react';
import CustomImage from './CustomImage';
import './App.css';

function App() {

  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetchImages(pageNo);
  }, [])

  const fetchImages = async (pagenum) => {
    setLoadingImages(true);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${pagenum}&limit=6`)
      let results = await response.json();
      results = results.map(d => {
        d.id = `${d.id}${d.author}${pagenum}`
        return d
      })
      setPageNo(pagenum)
      setGalleryImages([...galleryImages, ...results]);
    } catch (e) {
      console.error(e)
    }
    setLoadingImages(false);
  }

  return (
    <React.Fragment>
      <header className="header app-wrapper">
        <div>
          <img width="80" height="80" alt="Gallery Logo" src="https://i.pinimg.com/736x/e8/e0/81/e8e081875b58aaf2e1721d7e37e00b37.jpg"></img>
        </div>
        <div className="title">
          <h1>Image Gallery</h1>
        </div>
      </header>

      <main className="app-wrapper">
        <div>
          <img className="header-image" alt="Header design" src="https://www.templarbit.com/images/blog/templarbit-illustration-csp-header-92837bc0.jpg"></img>
        </div>
        <div>
          <div className="gallery-section">
            {
              galleryImages.map(d => {
                return <div key={d.id} ><CustomImage desc={`${d.author}`} url={d.download_url} /></div>
              })
            }
          </div>
          {loadingImages ? '' :
            <div>
              <button className="loadmore" onClick={() => fetchImages(pageNo + 1)}>Load More</button>
            </div>
          }
        </div>

      </main>

    </React.Fragment >
  )
}

export default App;
