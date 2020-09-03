export enum TaskName {
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

export interface ITask {
  id: number;
  taskName: TaskName;
  title: string;
  description: string;
  comment: string;
  dateTime: string;
  deadlineDate?: string;
  organizer: string;
  broadcastUrl?: string;
  images?: string;
  videos?: string;
  links: ILinkWithDescription[];
  isFeedbackAvailable: boolean;
  feedbacks: string[];
  isQuestionFormAvailable: boolean;
  questions: string[];
  mapCoordinates?: number;
}

export interface IDescriptionPageContentPermissions {
  isVideosAvailable: boolean;
  isPhotosAvailable: boolean;
  isMapAvailable: boolean;
}

export const TaskNameDescriptionPageContentPermissionsMap = new Map<TaskName, IDescriptionPageContentPermissions>([
  [TaskName.codewars, { isVideosAvailable: false, isPhotosAvailable: false, isMapAvailable: false }],
  [TaskName.test, { isVideosAvailable: false, isPhotosAvailable: false, isMapAvailable: false }],
  [TaskName.jsTask, { isVideosAvailable: true, isPhotosAvailable: true, isMapAvailable: false }],
  [TaskName.lecture, { isVideosAvailable: true, isPhotosAvailable: false, isMapAvailable: false }],
  [TaskName.interview, { isVideosAvailable: true, isPhotosAvailable: false, isMapAvailable: false }],
  [TaskName.meetup, { isVideosAvailable: true, isPhotosAvailable: true, isMapAvailable: true }],
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

export enum TimeZone {
  europeLondon = 'Europe/London',
  europeWarsaw = 'Europe/Warsaw',
  europeKiev = 'Europe/Kiev',
  europeMinsk = 'Europe/Minsk',
  europeMoscow = 'Europe/Moscow',
  europeVolgograd = 'Europe/Volgograd',
  europeYekaterinburg = 'Europe/Yekaterinburg',
  asiaTashkent = 'Europe/Tashkent',
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

export enum AppMode {
  student = 'student',
  mentor = 'mentor',
}
