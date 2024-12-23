import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import OCRScanner from '../components/OCRScanner';

const HomePage = ({ onScanComplete }) => {
  const navigate = useNavigate();

  const handleScanComplete = (data) => {
    onScanComplete(data);
    navigate('/user-details', { state: { accountNumber: data.accountNumber, ifscCode: data.ifscCode } });
  };

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <h1 className={styles.title}>OCR Scanner</h1>
      <p className={styles.subtitle}>Keep your passbook ready for scanning.</p>
      <OCRScanner onScanComplete={handleScanComplete} />
      
    </div>
  </div>
  );
};

export default HomePage;
// import React, { useState } from 'react';
// import { Button } from '@shadcn/react/button';
// import { Select, SelectItem } from '@shadcn/react/select';
// import { Spinner } from '@shadcn/react/spinner';
// import { useNavigate } from 'react-router-dom';

// const HomePage = ({ onScanComplete }) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const navigate = useNavigate();

//   const handleScan = () => {
//     setIsScanning(true);
//     setTimeout(() => {
//       const mockData = {
//         accountNumber: '123456789',
//         ifscCode: 'IFSC0012345',
//       };
//       setIsScanning(false);
//       onScanComplete(mockData);
//       navigate('/user-details', { state: { user: mockData } });
//     }, 2000);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
//       <h1 className="text-2xl font-semibold mb-4">Keep Your Passbook for Scanning</h1>
//       <Select className="mb-4">
//         <SelectItem value="en">English</SelectItem>
//         <SelectItem value="hi">Hindi</SelectItem>
//         <SelectItem value="ta">Tamil</SelectItem>
//       </Select>
//       <Button onClick={handleScan} disabled={isScanning}>
//         {isScanning ? (
//           <>
//             <Spinner size="sm" className="mr-2" /> Scanning...
//           </>
//         ) : (
//           'Start Scan'
//         )}
//       </Button>
//     </div>
//   );
// };

// export default HomePage;
