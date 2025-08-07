import appleImg from '../assets/plant_icons/Apple.jpeg';
import cornImg from '../assets/plant_icons/Corn.jpg';
import blueberryImg from '../assets/plant_icons/Blueberry.jpg';
import cherryImg from '../assets/plant_icons/Cherry.jpg';
import garlicImg from '../assets/plant_icons/Garlic.jpg';
import grapeImg from '../assets/plant_icons/Grape.jpg';
import orangeImg from '../assets/plant_icons/Orange.jpg';
import peachImg from '../assets/plant_icons/Peach.jpg';
import pepperImg from '../assets/plant_icons/Pepperbell.jpg';
import potatoImg from '../assets/plant_icons/Potato.jpg';
import raspberryImg from '../assets/plant_icons/Raspberry.jpg';
import soybeanImg from '../assets/plant_icons/Soybean.jpg';
import strawberryImg from '../assets/plant_icons/Strawberry.jpg';
import tomatoImg from '../assets/plant_icons/Tomato.jpg';
import teaImg from '../assets/plant_icons/Tea.png';
import cabbageImg from '../assets/plant_icons/Cabbage.jpg';
import gingerImg from '../assets/plant_icons/Ginger.jpg';
import lemonImg from '../assets/plant_icons/Lemon.jpg';
import onionImg from '../assets/plant_icons/Onion.jpg';

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
    },
     "image": appleImg
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
    },
    "image": cornImg
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
    },
    "image": blueberryImg
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
    },
    "image": cherryImg
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
    },
    "image": garlicImg
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
    },
    "image": grapeImg
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
    },
    "image": orangeImg
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
    },
    "image": peachImg
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
    },
    "image": pepperImg
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
    },
    "image": potatoImg
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
    },
    "image": raspberryImg
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
    },
    "image": soybeanImg
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
    },
    "image": strawberryImg
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
    },
    "image": tomatoImg
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
    },
    "image": teaImg
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
    },
    "image": cabbageImg
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
    },
    "image": gingerImg
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
    },
    "image": lemonImg
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
    },
    "image": onionImg
  }
]


export default plantData;