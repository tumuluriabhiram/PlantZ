import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaLeaf, FaMapMarkerAlt, FaRuler, FaCalendarAlt} from 'react-icons/fa';
import plantData from './plantData.js'

const DisplayPlantData = ({ formData }) => {
  // Function to format the key into a readable label
  const formatLabel = (key) => {
    return key.replace(/([A-Z])/g, ' $1')
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };  

  // Function to render the appropriate icon for each field
  const getIcon = (key) => {
    switch(key) {
      case 'plantType': return <FaLeaf className="text-green-600" />;
      case 'location': return <FaMapMarkerAlt className="text-green-600" />;
      case 'potSize': return <FaRuler className="text-green-600" />;
      case 'acquisitionDate': return <FaCalendarAlt className="text-green-600" />;
      default: return <FaLeaf className="text-green-600" />;
    }
  };

  // Function to format the value for display
  const formatValue = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    if (key === 'acquisitionDate') {
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  };

  useEffect(()=>{

    function UpdatePlantData(){
      const plantType = formData.plantType
      const potSize = formData.potSize

      const requiredData = plantData.filter(item => item.id === plantType);


      formData.WateringRate = requiredData[0].dailyWaterNeed[potSize], potSize
    }

    UpdatePlantData()

  }, [])


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Plant Information Summary</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([key, value]) => (
            key==='WateringRate'
            ?
            null
            :
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50"
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100">
                {getIcon(key)}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600">{formatLabel(key)}</h3>
                <p className="mt-1 text-lg text-gray-900">{formatValue(key, value)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DisplayPlantData;