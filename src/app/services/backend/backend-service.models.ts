export interface IBackendEvent {
  id: string;
  eventCategoryName: string;
  title: string;
  description: string;
  comment: string;
  dateTime: string;
  deadlineDate?: string;
  organizer: string;
  broadcastUrl?: string;
  images?: string;
  videos?: string;
  links: string;
  isFeedbackAvailable: string;
  feedbacks: string;
  isQuestionFormAvailable: string;
  questions: string;
  mapCoordinates?: string;
  name: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  place: string;
}

export interface IEventsResponse {
  data: IBackendEvent[];
}

export interface IBackendEventCategory {
  name: string;
  id: string;
  categoryName: string;
  backgroundColor: string;
  textColor: string;
  permissions: string;
}

export interface IEventCategoriesResponse {
  data: IBackendEventCategory[];
}
