export enum EventName {
  jsTask = 'js task',
  test = 'test',
  codewars = 'codewars',
  lecture = 'lecture',
  interview = 'interview',
  meetup = 'meetup',
}

export enum RowCategoryName {
  jsTask = 'js task',
  test = 'test',
  codewars = 'codewars',
  lecture = 'lecture',
  interview = 'interview',
  meetup = 'meetup',
  deadline = 'deadline',
}

export const ROW_CATEGORIES_NAMES: RowCategoryName[] = [
  RowCategoryName.codewars,
  RowCategoryName.deadline,
  RowCategoryName.interview,
  RowCategoryName.jsTask,
  RowCategoryName.lecture,
  RowCategoryName.meetup,
  RowCategoryName.test,
];

export enum columnCategory {
  date = 'Date',
  time = 'Time',
  type = 'Type',
  broadcastUrl = 'Broadcast Url',
  organizer = 'Organizer',
  comment = 'Comment',
}

export interface ILinkWithDescription {
  linkDescription: string;
  url: string;
}

export interface IEventCategory {
  id: string;
  categoryName: string;
  backgroundColor: string;
  textColor: string;
}

export interface IEvent {
  id: string;
  eventCategoryName: string;
  title: string;
  description: string;
  comment: string;
  dateTime: string;
  deadlineDate: string;
  organizer: string;
  broadcastUrl: string;
  images: string[];
  videos: string[];
  links: ILinkWithDescription[];
  isFeedbackAvailable: boolean;
  feedbacks: string[];
  isQuestionFormAvailable: boolean;
  questions: string[];
  mapCoordinates: number[];
}

export interface IDescriptionPageContentPermissions {
  isVideosAvailable: boolean;
  isPhotosAvailable: boolean;
  isMapAvailable: boolean;
}

export const TaskNameDescriptionPageContentPermissionsMap = new Map<
  EventName,
  IDescriptionPageContentPermissions
>([
  [EventName.codewars, { isVideosAvailable: false, isPhotosAvailable: false, isMapAvailable: false }],
  [EventName.test, { isVideosAvailable: false, isPhotosAvailable: false, isMapAvailable: false }],
  [EventName.jsTask, { isVideosAvailable: true, isPhotosAvailable: true, isMapAvailable: false }],
  [EventName.lecture, { isVideosAvailable: true, isPhotosAvailable: false, isMapAvailable: false }],
  [EventName.interview, { isVideosAvailable: true, isPhotosAvailable: false, isMapAvailable: false }],
  [EventName.meetup, { isVideosAvailable: true, isPhotosAvailable: true, isMapAvailable: true }],
]);

export interface IRowCategory {
  categoryName: RowCategoryName;
  textColor: string;
  backgroundColor: string;
}

export interface ITableRowInfo {
  id: number;
  rowCategory: IRowCategory;
  title: string;
  comment: string;
  dateTime: string;
  broadcastLink: string;
  organizer: string;
}

// Modify config of 'moment-timezone-data plugin' in 'webpack.config.js' file, if you add or remove timezones
export enum TimeZone {
  europeLondon = 'Europe/London',
  europeWarsaw = 'Europe/Warsaw',
  europeKiev = 'Europe/Kiev',
  europeMinsk = 'Europe/Minsk',
  europeMoscow = 'Europe/Moscow',
  europeVolgograd = 'Europe/Volgograd',
  europeYekaterinburg = 'Asia/Yekaterinburg',
  asiaTashkent = 'Asia/Tashkent',
  asiaKrasnoyarsk = 'Asia/Krasnoyarsk',
  asiaAlmaty = 'Asia/Almaty',
  asiaVladivostok = 'Asia/Vladivostok',
}

export const TimeZones: TimeZone[] = [
  TimeZone.europeLondon,
  TimeZone.europeWarsaw,
  TimeZone.europeKiev,
  TimeZone.europeMinsk,
  TimeZone.europeMoscow,
  TimeZone.europeVolgograd,
  TimeZone.europeYekaterinburg,
  TimeZone.asiaTashkent,
  TimeZone.asiaKrasnoyarsk,
  TimeZone.asiaAlmaty,
  TimeZone.asiaVladivostok,
];

export const BASE_TIMEZONE: TimeZone = TimeZone.europeMoscow;

export enum AppMode {
  student = 'student',
  mentor = 'mentor',
}

export enum ScheduleMode {
  table = 'Table',
  list = 'List',
  calendar = 'Calendar',
}

export const ScheduleModes: ScheduleMode[] = [ScheduleMode.table, ScheduleMode.list, ScheduleMode.calendar];
