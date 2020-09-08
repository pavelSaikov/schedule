import { IEvent, IEventCategory, ILinkWithDescription } from '../../models/app.models';
import { ICoordinates } from '../../pages/description/components/map/map.models';
import {
  IBackendEvent,
  IBackendEventCategory,
  IEventsResponse,
  IEventCategoriesResponse,
} from './backend-service.models';

class BackendService {
  private endpoint = 'https://rs-react-schedule.firebaseapp.com/api';
  private teamId = 'g38scps';

  private parseBackendEventToAppEvent(backendEvent: IBackendEvent): IEvent {
    return {
      id: backendEvent.id,
      eventCategoryName: backendEvent.eventCategoryName,
      title: backendEvent.title,
      description: backendEvent.description,
      comment: backendEvent.comment,
      dateTime: backendEvent.dateTime,
      deadlineDate: backendEvent.deadlineDate,
      organizer: backendEvent.organizer,
      broadcastUrl: backendEvent.broadcastUrl,
      images: JSON.parse(backendEvent.images) as string[],
      videos: JSON.parse(backendEvent.videos) as string[],
      links: JSON.parse(backendEvent.links) as ILinkWithDescription[],
      isFeedbackAvailable: JSON.parse(backendEvent.isFeedbackAvailable) as boolean,
      feedbacks: JSON.parse(backendEvent.feedbacks) as string[],
      isQuestionFormAvailable: JSON.parse(backendEvent.isQuestionFormAvailable) as boolean,
      questions: JSON.parse(backendEvent.questions) as string[],
      mapCoordinates: JSON.parse(backendEvent.mapCoordinates) as ICoordinates,
    };
  }

  private parseAppEventToBackendEvent(appEvent: IEvent): IBackendEvent {
    return {
      ...appEvent,
      images: JSON.stringify(appEvent.images),
      videos: JSON.stringify(appEvent.videos),
      links: JSON.stringify(appEvent.links),
      isFeedbackAvailable: JSON.stringify(appEvent.isFeedbackAvailable),
      feedbacks: JSON.stringify(appEvent.feedbacks),
      isQuestionFormAvailable: JSON.stringify(appEvent.isQuestionFormAvailable),
      questions: JSON.stringify(appEvent.questions),
      mapCoordinates: JSON.stringify(appEvent.mapCoordinates),
      name: '',
      descriptionUrl: '',
      type: '',
      timeZone: '',
      place: '',
    };
  }

  private parseBackendEventCategoryToAppEventCategory(
    backendEventCategory: IBackendEventCategory,
  ): IEventCategory {
    return {
      id: backendEventCategory.id,
      categoryName: backendEventCategory.categoryName,
      backgroundColor: backendEventCategory.backgroundColor,
      textColor: backendEventCategory.textColor,
    };
  }

  private parseAppEventCategoryToBackendEventCategory(
    appEventCategory: IEventCategory,
  ): IBackendEventCategory {
    return { ...appEventCategory, name: '' };
  }

  public getAllEvents(abortController: AbortController): Promise<IEvent[]> {
    return fetch(`${this.endpoint}/team/${this.teamId}/events`, { signal: abortController.signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Can not get all events from backend');
      })
      .then((eventsResponse: IEventsResponse) =>
        eventsResponse.data.map(backendEvent => this.parseBackendEventToAppEvent(backendEvent)),
      );
  }

  public getEvent(eventId: string, abortController: AbortController): Promise<IEvent> {
    return fetch(`${this.endpoint}/team/${this.teamId}/event/${eventId}`, { signal: abortController.signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Can not get event from backend');
      })
      .then((response: IBackendEvent) => this.parseBackendEventToAppEvent(response));
  }

  public addEvent(event: IEvent, abortController: AbortController): void {
    const backendEvent: IBackendEvent = this.parseAppEventToBackendEvent(event);

    fetch(`${this.endpoint}/team/${this.teamId}/event`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendEvent),
      signal: abortController.signal,
    });
  }

  public updateEvent(event: IEvent, abortController: AbortController): void {
    const backendEvent: IBackendEvent = this.parseAppEventToBackendEvent(event);

    fetch(`${this.endpoint}/team/${this.teamId}/event/${event.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendEvent),
      signal: abortController.signal,
    });
  }

  public deleteEvent(eventId: string, abortController: AbortController): void {
    fetch(`${this.endpoint}/team/${this.teamId}/event/${eventId}`, {
      method: 'Delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    });
  }

  public getAllEventCategories(abortController: AbortController): Promise<IEventCategory[]> {
    return fetch(`${this.endpoint}/team/${this.teamId}/organizers`, { signal: abortController.signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Can not get all event categories from backend');
      })
      .then((response: IEventCategoriesResponse) =>
        response.data.map(backendEventCategory =>
          this.parseBackendEventCategoryToAppEventCategory(backendEventCategory),
        ),
      );
  }
  public getEventCategory(categoryId: string, abortController: AbortController): Promise<IEventCategory> {
    return fetch(`${this.endpoint}/team/${this.teamId}/organizer/${categoryId}`, {
      signal: abortController.signal,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Can not get event category from backend');
      })
      .then((response: IBackendEventCategory) => this.parseBackendEventCategoryToAppEventCategory(response));
  }

  public addEventCategory(eventCategory: IEventCategory, abortController: AbortController): void {
    const backendEventCategory: IBackendEventCategory = this.parseAppEventCategoryToBackendEventCategory(
      eventCategory,
    );

    fetch(`${this.endpoint}/team/${this.teamId}/organizer`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendEventCategory),
      signal: abortController.signal,
    });
  }

  public updateEventCategory(eventCategory: IEventCategory, abortController: AbortController): void {
    const backendEventCategory: IBackendEventCategory = this.parseAppEventCategoryToBackendEventCategory(
      eventCategory,
    );

    fetch(`${this.endpoint}/team/${this.teamId}/organizer/${eventCategory.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(backendEventCategory),
      signal: abortController.signal,
    });
  }

  public deleteEventCategory(eventCategoryId: string, abortController: AbortController): void {
    fetch(`${this.endpoint}/team/${this.teamId}/organizer/${eventCategoryId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: abortController.signal,
    });
  }
}

export const backendService = new BackendService();
