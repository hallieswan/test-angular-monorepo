import { ECharts, EChartsOption } from 'echarts';
import { BoxplotPoint, BoxplotProps } from './models/boxplot';
import { addXAxisLabelTooltips, initChart, setNoDataOption } from './utils';

const titleTextStyle = {
  fontWeight: 700,
  fontSize: '18px',
  color: 'black',
};

const boxplotStyle = {
  borderColor: '#bcc0ca',
  borderWidth: 2,
};

const yAxisPadding = 0.2;
const defaultPointShape = 'circle';
const defaultPointSize = 18;
const defaultPointColor = '#8b8ad1';

export class BoxplotVisualization {
  chart: ECharts | undefined;

  constructor(
    chartDom: HTMLDivElement | HTMLCanvasElement,
    boxplotProps: BoxplotProps
  ) {
    this.chart = initChart(chartDom);
    this.setOptions(boxplotProps);
    if (boxplotProps.xAxisCategoryToTooltipText)
      addXAxisLabelTooltips(
        boxplotProps.xAxisCategoryToTooltipText,
        this.chart
      );
  }

  destroy() {
    this.chart?.dispose();
  }

  setOptions(boxplotProps: BoxplotProps) {
    if (!this.chart) return;

    const {
      points,
      summary,
      title,
      xAxisTitle,
      yAxisTitle,
      yAxisMin,
      yAxisMax,
      pointTooltipFormatter,
    } = boxplotProps;

    if (points.length === 0) {
      setNoDataOption(this.chart);
      return;
    }

    const option: EChartsOption = {
      title: [
        {
          text: title,
          left: 'center',
          textStyle: titleTextStyle,
        },
        // add x-axis title as a title rather than xAxis.name.
        // setting via xAxis.name causes cursor to change to pointer when
        // x-axis label tooltips are used
        {
          text: xAxisTitle,
          textStyle: titleTextStyle,
          left: 'center',
          top: 'bottom',
        },
      ],
      dataset: [
        // static boxplots
        {
          dimensions: summary ? Object.keys(summary[0]) : undefined,
          source: summary,
        },
        // single points
        {
          dimensions: Object.keys(points[0]),
          source: points,
        },
      ],
      xAxis: {
        type: 'category',
        triggerEvent: true,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
        },
        axisLabel: {
          color: 'black',
          fontWeight: 'bold',
          fontSize: '14px',
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisTitle,
        nameLocation: 'middle',
        nameGap: 50,
        nameTextStyle: titleTextStyle,
        axisLine: {
          show: true,
        },
        splitLine: {
          show: false,
        },
        min: yAxisMin ? yAxisMin - yAxisPadding : undefined,
        max: yAxisMax ? yAxisMax + yAxisPadding : undefined,
      },
      tooltip: {
        position: 'top',
        backgroundColor: '#63676C',
        borderColor: 'none',
        textStyle: {
          color: 'white',
        },
        extraCssText: 'opacity: 0.9',
      },
      series: [
        {
          name: 'static boxplot',
          type: 'boxplot',
          datasetIndex: 0,
          encode: {
            x: 'category',
            y: ['min', 'firstQuartile', 'median', 'thirdQuartile', 'max'],
          },
          itemStyle: boxplotStyle,
          silent: true,
        },
        {
          name: 'single points',
          type: 'scatter',
          datasetIndex: 1,
          encode: {
            x: 'category',
            y: 'value',
          },
          symbolSize: defaultPointSize,
          symbol: () => defaultPointShape,
          itemStyle: {
            color: () => defaultPointColor,
          },
          tooltip: {
            formatter: (param) => {
              if (pointTooltipFormatter) {
                return pointTooltipFormatter(param.data as BoxplotPoint);
              }
              return '';
            },
          },
        },
      ],
    };

    this.chart.setOption(option);
  }
}
