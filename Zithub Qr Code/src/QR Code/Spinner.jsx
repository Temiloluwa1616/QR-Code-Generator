import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
const Spinner = () => {
    
  return (
    <div>
      <ClipLoader color="white" loading={loading} size={150} style={{display:'flex'}} />
    </div>
  );
};

export default Spinner;