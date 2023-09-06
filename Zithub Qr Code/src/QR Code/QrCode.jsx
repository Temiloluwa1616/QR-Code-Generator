import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { ClipLoader } from 'react-spinners';
import { saveAs } from 'file-saver';
import { ChromePicker } from 'react-color';

function QrCode() {
  const [input, setInput] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#054080')
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayColor, setDisplayColor] = useState(false)
  const fileInputRef = useRef(null);

  
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      console.log('Selected file:', file);
    }
  }

  function handleClick(){
    setDisplayColor(!displayColor)
  }

  function handleChange (color){
setColor(color.hex)
  }

  function handlegenerateQrcode() {
    if (input.trim() !== "") {
      setLoading(true);
      setTimeout(() => {
        setShowQRCode(true);
        setLoading(false);
      }, 2000);
    }
  }

  function CustomQRCode({ value, color }) {
    return (
      <QRCode
        value={value}
        size={226}
        fgColor={color}
      />
    );
  }

  function downloadimg() {
    const qrCodeDataUrl = document.querySelector('canvas').toDataURL('image/png');

    const blob = dataURLtoBlob(qrCodeDataUrl);

    saveAs(blob, 'qrcode.png');
  }

  function dataURLtoBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className='h-screen' >
      <div className='bg-[#11ab7c]' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
        <h1 className='font-bold text-[2rem] p-[1.5rem] text-white' >NITHUB</h1>
      </div>

      <div className='bg-[#f3f7fa] px-[3rem] p-4'>
        <div className='flex mt-9 px-[17rem] gap-5 bg-[#f3f7fa] rounded-xl h-[30rem]' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>

          <div className='p-3 mt-[5rem] bg-white rounded-xl h-[19rem]' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <label htmlFor="url" className='block font-medium text-[15px]  mb-2'>YOUR URL</label>
            <input
              type="text"
              value={input}
              className='w-[26.5rem] p-2 border border-white rounded bg-gray-200 '
              placeholder='https// '
              onChange={(e) => setInput(e.target.value)}
            />
              <div><label htmlFor="" className='font-medium text-md'>Color</label>
            <div className='flex items-center gap-2'>
                 <div 
                 onClick={handleClick}
                 style={{background:color}}
                 className='w-10 h-8 cursor-pointer border-4'></div>
                 <span>{color}</span>
            </div>
            {displayColor && (
            <div className='absolute mt-2'>
              <ChromePicker color={color} onChange={handleChange}/>
            </div>
            )}

            <div className='mt-7 text-center'>
            <button className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium ' onClick={handlegenerateQrcode}
              disabled={loading}
              style={{ width: '200px' }}>
                {loading ? (<ClipLoader color="#d67036" loading={loading} size={20} />) : ("Generate QR Code")}
              </button>
            </div>
            '
            <div>
     
      <div className='mt-3 text-center'>
        <button
          className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium'
          onClick={() => fileInputRef.current.click()} 
        >
          Upload Logo
        </button>
       
        <input
          type="file"
          accept="image/*" 
          ref={fileInputRef} 
          style={{ display: 'none' }}
          onChange={handleFileSelect} 
        />
      </div>
      
    </div>
              
            </div>
          </div>

          <div className='mt-[5rem] '>
            {showQRCode ? (
              <>
                <CustomQRCode value={input} size={226} color={color}/>
                {selectedImage && (
              <img
                src={selectedImage}
                alt="Uploaded Logo"
                style={{
                  width: '0px',
                  position: 'absolute',
                  top: '53%',
                  left: '66%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                }}
              />
            )}
                <button className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium mt-4 ml-9' onClick={downloadimg}
                >Download QR Code</button>
              </>
            ) : (
              <div className="w-[226px] h-[19rem] p-3 bg-white rounded-xl flex items-center text-center text-gray-500 font-bold text-lg" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>Your QR Code Will Appear Here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCode;