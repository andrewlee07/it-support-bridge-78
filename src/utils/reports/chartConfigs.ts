
import { ChartConfig } from '@/components/reports/ChartBuilder';

export const incidentChartConfig: ChartConfig = {
  id: 'incidents-by-status',
  name: 'Incidents by Status',
  chartType: 'pie',
  dataSource: 'incidents',
  metrics: ['count'],
  filters: {},
};

export const serviceRequestChartConfig: ChartConfig = {
  id: 'service-by-status',
  name: 'Service Requests by Status',
  chartType: 'donut',
  dataSource: 'serviceRequests',
  metrics: ['count'],
  filters: {},
};

export const problemChartConfig: ChartConfig = {
  id: 'problems-by-status',
  name: 'Problems by Status',
  chartType: 'pie',
  dataSource: 'problems',
  metrics: ['count'],
  filters: {},
};

export const changeChartConfig: ChartConfig = {
  id: 'changes-by-status',
  name: 'Changes by Status',
  chartType: 'bar',
  dataSource: 'changes',
  metrics: ['count'],
  filters: {},
};

export const releaseChartConfig: ChartConfig = {
  id: 'releases-by-status',
  name: 'Releases by Status',
  chartType: 'pie',
  dataSource: 'incidents', // Using incidents as a valid dataSource
  metrics: ['count'],
  filters: {},
};

export const assetChartConfig: ChartConfig = {
  id: 'assets-by-status',
  name: 'Assets by Status',
  chartType: 'donut',
  dataSource: 'assets',
  metrics: ['count'],
  filters: {},
};

export const backlogChartConfig: ChartConfig = {
  id: 'bugs-by-status',
  name: 'Bugs by Status',
  chartType: 'bar',
  dataSource: 'tests', // Using tests as a valid dataSource
  metrics: ['count'],
  filters: {},
};
