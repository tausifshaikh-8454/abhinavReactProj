// Initial portfolio map for the prototype. Verify product names and URLs with the latest internal catalogue before launch.
export const divisions = [
  {
    id: 'power-grid', name: 'Power & Grid', short: 'P&G',
    summary: 'Testing and measurement for power generation, transmission, distribution and grid assets.',
    products: ['Transformer testing instruments', 'Insulation diagnostics', 'Low-resistance measurement', 'Protection and safety testing', 'High-voltage testing (including partner ranges)'],
    sceneIds: ['substation', 'transformer', 'transmission', 'test-lab'],
    url: 'https://motwane.com/all-divisions/power-and-grid/'
  },
  {
    id: 'industrial-commercial', name: 'Industrial & Commercial', short: 'I&C',
    summary: 'Monitoring and energy insight for factories, commercial buildings and operating assets.',
    products: ['TMSiq / transformer monitoring', 'BMSiq / busbar monitoring', 'EMSIQ / energy monitoring', 'Power-quality monitoring applications', 'Industrial asset monitoring'],
    sceneIds: ['industry', 'busbar', 'motor', 'chiller', 'water-meter'],
    url: 'https://motwanedigital.com/'
  },
  {
    id: 'motware', name: 'MOT-WARE', short: 'MW',
    summary: 'Connected test data, asset-health dashboards, reporting and integrations across compatible equipment.',
    products: ['Test-data platform', 'Asset-health dashboards', 'Historical and trend analysis', 'Reporting and templates', 'Open integrations'],
    sceneIds: ['digital-hub', 'transformer', 'test-lab'],
    url: 'https://motwane.com/product_category/motware/'
  },
  {
    id: 'ai-analytics', name: 'Motwane AI & Analytics', short: 'AI',
    summary: 'Analytics that help users interpret equipment behaviour, trends and potential asset-health changes.',
    products: ['Asset-behaviour analysis', 'Forecasting and decision support', 'Trend comparison', 'Health and lifecycle insights'],
    sceneIds: ['digital-hub', 'transformer', 'motor'],
    url: 'https://motwane.com/product_category/data-products/'
  },
  {
    id: 'telemetrics', name: 'Telemetrics', short: 'TM',
    summary: 'Fault location for power cables, communication cables and water pipelines.',
    products: ['Power-cable fault locating', 'Communication-cable fault locating', 'Water-pipeline fault locating'],
    sceneIds: ['cable-network', 'test-lab', 'water-meter'],
    url: 'https://motwane.com/products-and-services/'
  },
  {
    id: 'ioxn', name: 'IoXn / Industrial IoT', short: 'IoXn',
    summary: 'Connected monitoring devices for selected assets and utility applications.',
    products: ['IoTx / transformer monitoring', 'IoCH / chiller monitoring', 'IoWM / water monitoring', 'IoLx / lighting monitoring'],
    sceneIds: ['transformer', 'chiller', 'water-meter', 'streetlight'],
    url: 'https://motwane.com/product_category/ioxn/'
  },
  {
    id: 'citylight', name: 'CityLight', short: 'CL',
    summary: 'Smart street-lighting monitoring, management and control.',
    products: ['Street-light monitoring', 'Remote management', 'Lighting schedules and control'],
    sceneIds: ['streetlight'],
    url: 'https://motwane.com/product_category/lighting/'
  },
  {
    id: 'entrance-access', name: 'Entrance & Access Control', short: 'EAC',
    summary: 'Access-control solutions for controlled entry to facilities and campuses.',
    products: ['Entrance-control solutions', 'Access-control systems'],
    sceneIds: ['security-gate'],
    url: 'https://motwane.com/'
  },
  {
    id: 'academy', name: 'Motwane Academy', short: 'MA',
    summary: 'Training and knowledge enablement related to electrical testing and measurement.',
    products: ['Technical learning', 'Testing and measurement knowledge', 'Training programmes'],
    sceneIds: ['academy', 'test-lab'],
    url: 'https://motwane.com/'
  },
  {
    id: 'oil-lab', name: 'Transformer Oil Testing Lab', short: 'LAB',
    summary: 'Laboratory testing services for transformer insulating oil.',
    products: ['Transformer oil testing', 'Laboratory diagnostics', 'Test reporting'],
    sceneIds: ['oil-lab', 'transformer'],
    url: 'https://motwane.com/'
  },
];

