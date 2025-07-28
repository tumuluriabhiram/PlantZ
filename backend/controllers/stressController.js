import ort from 'onnxruntime-node';

async function getStress(req, res) {
  const formData = req.body; // Read form data from the request body

  let input = [];

  Object.keys(formData).forEach(key => {
    input.push(parseFloat(formData[key])); // Convert formData[key] to a float
  });

  // console.log('Input for ONNX model:', input);

  // Load the ONNX model
  const session = await ort.InferenceSession.create('../backend/stress_model.onnx');
  const inputTensor = new ort.Tensor('float32', input, [1, 11]);
  const results = await session.run({ float_input: inputTensor }); 

  // Inspect the results object and its keys
  // console.log('ONNX model results:', results);

  let data = results.probabilities.cpuData
  let max_out = 0

  for (let i = 0; i < 3; i++) {
    if (data[i] > data[max_out]) {
      max_out = i;
    }
  }

  const output_map = ['Low Stress', 'Medium Stress', 'High Stress'];

  res.status(200).json({ message: output_map[max_out] });
}

export default {
    getStress
};