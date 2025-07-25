const plantData = [
  {
    "id": "apple",
    "name": "Apple",
    "scientificName": "Malus domestica",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 5.0,
      "medium": 10.0,
      "large": 15.0,
      "xlarge": 25.0
    }
  },
  {
    "id": "corn",
    "name": "Corn",
    "scientificName": "Zea mays",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 1.5,
      "small": 2.5,
      "medium": 3.5,
      "large": 5.0,
      "xlarge": 7.0
    }
  },
  {
    "id": "blueberry",
    "name": "Blueberry",
    "scientificName": "Vaccinium",
    "waterFrequency": "High",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": 1.5,
      "small": 2.5,
      "medium": 3.5,
      "large": 5.0,
      "xlarge": 7.0
    }
  },
  {
    "id": "cherry",
    "name": "Cherry",
    "scientificName": "Prunus avium",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 5.0,
      "medium": 10.0,
      "large": 15.0,
      "xlarge": 25.0
    }
  },
  {
    "id": "garlic",
    "name": "Garlic",
    "scientificName": "Allium sativum",
    "waterFrequency": "Low",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 0.3,
      "small": 0.4,
      "medium": 0.6,
      "large": 0.8,
      "xlarge": 1.0
    }
  },
  {
    "id": "grape",
    "name": "Grape",
    "scientificName": "Vitis vinifera",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 3.0,
      "medium": 6.0,
      "large": 10.0,
      "xlarge": 15.0
    }
  },
  {
    "id": "orange",
    "name": "Orange",
    "scientificName": "Citrus sinensis",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 7.0,
      "medium": 12.0,
      "large": 20.0,
      "xlarge": 35.0
    }
  },
  {
    "id": "peach",
    "name": "Peach",
    "scientificName": "Prunus persica",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 5.0,
      "medium": 10.0,
      "large": 15.0,
      "xlarge": 25.0
    }
  },
  {
    "id": "pepper",
    "name": "Pepper Bell",
    "scientificName": "Capsicum annuum",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 1.0,
      "small": 1.8,
      "medium": 2.8,
      "large": 4.0,
      "xlarge": 5.5
    }
  },
  {
    "id": "potato",
    "name": "Potato",
    "scientificName": "Solanum tuberosum",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 1.0,
      "small": 1.8,
      "medium": 2.8,
      "large": 4.0,
      "xlarge": 5.5
    }
  },
  {
    "id": "raspberry",
    "name": "Raspberry",
    "scientificName": "Rubus idaeus",
    "waterFrequency": "High",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": 1.5,
      "small": 2.5,
      "medium": 3.5,
      "large": 5.0,
      "xlarge": 7.0
    }
  },
  {
    "id": "soybean",
    "name": "Soybean",
    "scientificName": "Glycine max",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 0.8,
      "small": 1.2,
      "medium": 1.8,
      "large": 2.5,
      "xlarge": 3.5
    }
  },
  {
    "id": "strawberry",
    "name": "Strawberry",
    "scientificName": "Fragaria × ananassa",
    "waterFrequency": "High",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 0.8,
      "small": 1.2,
      "medium": 2.0,
      "large": 3.0,
      "xlarge": 4.0
    }
  },
  {
    "id": "tomato",
    "name": "Tomato",
    "scientificName": "Solanum lycopersicum",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": 1.5,
      "small": 2.5,
      "medium": 3.5,
      "large": 5.0,
      "xlarge": 7.0
    }
  },
  {
    "id": "tea",
    "name": "Tea",
    "scientificName": "Camellia sinensis",
    "waterFrequency": "Moderate",
    "lightNeeds": "Partial Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": 1.0,
      "small": 1.8,
      "medium": 2.8,
      "large": 4.0,
      "xlarge": 5.5
    }
  },
  {
    "id": "cabbage",
    "name": "Cabbage",
    "scientificName": "Brassica oleracea",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 1.0,
      "small": 1.8,
      "medium": 2.8,
      "large": 4.0,
      "xlarge": 5.5
    }
  },
  {
    "id": "ginger",
    "name": "Ginger",
    "scientificName": "Zingiber officinale",
    "waterFrequency": "High",
    "lightNeeds": "Partial Shade",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": 1.5,
      "small": 2.5,
      "medium": 3.5,
      "large": 5.0,
      "xlarge": 7.0
    }
  },
  {
    "id": "lemon",
    "name": "Lemon",
    "scientificName": "Citrus limon",
    "waterFrequency": "Moderate",
    "lightNeeds": "Full Sun",
    "careLevel": "Moderate",
    "dailyWaterNeed": {
      "xsmall": "N/A",
      "small": 7.0,
      "medium": 12.0,
      "large": 20.0,
      "xlarge": 35.0
    }
  },
  {
    "id": "onion",
    "name": "Onion",
    "scientificName": "Allium cepa",
    "waterFrequency": "Low",
    "lightNeeds": "Full Sun",
    "careLevel": "Easy",
    "dailyWaterNeed": {
      "xsmall": 0.3,
      "small": 0.4,
      "medium": 0.6,
      "large": 0.8,
      "xlarge": 1.0
    }
  }
]


export default plantData;