import React, { useState, useEffect } from 'react';
import { usePlantTypes } from '../../context/PlantContext';

const PlantDetailsForm = ({ formData, onChange, plantType, isQuickAdd, onToggleQuickAdd }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const { getPlantTypeById, getPlantCareInfo } = usePlantTypes();

  // Get plant type data
  const careInfo = getPlantCareInfo(plantType);

  const conditions = [
    { id: 'healthy', label: 'Healthy', icon: '😊' },
    { id: 'needsAttention', label: 'Needs Attention', icon: '😐' },
    { id: 'struggling', label: 'Struggling', icon: '😟' }
  ];

  const locations = [
    { id: 'indoor', label: 'Indoor' },
    { id: 'outdoor', label: 'Outdoor' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'patio', label: 'Patio' }
  ];

  const potSizes = [
    { id: 'xsmall', label: 'Extra Small (< 6")' },
    { id: 'small', label: 'Small (6-8")' },
    { id: 'medium', label: 'Medium (8-10")' },
    { id: 'large', label: 'Medium Large (10-12")' },
    { id: 'xlarge', label: 'Large (> 12")' }
  ];

  const handleFieldChange = (field, value) => {
    onChange(field, value);
  };

  // Validate form fields
  useEffect(() => {
    const newErrors = {};

    if (touched.nickname && (!formData.nickname || formData.nickname.trim() === '')) {
      newErrors.nickname = 'Plant nickname is required';
    }

    if (touched.nickname && formData.nickname && formData.nickname.length > 30) {
      newErrors.nickname = 'Nickname must be 30 characters or less';
    }

    if (touched.acquisitionDate) {
      const selectedDate = new Date(formData.acquisitionDate);
      const today = new Date();

      if (selectedDate > today) {
        newErrors.acquisitionDate = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);
  }, [formData, touched]);

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const getQuickTip = () => {
    if (formData.condition === 'struggling') {
      return (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm">
          <div className="font-medium mb-1">Quick Tip for Struggling Plants</div>
          <p>Consider checking the following if your plant is struggling:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Water levels (too much or too little)</li>
            <li>Light conditions (too much or too little)</li>
            <li>Pot size (might need repotting)</li>
            <li>Pests or diseases</li>
          </ul>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-800 mb-4">Plant Details</h2>
      <p className="text-gray-600 mb-6">
        Tell us more about your {plantType?.name || 'plant'} so we can provide personalized care recommendations.
      </p>

      {/* {getCareRecommendation()} */}

      <div className="space-y-6 mt-6">
        {/* Plant Nickname */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plant Nickname *
          </label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname || ''}
            onChange={(e) => onChange('nickname', e.target.value)}
            onBlur={() => handleBlur('nickname')}
            placeholder="E.g., Spike, Leafy, etc."
            className={`w-full px-4 py-2 border rounded-md focus:ring-green-200 focus:border-green-200 ${errors.nickname ? 'border-red-500' : 'border-gray-300'
              }`}
            required
            aria-describedby={errors.nickname ? "nickname-error" : ""}
          />
          {errors.nickname && (
            <p id="nickname-error" className="mt-1 text-sm text-red-600">
              {errors.nickname}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            This is how you'll identify your plant in your collection
          </p>
        </div>

        {/* Current Condition */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Condition *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {conditions.map((condition) => (
              <button
                key={condition.id}
                onClick={() => handleFieldChange('condition', condition.id)}
                className={`cursor-pointer border rounded-md p-3 text-center transition-all 
                  ${formData.condition === condition.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                  }`}
                role="button"
                tabIndex={0}
                aria-pressed={formData.condition === condition.id}
              >
                <div className="text-2xl mb-1">{condition.icon}</div>
                <div className="text-sm">{condition.label}</div>
              </button>
            ))}
          </div>
          {getQuickTip()}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="grid grid-cols-2 gap-2">
            {locations.map((location) => (
              <div
                key={location.id}
                onClick={() => handleFieldChange('location', location.id)}
                className={`cursor-pointer border rounded-md p-3 text-center transition-all ${formData.location === location.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                  }`}
                role="button"
                tabIndex={0}
                aria-pressed={formData.location === location.id}
              >
                {location.label}
              </div>
            ))}
          </div>
        </div>

        {/* Pot Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pot Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {potSizes.map((size) => (
              <div
                key={size.id}
                onClick={() => handleFieldChange('potSize', size.id)}
                className={`cursor-pointer border rounded-md p-3 text-center transition-all text-sm
                  ${formData.potSize === size.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                  }`}
                role="button"
                tabIndex={0}
                aria-pressed={formData.potSize === size.id}
              >
                {size.label}
              </div>
            ))}
          </div>
        </div>

        <hr className="pt-4 border-t border-gray-200" />
    </div>
    </div>
  );
};

export default PlantDetailsForm;