export const assets = [
  { id:'substation', title:'Utility substation', eyebrow:'POWER & GRID', description:'Explore primary substation equipment and the electrical measurements used to assess performance, insulation and asset condition.', related:['Power & Grid'], products:['Electrical test & measurement','High-voltage testing','Protection and safety testing'], position:[-7,0,0] },
  { id:'transformer', title:'Power transformer', eyebrow:'TRANSFORMER ASSET', description:'Discover transformer testing, online condition monitoring and asset-health applications around a critical grid asset.', related:['Power & Grid','Industrial & Commercial','IoXn / Industrial IoT','MOT-WARE','Motwane AI & Analytics','Transformer Oil Testing Lab'], products:['Transformer testing instruments','TXIQ / transformer monitoring','IoTx','MOT-WARE','Transformer oil testing'], position:[-4,0,0] },
  { id:'transmission', title:'Transmission network', eyebrow:'POWER TRANSFER', description:'Follow the high-voltage network that carries power towards distribution systems and end users.', related:['Power & Grid','Telemetrics'], products:['Electrical testing','Cable fault locating'], position:[-1.3,0,0] },
  { id:'busbar', title:'Busbar & distribution', eyebrow:'INDUSTRIAL DISTRIBUTION', description:'Explore busbar condition monitoring and the measurement of energy and power-quality conditions at distribution points.', related:['Industrial & Commercial'], products:['BMSiq / Busbar Monitoring System','EMSIQ / Energy Monitoring System','Power-quality applications'], position:[2.4,0,0] },
  { id:'industry', title:'Industrial facility', eyebrow:'INDUSTRIAL & COMMERCIAL', description:'Explore an industrial load with electrical distribution, production equipment and supporting utilities.', related:['Industrial & Commercial','MOT-WARE','Motwane AI & Analytics'], products:['Energy monitoring','Asset dashboards','Industrial monitoring'], position:[5.6,0,0] },
  { id:'motor', title:'Motor, pump & compressor', eyebrow:'ROTATING ASSETS', description:'Discover monitoring and electrical-test applications around industrial motors and rotating machinery.', related:['Industrial & Commercial','Motwane AI & Analytics'], products:['MTIQ / motor monitoring*','Electrical test instruments','Energy monitoring'], position:[6.8,0,2.1] },
  { id:'digital-hub', title:'Digital intelligence hub', eyebrow:'SOFTWARE & ANALYTICS', description:'Connect relevant instruments and compatible monitoring devices to a shared view of test data, trends and asset health.', related:['MOT-WARE','Motwane AI & Analytics'], products:['MOT-WARE','AI & analytics','Dashboards and reporting'], position:[1.5,0,3.5] },
  { id:'cable-network', title:'Underground cable network', eyebrow:'TELEMETRICS', description:'Select the underground cable route to discover cable-fault location applications. Fault location is represented schematically.', related:['Telemetrics','Power & Grid'], products:['Power-cable fault locators','Communication-cable fault locators'], position:[-0.8,0,-3.2] },
  { id:'test-lab', title:'Testing & measurement lab', eyebrow:'TEST & MEASUREMENT', description:'A dedicated location for test instruments, lab workflows and equipment diagnostics across multiple electrical applications.', related:['Power & Grid','Motwane Academy','MOT-WARE','Telemetrics'], products:['Electrical test instruments','Test data workflows','Technical training'], position:[-5.5,0,-4.1] },
  { id:'oil-lab', title:'Transformer oil lab', eyebrow:'LAB SERVICES', description:'Explore laboratory testing of transformer insulating oil and how test results may support asset-assessment workflows.', related:['Transformer Oil Testing Lab','MOT-WARE'], products:['Oil tests and reports','Laboratory diagnostics'], position:[-3.8,0,-4.1] },
  { id:'chiller', title:'Chiller plant', eyebrow:'CONNECTED UTILITIES', description:'Explore connected chiller monitoring as part of a wider industrial facility, separate from the electrical power path.', related:['IoXn / Industrial IoT','Industrial & Commercial','MOT-WARE'], products:['IoCH / chiller monitoring','MOT-WARE','AI & analytics'], position:[6,0,-3.5] },
  { id:'water-meter', title:'Water utility & metering', eyebrow:'CONNECTED UTILITIES', description:'Discover IoT-based water-meter monitoring and separate water-pipeline fault-locating applications.', related:['IoXn / Industrial IoT','Telemetrics'], products:['IoWM / water monitoring','Water-pipeline fault locating'], position:[3.9,0,-4.6] },
  { id:'streetlight', title:'Smart street lighting', eyebrow:'CITYLIGHT', description:'Explore connected street lights and the smart-lighting monitoring applications used across campuses and industrial roads.', related:['CityLight','IoXn / Industrial IoT','MOT-WARE'], products:['CityLight / IoLx','Remote lighting monitoring'], position:[-8,0,3.9] },
  { id:'security-gate', title:'Facility entrance & access', eyebrow:'ENTRANCE CONTROL', description:'A supporting campus facility showcases Motwane’s entrance and access-control division, which is separate from the power-transmission path.', related:['Entrance & Access Control'], products:['Entrance-control solutions','Access-control systems'], position:[8.6,0,3.2] },
  { id:'academy', title:'Motwane Academy', eyebrow:'TRAINING & KNOWLEDGE', description:'Explore technical learning and knowledge enablement as part of the broader Motwane ecosystem.', related:['Motwane Academy','Power & Grid'], products:['Technical learning','Electrical testing knowledge'], position:[-8,0,-3.5] },
];

export const tourSteps = ['substation','transformer','transmission','busbar','industry','motor','digital-hub','test-lab'];
