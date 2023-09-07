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
  const [selectedFormat, setSelectedFormat] = useState('png');
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
    }else{
      alert("Pls Enter a URL")
    }
  }

  function CustomQRCode({ value, color, selectedImage }){
    return (
      <QRCode
        value={value}
        size={226}
        fgColor={color}
        imageSettings={{
          src: selectedImage,
          height: 60,
          width: 50,
        }}
      />
    );
}

  function downloadimg() {
    const qrCodeDataUrl = document.querySelector('canvas').toDataURL(`image/${selectedFormat}`);
  
    const blob = dataURLtoBlob(qrCodeDataUrl);

    saveAs(blob, `qrcode.${selectedFormat}`);
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

      

      <div className='bg-[#f3f7fa]  p-4'>
        <div className='flex mt-5 px-[15rem] gap-[10rem] bg-[#f3f7fa] rounded-xl h-[30rem]' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>

          <div className='p-3 mt-[5rem] bg-white rounded-xl h-[20rem]' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
            <label htmlFor="url" className='block font-medium text-[15px]  mb-2'>YOUR URL</label>
            <input
              type="text"
              value={input}
              className='w-[26.5rem] p-2 border border-white rounded bg-gray-200 '
              placeholder='https// '
              onChange={(e) => setInput(e.target.value)}
            />
              <div className='mt-5'><label htmlFor="" className='font-medium text-md'>Color</label>
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

            <div className='mt-9 text-center'>
            <button className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium ' onClick={handlegenerateQrcode}
              disabled={loading}
              style={{ width: '20rem' }}>
                {loading ? (<ClipLoader color="white" loading={loading} size={20} />) : ("Generate QR Code")}
              </button>
            </div>
            
            <div>
     
      <div className='mt-3 text-center'>
        <button
          className='bg-[#11ab7c] w-[20rem] mt-3 rounded-xl p-2 text-white font-medium'
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
                <CustomQRCode value={input} size={226} color={color} selectedImage={selectedImage}/>
               

<div className='flex items-center gap-2 mt-4'>
  <button className='bg-[#11ab7c] rounded-xl p-2 text-white font-medium w-[10rem] mt-4 ' onClick={downloadimg}>
    Download QR Code
  </button>

  <div className=''>
    <select
      id="format"
      onChange={(e) => setSelectedFormat(e.target.value)}
      className='p-2 border text-white font-medium border-gray-400  bg-[#11ab7c] rounded-xl mt-3'
    >
      <option value="png">PNG</option>
      <option value="jpg">JPG</option>
       <option value="svg">SVG</option>


    </select>
  </div>
</div>


              </>
            ) : (
              <div className="w-[226px] h-[20rem] p-3 bg-white rounded-xl flex items-center text-center text-gray-500 font-bold text-lg" style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>Your QR Code Will Appear Here</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QrCode;