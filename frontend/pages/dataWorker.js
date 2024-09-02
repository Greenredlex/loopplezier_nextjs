self.onmessage = function (e) {
    const { type, data } = e.data;
    if (type === "PROCESS_DATA") {
      // Perform heavy data processing
      const processedData = processData(data);
      self.postMessage({ type: "DATA_PROCESSED", data: processedData });
    }
  };
  
  const processData = (data) => {
    // Implement data processing logic
    return data; // Placeholder
  };
  