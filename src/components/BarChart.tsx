import React from 'react';
import {DimensionValue, View} from 'react-native';
import {Rect, Svg} from 'react-native-svg';

export type BarData = {
  value: number;
  color: string;
};

type BarChartProps = {
  data: BarData[];
  width: DimensionValue;
  height: DimensionValue;
  radius?: number;
};

export default function BarChart({
  data,
  width,
  height,
  radius = 5,
}: BarChartProps) {
  const margin = 10;
  const maxDataValue = Math.max(...data.map(x => x.value));
  const barWidth = 20;
  const chartHeight = 100;
  const chartWidth = data.length * (barWidth + margin) - margin;

  // Calculate distortion to fix border radius
  // const chartAspectRatio = chartHeight / chartWidth;
  // const [distortion, setDistortion] = useState(NaN);
  // const onLayout = useCallback((event: LayoutChangeEvent) => {
  //   const layout = event.nativeEvent.layout;
  //   const outerAspectRatio = layout.height / layout.width;
  //   setDistortion(outerAspectRatio / chartAspectRatio);
  // }, []);

  return (
    <View style={{width, height}}>
      <Svg
        preserveAspectRatio="none"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
        {data.map(({value, color}, index) => {
          const barHeight = (value / maxDataValue) * chartHeight;
          return (
            <Rect
              key={index}
              x={index * (barWidth + margin)}
              y={chartHeight - (value / maxDataValue) * chartHeight}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx={radius}
              ry={radius}
            />
          );
        })}
      </Svg>
    </View>
  );
}
