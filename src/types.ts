export type UnitStatus = 'Available' | 'Running' | 'Finished' | 'Error';
export type RunMode = 'full' | 'extraction_only' | 'pcr_only';

export interface ConnectionStatus {
  main: boolean;
  extraction: boolean;
  pcr: boolean;
}

export interface SampleData {
  id: string;
  patientName: string;
  assayType: string;
}

export interface UnitData {
  id: number;
  name: string;
  status: UnitStatus;
  progress: number;
  samples: Record<number, SampleData>; // 1 to 4
  extractionTemplate: string;
  pcrTemplate: string;
  currentTemp: number;
  targetTemp: number;
  cycle: number;
  runMode: RunMode;
  connection: ConnectionStatus;
  remainingTime?: string;
  testItem?: string;
}

export interface RecordData {
  id: string;
  unitName: string;
  sampleId: string;
  patientName: string;
  assayType: string;
  startTime: string;
  endTime: string;
  result: 'Positive' | 'Negative' | 'Invalid';
  operator: string;
}
