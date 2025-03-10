
export const formatLineData = (inputData: any[], groupBy?: string) => {
  if (inputData.length > 0 && 'id' in inputData[0] && 'data' in inputData[0]) {
    return inputData;
  }

  return [
    {
      id: "values",
      data: inputData.map(item => ({
        x: item.label,
        y: item.value
      }))
    }
  ];
};

export const formatBarData = (inputData: any[], groupBy?: string) => {
  if (inputData.length > 0 && groupBy && inputData[0][groupBy]) {
    return inputData;
  }

  return inputData.map(item => ({
    [groupBy || 'label']: item.label,
    value: item.value,
    color: item.color
  }));
};
