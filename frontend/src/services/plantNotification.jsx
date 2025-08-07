import { toast } from 'react-toastify';

export function Notifier(plants){
  plants.map((data)=>{
    if (data.careMetrics.water < 40){
      toast.info(`${data.nickname} is in need of watering!`, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
      });
    }
  })
}

const potData = {
  "xsmall": 1,
  "small": 4,
  "medium": 9,
  "large": 15,
  "xlarge": 25
}

export function WaterChange(plants){
  plants.map((data) => {
    const currentDate = new Date();
    const lastWaterDate = new Date(data.lastWatered);
    const diffHours = (currentDate - lastWaterDate) / (1000 * 60 * 60);
    const decreaseRate = data.wateringNeeds;


    const currentWaterLevel = data.careMetrics.water*potData[data.potSize]/100;
    const LevelChange = Math.round(diffHours*decreaseRate/24)

    const metric = Math.round((currentWaterLevel-LevelChange)/potData[data.potSize]*100);

    if (metric<=0){
      data.careMetrics.water = 0;
      data.condition="struggling"
    }
    else if (metric<=100){
      data.careMetrics.water = metric;
      if (metric<20){
        data.condition='struggling'
      }
      else if (metric<40){
        data.condition='needsAttention'
      }
      else if (metric<80){
        data.condition='healthy'
      }
      else {
        data.condition='thriving'
      }
    }
    else{
      data.careMetrics.water = 100;
    }

  });
}