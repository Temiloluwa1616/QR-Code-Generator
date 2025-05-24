import React, { useState, useRef } from 'react';
import { Download, Upload, Palette, Link, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';


function QrCode() {
  const [input, setInput] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#054080')
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [displayColor, setDisplayColor] = useState(false)
  const fileInputRef = useRef(null);

  
 function CustomQRCode({ value, color, selectedImage }) {
  return (
    <div 
      className="w-56 h-56 flex items-center justify-center rounded-2xl shadow-lg border-4 border-white relative"
      style={{ 
        background: `linear-gradient(135deg, ${color}10, ${color}05)`,
        borderColor: color
      }}
    >
      <QRCodeSVG 
        value={value} 
        size={180}
        fgColor={color}
        bgColor="transparent"
        level="H"
        includeMargin={false}
      />
      
      {selectedImage && (
        <div className="absolute w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md bg-white p-1">
          <img src={selectedImage} alt="Logo" className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
}

  
  function ChromePicker({ color, onChange }) {
    const colors = [
      '#054080', '#11ab7c', '#e74c3c', '#f39c12', 
      '#9b59b6', '#3498db', '#2ecc71', '#ff6b6b',
      '#4ecdc4', '#45b7d1', '#f093fb', '#fa709a'
    ];
    
    return (
      <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100 animate-fadeIn">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => onChange({ hex: c })}
              className={`w-8 h-8 rounded-lg cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange({ hex: e.target.value })}
          className="w-full h-10 rounded-lg border-none cursor-pointer"
        />
      </div>
    );
  }

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
      alert("Please Enter a URL")
    }
  }

  function downloadimg() {
   
    const blob = new Blob(['QR Code data'], { type: `image/${selectedFormat}` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode.${selectedFormat}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      
      <div className='bg-gradient-to-r from-[#054080] to-[#0854a0] shadow-2xl'>
        <div className='flex items-center justify-between p-6'>
          <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg'>
              <Sparkles className='w-7 h-7 text-[#054080]' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white'>NITHUB</h1>
              <p className='text-blue-100 text-sm'>QR Code Generator</p>
            </div>
          </div>
          <div className='hidden md:flex items-center space-x-2 text-blue-100'>
            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
            <span className='text-sm'>Online</span>
          </div>
        </div>
      </div>

      
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-8 items-start'>
            
            
            <div className='bg-white rounded-3xl p-8 shadow-xl border border-white/20 backdrop-blur-sm animate-slideInLeft'>
              <div className='space-y-6'>
                
                
                <div className='space-y-3'>
                  <label className='flex items-center space-x-2 font-semibold text-gray-700'>
                    <Link className='w-5 h-5 text-[#054080]' />
                    <span>Enter Your URL</span>
                  </label>
                  <div className='relative'>
                    <input
                      type="text"
                      value={input}
                      className='w-full p-4 pl-12 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-[#054080] focus:bg-white transition-all duration-300 text-gray-700 placeholder-gray-400'
                      placeholder='https://example.com'
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Link className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                  </div>
                </div>

                
                <div className='space-y-3'>
                  <label className='flex items-center space-x-2 font-semibold text-gray-700'>
                    <Palette className='w-5 h-5 text-[#054080]' />
                    <span>QR Code Color</span>
                  </label>
                  <div className='relative'>
                    <div className='flex items-center space-x-3'>
                      <div 
                        onClick={handleClick}
                        style={{background: `linear-gradient(135deg, ${color}, ${color}dd)`}}
                        className='w-12 h-12 rounded-xl cursor-pointer shadow-lg border-4 border-white hover:scale-105 transition-transform duration-200'
                      />
                      <div className='flex-1 p-3 bg-gray-50 rounded-xl border-2 border-gray-200'>
                        <span className='font-mono text-gray-600'>{color}</span>
                      </div>
                    </div>
                    {displayColor && (
                      <div className='absolute top-full mt-2 z-50'>
                        <ChromePicker color={color} onChange={handleChange}/>
                      </div>
                    )}
                  </div>
                </div>

                
                <div className='space-y-3'>
                  <label className='flex items-center space-x-2 font-semibold text-gray-700'>
                    <Upload className='w-5 h-5 text-[#054080]' />
                    <span>Add Logo (Optional)</span>
                  </label>
                  <button
                    className='w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#054080] hover:bg-blue-50 transition-all duration-300 text-gray-600 hover:text-[#054080] flex items-center justify-center space-x-2'
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Upload className='w-5 h-5' />
                    <span>{selectedImage ? 'Change Logo' : 'Upload Logo'}</span>
                  </button>
                  <input
                    type="file"
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }}
                    onChange={handleFileSelect} 
                  />
                  {selectedImage && (
                    <div className='flex items-center space-x-3 p-3 bg-green-50 rounded-xl border border-green-200'>
                      <img src={selectedImage} alt="Logo preview" className='w-10 h-10 rounded-lg object-cover' />
                      <span className='text-green-700 font-medium'>Logo uploaded successfully!</span>
                    </div>
                  )}
                </div>

               
                <button 
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#054080] to-[#0854a0] hover:shadow-xl hover:shadow-blue-500/25'
                  }`}
                  onClick={handlegenerateQrcode}
                  disabled={loading}
                >
                  {loading ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className='flex items-center justify-center space-x-2'>
                      <Sparkles className='w-5 h-5' />
                      <span>Generate QR Code</span>
                    </div>
                  )}
                </button>
              </div>
            </div>

            
            <div className='bg-white rounded-3xl p-8 shadow-xl border border-white/20 backdrop-blur-sm animate-slideInRight'>
              <div className='text-center space-y-6'>
                
                {showQRCode ? (
                  <div className='space-y-6 animate-fadeIn'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-4'>Your QR Code</h3>
                    <div className='flex justify-center'>
                      <CustomQRCode value={input} size={226} color={color} selectedImage={selectedImage}/>
                    </div>
                    
                   
                    <div className='space-y-4'>
                      <div className='flex items-center justify-center space-x-4'>
                        <button 
                          className='bg-gradient-to-r from-[#11ab7c] to-[#0ea968] hover:shadow-xl hover:shadow-green-500/25 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2'
                          onClick={downloadimg}
                        >
                          <Download className='w-5 h-5' />
                          <span>Download</span>
                        </button>
                        
                        <select
                          value={selectedFormat}
                          onChange={(e) => setSelectedFormat(e.target.value)}
                          className='px-4 py-3 bg-gradient-to-r from-[#11ab7c] to-[#0ea968] text-white rounded-xl font-semibold border-none focus:outline-none focus:ring-2 focus:ring-green-300 cursor-pointer'
                        >
                          <option value="png">PNG</option>
                          <option value="jpg">JPG</option>
                          <option value="svg">SVG</option>
                        </select>
                      </div>
                      
                      <p className='text-gray-500 text-sm'>
                        Right-click to save or use the download button above
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 animate-pulse">
                    <div className='w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mb-4'>
                      <Sparkles className='w-8 h-8 text-gray-400' />
                    </div>
                    <h3 className='text-xl font-semibold mb-2'>QR Code Preview</h3>
                    <p className='text-center text-sm leading-relaxed'>
                      Enter a URL and click generate<br />
                      to see your QR code here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}

export default QrCode;